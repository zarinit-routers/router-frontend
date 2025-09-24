<script setup>
import { ref, onMounted } from "vue";
import { Switch } from "@headlessui/vue";
import axios from "axios";
import { getToken } from "@/auth";
import wifi from "../assets/wifi.svg";

const hotspotStatus = ref({
  enabled: false,
  ssid: "",
  password: "",
  band: "",
  channel: "",
  hidden: false
});

const loading = ref(true);
const progress = ref(0);

// Загрузка статуса Wi-Fi Hotspot
const fetchHotspotStatus = async () => {
  try {
    const response = await axios.post(
      "/api/cmd",
      { command: "v1/wifi-hotspot/get-status" },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    hotspotStatus.value = response.data.data;
  } catch (err) {
    console.error("Ошибка получения статуса Wi-Fi:", err);
  } finally {
    loading.value = false;
  }
};

// Переключение Wi-Fi Hotspot
const toggleHotspot = async () => {
  const message = hotspotStatus.value.enabled 
    ? "Вы уверены, что хотите выключить Wi-Fi?" 
    : "Вы уверены, что хотите включить Wi-Fi?";
  
  if (!confirm(message)) {
    return;
  }

  loading.value = true;
  const command = hotspotStatus.value.enabled 
    ? "v1/wifi-hotspot/disable" 
    : "v1/wifi-hotspot/enable";

  try {
    await axios.post(
      "/api/cmd",
      { command: command },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    // Обновляем статус после переключения
    await fetchHotspotStatus();
  } catch (err) {
    console.error("Ошибка переключения Wi-Fi:", err);
  } finally {
    loading.value = false;
  }
};

const progressComp = computed(() => {
  return `width: ${progress.value}%`;
});

// Имитация прогресса
setInterval(() => {
  if (progress.value < 100) {
    progress.value += 1;
  }
}, 100);

onMounted(fetchHotspotStatus);
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Wi-Fi Hotspot -->
    <div class="flex flex-row items-center gap-4">
      <img :src="wifi" alt="Wi-Fi" />
      <span class="w-[120px] text-xs text-[#58636C] text-nowrap">
        {{ hotspotStatus.ssid || "Не настроено" }}
      </span>

      <div class="">
        <Switch
          :checked="hotspotStatus.enabled"
          @click="toggleHotspot"
          :disabled="loading"
          as="template"
          v-slot="{ checked }"
        >
          <button
            class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
            :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'"
            :disabled="loading"
          >
            <span class="sr-only">Enable Wi-Fi</span>
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
          <div class="text-xs text-[#58636C] text-nowrap">
            {{ hotspotStatus.band || '2.4ГГц' }}
          </div>
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