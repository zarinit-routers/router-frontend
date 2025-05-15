<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <button
        v-for="modem in modems"
        :key="modem.id"
        @click="openModal(modem)"
        class="flex flex-col items-start justify-center p-4 rounded-xl border shadow-sm bg-white dark:bg-gray-800 hover:shadow transition"
      >
        <div
          class="w-10 h-10 rounded-md mb-2"
          :class="gradientClass(modem.operator)"
        />
        <span class="text-sm font-semibold text-gray-900 dark:text-white">
          {{ modem.operator }}
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400 truncate">
          {{ modem.iccid }}
        </span>
      </button>
    </div>

    <!-- Headless UI Dialog -->
    <TransitionRoot :show="isOpen" as="template" @close="closeModal">
      <Dialog v-model="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <Dialog.Panel class="bg-white p-6 rounded max-w-md w-full">
    <h2 class="text-xl font-bold mb-4">{{ selectedModem.operator }}</h2>
    <pre>{{ selectedModem }}</pre>
    <button @click="showModal = false" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Закрыть</button>
  </Dialog.Panel>
</Dialog>

    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, TransitionRoot, TransitionChild } from '@headlessui/vue'

const props = defineProps({
  modems: Array,
})

const isOpen = ref(false)
const selectedModem = ref({})

function openModal(modem) {
  selectedModem.value = modem
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

// Градиенты для операторов
function gradientClass(operator) {
  const op = operator?.toLowerCase()
  if (op.includes('tele2') || op.includes('теле2')) {
    return 'bg-gradient-to-r from-[#001E5A] to-[#99256B]'
  }
  if (op.includes('mts') || op.includes('мтс')) {
    return 'bg-gradient-to-r from-[#EF313B] to-[#FF5280]'
  }
  if (op.includes('билайн') || op.includes('beeline')) {
    return 'bg-gradient-to-r from-[#E4B600] to-[#FEBB6C]'
  }
  if (op.includes('мегафон') || op.includes('megafon')) {
    return 'bg-gradient-to-r from-[#07B755] to-[#23E390]'
  }
  return 'bg-gradient-to-r from-gray-400 to-gray-500'
}
</script>
