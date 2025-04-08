<template>
  <div class="p-5 bg-[#222228] mx-1">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="text-red-400 mb-3">{{ error }}</div>
    <div v-else>
      <div v-if="ntpData.active">
        <p class="text-green-500 text-lg pb-2">Синхронизация времени активна</p>

        <ul v-if="ntpData.servers" class="flex flex-col gap-2 mb-4">
          <li
            v-for="(server, index) in ntpData.servers"
            :key="index"
            class="flex justify-between items-center p-2 rounded-lg bg-[#37343D]"
          >
            <div>
              <div>{{ server.address }}</div>
              <div class="font-mono text-[#7b7b7b] text-sm">
                {{ server.options.join(", ") }}
              </div>
            </div>
            <button @click="removeServer(server)" class="text-red-400 hover:text-red-600">
              Удалить
            </button>
          </li>
        </ul>

        <form @submit.prevent="addServer" class="flex flex-col gap-2">
          <input
            v-model="newServer"
            type="text"
            placeholder="Новый NTP сервер (например, time.google.com)"
            class="p-2 rounded bg-[#2c2c34] text-white border"
            :class="{ 'border-red-500': validationError }"
          />
          <p v-if="validationError" class="text-red-400 text-sm">
            Введите корректный домен или IP-адрес
          </p>
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded self-start"
          >
            Добавить сервер
          </button>
        </form>
      </div>
      <div v-else>
        <p class="text-red-500">NTP не активно</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const ntpData = ref({ active: false, servers: null });
const loading = ref(true);
const error = ref(null);
const newServer = ref("");
const validationError = ref(false);

const fetchNtpServers = async () => {
  try {
    const response = await fetch("/api/ntp");
    if (!response.ok) throw new Error("Ошибка загрузки NTP серверов");
    ntpData.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const isValidHost = (host) => {
  // Простая валидация IP-адреса или домена
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)(\.(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)){3}$/;
  const domainRegex =
    /^(?=.{1,253}$)(([a-zA-Z0-9_]{1,63}\.)+[a-zA-Z]{2,63}|localhost)$/;
  return ipRegex.test(host) || domainRegex.test(host);
};

const addServer = async () => {
  validationError.value = false;

  if (!isValidHost(newServer.value)) {
    validationError.value = true;
    return;
  }

  try {
    const response = await fetch("/api/ntp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: newServer.value,
        options: [],
      }),
    });

    if (!response.ok) throw new Error("Ошибка при добавлении сервера");

    newServer.value = "";
    await fetchNtpServers();
  } catch (err) {
    error.value = err.message;
  }
};

const removeServer = async (server) => {
  try {
    const response = await fetch("/api/ntp", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(server),
    });

    if (!response.ok) throw new Error("Ошибка при удалении сервера");

    await fetchNtpServers();
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(fetchNtpServers);
</script>
