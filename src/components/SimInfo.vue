<template>
  <div class="text-sm text-gray-300">
    <div v-if="loading">Загрузка SIM...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="info">
      <p><strong>ICCID:</strong> {{ info.iccid }}</p>
      <p><strong>IMSI:</strong> {{ info.imsi }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  simName: String
});

const info = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchSimInfo = async () => {
  loading.value = true;
  try {
    const res = await fetch(`/api/sim-info/${props.simName}`);
    if (!res.ok) throw new Error("Ошибка загрузки SIM");
    info.value = await res.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

watch(() => props.simName, fetchSimInfo, { immediate: true });
</script>
