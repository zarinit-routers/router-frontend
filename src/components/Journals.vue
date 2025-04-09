<template>



  <div class="p-5 bg-[#222228] m-1 mt-2 w-2xl">
    <div class=" inset-0 flex items-center justify-center">
      <button type="button" @click="openModal"
        class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
        Системный журнал
      </button>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/80" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="container transform overflow-hidden rounded-[5px] bg-[#222228] text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3"
                  class="text-lg font-medium leading-6 text-white bg-linear-to-br from-[#452587] to-[#470ABF] h-[60px] flex justify-between items-center px-[40px]">

                  <h2 class="text-lg font-bold">Системный журнал <!--    {{ journalType }} --></h2>

                  <button type="button" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-10 ">
                      <path stroke-linecap="round" class="text-red-500" fill="red" stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12" />
                    </svg>

                  </button>

                </DialogTitle>
                <div class="mb-[206px] m-4">
                  <!-- Переключатели для выбора типа журнала -->
                  <div class="flex justify-center">
                    <button v-for="type in journalTypes" :key="type"
                      class=" bg-[#37343D] hover:bg-[#4a4758] text-white p-2 rounded-md mr-2 h-[100px] w-[200px]"
                      @click="changeJournalType(type)">
                      {{ type }}
                    </button>
                  </div>
                  <hr class="my-4 ">

                  <!-- Загрузка и отображение журнала -->
                  <div class="flex justify-center mt-[150px]">
                    <div v-if="error" class="text-red-500">{{ error }}</div>
                    <div v-else
                      class="bg-[#37343D] text-white p-3 rounded-md max-h-96 overflow-auto w-[750px] h-[420px]">
                      <pre>{{ journalData }}</pre>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>


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


import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
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