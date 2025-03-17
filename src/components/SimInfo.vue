<template>
  {{ name }}
  <div v-if="sim">{{ sim }}</div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
defineProps({
  name: {
    type: String,
    required: true,
  },
});

const sim = ref({});

onMounted(() => {
  axios
    .post(`/api/sim`, { data: { sim: name } })
    .then((data) => {
      sim.value = data;
    })
    .catch((error) => console.log(error.message));
});
</script>
