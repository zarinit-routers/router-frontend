<template>
    <div class="bg-gray-900 p-4 rounded-xl shadow space-y-4">
      <h2 class="text-lg text-white font-semibold">Текущие DHCP аренды</h2>
  
      <div v-if="loading" class="text-gray-400">Загрузка...</div>
      <div v-else-if="leases.length === 0" class="text-gray-400">Нет активных аренд.</div>
  
      <ul v-else class="divide-y divide-gray-700">
        <li v-for="lease in leases" :key="lease.mac" class="py-2 text-sm text-gray-100 flex justify-between">
          <div>
            <div><span class="text-gray-400">IP:</span> {{ lease.ip }}</div>
            <div><span class="text-gray-400">MAC:</span> {{ lease.mac }}</div>
            <div v-if="lease.hostname"><span class="text-gray-400">Host:</span> {{ lease.hostname }}</div>
          </div>
          <div class="text-right text-gray-400">
            <div>До: {{ formatTime(lease.expiry) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const leases = ref([])
  const loading = ref(true)
  
  const fetchLeases = async () => {
    try {
      const { data } = await axios.get('/api/dhcp/leases')
      leases.value = data.leases || []
    } catch (e) {
      console.error('Ошибка при загрузке аренды DHCP:', e)
    } finally {
      loading.value = false
    }
  }
  
  const formatTime = (timestamp) => {
    if (!timestamp) return '—'
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }
  
  onMounted(fetchLeases)
  </script>
  