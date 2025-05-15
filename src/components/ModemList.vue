<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">Список операторов</h1>
    <ul class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <li
        v-for="modem in modems"
        :key="modem.iccid"
        @click="openModal(modem)"
        :class="operatorGradient(modem.operator) + ' cursor-pointer rounded-lg p-4 text-white font-semibold select-none'"
      >
        {{ modem.operator }}
      </li>
    </ul>

    <Dialog
      :open="showModal"
      @close="showModal = false"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <Dialog.Panel class="bg-white p-6 rounded max-w-md w-full">
        <Dialog.Title class="text-xl font-bold mb-4">{{ selectedModem.operator }}</Dialog.Title>
        <div class="text-gray-700 space-y-2">
          <p><strong>ICCID:</strong> {{ selectedModem.iccid }}</p>
          <p><strong>IMEI:</strong> {{ selectedModem.imei || '—' }}</p>
          <p><strong>Статус:</strong> {{ selectedModem.status || '—' }}</p>
          <p><strong>Сигнал:</strong> {{ selectedModem.signal || '—' }}</p>
        </div>
        <button
          @click="showModal = false"
          class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Закрыть
        </button>
      </Dialog.Panel>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Dialog } from "@headlessui/vue";

const showModal = ref(false);
const selectedModem = ref({});

const modems = ref([]);

// Замените URL на свой API
const fetchModems = async () => {
  try {
    const res = await fetch("/api/modems");
    if (!res.ok) throw new Error("Ошибка при загрузке данных");
    modems.value = await res.json();
  } catch (e) {
    console.error(e);
  }
};

const openModal = (modem) => {
  selectedModem.value = modem;
  showModal.value = true;
};

onMounted(fetchModems);

// Функция для градиентов операторов
const operatorGradient = (operator) => {
  switch (operator.toLowerCase()) {
    case "теле2":
      return "bg-gradient-to-r from-[#001f4d] to-[#99256B]";
    case "mts":
      return "bg-gradient-to-r from-[#EF313B] to-[#FF5280]";
    case "билайн":
      return "bg-gradient-to-r from-[#E4B600] to-[#FEBB6C]";
    case "мегафон":
      return "bg-gradient-to-r from-[#07B755] to-[#23E390]";
    default:
      return "bg-gray-400"; // на случай неизвестного оператора
  }
};
</script>

<style>
/* tailwind через класс bg-gradient-to-r из left to right */
</style>
