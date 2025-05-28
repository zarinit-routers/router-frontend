  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";

  const isEnabled = ref(false);
  const isPending = ref(false);
  const lastUpdate = ref("");

  const updateTime = () => {
    lastUpdate.value = new Date().toLocaleTimeString();
  };

  const fetchStatus = () =>
    axios
      .get("/api/dhcp/status")
      .then((res) => {
        isEnabled.value = res.data.active;
        updateTime();
      })
      .catch((err) => {
        console.error("DHCP status error:", err);
        lastUpdate.value = "Ошибка обновления";
      });

  const toggleDhcp = () => {
    isPending.value = true;
    const action = isEnabled.value ? "disable" : "enable";

    axios
      .post(`/api/dhcp/${action}`)
      .then(() => fetchStatus())
      .finally(() => {
        isPending.value = false;
      });
  };

  onMounted(() => {
    fetchStatus();
  });
</script>

<template>
  <div class="bg-[#37343d] p-5 rounded-xl">
    <div class="flex justify-between items-center pb-2">
      <div class="switch">
        <input type="checkbox" :checked="isEnabled" @change.prevent="toggleDhcp" :disabled="isPending" />
        <span class="slider"></span>
      </div>
      <span class="text-[#e0e0e0]">
        <span v-if="isEnabled">DHCP включен</span>
        <span v-else class="text-[#B99209]">DHCP выключен</span>
      </span>
    </div>
    <div v-if="lastUpdate" class="text-[#777] text-sm">
      Обновлено: {{ lastUpdate }}
    </div>
  </div>
</template>

<style scoped>
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

input:checked+.slider {
  background-color: #4caf50;
}

input:checked+.slider:before {
  transform: translateX(26px);
}
</style>