<script setup>
import { computed, ref, onMounted } from "vue";
import { Switch } from "@headlessui/vue";
import axios from "axios";
import { getToken } from "@/auth";
import wifi from "../assets/wifi.svg";

const wifiStore = ref({
  frequency24: {
    ssid: "",
    isActive: false
  },
  frequency5: {
    ssid: "",
    isActive: false
  },
  loading: false
});

const progress = ref(0);
const loading = ref(true);

// Загрузка статуса WiFi
const fetchWifiStatus = async () => {
  try {
    const response = await axios.post(
      "/api/cmd",
      { command: "v1/wifi/get-status" },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );

    wifiStore.value = response.data.data;
  } catch (err) {
    console.error("Ошибка получения статуса WiFi:", err);
  } finally {
    loading.value = false;
  }
};

// Переключение WiFi 2.4GHz
const toggleWifi24 = async () => {
  wifiStore.value.loading = true;
  const command = wifiStore.value.frequency24.isActive ? "v1/wifi/disable" : "v1/wifi/enable";
  
  try {
    await axios.post(
      "/api/cmd",
      { 
        command: command,
        frequency: "2.4" // или другая логика определения частоты
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    wifiStore.value.frequency24.isActive = !wifiStore.value.frequency24.isActive;
  } catch (err) {
    console.error("Ошибка переключения WiFi 2.4GHz:", err);
  } finally {
    wifiStore.value.loading = false;
  }
};

// Переключение WiFi 5GHz
const toggleWifi5 = async () => {
  wifiStore.value.loading = true;
  const command = wifiStore.value.frequency5.isActive ? "v1/wifi/disable" : "v1/wifi/enable";
  
  try {
    await axios.post(
      "/api/cmd",
      { 
        command: command,
        frequency: "5" // или другая логика определения частоты
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    wifiStore.value.frequency5.isActive = !wifiStore.value.frequency5.isActive;
  } catch (err) {
    console.error("Ошибка переключения WiFi 5GHz:", err);
  } finally {
    wifiStore.value.loading = false;
  }
};

const progressComp = computed(() => {
  return `width: ${progress.value}%`;
});

// Имитация прогресса (оставлено как в оригинале)
setInterval(() => {
  if (progress.value < 100) {
    progress.value += 1;
  }
}, 100);

onMounted(fetchWifiStatus);
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- WiFi 2.4GHz -->
    <div class="flex flex-row items-center gap-4">
      <img :src="wifi" alt="" />
      <span class="w-[120px] text-xs text-[#58636C] text-nowrap">{{
        wifiStore.frequency24.ssid
      }}</span>

      <div class="">
        <Switch
          :modelValue="wifiStore.frequency24.isActive"
          @update:modelValue="toggleWifi24"
          :disabled="wifiStore.loading || loading"
          :class="{ 'opacity-50 pointer-events-none': wifiStore.loading || loading }"
          as="template"
          v-slot="{ checked }"
        >
          <button
            class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
            :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'"
          >
            <span class="sr-only">Enable WiFi 2.4GHz</span>
            <span
              :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
              class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition"
            />
          </button>
        </Switch>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">
            Загруженность канала
          </div>
          <div class="text-xs text-[#58636C] text-nowrap">2,4ГГц</div>
        </div>
        <div
          class="w-full border-1 border-solid border-[#43668A] bg-gray-200 h-[12px] dark:bg-gray-700"
        >
          <div
            class="h-[10px] bg-linear-to-r from-[#452587] via-47% to-[#470ABF] transition-[width] ease-in-out"
            :style="[progressComp]"
          ></div>
        </div>
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">0%</div>
          <div class="text-xs text-[#58636C] text-nowrap">{{ progress }} %</div>
        </div>
      </div>
      <router-link
        to="/settings"
        class="p-3 bg-[#37343D] border-1 border-solid border-[#27242C] text-nowrap text-xs"
      >
        Информация о сети
      </router-link>
    </div>

    <!-- WiFi 5GHz -->
    <div class="flex flex-row items-center gap-4">
      <img :src="wifi" alt="" />
      <span class="w-[120px] text-xs text-[#58636C] text-nowrap">{{
        wifiStore.frequency5.ssid
      }}</span>

      <div class="">
        <Switch
          :modelValue="wifiStore.frequency5.isActive"
          @update:modelValue="toggleWifi5"
          :disabled="wifiStore.loading || loading"
          :class="{ 'opacity-50 pointer-events-none': wifiStore.loading || loading }"
          as="template"
          v-slot="{ checked }"
        >
          <button
            class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
            :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'"
          >
            <span class="sr-only">Enable WiFi 5GHz</span>
            <span
              :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
              class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition"
            />
          </button>
        </Switch>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">
            Загруженность канала
          </div>
          <div class="text-xs text-[#58636C] text-nowrap">5 ГГц</div>
        </div>
        <div
          class="w-full border-1 border-solid border-[#43668A] bg-gray-200 h-[12px] dark:bg-gray-700"
        >
          <div
            class="h-[10px] bg-linear-to-r from-[#452587] via-47% to-[#470ABF] transition-[width] ease-in-out"
            :style="[progressComp]"
          ></div>
        </div>
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">0%</div>
          <div class="text-xs text-[#58636C] text-nowrap">{{ progress }} %</div>
        </div>
      </div>
      <router-link
        to="/settings"
        class="p-3 bg-[#37343D] border-1 border-solid border-[#27242C] text-nowrap text-xs"
      >
        Информация о сети
      </router-link>
    </div>
  </div>
</template>