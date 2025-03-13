<template>
    <div>
      <h2>Список NTP серверов</h2>
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <ul>
          <li v-for="(server, index) in ntpServers" :key="index">
            <strong>Сервер:</strong> {{ server.address }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import serverUrl from '../../config/serverUrl';
  
  const ntpServers = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  // Функция для загрузки NTP серверов
  const fetchNtpServers = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/ntp`);
      if (!response.ok) throw new Error('Ошибка загрузки NTP серверов');
      ntpServers.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchNtpServers);
  </script>
  