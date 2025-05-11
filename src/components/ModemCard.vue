<template>
  <div>
    <button @click="open = true" class="w-full bg-[#2A2A2E] p-4 rounded shadow">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-white font-bold">{{ modem.generic.model }}</h3>
          <p class="text-sm text-gray-400">{{ modem.path }}</p>
        </div>
        <span
          :class="[
            modemEnabled ? 'text-green-400' : 'text-yellow-500',
            'text-sm font-semibold'
          ]"
        >
          {{ modemEnabled ? 'Включён' : 'Выключен' }}
        </span>
      </div>
    </button>

    <Dialog v-if="open" @close="open = false" class="relative z-50">
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-md bg-[#1e1e22] p-6 rounded-lg shadow-xl text-white">
          <DialogTitle class="text-lg font-bold mb-4">{{ modem.generic.model }}</DialogTitle>
          <p class="mb-2"><strong>Путь:</strong> {{ modem.path }}</p>
          <p class="mb-2"><strong>Статус:</strong> {{ modemEnabled ? 'Включён' : 'Выключен' }}</p>
          <p class="mb-4">
            <strong>Оператор:</strong>
            {{ modemOperator?.name ?? '—' }}
            <span v-if="modemOperator" class="font-mono">({{ modemOperator.code }})</span>
          </p>

          <div v-if="signal">
            <p class="mb-2"><strong>Уровень сигнала:</strong> {{ signal.quality }}%</p>
          </div>

          <SimInfo :simName="modem.generic.sim" class="mb-4" />

          <div class="flex justify-between mt-6">
            <button
              @click="toggleModemState"
              class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
            >
              {{ modemEnabled ? 'Выключить' : 'Включить' }}
            </button>

            <button
              @click="open = false"
              class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
            >
              Закрыть
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import SimInfo from "./SimInfo.vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/vue";

const props = defineProps({
  modem: Object
});

const open = ref(false);
const signal = ref(null);

const modemEnabled = computed(() => props.modem.generic.state !== "disabled");

const modemOperator = computed(() => {
  const name = props.modem["3gpp"]["operator-name"];
  if (!name || name === "--") return null;
  return {
    name,
    code: props.modem["3gpp"]["operator-code"]
  };
});

const toggleModemState = () => {
  const endpoint = `/api/modems/${props.modem.generic.name}/${modemEnabled.value ? "disable" : "enable"}`;
  axios.post(endpoint).then(() => {
    // Предположительно меняется статус на сервере, желательно перезагрузить список
    props.modem.generic.state = modemEnabled.value ? "disabled" : "enabled";
  });
};

onMounted(() => {
  axios.get(`/api/modems/signal/${props.modem.generic.name}`).then((res) => {
    signal.value = res.data;
  });
});
</script>
