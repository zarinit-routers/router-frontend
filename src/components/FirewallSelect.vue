<template>
  <div v-if="canManage" class="bg-[#37343d] p-5 rounded-xl">
    <div class="flex justify-between items-center pb-2">
      <div class="switch">
        <input
          type="checkbox"
          :checked="isEnabled"
          @change.prevent="handleToggle"
          :disabled="isPending"
        />
        <span class="slider"></span>
      </div>
      <span class="text-[#e0e0e0]">
        <span v-if="isEnabled">Включён</span>
        <span v-else class="text-[#B99209]">Выключен</span>
      </span>
    </div>
    <div v-if="lastUpdate" class="text-[#777] text-sm">
      Последнее обновление: {{ lastUpdate }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isEnabled = ref(false);
const isPending = ref(false);
const lastUpdate = ref("");
const canManage = ref(false);

onMounted(async () => {
  await checkPermission();
  if (canManage.value) {
    await refreshStatus();
  }
});

const updateDate = () => {
  lastUpdate.value = new Date().toLocaleTimeString();
};

const checkPermission = async () => {
  try {
    const response = await fetch("/api/firewall/can-manage");
    if (!response.ok) throw new Error(`Ошибка HTTP ${response.status}`);
    const data = await response.json();
    canManage.value = data.canManage;
  } catch (error) {
    console.error("Ошибка проверки прав управления файрволом:", error);
  }
};

const refreshStatus = async () => {
  try {
    const response = await fetch("/api/firewall/status");
    if (!response.ok) throw new Error(`Ошибка HTTP ${response.status}`);
    const data = await response.json();
    isEnabled.value = data.active;
    updateDate();
  } catch (error) {
    console.error("Ошибка получения статуса файрвола:", error);
    lastUpdate.value = "Ошибка обновления";
  }
};

const handleToggle = async () => {
  isPending.value = true;
  const action = isEnabled.value ? "disable" : "enable";

  try {
    const response = await fetch(`/api/firewall/${action}`, {
      method: "POST",
    });

    if (!response.ok) throw new Error(`Ошибка HTTP ${response.status}`);

    const data = await response.json();
    isEnabled.value = data.active;
    updateDate();
  } catch (error) {
    console.error(`Ошибка ${action} файрвола:`, error);
    await refreshStatus();
    alert(
      `Ошибка ${action} файрвола. Текущий статус: ${
        isEnabled.value ? "Включён" : "Выключен"
      }`
    );
  } finally {
    isPending.value = false;
  }
};
</script>
