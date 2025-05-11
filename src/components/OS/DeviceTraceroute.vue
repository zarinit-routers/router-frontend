<template>
    <div>
      <h2 class="text-xl font-bold mt-6">Traceroute</h2>
      <form @submit.prevent="runTraceroute">
        <input v-model="target" placeholder="Введите адрес" class="border p-2 rounded mr-2" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Пуск</button>
      </form>
      <pre class="bg-black-100 p-2 mt-2 whitespace-pre-wrap">{{ output }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  const target = ref('')
  const output = ref('')
  
  const runTraceroute = async () => {
    const address = target.value.trim()
    if (!address) {
      output.value = 'Введите адрес.'
      return
    }
  
    try {
      const res = await axios.post(`/api/diagnostics/traceroute/${encodeURIComponent(address)}`)
      output.value = res.data.output || 'Нет данных.'
    } catch (err) {
      output.value = err.response?.status === 400 ? 'Неверный адрес.' : 'Ошибка при выполнении traceroute.'
    }
  }
  </script>
  
  <style>
</style>