<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Button from '../baseComponents/Button.vue'
import Input from '../baseComponents/Input.vue'


const range = ref({
  subnet: '',
  netmask: '',
  start_ip: '',
  end_ip: '',
  options_routers: '',
  options_broadcasts: ''
})
const newRangeStart = ref('')
const newRangeEnd = ref('')
const optionsRouters = ref('')
const optionsBroadcasts = ref('')

const ipPattern =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const fetchRange = async () => {
  try {
    const { data } = await axios.get('/api/dhcp/ranges')
    range.value = data.current_range || {}
    newRangeStart.value = range.value.start_ip || ''
    newRangeEnd.value = range.value.end_ip || ''
    optionsRouters.value = range.value.options_routers || ''
    optionsBroadcasts.value = range.value.options_broadcasts || ''
  } catch (e) {
    console.error('Ошибка при загрузке диапазона:', e)
  }
}

const updateRange = async () => {
  if (
    !ipPattern.test(newRangeStart.value) ||
    !ipPattern.test(newRangeEnd.value) ||
    !ipPattern.test(optionsRouters.value) ||
    !ipPattern.test(optionsBroadcasts.value)
  ) {
    alert('Некорректный формат одного из IP-адресов')
    return
  }

  if (!range.value.subnet || !range.value.netmask) {
    alert('Отсутствуют subnet или netmask')
    return
  }

  try {
    await axios.post('/api/dhcp/ranges', {
      subnet: range.value.subnet,
      netmask: range.value.netmask,
      start_ip: newRangeStart.value,
      end_ip: newRangeEnd.value,
      options_routers: optionsRouters.value,
      options_broadcasts: optionsBroadcasts.value
    })
    alert('Диапазон обновлён')
    await fetchRange()
  } catch (e) {
    console.error('Ошибка при обновлении диапазона:', e)
  }
}

onMounted(fetchRange)
</script>

<template>
  <div class="p-4 rounded-xl shadow  space-y-4">
    <div class=" md:flex-row items-start md:items-center gap-2">
      <div class="flex items-center mb-5">
        <p class="w-[170px] mr-2">Начальный IP-адрес:</p>
        <Input v-model="newRangeStart" type="text" placeholder="Начальный IP"
         />
      </div>

      <div class="flex items-center ">
        <p class="w-[170px] mr-2">
          Конечный IP-адрес:
        </p>
        <Input v-model="newRangeEnd" type="text" placeholder="Конечный IP"/>
      </div>

    </div>
<!-- 
    <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
      <input v-model="optionsRouters" type="text" placeholder="IP шлюза (router)"
        class="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input v-model="optionsBroadcasts" type="text" placeholder="Broadcast-адрес"
        class="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
 -->
    <Button @click="updateRange" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
      Обновить диапазон
    </Button>
  </div>
</template>
