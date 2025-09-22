<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { getToken } from "@/auth";

const props = defineProps({
  simName: {
    type: String,
    required: false, // Изменено на false, так как simName может быть undefined
    default: null, // Добавлено значение по умолчанию
  },
});

const simData = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Проверяем, что simName существует и является строкой
    if (!props.simName || typeof props.simName !== 'string') {
      console.warn("simName не определен или не является строкой:", props.simName);
      simData.value = null;
      return;
    }
    
    const simParam = props.simName.split("/").pop(); // Получаем имя SIM (sim1, sim2 и т.д.)
    
    const response = await axios.post(
      "/api/cmd",
      { 
        command: "v1/sim/get",
        args: { sim: simParam }
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    console.log(response.data);
    simData.value = response.data.sim;
  } catch (err) {
    console.error("Ошибка при загрузке данных SIM:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading && props.simName" class="mt-4 p-4 bg-gray-800 rounded-lg text-white">
    <p>Загрузка данных SIM...</p>
  </div>
  
  <div v-else-if="error" class="mt-4 p-4 bg-red-900 rounded-lg text-white">
    <p>Ошибка: {{ error }}</p>
  </div>
  
  <div v-else-if="simData" class="mt-4 p-4 bg-gray-800 rounded-lg text-white">
    <h4 class="text-lg font-semibold mb-2">Информация о SIM</h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div>
        <p class="text-sm text-gray-400">ICCID</p>
        <p class="font-mono">{{ simData.iccid || "Нет данных" }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">IMSI</p>
        <p class="font-mono">{{ simData.imsi || "Нет данных" }}</p>
      </div>
      <!-- Добавьте другие поля по необходимости -->
    </div>
  </div>
  
  <div v-else-if="!props.simName" class="mt-4 p-4 bg-gray-800 rounded-lg text-white">
    <p>SIM-карта не найдена</p>
  </div>
  
  <div v-else class="mt-4 p-4 bg-gray-800 rounded-lg text-white">
    <p>Данные SIM не найдены</p>
  </div>
</template>