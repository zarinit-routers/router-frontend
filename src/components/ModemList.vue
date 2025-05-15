<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Операторы</h1>

    <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <li
        v-for="modem in modems"
        :key="modem.iccid"
        @click="openModal(modem)"
        class="cursor-pointer rounded-md p-6 text-white font-semibold select-none"
        :class="gradientClasses[modem.operator]"
      >
        {{ modem.operator }}
      </li>
    </ul>

    <Dialog v-model="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog.Panel class="bg-white rounded-md p-6 max-w-md w-full">
        <ModemCard :modem="selectedModem" />
        <button
          @click="showModal = false"
          class="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Закрыть
        </button>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog } from '@headlessui/vue'
import ModemCard from './ModemCard.vue'

const modems = ref([])
const showModal = ref(false)
const selectedModem = ref(null)

const gradientClasses = {
  Tele2: 'bg-gradient-to-r from-blue-900 to-[#99256B]',
  MTS: 'bg-gradient-to-r from-[#EF313B] to-[#FF5280]',
  Beeline: 'bg-gradient-to-r from-[#E4B600] to-[#FEBB6C]',
  Megafon: 'bg-gradient-to-r from-[#07B755] to-[#23E390]',
}

function openModal(modem) {
  selectedModem.value = modem
  showModal.value = true
}

async function fetchModems() {
  try {
    const res = await fetch('/api/modems') // твой эндпоинт с данными модемов
    if (!res.ok) throw new Error('Ошибка загрузки данных')
    const data = await res.json()
    modems.value = data
  } catch (error) {
    console.error('Ошибка при загрузке модемов:', error)
  }
}

onMounted(() => {
  fetchModems()
})
</script>
