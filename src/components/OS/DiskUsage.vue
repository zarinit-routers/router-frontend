<template>
    <div class="p-5 bg-[#222228] mx-1">
      <h2>Загрузка дисков</h2>
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="(disk, index) in filteredDisks" :key="index" class="my-4">
          <p v-if="disk.ReadsCompleted && disk.WritesCompleted">
            <strong>{{ disk.Name }}:</strong> 
            {{ (calculateDiskLoad(disk.ReadsCompleted, disk.WritesCompleted)).toFixed(2) }}%
          </p>
          <div v-if="disk.ReadsCompleted && disk.WritesCompleted" class="w-full bg-gray-700 rounded-full h-2">
            <div
              :style="{ width: calculateDiskLoad(disk.ReadsCompleted, disk.WritesCompleted) + '%'}"
              class="bg-blue-500 h-2 rounded-full"
            ></div>
          </div>
          <p v-if="disk.ReadsCompleted && disk.WritesCompleted" class="text-sm text-white mt-2">
            {{ disk.ReadsCompleted }} чтений / {{ disk.WritesCompleted }} записей
          </p>
          <p v-else class="text-red-500">Ошибка в данных о диске</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { computed } from 'vue';

  
  const osInfo = ref({});
  const loading = ref(true);
  const error = ref(null);
  const filteredDisks = computed(() =>
  osInfo.value.DiskStats?.filter(disk => !disk.Name.startsWith("loop")) || []
);

  const calculateDiskLoad = (reads, writes) => {
    // Простой расчет, основанный на количестве операций чтения и записи
    return ((reads + writes) % 100); // Просто для демонстрации
  };
  
  const fetchOsInfo = async () => {
    try {
      const response = await fetch(`/api/os-info`);
      if (!response.ok) throw new Error("Ошибка загрузки данных");
      osInfo.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  
  onMounted(fetchOsInfo);
  </script>
  