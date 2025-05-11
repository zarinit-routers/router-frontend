<template>
  <div class="p-5 bg-[#222228] mx-1 rounded-sm">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <ul v-if="modems" class="grid gap-4">
      <li v-for="(modem, index) in modems" :key="index">
        <ModemCard :modem="modem" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ModemCard from "./ModemCard.vue";

const modems = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchModems = async () => {
  try {
    const response = await fetch("/api/modems/list");
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
