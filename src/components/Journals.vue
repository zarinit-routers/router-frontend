<template>
    <div class="p-5 bg-[#222228] m-1 mt-2 w-2xl">
      <h2 class="text-lg font-bold">Журнал: {{ journalType }}</h2>
  
      <!-- Переключатели для выбора типа журнала -->
      <div class="mb-4 flex">
        <button 
          v-for="type in journalTypes" 
          :key="type" 
          class="button bg-[#37343D] hover:bg-[#4a4758] text-white p-2 rounded-md mr-2"
          @click="changeJournalType(type)"
        >
          {{ type }}
        </button>
      </div>
  
      <!-- Загрузка и отображение журнала -->
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <div v-else class="bg-[#37343D] text-white p-3 rounded-md max-h-96 overflow-auto">
        <pre>{{ journalData }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const journalTypes = ["system", "core", "connections", "port-forwarding"];  // Возможные типы журналов
  const journalType = ref("system");  // Изначальный тип журнала
  const journalData = ref("");
  const loading = ref(false);
  const error = ref(null);
  
  // Функция для смены типа журнала
  const changeJournalType = async (type) => {
    journalType.value = type;  // Обновляем тип журнала
    await fetchJournal();
  };
  
  // Функция для загрузки данных журнала
  const fetchJournal = async () => {
    loading.value = true;
    error.value = null;
  
    try {
      const response = await fetch(`/api/journal/${journalType.value}`);
      if (!response.ok) throw new Error("Ошибка загрузки журнала");
      
      const data = await response.json();
      journalData.value = data.journal || "Нет данных";
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  // Загружаем журнал при монтировании компонента
  fetchJournal();
  </script>
  
  <style scoped>
  .button {
    padding: 8px 16px;
    border: none;
    cursor: pointer;
  }
  .button:hover {
    background-color: #4a4758;
  }
  </style>
  