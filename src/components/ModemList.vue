<template>
  <div class="p-5 bg-[#222228] mx-1 rounded-sm">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <ul v-if="modems" class="grid gap-4">
      <li
        v-for="(modem, index) in modems"
        :key="index"
        @click="openModal(modem)"
        class="cursor-pointer"
      >
        <ModemCard :modem="modem" />
      </li>
    </ul>

    <Dialog v-if="selectedModem" :open="isOpen" @close="closeModal" class="fixed inset-0 z-50">
      <div class="flex items-center justify-center min-h-screen px-4 bg-black/40">
        <DialogPanel class="bg-[#1f1f20] p-6 rounded-lg w-full max-w-3xl overflow-auto max-h-[90vh]">
          <DialogTitle class="text-xl font-bold mb-4">
            {{ selectedModem.generic.model }}
          </DialogTitle>

          <!-- Здесь можно отобразить всё, что хочешь -->
          <pre class="text-sm text-white/80">{{ selectedModem }}</pre>

          <div class="mt-4 text-right">
            <button class="px-4 py-2 bg-blue-600 rounded" @click="closeModal">Закрыть</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
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

const closeModal = () => {
  isOpen.value = false;
  selectedModem.value = null;
};

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
</script>
