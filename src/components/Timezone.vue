<template>
  <div>
    <h2>Часовой пояс</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p><strong>Текущий часовой пояс:</strong> {{ currentTimezone }}</p>

      <select class="bg-black" v-model="selectedTimezone">
        <option v-for="timezone in timezones" :key="timezone" :value="timezone">
          {{ timezone }}
        </option>
      </select>
      
      <button @click="changeTimezone">Сменить часовой пояс</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import moment from 'moment-timezone';
import serverUrl from '../../config/serverUrl';

const currentTimezone = ref('');
const selectedTimezone = ref('');
const loading = ref(true);
const error = ref(null);

// Получаем все доступные часовые пояса
const timezones = moment.tz.names();

const fetchTimezone = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/timezone`);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    const data = await response.json();
    currentTimezone.value = data.timezone;
    selectedTimezone.value = data.timezone; // Устанавливаем начальный выбранный часовой пояс
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const changeTimezone = async () => {
  if (!selectedTimezone.value) {
    error.value = 'Выберите часовой пояс';
    return;
  }

  try {
    const response = await fetch(`${serverUrl}/api/timezone/set`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timezone: selectedTimezone.value }),
    });

    if (!response.ok) throw new Error('Ошибка при смене часового пояса');

    currentTimezone.value = selectedTimezone.value; // Обновляем текущий часовой пояс
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(fetchTimezone);
</script>
