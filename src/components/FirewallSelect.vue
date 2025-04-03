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
import axios from "axios";

const isEnabled = ref(false);
const lastUpdate = ref("");

const updateDate = () => {
  lastUpdate.value = new Date().toLocaleTimeString();
};

const refreshStatus = () =>
  axios.get("/api/firewall/status").then((response) => {
    isEnabled.value = response.data.active;
    updateDate();
  });

const handleToggle = () => {
  axios
    .post(`/api/firewall/${isEnabled.value ? "disable" : "enable"}`)
    .then((response) => {
      isEnabled.value = response.data.active;
      updateDate();
    })
    .catch(() => refreshStatus()); // Если ошибка — обновляем статус заново
};

onMounted(refreshStatus);
</script>
