<template>
  <div class="p-5 max-w-xl mx-auto bg-[#222228] mx-1 rounded-xl">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="flex flex-col gap-2">
      <Select
        label="Часовой пояс"
        v-model="selectedTimezone"
        :options="timezones"
      />
      <button class="button form-item" @click="changeTimezone">
        Сменить часовой пояс
      </button>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import moment from "moment-timezone";
import Select from "./baseComponents/Select.vue";

const currentTimezone = ref("");
const selectedTimezone = ref("");
const loading = ref(true);
const error = ref(null);

// Получаем все доступные часовые пояса
const timezones = moment.tz.names();

const fetchTimezone = async () => {
  try {
    const response = await fetch(`/api/timezone`);
    if (!response.ok) throw new Error("Ошибка загрузки данных");
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
    error.value = "Выберите часовой пояс";
    return;
  }

  try {
    const response = await fetch(`/api/timezone/set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timezone: selectedTimezone.value }),
    });
    if (!response.ok) throw new Error("Ошибка при смене часового пояса");
    currentTimezone.value = selectedTimezone.value;
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(fetchTimezone);
</script>
