<template>
    <div>
      <h2>Список NTP серверов</h2>
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <p v-if="ntpData.active" class="text-green-500">NTP активно</p>
        <p v-else class="text-red-500">NTP не активно</p>
  
        <div v-if="ntpData.servers">
          <ul v-if="ntpData.servers.length">
            <li v-for="(server, index) in ntpData.servers" :key="index">
              <strong>Сервер:</strong> {{ server.address }}
              <p><strong>Опции:</strong> {{ server.options.join(', ') }}</p>
            </li>
          </ul>
          <p v-else>Нет серверов NTP.</p>
        </div>
        <div v-else>
          <p>Ошибка при получении списка серверов.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import serverUrl from '../../config/serverUrl';
  
  const ntpData = ref({ active: false, servers: null });
  const loading = ref(true);
  const error = ref(null);
  
  // Функция для загрузки NTP серверов
  const fetchNtpServers = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/ntp`);
      if (!response.ok) throw new Error('Ошибка загрузки NTP серверов');
      ntpData.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchNtpServers);
  </script>
  
  <style scoped>
  /* Добавьте стили по мере необходимости */
  </style>
  