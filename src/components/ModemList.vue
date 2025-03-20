<template>
  <div class="p-5 bg-[#222228] mx-1 rounded-sm">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <ul v-if="modems" class="grid gap-4">
      <li v-for="(modem, index) in modems" :key="index">
        <ModemCard :modem="modem" />
        <!-- <div>
          <div v-if="modemOperator(modem).name">
            <strong>Оператор:</strong>
            {{ modemOperator(modem).name }}
            <span class="font-mono">
              {{ modemOperator(modem).code }}
            </span>
          </div>
          <div>
            <span v-if="modemEnabled(modem)">Включён</span>
            <span v-else class="text-[#B99209]">Выключен</span>
          </div>
          <SimInfo :name="modem.generic.sim" />
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SimInfo from "./SimInfo.vue";
import ModemCard from "./ModemCard.vue";
const modems = ref([]);
const loading = ref(true);
const error = ref(null);
const modemEnabled = (modem) => {
  return modem.generic.state !== "disabled";
};
const modemOperator = (modem) => {
  if (
    !modem["3gpp"]["operator-name"] ||
    modem["3gpp"]["operator-name"] === "--"
  ) {
    return false;
  }
  return {
    name: modem["3gpp"]["operator-name"],
    code: modem["3gpp"]["operator-code"],
  };
};

// Функция для загрузки списка модемов
const fetchModems = async () => {
  try {
    const response = await fetch(`/api/modems/list`);
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
