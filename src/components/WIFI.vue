<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-semibold">Настройки Wi-Fi</h2>

    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">Wi-Fi</span>
      <Switch
        v-model="wifi.enabled"
        :class="wifi.enabled ? 'bg-blue-600' : 'bg-gray-200'"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
        @change="updateWifi"
      >
        <span
          :class="wifi.enabled ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        />
      </Switch>
    </div>

    <div v-if="wifi.enabled" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">SSID</label>
        <input
          v-model="wifi.ssid"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
          placeholder="Введите SSID"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Пароль</label>
        <input
          v-model="wifi.password"
          type="password"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
          placeholder="Введите пароль"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Безопасность</label>
        <select
          v-model="wifi.security"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="none">Открытая</option>
          <option value="wpa2">WPA2</option>
          <option value="wpa3">WPA3</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium">Канал</label>
        <input
          v-model.number="wifi.channel"
          type="number"
          min="1"
          max="11"
          class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div class="flex items-center space-x-2">
        <input
          id="hidden"
          type="checkbox"
          v-model="wifi.hidden"
          class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
        />
        <label for="hidden" class="text-sm">Скрыть SSID</label>
      </div>

      <div class="pt-4">
        <button
          @click="updateWifi"
          class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Switch } from '@headlessui/vue'

const wifi = ref({
  enabled: false,
  ssid: '',
  password: '',
  security: 'wpa2',
  channel: 6,
  hidden: false
})

const fetchWifiSettings = () => {
  axios.get('/wifi')
    .then(res => {
      Object.assign(wifi.value, res.data)
    })
}

const updateWifi = () => {
  axios.post('/wifi', wifi.value)
    .then(() => {
      // Можно добавить уведомление об успешном обновлении
    })
}

onMounted(fetchWifiSettings)
</script>
