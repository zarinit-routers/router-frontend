<script setup>
import { ref, reactive } from "vue";
import SideBar from "../components/SideBar.vue";
import Header from "../components/Header.vue";
import OsInfo from "../components/OsInfo.vue";
import Timezone from "../components/Timezone.vue";
import NtpServers from "../components/NtpServers.vue";
import Select from "../components/Select.vue";
import ModemList from "../components/ModemList.vue";

const modem = reactive({
  operator: null,
  signal: 0,
  mode: "online",
  rxSpeed: 0,
  txSpeed: 0,
});

const selectedRange = ref("5m");

const ranges = [
  { value: "5m", label: "Последние 5 минут" },
  { value: "15m", label: "Последние 15 минут" },
  { value: "30m", label: "Последние 30 минут" },
  { value: "1h", label: "Последний час" },
  { value: "3h", label: "Последние 3 часа" },
  { value: "6h", label: "Последние 6 часов" },
  { value: "12h", label: "Последние 12 часов" },
  { value: "24h", label: "Последние 24 часа" },
  { value: "2d", label: "Последние 2 дня" },
  { value: "7d", label: "Последние 7 дней" },
  { value: "30d", label: "Последние 30 дней" },
  { value: "90d", label: "Последние 90 дней" },
  { value: "6M", label: "Последние 6 месяцев" },
  { value: "1y", label: "Последний год" },
  { value: "2y", label: "Последний 2 года" },
  { value: "5y", label: "Последние 5 лет" },
];

// Функция для получения логотипа оператора
const getOperatorLogo = (operator) => {
  const logos = {
    MTS: "../assets/oper/mts.svg",
    MegaFon: "../assets/oper/megafon.svg",
    Beeline: "../assets/oper/beeline.svg",
    Tele2: "../assets/oper/tele2.svg",
  };
  return logos[operator] || "";
};

// Функция для получения картинки сигнала
const getSignalImage = (signal) => {
  if (signal <= 20) return "../assets/signal/signal_1.svg";
  if (signal <= 40) return "../assets/signal/signal_2.svg";
  if (signal <= 60) return "../assets/signal/signal_3.svg";
  if (signal <= 80) return "../assets/signal/signal_4.svg";
  return "../assets/signal/signal_5.svg";
};

import { onMounted } from "vue";

const modems = ref([]);
const loading = ref(true);
const error = ref(null);

// Функция для загрузки списка модемов
const fetchModems = async () => {
  try {
    const response = await fetch(`/api/modems`);
    if (!response.ok) throw new Error("Ошибка загрузки модемов");
    const data = await response.json();
    modems.value = data.modems;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchModems);
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 xl:grid-cols-4">
      <OsInfo class="row-span-2" />
      <Timezone />
      <NtpServers />
      <ModemList />
    </div>
  </div>
</template>
