<template>
  <h2 class="text-xl font-semibold">Настройки Wi-Fi</h2>

  <div class="flex items-center justify-between">
    <span class="text-sm font-medium">Wi-Fi</span>
    <Switch v-model="wifiStore.isActive" as="template" v-slot="{ checked }">
      <button
        class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
        :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
        <span class="sr-only">Enable notifications</span>
        <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
          class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
      </button>
    </Switch>
  </div>

  <div v-if="wifiStore.isActive" class="space-y-4">
    <form @submit.prevent="wifiStore.wifiUpdateData">
      <div>
        <Input v-model="wifiStore.ssid" class="mt-1 block w-full rounded-md  border-gray p-2" placeholder="Введите SSID"
          :label="'SSID'" type="text" />
      </div>
      <div>
        <Input v-model="wifiStore.password" type="password" class="mt-1 block w-full rounded-md  border-gray-300 p-2"
          placeholder="Введите пароль" :label="'Пароль'" />
      </div>
      <div>
        <Input v-model.number="wifiStore.channel" type="number" min="1" max="11"
          class="mt-1 block w-full rounded-md p-2" :label="'Канал'" />
      </div>
      <div>
        <label class="block text-sm font-medium">Безопасность</label>
        <DropDown v-model="wifi.security" :options="securityLevels" option-label="label" option-value="value"
          :placeholder="'Выберите уровень безопасности'" customClass="mt-1 w-full" />
      </div>
      <div class="pt-4">
        <Button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
          Сохранить
        </Button>
      </div>
    </form>
  </div>
  </div>
</template>

<script setup>
import { useWifiStore } from '../stores/wifiStore'
import { Switch } from '@headlessui/vue'
import Button from './baseComponents/Button.vue'
import Input from './baseComponents/Input.vue'
import DropDown from "./baseComponents/DropDown.vue";

const wifiStore = useWifiStore()

const securityLevels = [
  { label: "Открытая", value: "none" },
  { label: "WPA2", value: "wpa2" },
  { label: "WPA3", value: "wpa3" },
];

</script>
