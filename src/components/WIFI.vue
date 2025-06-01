<script setup>
import { useWifiStore } from '../stores/wifiStore'
import { Switch } from '@headlessui/vue'
import Button from './baseComponents/Button.vue'
import Input from './baseComponents/Input.vue'
import DropDown from "./baseComponents/DropDown.vue";
import Loader from "./baseComponents/Loader.vue";
import { ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'

const wifiStore = useWifiStore()

const securityLevels = [
  { label: "Открытая", value: "none" },
  { label: "WPA2", value: "wpa2" },
  { label: "WPA3", value: "wpa3" },
];

const availableChanels24 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const availableChanels5 = [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140];

const wifiSecurity = ref('')
</script>

<template>
  <h2 class="text-xl font-semibold">Настройки Wi-Fi</h2>
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
          <form @submit.prevent="wifiStore.wifiUpdate(2)" class="relative">
            <fieldset :disabled="wifiStore.loading" :class="{ 'opacity-50 pointer-events-none': wifiStore.loading }">
              <div>
                <Input v-model="wifiStore.frequency24.ssid" class="mt-1 block w-full rounded-md  border-gray p-2"
                  placeholder="Введите SSID" :label="'SSID'" type="text" />
              </div>
              <div>
                <Input v-model="wifiStore.frequency24.password" type="password"
                  class="mt-1 block w-full rounded-md  border-gray-300 p-2" placeholder="Введите пароль"
                  :label="'Пароль'" />
              </div>
              <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
                <span class="text-sm text-[#54505B]">Канал</span>
                <Listbox v-model="wifiStore.frequency24.channel" class="mt-1 w-full">
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full cursor-pointer rounded-lg bg-[#37343D] py-3 pl-4 pr-10 text-left text-white shadow-md">
                      <span class="block truncate">
                        {{ wifiStore.frequency24.channel }}
                      </span>
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg class="h-[5px] w-[10px] text-gray-400" height="4" viewBox="0 0 10 4" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 4L0.669872 0.250001L9.33013 0.25L5 4Z" fill="white" />
                        </svg>
                      </span>
                    </ListboxButton>
                    <TransitionRoot enter="transition ease-out duration-100" enter-from="transform opacity-0 scale-95"
                      enter-to="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                      leave-from="transform opacity-100 scale-100" leave-to="transform opacity-0 scale-95">
                      <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#37343D] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-for="channel in availableChanels24" :value="channel"
                          class="relative cursor-pointer select-none py-2 pl-10 pr-4 text-white hover:bg-[#3b3b3b]"
                          v-slot="{ selected }">
                          <span class="block truncate" :class="selected ? 'font-medium' : 'font-normal'">
                            {{ channel }}
                          </span>
                          <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0l-3.536-3.535a1 1 0 111.414-1.415L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                            </svg>
                          </span>
                        </ListboxOption>
                      </ListboxOptions>
                    </TransitionRoot>
                  </div>
                </Listbox>
              </div>
              <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
                <span class="text-sm text-[#54505B]">WPS</span>
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
              <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2 text-red-700" v-if="wifiStore.error">
                {{ wifiStore.error }}
              </div>
              <div class="pt-4 flex">
                <Button type="submit"
                  class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 mx-auto transition">
                  Сохранить
                </Button>
              </div>
            </fieldset>
            <Loader class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              v-if="wifiStore.loading" />
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
          <form @submit.prevent="wifiStore.wifiUpdate(5)" class="relative">
            <fieldset :disabled="wifiStore.loading" :class="wifiStore.loading ? 'opacity-50 pointer-events-none' : ''">
              <div>
                <Input v-model="wifiStore.frequency5.ssid" class="mt-1 block w-full rounded-md  border-gray p-2"
                  placeholder="Введите SSID" :label="'SSID'" type="text" />
              </div>
              <div>
                <Input v-model="wifiStore.frequency5.password" type="password"
                  class="mt-1 block w-full rounded-md  border-gray-300 p-2" placeholder="Введите пароль"
                  :label="'Пароль'" />
              </div>
              <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
                <span class="text-sm text-[#54505B]">Канал</span>
                <Listbox v-model="wifiStore.frequency5.channel" class="mt-1 w-full">
                  <div class="relative">
                    <ListboxButton
                      class="relative w-full cursor-pointer rounded-lg bg-[#37343D] py-3 pl-4 pr-10 text-left text-white shadow-md">
                      <span class="block truncate">
                        {{ wifiStore.frequency5.channel }}
                      </span>
                      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg class="h-[5px] w-[10px] text-gray-400" height="4" viewBox="0 0 10 4" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 4L0.669872 0.250001L9.33013 0.25L5 4Z" fill="white" />
                        </svg>
                      </span>
                    </ListboxButton>
                    <TransitionRoot enter="transition ease-out duration-100" enter-from="transform opacity-0 scale-95"
                      enter-to="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                      leave-from="transform opacity-100 scale-100" leave-to="transform opacity-0 scale-95">
                      <ListboxOptions
                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#37343D] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        <ListboxOption v-for="channel in availableChanels5" :value="channel"
                          class="relative cursor-pointer select-none py-2 pl-10 pr-4 text-white hover:bg-[#3b3b3b]"
                          v-slot="{ selected }">
                          <span class="block truncate" :class="selected ? 'font-medium' : 'font-normal'">
                            {{ channel }}
                          </span>
                          <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                              fill="currentColor">
                              <path fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0l-3.536-3.535a1 1 0 111.414-1.415L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                clip-rule="evenodd" />
                            </svg>
                          </span>
                        </ListboxOption>
                      </ListboxOptions>
                    </TransitionRoot>
                  </div>
                </Listbox>
              </div>
              <div class="flex flex-col gap-2 mt-1 block w-full rounded-md p-2">
                <span class="text-sm text-[#54505B]">WPS</span>
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
              <div class="text-red-700">
                {{ wifiStore.error }}
              </div>
              <div class="pt-4">
                <Button type="submit"
                  class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 mx-auto transition">
                  Сохранить
                </Button>
              </div>
            </fieldset>
            <Loader class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              v-if="wifiStore.loading" />
          </form>
        </div>
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
