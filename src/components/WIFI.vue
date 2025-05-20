<template>
  <div class="max-w-md mx-auto p-4  rounded-lg shadow-md">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-xl font-semibold">{{ ssid }}</h2>
      <label class="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" v-model="wifiEnabled" class="sr-only" @change="saveSettings" />
        <div
          :class="[
            'w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300',
            wifiEnabled ? 'bg-blue-600' : ''
          ]"
        ></div>
        <div
          :class="[
            'dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform',
            wifiEnabled ? 'translate-x-5' : ''
          ]"
        ></div>
      </label>
    </div>

    <div class="mb-4">
      <label class="block mb-1 font-medium text-white-700">Загруженность канала</label>
      <div class="w-full bg-gray-200 rounded-full h-4">
        <div
          class="bg-blue-600 h-4 rounded-full transition-all"
          :style="{ width: channelLoad + '%' }"
        ></div>
      </div>
      <p class="text-sm text-white-600 mt-1">{{ channelLoad }}%</p>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        @click="showInfo"
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium"
        type="button"
      >
        Информация
      </button>
      <button
        @click="openEditModal"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
        type="button"
      >
        Изменить
      </button>
    </div>

    <!-- Модалка редактирования -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-80">
        <h3 class="text-lg font-semibold mb-4">Редактировать Wi-Fi</h3>
        <label class="block mb-2 font-medium text-gray-700">SSID</label>
        <input
          v-model="editSsid"
          type="text"
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div class="flex items-center mb-4">
          <label class="mr-3 font-medium text-gray-700">Включен</label>
          <input type="checkbox" v-model="editEnabled" />
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeEditModal"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium"
            type="button"
          >
            Отмена
          </button>
          <button
            @click="saveEditSettings"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
            type="button"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const ssid = ref('')
const wifiEnabled = ref(false)
const channelLoad = ref(0)

const isEditModalOpen = ref(false)
const editSsid = ref('')
const editEnabled = ref(false)

async function fetchWifiSettings() {
  try {
    const response = await axios.get('/api/wifi')
    ssid.value = response.data.ssid
    wifiEnabled.value = response.data.enabled
    channelLoad.value = response.data.channelLoad
  } catch (error) {
    console.error('Ошибка загрузки настроек Wi-Fi', error)
  }
}

async function saveSettings() {
  try {
    await axios.post('/api/wifi', {
      ssid: ssid.value,
      enabled: wifiEnabled.value,
    })
  } catch (error) {
    console.error('Ошибка сохранения настроек Wi-Fi', error)
  }
}

function showInfo() {
  alert(`Информация о сети "${ssid.value}"\nWi-Fi включён: ${wifiEnabled.value}\nЗагруженность канала: ${channelLoad.value}%`)
}

function openEditModal() {
  editSsid.value = ssid.value
  editEnabled.value = wifiEnabled.value
  isEditModalOpen.value = true
}

function closeEditModal() {
  isEditModalOpen.value = false
}

async function saveEditSettings() {
  try {
    await axios.post('/api/wifi', {
      ssid: editSsid.value,
      enabled: editEnabled.value,
    })
    ssid.value = editSsid.value
    wifiEnabled.value = editEnabled.value
    isEditModalOpen.value = false
  } catch (error) {
    console.error('Ошибка сохранения настроек Wi-Fi', error)
  }
}

onMounted(() => {
  fetchWifiSettings()
})
</script>

<style scoped>
label.inline-flex {
  position: relative;
  user-select: none;
}
.dot {
  top: 0.25rem;
  left: 0.25rem;
  position: absolute;
  transition: transform 0.3s ease;
}
</style>
