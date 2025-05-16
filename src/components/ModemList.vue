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
          <img
            v-if="getOperatorIconUrl(modem['3gpp']?.['operator-name'])"
            :src="getOperatorIconUrl(modem['3gpp']?.['operator-name'])"
            alt="operator"
            class="w-6 h-6"
          />
        </div>
        <div class="px-4 pb-4 text-sm text-gray-200 truncate">
          {{ modem['3gpp']?.['operator-name'] || 'Нет оператора' }}

          <div class="mt-1 text-xs text-gray-300">
            Технология: 
            <span :class="getTechColor(modem.generic['access-technologies'])">
              {{ modem.generic['access-technologies']?.join(', ').toUpperCase() || '—' }}
            </span>
          </div>

          <div class="mt-1 flex items-center space-x-1">
            <SignalBars
              :strength="parseInt(modem.generic['signal-quality']?.value || 0)"
              :color="operatorSignalColor(modem['3gpp']?.['operator-name'])"
            />
            <span class="text-xs ml-2">
              {{ modem.generic['signal-quality']?.value || 0 }}%
            </span>
          </div>

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
  if (!operator) return "bg-gray-700 hover:bg-gray-800";
  const op = operator.toLowerCase();
  if (op.includes("tele2"))
    return "bg-gradient-to-r from-[#001f4d] to-[#99256B] hover:from-[#001b45] hover:to-[#7a1f56]";
  if (op.includes("mts"))
    return "bg-gradient-to-r from-[#EF313B] to-[#FF5280] hover:from-[#d2272f] hover:to-[#e34e76]";
  if (op.includes("beeline"))
    return "bg-gradient-to-r from-[#E4B600] to-[#FEBB6C] hover:from-[#c49c00] hover:to-[#db9f4d]";
  if (op.includes("megafon"))
    return "bg-gradient-to-r from-[#07B755] to-[#23E390] hover:from-[#059c49] hover:to-[#1fd47e]";
  return "bg-gray-700 hover:bg-gray-800";
};

const getOperatorIconUrl = (name = "") => {
  const key = name.toLowerCase();
  if (key.includes("mts")) return new URL("../assets/oper/mts.svg", import.meta.url).href;
  if (key.includes("megafon")) return new URL("../assets/oper/megafon.svg", import.meta.url).href;
  if (key.includes("beeline")) return new URL("../assets/oper/beeline.svg", import.meta.url).href;
  if (key.includes("tele2")) return new URL("../assets/oper/tele2.svg", import.meta.url).href;
  return "";
};

const getTechColor = (tech = []) => {
  const t = tech.join(",").toLowerCase();
  if (t.includes("lte")) return "text-green-400";
  if (t.includes("umts")) return "text-yellow-400";
  if (t.includes("gsm")) return "text-red-400";
  return "text-gray-400";
};

// цвет сигнала для каждого оператора
const operatorSignalColor = (operator) => {
  if (!operator) return "#888888";
  const op = operator.toLowerCase();
  if (op.includes("tele2")) return "#99256B";
  if (op.includes("mts")) return "#EF313B";
  if (op.includes("beeline")) return "#E4B600";
  if (op.includes("megafon")) return "#07B755";
  return "#888888";
};

// Компонент отрисовки уровня сигнала (палочки)
const SignalBars = {
  props: ["strength", "color"],
  setup(props) {
    // strength 0-100
    const barsCount = 5;
    const activeBars = Math.round((props.strength / 100) * barsCount);
    return () => (
      <div class="flex space-x-0.5 items-end" style="height: 14px;">
        {[...Array(barsCount)].map((_, i) => {
          const isActive = i < activeBars;
          const height = 4 + i * 3; // высота палочки от 4 до 16 пикселей
          return (
            <span
              key={i}
              class="block rounded-sm"
              style={{
                width: "4px",
                height: `${height}px`,
                backgroundColor: isActive ? props.color : "#444444",
              }}
            />
          );
        })}
      </div>
    );
  },
};

const fetchNetLoad = async () => {
  try {
    const response = await fetch("/api/netload");
    if (!response.ok) throw new Error("Ошибка при получении netload");

    const netloadData = await response.json();

    modems.value = modems.value.map((modem) => {
      const device = modem.generic?.name || modem.device;
      const load = netloadData.find((item) => item.device === device);
      return {
        ...modem,
        rxSpeed: load?.rx ?? 0,
        txSpeed: load?.tx ?? 0,
      };
    });
  } catch (err) {
    console.error("Ошибка загрузки netload:", err);
  }
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

onMounted(async () => {
  await fetchModems();
  await fetchNetLoad();
});
</script>
