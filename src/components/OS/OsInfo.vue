<template>
  <div class="p-5 bg-[#222228] mx-1">
    <h2>Информация о системе</h2>

    <!-- Загрузка данных -->
    <div v-if="loading">Загрузка...</div>

    <!-- Ошибка загрузки данных -->
    <div v-else-if="error">{{ error }}</div>

    <!-- Данные системы -->
    <div v-else>
      <!-- Память -->
      <p>
        <strong>Память:</strong>
        {{ (osInfo.Memory?.Used / 1024 / 1024).toFixed(2) }}<strong>/</strong>
        {{ (osInfo.Memory?.Total / 1024 / 1024).toFixed(2) }} МБайт использовано
      </p>
      <RamUsage />

      <CPUsage />

      <!-- Сетевые интерфейсы -->
      <p class="font-bold">Сетевые интерфейсы</p>

      <div class="grid grid-cols-1 gap-1">
        <div
          v-for="net in osInfo.NetworkStats || []"
          :key="net.Name"
          class="bg-[#37343D] rounded-lg p-1 px-4 flex flex-col gap-1"
        >
          <div>{{ net.Name }}</div>
          <div>
            <i class="fas fa-upload"></i>
            {{ (net.TxBytes / 1024 / 1024).toFixed(0) }} kb
          </div>
          <div>
            <i class="fas fa-download"></i>
            {{ (net.RxBytes / 1024 / 1024).toFixed(0) }} kb
          </div>
          <div><strong>MAC-адрес:</strong> {{ net.MAC }}</div>
        </div>
      </div>

      <!-- Диски -->
      <div>
        <p class="font-bold">Диски</p>
        <div class="grid grid-cols-2 gap-1">
          <div
            class="bg-[#37343D] rounded-lg p-1 px-4 text-sm"
            v-for="disk in osInfo.DiskStats || []"
            :key="disk.Name"
          >
            <i class="fas fa-hard-drive pe-2"></i>
            {{ disk.Name }}
          </div>
        </div>
        <DiskUsage :disks="osInfo.DiskStats" />
      </div>

      <!-- Нагрузка -->
      <p>
        <strong>Нагрузка:</strong> {{ osInfo.LoadAverage?.Loadavg1 }} (1 минута)
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RamUsage from "./RamUsage.vue";
import CPUsage from "./CPUsage.vue";
import DiskUsage from "./DiskUsage.vue";

const osInfo = ref({});
const loading = ref(true);
const error = ref(null);

// Функция для получения данных о системе
const fetchOsInfo = async () => {
  try {
    const response = await fetch(`/api/os-info`);
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    osInfo.value = await response.json();
    console.log(osInfo.value.NetworkStats); // Логируем данные, полученные с сервера
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Загружаем данные при монтировании компонента
onMounted(fetchOsInfo);
</script>
