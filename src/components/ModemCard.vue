<script setup>
import { computed, ref, watch, defineEmits } from "vue";
import axios from "axios";
import { Switch } from "@headlessui/vue";
import { getToken } from "@/auth";
import SimInfo from "./SimInfo.vue";

const emit = defineEmits(['modem-changed'])

const props = defineProps({
  modem: {
    type: Object,
    required: true,
    default: () => ({})
  },
});

// Используем текущее состояние модема из props
const isEnable = ref(props.modem?.['3gpp']?.['operator-name'] !== '--')
const loading = ref(false)
const error = ref(null)

const modemId = computed(() => {
  if (!props.modem?.['dbus-path']) return null;
  const dBusPath = props.modem['dbus-path'].split('/')
  return dBusPath[dBusPath.length - 1]
})

// Функция для обработки переключения
const toggleModem = async (newState) => {
  if (!modemId.value) {
    error.value = "ID модема не определен";
    return false;
  }
  
  loading.value = true;
  error.value = null;
  
  const command = newState ? "v1/modems/enable" : "v1/modems/disable";
  
  try {
    const response = await axios.post(
      "/api/cmd",
      { 
        command: command,
        args: { modem: modemId.value }
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    
    // Проверяем успешность выполнения команды
    if (response.data.commandError === "") {
      emit('modem-changed');
      return true;
    } else {
      throw new Error(response.data.commandError || "Неизвестная ошибка сервера");
    }
  } catch (err) {
    console.error('Ошибка при смене состояния модема:', err);
    
    // Парсим сообщение об ошибке для пользователя
    let errorMessage = "Ошибка сервера";
    if (err.response?.data?.commandError) {
      const serverError = err.response.data.commandError;
      if (serverError.includes("failed to set power state")) {
        errorMessage = "Ошибка изменения состояния модема. Возможно, модем недоступен.";
      } else if (serverError.includes("exit status 1")) {
        errorMessage = "Системная ошибка при управлении модемом.";
      } else {
        errorMessage = serverError;
      }
    } else if (err.message) {
      errorMessage = err.message;
    }
    
    error.value = errorMessage;
    return false;
  } finally {
    loading.value = false;
  }
};

// Обработчик изменения переключателя
const handleToggle = async (newState) => {
  const success = await toggleModem(newState);
  if (!success) {
    // При ошибке возвращаем переключатель в исходное состояние
    isEnable.value = !newState;
  }
};

const operatorName = computed(() => props.modem?.["3gpp"]?.["operator-name"] || "Нет оператора");

const operatorClass = computed(() => {
  const operator = operatorName.value.toLowerCase();
  if (operator.includes("tele2")) return "bg-blue-900";
  if (operator.includes("mts")) return "bg-red-900";
  if (operator.includes("megafon")) return "bg-green-900";
  if (operator.includes("beeline")) return "bg-yellow-900";
  return "bg-gray-700";
});

// Функция для повторной попытки
const retry = async () => {
  error.value = null;
  await handleToggle(isEnable.value);
};
</script>

<template>
  <div :class="['p-4 rounded-lg', operatorClass]">
    <!-- Сообщение об ошибке -->
    <div v-if="error" class="mb-4 p-3 bg-red-900 text-white rounded text-sm">
      <div class="flex justify-between items-center">
        <span>{{ error }}</span>
        <button 
          @click="retry"
          class="ml-2 px-3 py-1 bg-red-700 hover:bg-red-600 rounded text-xs"
          :disabled="loading"
        >
          Повторить
        </button>
      </div>
    </div>
    
    <h3 class="text-xl font-bold mb-2">{{ modem.generic?.name || 'Неизвестный модем' }}</h3>
    <div class="flex justify-between items-center">
      <p class="text-sm text-gray-300">
        Оператор: {{ operatorName }}
      </p>
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-300">{{ isEnable ? 'Вкл' : 'Выкл' }}</span>
        <Switch 
          v-model="isEnable" 
          as="template" 
          v-slot="{ checked }"
          :disabled="loading"
          :class="{ 'opacity-50 pointer-events-none': loading }"
          @update:modelValue="handleToggle"
        >
          <button
            class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
            :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
            <span class="sr-only">{{ isEnable ? 'Выключить' : 'Включить' }} модем</span>
            <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
              class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
          </button>
        </Switch>
      </div>
    </div>
    
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <p class="text-sm text-gray-400">IMEI</p>
        <p class="text-white font-mono text-sm">{{ modem['3gpp']?.['imei'] || 'Нет данных' }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Operator Code</p>
        <p class="text-white font-mono text-sm">{{ modem['3gpp']?.['operator-code'] || 'Нет данных' }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Access Technologies</p>
        <p class="text-white font-mono text-sm">{{ modem['generic']?.['access-technologies']?.[0] || 'Нет данных' }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Current Modes</p>
        <p class="text-white font-mono text-sm">{{ modem['generic']?.['current-modes'] || 'Нет данных' }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Manufacturer</p>
        <p class="text-white font-mono text-sm">{{ modem['generic']?.['manufacturer'] || 'Нет данных' }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Model</p>
        <p class="text-white font-mono text-sm">{{ modem['generic']?.['model'] || 'Нет данных' }}</p>
      </div>
    </div>
    
    <div class="mt-4">
      <SimInfo v-if="modem.sim" :simName="modem.sim" />
      <div v-else class="p-3 bg-gray-700 rounded text-sm">
        SIM-карта не доступна
      </div>
    </div>
    
    <!-- Индикатор загрузки -->
    <div v-if="loading" class="mt-3 p-2 bg-blue-900 text-white rounded text-sm">
      <div class="flex items-center gap-2">
        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>{{ isEnable ? 'Включаем модем...' : 'Выключаем модем...' }}</span>
      </div>
    </div>
  </div>
</template>