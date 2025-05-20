<template>
    <div class="bg-[#222228] p-5">
      <h2 class="text-xl font-bold ">Traceroute</h2>
      <form @submit.prevent="runTraceroute">
        <Input v-model="target" placeholder="Введите адрес" class=" p-2 rounded mr-2" />
        <Button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Пуск</Button>
      </form>
      <pre class="bg-black-100 p-2 mt-2 whitespace-pre-wrap">{{ output }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import Button from '../baseComponents/Button.vue'
  import Input from '../baseComponents/Input.vue'

  
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