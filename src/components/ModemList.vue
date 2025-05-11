<template>
  <div class="p-5 bg-[#222228] mx-1 rounded-sm">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <ul v-if="modems" class="grid gap-4">
      <li v-for="(modem, index) in modems" :key="index">
        <!-- Открытие модалки по клику на модем -->
        <button @click="openModal(modem)" class="w-full">
          <ModemCard :modem="modem" />
        </button>
      </li>
    </ul>
  </div>

  <!-- Модалка для отображения подробной информации о модеме -->
  <Modal v-if="isModalOpen" @close="closeModal">
    <template #default>
      <ModemCard :modem="selectedModem" />
    </template>
  </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ModemCard from './ModemCard.vue';
import Modal from './Modal.vue';

const modems = ref([]);
const loading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const selectedModem = ref(null);

// Открыть модалку с данными модема
const openModal = (modem) => {
  selectedModem.value = modem;
  isModalOpen.value = true;
};

// Закрыть модалку
const closeModal = () => {
  isModalOpen.value = false;
  selectedModem.value = null;
};

// Функция для загрузки списка модемов
const fetchModems = async () => {
  try {
    const response = await fetch('/api/modems/list');
    if (!response.ok) throw new Error('Ошибка загрузки модемов');
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

<style scoped>
/* Стили для визуального оформления */
</style>
