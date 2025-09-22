<script setup>
import { ref, onMounted, computed } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from "@headlessui/vue";
import axios from "axios";
import { getToken } from "@/auth";
import ModemCard from "./ModemCard.vue";
import rowsDown from "../assets/rows/downWhite.svg"
import rowsUp from "../assets/rows/upWhite.svg"

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
  const op = operator?.toLowerCase() || '';
  if (op.includes('tele2')) return 'bg-gradient-to-r from-[#001f4d] to-[#99256B] hover:from-[#001b45] hover:to-[#7a1f56]';
  if (op.includes('mts')) return 'bg-gradient-to-r from-[#EF313B] to-[#FF5280] hover:from-[#d2272f] hover:to-[#e34e76]';
  if (op.includes('beeline')) return 'bg-gradient-to-r from-[#E4B600] to-[#FEBB6C] hover:from-[#c49c00] hover:to-[#db9f4d]';
  if (op.includes('megafon')) return 'bg-gradient-to-r from-[#07B755] to-[#23E390] hover:from-[#059c49] hover:to-[#1fd47e]';
  else return 'bg-[#37343D]'
};

const getOperatorIconUrl = (name = '') => {
  const key = name?.toLowerCase() || '';
  if (key.includes('mts')) return new URL('../assets/oper/mts.svg', import.meta.url).href;
  if (key.includes('megafon')) return new URL('../assets/oper/megafon.svg', import.meta.url).href;
  if (key.includes('beeline')) return new URL('../assets/oper/beeline.svg', import.meta.url).href;
  if (key.includes('tele2')) return new URL('../assets/oper/tele2.svg', import.meta.url).href;
  else return new URL('../assets/oper/no-sim.svg', import.meta.url).href;;
};

const getSignalLevel = (signalQuality) => {
  const quality = Number(signalQuality);
  if (isNaN(quality)) return 0;
  if (quality >= 80) return 5;
  if (quality >= 60) return 4;
  if (quality >= 40) return 3;
  if (quality >= 20) return 2;
  if (quality > 0) return 1;
  return 0;
};

// ФИКС: Используем метод для сортировки вместо computed свойства
const getSortedModems = () => {
  return [...modems.value].sort((a, b) => {
    const aHasOperator = a["3gpp"]?.["operator-name"] && a["3gpp"]?.["operator-name"] !== "--";
    const bHasOperator = b["3gpp"]?.["operator-name"] && b["3gpp"]?.["operator-name"] !== "--";
    
    if (aHasOperator && !bHasOperator) return -1;
    if (!aHasOperator && bHasOperator) return 1;
    return 0;
  });
};

const fetchModems = async () => {
  try {
    const response = await axios.post(
      "/api/cmd",
      { command: "v1/modems/list" },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    
    // Предполагаем, что данные модемов находятся в response.data.data
    modems.value = response.data.data.modems || response.data.data || [];
  } catch (err) {
    error.value = err.message;
    console.error("Ошибка загрузки модемов:", err);
  } finally {
    loading.value = false;
  }
};

const handleModemChanged = () => {
  fetchModems(); // Перезагружаем список модемов при изменении
  isOpen.value = false; // Закрываем модальное окно
};

onMounted(async () => {
  await fetchModems();
});
</script>

<template>
  <div class="p-6 rounded-md space-y-4">
    <div v-if="loading" class="text-white">Загрузка модемов...</div>
    <div v-else-if="error" class="text-red-500">Ошибка: {{ error }}</div>

    <ul v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <!-- ФИКС: Используем метод вместо computed свойства -->
      <li v-for="modem in getSortedModems()" :key="modem['3gpp']?.['dbus-path'] || modem.id">
        <div @click="openModal(modem)" 
          class="flex flex-col rounded-md p-3 min-w-[128px] min-h-[128px] cursor-pointer select-none transition duration-200"
          :class="operatorBgColor(modem['3gpp']?.['operator-name'])">
          
          <div v-if="modem['3gpp']?.['operator-name'] && modem['3gpp']?.['operator-name'] !== '--'" class="h-full flex flex-col">
            <div class="flex justify-between items-center">
              <img :src="getOperatorIconUrl(modem['3gpp']?.['operator-name'])" 
                   class="w-10 h-10 rounded-full"
                   v-if="getOperatorIconUrl(modem['3gpp']?.['operator-name'])">
              <div class="flex gap-2">
                <div class="flex items-end gap-[2px] h-5">
                  <div v-for="i in 5" :key="i" 
                    :class="[
                      'w-1 rounded-sm transition-all duration-300',
                      i <= getSignalLevel(modem.generic?.['signal-quality']?.value || modem.signalQuality) ? 'bg-white' : 'bg-gray-500',
                      ['h-1', 'h-2', 'h-3', 'h-4', 'h-5'][i - 1]
                    ]" />
                </div>
                <span class="text-xs">{{ modem.generic?.['access-technologies']?.[0] || 'Нет данных' }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-3 mt-auto pb-2">
              <div class="flex gap-1">
                <img :src="rowsUp" alt="">
                <span class="text-xs">{{ modem.rxSpeed || '0 Мб/сек' }}</span>
              </div>
              <div class="flex gap-1">
                <img :src="rowsDown" alt="">
                <span class="text-xs">{{ modem.txSpeed || '0 Мб/сек' }}</span>
              </div>
            </div>
          </div>

          <div v-else class="h-full flex flex-col justify-center">
            <div class="flex justify-between gap-2 items-center">
              <img :src="getOperatorIconUrl(modem['3gpp']?.['operator-name'])" 
                   class="w-10 h-10 rounded-full"
                   v-if="getOperatorIconUrl(modem['3gpp']?.['operator-name'])">
              <span class="text-[#8B8794] text-[10px]">Вставьте в слот сим-карту</span>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <TransitionRoot as="template" :show="isOpen">
      <Dialog as="div" class="relative z-10" @close="isOpen = false">
        <div class="fixed inset-0 bg-black/50" />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-md rounded-xl bg-[#363E4B] p-6 shadow-xl">
              <DialogTitle class="text-xl font-semibold mb-4">Информация о модеме</DialogTitle>
              <ModemCard v-if="selectedModem" @modem-changed="handleModemChanged" :modem="selectedModem" />
              <div class="mt-4 flex justify-end">
                <button class="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700" @click="isOpen = false">
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