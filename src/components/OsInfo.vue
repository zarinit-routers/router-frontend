<template>
  <div>
    <h2>Информация о системе</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h3>ОС</h3>
      <p><strong>Память:</strong> {{ osInfo.Memory.Available }} байт доступно</p>
      <p><strong>Процессор:</strong> {{ osInfo.CpuStats.CPUCount }} ядер</p>
      <p><strong>Сетевой интерфейс:</strong> {{ osInfo.NetworkStats[0].Name }}</p>
      <p><strong>Диск:</strong> {{ osInfo.DiskStats[0].Name }}</p>
      <p><strong>Нагрузка:</strong> {{ osInfo.LoadAverage.Loadavg1 }} (1 минута)</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import serverUrl from '../../config/serverUrl';

const osInfo = ref({});
const loading = ref(true);
const error = ref(null);

const fetchOsInfo = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/os-info`);
    if (!response.ok) throw new Error('Ошибка загрузки данных');
    osInfo.value = await response.json();
    console.log("OS Info from server:", osInfo.value);  // Логируем данные, полученные с сервера
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOsInfo);
</script>
