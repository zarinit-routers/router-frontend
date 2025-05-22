<template>
  <div class="bg-[#222228] p-6 max-w-xl mx-auto border-1 border-solid border-[#363E4B] space-y-4">
    <h2 class="text-xl font-semibold">Traceroute</h2>
    <div>
      <label class="block font-medium mb-1">Адрес</label>
      <Input
        v-model="target"
        placeholder="Введите адрес (например, 8.8.8.8)"
        class="w-full p-2 rounded"
        @input="validateAddress"
      />
    </div>

    <div v-if="warning" class="text-yellow-600 text-sm font-medium">
      ⚠ {{ warning }}
    </div>

    <div class="flex justify-center">
      <Button
        @click="runTraceroute"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        :disabled="loading || !isValid"
      >
        {{ loading ? 'Выполняется...' : 'Пуск' }}
      </Button>
    </div>

    <div v-if="output" class="mt-2">
      <label class="block font-medium mb-1">Результат Traceroute</label>
      <pre class="p-3 bg-black text-white rounded text-sm whitespace-pre-wrap">
{{ output }}
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Button from '../baseComponents/Button.vue'
import Input from '../baseComponents/Input.vue'

const target = ref('')
const output = ref('')
const loading = ref(false)
const warning = ref('')
const isValid = ref(false)

const removePort = (input) => input.split(':')[0]

const validateAddress = () => {
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  const domainRegex = /^(?!:\/\/)([A-Za-z0-9]{1,256}\.)+[A-Za-z]{2,6}$/i

  const cleaned = removePort(target.value.trim())

  if (!cleaned) {
    warning.value = 'Пожалуйста, введите адрес.'
    isValid.value = false
  } else if (!ipRegex.test(cleaned) && !domainRegex.test(cleaned)) {
    warning.value = 'Неверный формат адреса. Используйте IP или домен.'
    isValid.value = false
  } else {
    warning.value = ''
    isValid.value = true
  }
}

const runTraceroute = async () => {
  validateAddress()
  const address = removePort(target.value.trim())

  if (!isValid.value) {
    warning.value = 'Пожалуйста, введите корректный адрес.'
    return
  }

  if (address === 'localhost') {
    target.value = '127.0.0.1'
  }

  loading.value = true
  output.value = ''
  warning.value = ''

  try {
    const res = await axios.post(`/api/diagnostics/traceroute/${encodeURIComponent(address)}`)
    output.value = res.data.output || 'Нет данных.'
  } catch (err) {
    output.value = err.response?.status === 400
      ? 'Неверный адрес.'
      : `Ошибка: ${err.response?.data?.error || err.message}`
  } finally {
    loading.value = false
  }
}
</script>
