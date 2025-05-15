<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="modem in modems"
        :key="modem.id"
        @click="selectedModem = modem"
        class="flex flex-col items-start justify-center p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-md transition"
      >
        <div
          class="w-10 h-10 rounded-md mb-2"
          :class="gradientClass(modem.operator)"
        />
        <span class="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {{ modem.operator }}
        </span>
        <span class="text-xs text-gray-500 dark:text-gray-400">
          {{ modem.iccid }}
        </span>
      </button>
    </div>

    <!-- Модалка с подробной карточкой -->
    <ModalContainer :open="!!selectedModem" @close="selectedModem = null">
      <ModemCard v-if="selectedModem" :modem="selectedModem" />
    </ModalContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ModalContainer from './ModalContainer.vue'
import ModemCard from './ModemCard.vue'

const props = defineProps({
  modems: {
    type: Array,
    required: true,
  },
})

const selectedModem = ref(null)

function gradientClass(operator) {
  switch (operator?.toLowerCase()) {
    case 'теле2':
    case 'tele2':
      return 'bg-gradient-to-r from-[#001E5A] to-[#99256B]'
    case 'мтс':
    case 'mts':
      return 'bg-gradient-to-r from-[#EF313B] to-[#FF5280]'
    case 'билайн':
    case 'beeline':
      return 'bg-gradient-to-r from-[#E4B600] to-[#FEBB6C]'
    case 'мегафон':
    case 'megafon':
      return 'bg-gradient-to-r from-[#07B755] to-[#23E390]'
    default:
      return 'bg-gradient-to-r from-gray-400 to-gray-500'
  }
}
</script>
