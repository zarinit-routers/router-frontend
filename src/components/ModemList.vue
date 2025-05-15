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
          'cursor-pointer rounded-md flex items-center justify-center text-white font-semibold select-none transition duration-200',
          operatorBgColor(modem['3gpp']?.['operator-name'])
        ]"
        style="aspect-ratio: 1 / 1; min-width: 150px;"
      >
        <div class="text-center px-2">
          <div class="text-lg font-semibold truncate">{{ modem.generic.name }}</div>
          <div class="text-sm mt-1 truncate">{{ modem['3gpp']?.['operator-name'] || 'Нет оператора' }}</div>
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

const fetchModems = async () => {
  try {
    const response = await fetch("/api/modems/list");
    if (!response.ok) throw new Error("Ошибка загрузки модемов");
    const data = await response.json();
    modems.value = data.modems;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchModems);
</script>

<style>
/* Если хотите, добавьте кастомные стили здесь */
</style>
