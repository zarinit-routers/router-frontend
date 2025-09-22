<template>
  <Transition
    appear
    name="fade"
    @after-leave="$emit('close')"
  >
    <div
      v-if="show"
      class="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
      @click.self="emitClose"
    >
      <div
        class="bg-[#222228] rounded-lg p-6 w-full max-w-2xl shadow-lg relative transform transition-all duration-300 scale-100"
        @click.stop
      >
        <button
          @click="emitClose"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Закрыть"
        >
          &times;
        </button>

        <h3 class="text-lg font-semibold mb-4">Ping</h3>

        <label class="block mb-1 font-medium">IP или домен</label>
        <Input
          v-model="target"
          type="text"
          placeholder="Введите IP или домен"
          class="w-full p-2 rounded mb-2"
          @input="validateTarget"
        />

        <div v-if="warning" class="text-yellow-600 text-sm font-medium mb-2">
          ⚠ {{ warning }}
        </div>

        <Button
          @click="runPing"
          :disabled="loading || !isValidTarget"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed justify-self-center"
        >
          {{ loading ? "Пингуем..." : "Выполнить Ping" }}
        </Button>

        <pre
          v-if="pingResult"
          class="mt-6 bg-black text-white p-3 rounded text-sm whitespace-pre-wrap max-h-60 overflow-auto"
        >{{ pingResult }}</pre>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { getToken } from '@/auth'
import Input from '../baseComponents/Input.vue'
import Button from '../baseComponents/Button.vue'

onMounted(() => {
  document.body.classList.add('overflow-hidden')
})

onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden')
})

const target = ref('')
const pingResult = ref('')
const loading = ref(false)
const warning = ref('')
const isValidTarget = ref(false)

const validateTarget = () => {
  if (!target.value.trim()) {
    warning.value = 'Введите IP или домен.'
    isValidTarget.value = false
  } else {
    warning.value = ''
    isValidTarget.value = true
  }
}

const runPing = async () => {
  validateTarget()
  if (!isValidTarget.value) return
  loading.value = true
  pingResult.value = ''
  try {
    const response = await axios.post(
      "/api/cmd",
      { 
        command: "v1/diagnostics/run-ping",
        args:{ address: target.value.trim()}
      },
      {
        headers: {
          Authorization: getToken(),
          "Content-Type": "application/json"
        },
      }
    );
    
    // Предполагаем, что результат находится в response.data.data
    pingResult.value = response.data.data?.output || response.data.data || 'Нет результата'
  } catch (err) {
    pingResult.value = `Ошибка: ${err.response?.data?.message || err.message}`
    console.error("Ошибка ping:", err);
  } finally {
    loading.value = false
  }
}

const show = ref(true)
const emit = defineEmits(['close'])

const emitClose = () => {
  show.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>