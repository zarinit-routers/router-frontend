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
      <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="closeModal">
        <div class="min-h-screen px-4 text-center bg-black bg-opacity-50 backdrop-blur-md">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
            as="template"
          >
            <Dialog.Panel
              class="inline-block w-full max-w-md p-6 my-20 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-2xl"
            >
              <Dialog.Title
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4"
              >
                {{ selectedModem.operator }}
              </Dialog.Title>
              <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>ICCID:</strong> {{ selectedModem.iccid }}</p>
                <p><strong>IMEI:</strong> {{ selectedModem.imei || '—' }}</p>
                <p><strong>Состояние:</strong> {{ selectedModem.status || '—' }}</p>
                <p><strong>Сигнал:</strong> {{ selectedModem.signal || '—' }}</p>
              </div>

              <div class="mt-6 text-right">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  @click="closeModal"
                >
                  Закрыть
                </button>
              </div>
            </Dialog.Panel>
          </TransitionChild>
        </div>
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
