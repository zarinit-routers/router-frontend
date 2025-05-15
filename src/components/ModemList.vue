<template>
  <div class="p-6 bg-[#1f1f25] rounded-md space-y-4 min-h-screen">
    <div v-if="loading" class="text-white">Загрузка...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <ul v-if="modems.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="(modem, index) in modems"
        :key="index"
        @click="openModal(modem)"
        :class="[
          'cursor-pointer rounded-md flex flex-col justify-between text-white font-semibold select-none transition duration-200',
          operatorBgColor(modem['3gpp']?.['operator-name'])
        ]"
        style="aspect-ratio: 1 / 1; min-width: 150px;"
      >
        <div class="flex items-center justify-between p-4">
          <div class="truncate text-lg">{{ modem.generic.name }}</div>
          <div class="w-6 h-6" v-html="getOperatorIcon(modem['3gpp']?.['operator-name'])" />
        </div>
        <div class="px-4 pb-4 text-sm text-gray-200 truncate">
          {{ modem['3gpp']?.['operator-name'] || 'Нет оператора' }}
          <div class="mt-1 text-xs text-gray-300">
            ⬇ {{ modem.rxSpeed || 0 }} Кбит/с <br />
            ⬆ {{ modem.txSpeed || 0 }} Кбит/с
          </div>
        </div>
      </li>
    </ul>

    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-10" @close="isOpen = false">
        <div class="fixed inset-0 bg-black/50" />

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <DialogTitle class="text-xl font-semibold mb-4">Информация о модеме</DialogTitle>
              <ModemCard :modem="selectedModem" />
              <div class="mt-4 flex justify-end">
                <button
                  class="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
                  @click="isOpen = false"
                >
                  Закрыть
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from "@headlessui/vue";
import ModemCard from "./ModemCard.vue";

const modems = ref([]);
const loading = ref(true);
const error = ref(null);

const isOpen = ref(false);
const selectedModem = ref(null);

const openModal = (modem) => {
  selectedModem.value = modem;
  isOpen.value = true;
};

const operatorBgColor = (operator) => {
  if (!operator) return 'bg-gray-700 hover:bg-gray-800';
  const op = operator.toLowerCase();
  if (op.includes('tele2')) return 'bg-gradient-to-r from-[#001f4d] to-[#99256B] hover:from-[#001b45] hover:to-[#7a1f56]';
  if (op.includes('mts')) return 'bg-gradient-to-r from-[#EF313B] to-[#FF5280] hover:from-[#d2272f] hover:to-[#e34e76]';
  if (op.includes('beeline')) return 'bg-gradient-to-r from-[#E4B600] to-[#FEBB6C] hover:from-[#c49c00] hover:to-[#db9f4d]';
  if (op.includes('megafon')) return 'bg-gradient-to-r from-[#07B755] to-[#23E390] hover:from-[#059c49] hover:to-[#1fd47e]';
  return 'bg-gray-700 hover:bg-gray-800';
};

// 👇 иконки в виде SVG
const operatorIcons = {
  mts: `<svg fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>`,
  megafon: `<svg fill="white" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8"/></svg>`,
  beeline: `<svg fill="white" viewBox="0 0 24 24"><path d="M4 12h16M4 16h16M4 8h16" stroke="white" stroke-width="2"/></svg>`,
  tele2: `<svg fill="white" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>`,
};

const getOperatorIcon = (name = '') => {
  const key = name.toLowerCase();
  if (key.includes('mts')) return operatorIcons.mts;
  if (key.includes('megafon')) return operatorIcons.megafon;
  if (key.includes('beeline')) return operatorIcons.beeline;
  if (key.includes('tele2')) return operatorIcons.tele2;
  return '';
};

// Заглушка — замени на реальный вызов /api/netload, если нужно
const fetchNetLoad = async () => {
  // Пример: получаем скорость по имени устройства
  // const response = await fetch('/api/netload')
  // const data = await response.json()
  modems.value = modems.value.map((modem) => ({
    ...modem,
    rxSpeed: Math.floor(Math.random() * 1000), // загрузка
    txSpeed: Math.floor(Math.random() * 1000), // выгрузка
  }));
};

const fetchModems = async () => {
  try {
    const response = await fetch("/api/modems/list");
    if (!response.ok) throw new Error("Ошибка загрузки модемов");
    const data = await response.json();
    modems.value = data.modems;
    await fetchNetLoad();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchModems);
</script>
