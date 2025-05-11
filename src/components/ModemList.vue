<!-- modemList.vue -->
<template>
  <div class="p-5 bg-[#222228] mx-1 rounded-sm">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <ul v-if="modems" class="grid gap-4">
      <li v-for="(modem, index) in modems" :key="index">
        <button
          class="w-full bg-gray-700 p-3 rounded-md text-white"
          @click="openModal(modem)"
        >
          Открыть модем
        </button>
      </li>
    </ul>

    <ModalContainer :show="isModalOpen" :close="closeModal">
      <ModemCard :modem="selectedModem" />
    </ModalContainer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ModalContainer from "./ModalContainer.vue";
import ModemCard from "./ModemCard.vue";

const modems = ref([]);
const loading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const selectedModem = ref(null);

// Функция для загрузки списка модемов
const fetchModems = async () => {
  try {
    const response = await fetch(`/api/modems/list`);
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

const openModal = (modem) => {
  selectedModem.value = modem;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedModem.value = null;
};
</script>
