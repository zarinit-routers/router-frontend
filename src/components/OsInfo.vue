<template>
  <div>
    <h2>Информация о системе</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p>
        <strong>Память:</strong>
        {{ (osInfo.Memory.Used / 1024 / 1024) | 2 }}<strong>/</strong
        >{{ (osInfo.Memory.Total / 1024 / 1024) | 2 }}
        КБайт использовано
      </p>
      <p><strong>Процессор:</strong> {{ osInfo.CpuStats.CPUCount }} ядер</p>
      <p>
        <strong>Сетевой интерфейс:</strong> {{ osInfo.NetworkStats[0].Name }}
      </p>
      <p><strong>Диск:</strong> {{ osInfo.DiskStats[0].Name }}</p>
      <p>
        <strong>Нагрузка:</strong> {{ osInfo.LoadAverage.Loadavg1 }} (1 минута)
        <!-- <strong>Нагрузка:</strong> {{ osInfo.LoadAverage.Loadavg5 }} (1 минута)
        <strong>Нагрузка:</strong> {{ osInfo.LoadAverage.Loadavg15 }} (1 минута) -->
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const osInfo = ref({});
const loading = ref(true);
const error = ref(null);

const fetchOsInfo = async () => {
  try {
    const response = await fetch(`/api/os-info`);
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    osInfo.value = await response.json();
    console.log(osInfo.value.LoadAverage); // Логируем данные, полученные с сервера
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOsInfo);
</script>
