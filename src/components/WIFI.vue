<script setup>
import { ref, onMounted } from "vue";
import { Switch } from "@headlessui/vue";
import axios from "axios";
import { getToken } from "@/auth";
import Button from "./baseComponents/Button.vue";
import Input from "./baseComponents/Input.vue";
import DropDown from "./baseComponents/DropDown.vue";
import Loader from "./baseComponents/Loader.vue";

const hotspotSettings = ref({
  enabled: false,
  ssid: "",
  password: "",
  channel: "",
  hidden: false
});

const loading = ref(true);
const saving = ref(false);
const error = ref("");

const availableChannels = ref([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
]);

const securityLevels = [
  { label: "WPA2", value: "wpa2" },
  { label: "WPA3", value: "wpa3" },
];

const selectedSecurity = ref("wpa2");

// Загрузка текущих настроек
const fetchHotspotSettings = async () => {
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
    hotspotSettings.value = response.data.data;
  } catch (err) {
    console.error("Ошибка получения настроек:", err);
    error.value = "Ошибка загрузки настроек";
  } finally {
    loading.value = false;
  }
};

// Обновление отдельных настроек
const updateSetting = async (endpoint, data) => {
  try {
    await axios.post(
      "/api/cmd",
      { 
        command: endpoint,
        ...data
      },
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
    error.value = "";
  } catch (err) {
    console.error(`Ошибка обновления настройки ${endpoint}:`, err);
    error.value = `Ошибка сохранения: ${err.response?.data?.message || err.message}`;
    throw err;
  }
};

// Сохранение всех настроек
const saveSettings = async () => {
  saving.value = true;
  error.value = "";

  try {
    // Обновляем настройки по отдельности
    if (hotspotSettings.value.ssid) {
      await updateSetting("v1/wifi-hotspot/set-ssid", {
        ssid: hotspotSettings.value.ssid
      });
    }

    if (hotspotSettings.value.password) {
      await updateSetting("v1/wifi-hotspot/set-password", {
        password: hotspotSettings.value.password
      });
    }

    if (hotspotSettings.value.channel) {
      await updateSetting("v1/wifi-hotspot/set-channel", {
        channel: parseInt(hotspotSettings.value.channel)
      });
    }

    await updateSetting("v1/wifi-hotspot/set-ssid-visibility", {
      hidden: hotspotSettings.value.hidden
    });

    // Перезагружаем настройки для подтверждения
    await fetchHotspotSettings();
    
    alert("Настройки успешно сохранены!");
  } catch (err) {
    // Ошибка уже обработана в updateSetting
  } finally {
    saving.value = false;
  }
};

// Переключение Hotspot
const toggleHotspot = async () => {
  const message = hotspotSettings.value.enabled 
    ? "Вы уверены, что хотите выключить Wi-Fi?" 
    : "Вы уверены, что хотите включить Wi-Fi?";
  
  if (!confirm(message)) {
    return;
  }

  loading.value = true;
  const command = hotspotSettings.value.enabled 
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
    await fetchHotspotSettings();
  } catch (err) {
    console.error("Ошибка переключения:", err);
    error.value = "Ошибка переключения";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchHotspotSettings);
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">Настройки Wi-Fi</h2>
    
    <!-- Статус Hotspot -->
    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <span class="text-sm font-medium">Wi-Fi</span>
      <Switch
        :checked="hotspotSettings.enabled"
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

    <!-- Настройки (только если Hotspot включен) -->
    <div v-if="hotspotSettings.enabled" class="space-y-4">
      <form @submit.prevent="saveSettings" class="relative">
        <fieldset
          :disabled="saving"
          :class="{ 'opacity-50 pointer-events-none': saving }"
        >
          <!-- SSID -->
          <div class="mb-4">
            <Input
              v-model="hotspotSettings.ssid"
              class="mt-1 block w-full rounded-md border-gray-300 p-2"
              placeholder="Введите имя сети (SSID)"
              :label="'Имя сети (SSID)'"
              type="text"
            />
          </div>

          <!-- Пароль -->
          <div class="mb-4">
            <Input
              v-model="hotspotSettings.password"
              type="password"
              class="mt-1 block w-full rounded-md border-gray-300 p-2"
              placeholder="Введите пароль"
              :label="'Пароль'"
            />
          </div>

          <!-- Канал -->
          <div class="mb-4">
            <span class="text-sm text-[#54505B] block mb-2">Канал</span>
            <select
              v-model="hotspotSettings.channel"
              class="w-full rounded-lg bg-[#37343D] py-3 px-4 text-white border-none focus:ring-2 focus:ring-[#470ABF]"
            >
              <option value="">Автоматически</option>
              <option v-for="channel in availableChannels" :key="channel" :value="channel">
                {{ channel }}
              </option>
            </select>
          </div>

          <!-- Уровень безопасности -->
          <div class="mb-4">
            <span class="text-sm text-[#54505B] block mb-2">Безопасность</span>
            <DropDown
              v-model="selectedSecurity"
              :options="securityLevels"
              option-label="label"
              option-value="value"
              :placeholder="'Выберите уровень безопасности'"
              customClass="w-full"
            />
          </div>

          <!-- Скрытая сеть -->
          <div class="mb-4 flex items-center justify-between">
            <span class="text-sm text-[#54505B]">Скрытая сеть</span>
            <Switch
              v-model="hotspotSettings.hidden"
              as="template"
              v-slot="{ checked }"
            >
              <button
                class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
                :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'"
              >
                <span class="sr-only">Скрыть сеть</span>
                <span
                  :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
                  class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition"
                />
              </button>
            </Switch>
          </div>

          <!-- Ошибка -->
          <div
            v-if="error"
            class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          >
            {{ error }}
          </div>

          <!-- Кнопка сохранения -->
          <div class="pt-4 flex">
            <Button
              type="submit"
              :disabled="saving"
              class="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 mx-auto transition disabled:opacity-50"
            >
              {{ saving ? 'Сохранение...' : 'Сохранить настройки' }}
            </Button>
          </div>
        </fieldset>
        
        <Loader
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          v-if="saving"
        />
      </form>
    </div>

    <!-- Сообщение когда Hotspot выключен -->
    <div v-else class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p class="text-yellow-800 text-sm">
        Включите Wi-Fi для настройки параметров сети.
      </p>
    </div>
  </div>
</template>