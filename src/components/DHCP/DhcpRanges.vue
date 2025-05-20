<template>
  <div class="p-4 rounded-xl shadow bg-gray-800 space-y-4">
    <h2 class="text-lg text-white">Диапазоны IP-адресов</h2>

    <div v-if="range.start_ip && range.end_ip" class="text-gray-300">
      <p>Текущий диапазон: <span class="font-mono">{{ range.start_ip }} - {{ range.end_ip }}</span></p>
    </div>
    <div v-else class="text-gray-400">Диапазон не установлен</div>

    <div class="flex flex-col md:flex-row items-start md:items-center gap-2">
      <input
        v-model="newRangeStart"
        type="text"
        placeholder="Начальный IP"
        class="input"
      />
      <input
        v-model="newRangeEnd"
        type="text"
        placeholder="Конечный IP"
        class="input"
      />
      <button
        @click="updateRange"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Обновить диапазон
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

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

const ipPattern =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

const fetchRange = async () => {
  try {
    const { data } = await axios.get('/api/dhcp/ranges')
    range.value = data.current_range || {
      subnet: '',
      netmask: '',
      start_ip: '',
      end_ip: '',
      options_routers: '',
      options_broadcasts: ''
    }
    // Заполняем поля ввода текущими значениями
    newRangeStart.value = range.value.start_ip || ''
    newRangeEnd.value = range.value.end_ip || ''
  } catch (e) {
    console.error('Ошибка при загрузке диапазона:', e)
  }
}

const updateRange = async () => {
  if (!ipPattern.test(newRangeStart.value) || !ipPattern.test(newRangeEnd.value)) {
    alert('Некорректный формат IP-адреса')
    return
  }

  try {
    await axios.post('/api/dhcp/ranges', {
      subnet: range.value.subnet,
      netmask: range.value.netmask,
      start_ip: newRangeStart.value,
      end_ip: newRangeEnd.value,
      options_routers: range.value.options_routers,
      options_broadcasts: range.value.options_broadcasts
    })
    alert('Диапазон обновлён')
    await fetchRange()
  } catch (e) {
    console.error('Ошибка при обновлении диапазона:', e)
    alert('Ошибка при обновлении диапазона. Проверьте консоль.')
  }
}

onMounted(fetchRange)
</script>

<style scoped>
.input {
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #4b5563; /* Tailwind slate-600 */
  background-color: #1f2937; /* Tailwind gray-800 */
  color: white;
  outline: none;
  transition: border-color 0.2s;
}
.input:focus {
  border-color: #3b82f6; /* Tailwind blue-500 */
}
</style>
