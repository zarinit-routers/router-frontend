<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Операторы</h1>

    <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <li
        v-for="modem in modems"
        :key="modem.id"
        @click="openModal(modem)"
        class="cursor-pointer rounded-md p-6 text-white font-semibold select-none"
        :class="gradientClasses[modem.operator]"
      >
        {{ modem.operator }}
      </li>
    </ul>

    <!-- Модальное окно -->
    <Dialog v-model="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog.Panel class="bg-white rounded-md p-6 max-w-md w-full">
        <Dialog.Title class="text-xl font-bold mb-4">{{ selectedModem?.operator }}</Dialog.Title>

        <div class="text-gray-700 space-y-2">
          <p><strong>ICCID:</strong> {{ selectedModem?.iccid || '—' }}</p>
          <p><strong>IMEI:</strong> {{ selectedModem?.imei || '—' }}</p>
          <p><strong>Статус:</strong> {{ selectedModem?.status || '—' }}</p>
          <p><strong>Сигнал:</strong> {{ selectedModem?.signal || '—' }}</p>
        </div>

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
import { ref } from 'vue'
import { Dialog } from '@headlessui/vue'

const modems = ref([
  {
    id: 1,
    operator: 'Tele2',
    iccid: '8944501234567890123',
    imei: '356789012345678',
    status: 'Активен',
    signal: '-70 dBm',
  },
  {
    id: 2,
    operator: 'MTS',
    iccid: '8944512345678901234',
    imei: '356789012345679',
    status: 'Активен',
    signal: '-65 dBm',
  },
  {
    id: 3,
    operator: 'Beeline',
    iccid: '8944523456789012345',
    imei: '356789012345680',
    status: 'Неактивен',
    signal: '-90 dBm',
  },
  {
    id: 4,
    operator: 'Megafon',
    iccid: '8944534567890123456',
    imei: '356789012345681',
    status: 'Активен',
    signal: '-60 dBm',
  },
])

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
</script>
