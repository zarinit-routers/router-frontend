<template>
    <div class="max-w-xl mx-auto p-6 space-y-6 bg-[#222228]">
      <h2 class="text-xl font-semibold">Диагностика сети</h2>
  
      <div>
        <label class="block font-medium mb-1">Адрес</label>
        <Input
          v-model="address"
          type="text"
          class="w-full p-2  rounded"
          placeholder="Введите адрес (например, 8.8.8.8)"
          @input="validateAddress"
        />
      </div>
  
      <!-- Отображение предупреждений -->
      <div v-if="warning" class="text-yellow-600 text-sm font-medium">
        ⚠ {{ warning }}
      </div>
  
      <div class="space-y-6">
        <!-- Ping -->
        <div>
          <Button
            @click="run('ping')"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            :disabled="loadingPing || !isValidAddress"
          >
            {{ loadingPing ? 'Пинг...' : 'Ping' }}
          </Button>
  
          <div v-if="pingResult" class="mt-2">
            <label class="block font-medium mb-1">Результат Ping</label>
            <pre class="p-3 bg-black text-white rounded text-sm whitespace-pre-wrap">
  {{ pingResult }}
            </pre>
          </div>
        </div>
  
        <!-- Nslookup -->
        <div>
          <Button
            @click="run('nslookup')"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            :disabled="loadingNs || !isValidAddress"
          >
            {{ loadingNs ? 'Nslookup...' : 'Nslookup' }}
          </Button>
  
          <div v-if="nslookupResult" class="mt-2">
            <label class="block font-medium mb-1">Результат Nslookup</label>
            <pre class="p-3 bg-black text-white rounded text-sm whitespace-pre-wrap">
  {{ nslookupResult }}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Button from './baseComponents/Button.vue'
  import Input from './baseComponents/Input.vue'

  
  const address = ref('')
  const pingResult = ref('')
  const nslookupResult = ref('')
  const loadingPing = ref(false)
  const loadingNs = ref(false)
  const warning = ref('')
  const isValidAddress = ref(false)
  
  // Удаление порта из адреса
  const removePort = (input) => {
    const addressWithoutPort = input.split(':')[0]
    return addressWithoutPort
  }
  
  // Проверка формата адреса (IP или домен)
  const validateAddress = () => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const domainRegex = /^(?!:\/\/)([A-Za-z0-9]{1,256}\.)+[A-Za-z]{2,6}$/i
  
    const cleanedAddress = removePort(address.value)
  
    if (!cleanedAddress) {
      warning.value = 'Пожалуйста, введите адрес.'
      isValidAddress.value = false
    } else if (!ipRegex.test(cleanedAddress) && !domainRegex.test(cleanedAddress)) {
      warning.value = 'Неверный формат адреса. Используйте IP или домен.'
      isValidAddress.value = false
    } else {
      warning.value = ''
      isValidAddress.value = true
    }
  }
  
  onMounted(async () => {
    try {
      const res = await axios.get('/api/diagnostics/default-ping-address')
      address.value = res.data.address
    } catch (e) {
      warning.value = 'Не удалось получить адрес по умолчанию'
    }
  })
  
  const run = async (type) => {
    warning.value = ''
    let cleanedAddress = removePort(address.value)
  
    // Если поле пустое, отображаем предупреждение
    if (!cleanedAddress.trim()) {
      warning.value = 'Пожалуйста, введите адрес перед выполнением диагностики.'
      return
    }
  
    // Проверяем, что формат адреса правильный
    if (!isValidAddress.value) {
      warning.value = 'Пожалуйста, введите корректный адрес.'
      return
    }
  
    if (type === 'ping') {
      loadingPing.value = true
      pingResult.value = ''
    } else {
      loadingNs.value = true
      nslookupResult.value = ''
    }
  
    // Если адрес localhost, заменим его на 127.0.0.1
    if (cleanedAddress === 'localhost') {
      cleanedAddress = '127.0.0.1'
    }
  
    try {
      const res = await axios.post(`/api/diagnostics/${type}/${cleanedAddress}`)
      const output = res.data.output || JSON.stringify(res.data, null, 2)
  
      if (type === 'ping') {
        pingResult.value = output
      } else {
        nslookupResult.value = output
      }
    } catch (e) {
      const errorMsg = `Ошибка при выполнении команды: ${e.response?.data?.error || e.message}`
      if (type === 'ping') {
        pingResult.value = errorMsg
      } else {
        nslookupResult.value = errorMsg
      }
    } finally {
      loadingPing.value = false
      loadingNs.value = false
    }
  }
  </script>
  