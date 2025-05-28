<script setup>
import { useWifiStore } from '../stores/wifiStore'
import { Switch } from '@headlessui/vue'
import Button from './baseComponents/Button.vue'
import Input from './baseComponents/Input.vue'
import DropDown from "./baseComponents/DropDown.vue";
import { ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const wifiStore = useWifiStore()

const securityLevels = [
  { label: "Открытая", value: "none" },
  { label: "WPA2", value: "wpa2" },
  { label: "WPA3", value: "wpa3" },
];

const wifiSecurity = ref('')
</script>

<template>
  <h2 class="text-xl font-semibold">Настройки Wi-Fi</h2>
  <!--TODO: Вынести табы выше-->
  <TabGroup>
    <TabList :class="['flex rounded-t-lg overflow-hidden border border-[#363E4B] bg-[#2C2F36]']">
      <Tab as="template" v-slot="{ selected }">
        <button class="flex-1 h-10 px-4 text-sm font-semibold transition-colors duration-300 outline-none" :class="[
          selected
            ? 'bg-[#470ABF] text-white shadow-inner'
            : 'text-gray-300 hover:bg-[#3A3F4B]'
        ]">
          2.4 GHz
        </button>
      </Tab>
      <Tab as="template" v-slot="{ selected }">
        <button class="flex-1 h-10 px-4 text-sm font-semibold transition-colors duration-300 outline-none" :class="[
          selected
            ? 'bg-[#470ABF] text-white shadow-inner'
            : 'text-gray-300 hover:bg-[#3A3F4B]'
        ]">
          5 GHz
        </button>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Wi-Fi Enable</span>
          <Switch v-model="wifiStore.frequency24.isActive" as="template" v-slot="{ checked }">
            <button
              class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
              :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
              <span class="sr-only">Enable notifications</span>
              <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
                class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
            </button>
          </Switch>
        </div>

        <div v-if="wifiStore.frequency24.isActive" class="space-y-4">
          <form @submit.prevent="wifiStore.wifiUpdate(2)">
            <div>
              <Input v-model="wifiStore.frequency24.ssid" class="mt-1 block w-full rounded-md  border-gray p-2"
                placeholder="Введите SSID" :label="'SSID'" type="text" />
            </div>
            <div>
              <Input v-model="wifiStore.frequency24.password" type="password"
                class="mt-1 block w-full rounded-md  border-gray-300 p-2" placeholder="Введите пароль"
                :label="'Пароль'" />
            </div>
            <div>
              <Input v-model.number="wifiStore.frequency24.channel" type="number" min="1" max="11"
                class="mt-1 block w-full rounded-md p-2" :label="'Канал'" />
            </div>
            <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
              <DropDown v-model="wifiSecurity" :options="securityLevels" option-label="label" option-value="value"
                :placeholder="'Выберите уровень безопасности'" customClass="mt-1 w-full" />
            </div>
            <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
              <span class="text-sm text-[#54505B]">Скрыть</span>
              <Switch v-model="wifiStore.frequency24.hidden" as="template" v-slot="{ checked }">
                <button
                  class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
                  :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
                  <span class="sr-only">Enable notifications</span>
                  <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
                    class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
                </button>
              </Switch>
            </div>
            <div class="pt-4">
              <Button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </TabPanel>
      <TabPanel>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Wi-Fi Enable</span>
          <Switch v-model="wifiStore.frequency5.isActive" as="template" v-slot="{ checked }">
            <button
              class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
              :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
              <span class="sr-only">Enable notifications</span>
              <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
                class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
            </button>
          </Switch>
        </div>

        <div v-if="wifiStore.frequency5.isActive" class="space-y-4">
          <form @submit.prevent="wifiStore.wifiUpdate(5)">
            <div>
              <Input v-model="wifiStore.frequency5.ssid" class="mt-1 block w-full rounded-md  border-gray p-2"
                placeholder="Введите SSID" :label="'SSID'" type="text" />
            </div>
            <div>
              <Input v-model="wifiStore.frequency5.password" type="password"
                class="mt-1 block w-full rounded-md  border-gray-300 p-2" placeholder="Введите пароль"
                :label="'Пароль'" />
            </div>
            <div>
              <Input v-model.number="wifiStore.frequency5.channel" type="number" min="1" max="11"
                class="mt-1 block w-full rounded-md p-2" :label="'Канал'" />
            </div>
            <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
              <DropDown v-model="wifiSecurity" :options="securityLevels" option-label="label" option-value="value"
                :placeholder="'Выберите уровень безопасности'" customClass="mt-1 w-full" />
            </div>
            <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
              <span class="text-sm text-[#54505B]">Скрыть</span>
              <Switch v-model="wifiStore.frequency5.hidden" as="template" v-slot="{ checked }">
                <button
                  class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
                  :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
                  <span class="sr-only">Enable notifications</span>
                  <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
                    class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
                </button>
              </Switch>
            </div>
            <div class="pt-4">
              <Button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
