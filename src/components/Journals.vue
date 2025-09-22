<script setup>
import { ref } from "vue";
import axios from "axios";
import { getToken } from "@/auth";
import Button from "../components/baseComponents/Button.vue";

import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@headlessui/vue";

const journalTypes = ["system", "core", "connections", "port-forwarding"];
const journalType = ref("system");
const journalData = ref("");
const error = ref(null);
const isOpen = ref(false);
const loading = ref(false);

// Загрузка журнала при смене таба
const handleTabChange = async (index) => {
  journalType.value = journalTypes[index];
  await fetchJournal();
};

const fetchJournal = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await axios.post(
      "/api/cmd",
      { 
        command: "v1/journals/get",
        args : {
          journal: journalType.value,
        },
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    
    journalData.value = response.data.data.journal || "Нет данных";
  } catch (err) {
    error.value = err.message;
    console.error("Ошибка загрузки журнала:", err);
  } finally {
    loading.value = false;
  }
};

function closeModal() {
  isOpen.value = false;
}

function openModal() {
  isOpen.value = true;
  fetchJournal();
}
</script>

<template>
  <div class="inset-0 flex items-center justify-center mb-0">
    <Button
      @click="openModal"
      class="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      Системный журнал
    </Button>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-100">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/80" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="container transform overflow-hidden rounded-[5px] bg-[#222228] text-left align-middle shadow-xl transition-all h-[1000px]"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-white bg-linear-to-br from-[#452587] to-[#470ABF] h-[60px] flex justify-between items-center px-[40px]"
              >
                <h2 class="text-lg font-bold">Системный журнал</h2>
                <button type="button" @click="closeModal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-10"
                  >
                    <path
                      stroke-linecap="round"
                      class="text-red-500"
                      fill="red"
                      stroke-linejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </DialogTitle>

              <div class="m-4 mb-[206px]">
                <!-- Tabs -->
                <TabGroup @change="handleTabChange">
                  <TabList class="flex justify-center mb-4 gap-2">
                    <Tab
                      v-for="type in journalTypes"
                      :key="type"
                      v-slot="{ selected }"
                    >
                      <button
                        :class="[
                          'p-3 w-[200px] h-[100px] rounded-md',
                          selected
                            ? 'bg-[#470ABF] text-white'
                            : 'bg-[#37343D] hover:bg-[#4a4758] text-white',
                        ]"
                      >
                        {{ type }}
                      </button>
                    </Tab>
                  </TabList>

                  <TabPanels class="flex justify-center">
                    <TabPanel v-for="type in journalTypes" :key="type">
                      <div
                        class="bg-[#37343D] text-white p-3 rounded-md overflow-auto w-[1000px] h-[600px] flex flex-col justify-between"
                      >
                        <div v-if="loading" class="text-center py-4">
                          Загрузка журнала...
                        </div>
                        <div v-else-if="error" class="text-red-500 p-2">
                          Ошибка: {{ error }}
                        </div>
                        <pre
                          v-else
                          class="whitespace-pre-wrap break-words overflow-auto flex-1 p-2"
                        >{{ journalData }}</pre>
                      </div>
                      <div class="mt-4 flex justify-center">
                        <Button @click="fetchJournal" :disabled="loading">
                          {{ loading ? 'Загрузка...' : 'Обновить' }}
                        </Button>
                      </div>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>