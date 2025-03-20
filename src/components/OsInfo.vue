<template>
  <div class="p-5 bg-[#222228] mx-1">
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
      <p class="font-bold">Сетевые интерфейсы</p>
      <div class="grid grid-cols-1 gap-1">
        <div
          v-for="net in osInfo.NetworkStats"
          class="bg-[#37343D] rounded-lg p-1 px-4 flex flex-col gap-1"
        >
          <div>{{ net.Name }}</div>
          <div>
            <i class="fas fa-upload"></i>
            {{ (net.TxBytes / 1024 / 1024) | 0 }} kb
          </div>
          <div>
            <i class="fas fa-download"></i>
            {{ (net.RxBytes / 1024 / 1024) | 0 }} kb
          </div>
        </div>
      </div>
      <div>
        <p class="font-bold">Диски</p>
        <div class="grid grid-cols-2 gap-1">
          <div
            class="bg-[#37343D] rounded-lg p-1 px-4 text-sm"
            v-for="disk in osInfo.DiskStats"
          >
            <i class="fas fa-hard-drive pe-2"></i>
            {{ disk.Name }}
          </div>
        </div>
      </div>
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
    console.log(osInfo.value.NetworkStats[0]); // Логируем данные, полученные с сервера
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchOsInfo);
</script>
