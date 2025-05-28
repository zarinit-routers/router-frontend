<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Button from '../baseComponents/Button.vue'
import Input from '../baseComponents/Input.vue'

const staticLeases = ref([])
const mac = ref('')
const ip = ref('')
const hostname = ref('')

const fetchStaticLeases = async () => {
  try {
    const { data } = await axios.get('/api/dhcp/static/list')
    staticLeases.value = data || []
  } catch (e) {
    console.error('Ошибка при загрузке статических аренд:', e)
  }
}

const addStaticLease = async () => {
  if (!validateInputs()) return

  try {
    await axios.post('/api/dhcp/static/add', {
      mac: mac.value,
      ip: ip.value,
      hostname: hostname.value || 'unknown',
    })
    alert('Статическая аренда добавлена')
    await fetchStaticLeases()
  } catch (e) {
    console.error('Ошибка при добавлении:', e)
  }
}

const removeStaticLease = async () => {
  if (!validateInputs()) return

  try {
    await axios.post('/api/dhcp/static/remove', { mac: mac.value })
    alert('Статическая аренда удалена')
    await fetchStaticLeases()
  } catch (e) {
    console.error('Ошибка при удалении:', e)
  }
}

const validateInputs = () => {
  const macPattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  const ipPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

  if (!macPattern.test(mac.value)) {
    alert('Некорректный MAC-адрес')
    return false
  }

  if (!ipPattern.test(ip.value)) {
    alert('Некорректный IP-адрес')
    return false
  }

  return true
}

onMounted(fetchStaticLeases)
</script>

<template>
  <div class="p-4 rounded-xl shadow bg-[#222228] space-y-4">
    <h2 class="text-lg text-white">Статические IP-аренды</h2>

    <div v-if="staticLeases.length === 0" class="text-gray-400">
      Нет статических аренд.
    </div>
    <ul v-else class="divide-y divide-gray-700 text-sm text-gray-300">
      <li v-for="lease in staticLeases" :key="lease.mac" class="py-1 flex justify-between items-center">
        <span>{{ lease.hostname }}</span>
        <span>{{ lease.mac }}</span>
        <span>{{ lease.ip }}</span>
        <button class="text-red-500 hover:text-red-700" @click="removeStaticLease"><i class="fa-solid fa-trash"></i>
        </button>
      </li>
    </ul>
    <div class="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between">
      <Input v-model="mac" placeholder="MAC-адрес" class="input grow" />
      <Input v-model="ip" placeholder="IP-адрес" class="input grow" />
      <Input v-model="hostname" placeholder="Имя хоста" class="input grow" />
    </div>
    <div class="flex flex-col md:flex-row items-start md:items-center gap-2 justify-between">
      <Button @click="addStaticLease">Добавить</Button>
      <Button @click="removeStaticLease">Удалить</Button>
    </div>
  </div>
</template>
