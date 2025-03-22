<template>
  <div class="bg-[#37343d] p-5 rounded-xl">
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
      Last updated: {{ lastUpdate }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isEnabled = ref(false);
const isPending = ref(false);
const lastUpdate = ref("");

onMounted(async () => {
  await refreshStatus();
});
const updateDate = () => {
  lastUpdate.value = new Date().toLocaleTimeString();
};
const refreshStatus = async () => {
  try {
    const response = await fetch("/api/firewall/status");
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const data = await response.json();
    isEnabled.value = data.active;
    console.log(data.active);
    updateDate();
  } catch (error) {
    console.error("Status check failed:", error);
    lastUpdate.value = "Update failed";
  }
};
const handleToggle = async () => {
  isPending.value = true;
  const action = isEnabled.value ? "disable" : "enable";

  try {
    const response = await fetch(`/api/firewall/${action}`, {
      method: "POST",
    });

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json();
    isEnabled.value = data.active;
    updateDate();
  } catch (error) {
    isEnabled.value = false;
    isPending.value = true;
    console.error(`Failed to ${action} firewall:`, error);
    await refreshStatus();
    alert(
      `Failed to ${action} firewall. Current status: ${isEnabled.value ? "Enabled" : "Disabled"}`,
    );
  } finally {
    isPending.value = false;
  }
};
</script>

<style>
.switch {
  position: relative;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
</style>
