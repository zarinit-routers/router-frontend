<template>
    <div class="p-5 bg-[#222228] mx-1">
      <h2>Управление Wi-Fi</h2>
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <p><strong>SSID:</strong> {{ wifiStatus.SSID }}</p>
        <p><strong>Статус:</strong> {{ wifiStatus.Active ? 'Включен' : 'Выключен' }}</p>
        <button @click="toggleWiFi">{{ wifiStatus.Active ? 'Выключить' : 'Включить' }} Wi-Fi</button>
  
        <div>
          <h3>Изменение параметров Wi-Fi</h3>
          <div>
            <label>SSID:</label>
            <input v-model="newSSID" type="text" placeholder="Введите новый SSID" />
            <button @click="setSSID">Установить SSID</button>
          </div>
          <div>
            <label>Пароль:</label>
            <input v-model="newPassword" type="password" placeholder="Введите новый пароль" />
            <button @click="setPassword">Установить пароль</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const wifiStatus = ref({});
  const newSSID = ref('');
  const newPassword = ref('');
  const loading = ref(true);
  const error = ref(null);
  
  const fetchWiFiStatus = async () => {
    try {
      const response = await axios.get('/api/wifi/status');
      wifiStatus.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  const toggleWiFi = async () => {
    try {
      if (wifiStatus.value.Active) {
        await axios.post('/api/wifi/disable');
      } else {
        await axios.post('/api/wifi/enable');
      }
      await fetchWiFiStatus();  // Обновляем статус Wi-Fi
    } catch (err) {
      error.value = err.message;
    }
  };
  
  const setSSID = async () => {
    try {
      await axios.post('/api/wifi/set-ssid', { ssid: newSSID.value });
      await fetchWiFiStatus();  // Обновляем статус Wi-Fi
    } catch (err) {
      error.value = err.message;
    }
  };
  
  const setPassword = async () => {
    try {
      await axios.post('/api/wifi/set-password', { password: newPassword.value });
      await fetchWiFiStatus();  // Обновляем статус Wi-Fi
    } catch (err) {
      error.value = err.message;
    }
  };
  
  onMounted(fetchWiFiStatus);
  </script>
  