<script setup>
import { ref, onMounted } from "vue";
import moment from "moment-timezone";
import Select from "./baseComponents/Select.vue";
import axios from "axios";
import { getToken } from "@/auth";

const currentTimezone = ref("");
const selectedTimezone = ref("");
const loading = ref(true);
const error = ref(null);

const timezones = moment.tz.names();

const fetchTimezone = async () => {
  try {
    const response = await axios.post(
      "/api/cmd",
      { command: "v1/timezone/get" },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    currentTimezone.value = response.data.data.timezone;
    selectedTimezone.value = response.data.data.timezone;
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
    const response = await axios.post(
      "/api/cmd",
      { 
        command: "v1/timezone/set",
        args:{ timezone: selectedTimezone.value }

      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    currentTimezone.value = response.data.data.timezone;
    selectedTimezone.value = response.data.data.timezone;
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(fetchTimezone);
</script>

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