<template>
  <div class="p-2">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="ntpData.active">
        <p class="text-green-500 text-lg pb-2">Синхронизация времени активна</p>
        <ul v-if="ntpData.servers" class="flex flex-col gap-1">
          <li
            v-for="(server, index) in ntpData.servers"
            :key="index"
            class="p-1 px-3 rounded-lg bg-[#37343D]"
          >
            {{ server.address }}
            <div class="font-mono text-[#54505B]">
              {{ server.options.join(", ") }}
            </div>
          </li>
        </ul>
        <p v-else>Нет серверов NTP.</p>
        <div v-else>
          <p>Ошибка при получении списка серверов.</p>
        </div>
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

// Функция для загрузки NTP серверов
const fetchNtpServers = async () => {
  try {
    const response = await fetch(`/api/ntp`);
    if (!response.ok) throw new Error("Ошибка загрузки NTP серверов");
    ntpData.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchNtpServers);
</script>
