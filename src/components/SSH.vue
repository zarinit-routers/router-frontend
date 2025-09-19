<script setup>
import { ref, onMounted } from "vue";
import { Switch } from "@headlessui/vue";
import axios from "axios";
import { getToken } from "@/auth";

const enabled = ref(false);
const loading = ref(true);

const fetchStatus = () => {
  axios
    .post(
      "/api/cmd",
      { command: "v1/ssh/get-status" },
      {
        headers: {
          Authorization: getToken(),
        },
      },
    )
    .then((res) => {
      enabled.value = res.data.data.enabled;
    })
    .catch((err) => {
      console.error("Ошибка получения статуса SSH:", err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const toggleSSH = () => {
  loading.value = true;

  const command = enabled.value ? "v1/ssh/disable" : "v1/ssh/enable";

  axios
    .post(
      "/api/cmd",
      { command: command },
      {
        headers: {
          Authorization: getToken(),
        },
      },
    )
    .then(() => {
      enabled.value = !enabled.value;
    })
    .catch((err) => {
      console.error("Ошибка переключения SSH:", err);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(fetchStatus);
</script>

<template>
  <div class="flex items-center space-x-4">
    <Switch
      :checked="enabled"
      @click="toggleSSH"
      :disabled="loading"
      class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      :class="enabled ? 'bg-green-600' : 'bg-gray-300'"
    >
      <span
        class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        :class="enabled ? 'translate-x-6' : 'translate-x-1'"
      />
    </Switch>
    <span class="text-sm"> SSH {{ enabled ? "включен" : "выключен" }} </span>
  </div>
</template>

<style scoped>
/* Небольшая анимация при переключении */
</style>
