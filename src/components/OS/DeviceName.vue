<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Информация об устройстве</h2>
    <p><strong>Производитель:</strong> {{ info.manufacturer }}</p>
    <p><strong>Модель:</strong> {{ info.model }}</p>
    <p><strong>Версия модели:</strong> {{ info.modelVersion }}</p>
    <p><strong>Прошивка:</strong> {{ info.firmwareVersion }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const info = ref({})

onMounted(() => {
  axios.get('/api/device-info').then(res => {
    info.value = res.data
  })
})
</script>
