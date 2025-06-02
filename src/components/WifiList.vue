<script setup>
import { computed, ref } from "vue";
import { Switch } from '@headlessui/vue'
import { useWifiStore } from '../stores/wifiStore'
import wifi from "../assets/wifi.svg";

const wifiStore = useWifiStore()

const progress = ref(0)

setInterval(() => {
  if (progress.value < 100) {
    progress.value += 1
  }
}, 100)

const progressComp = computed(() => {
  return `width: ${progress.value}%`
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row items-center gap-4">
      <img :src="wifi" alt="">
      <span class="w-[120px] text-xs text-[#58636C] text-nowrap">{{ wifiStore.frequency24.ssid }}</span>

      <div class="">
        <Switch v-model=" wifiStore.frequency24.isActive" :disabled="wifiStore.loading" :class="{ 'opacity-50 pointer-events-none' : wifiStore.loading }" as="template" v-slot="{ checked }">
          <button
            class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
            :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
            <span class="sr-only">Enable notifications</span>
            <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
              class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
          </button>
        </Switch>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">Загруженность канала</div>
          <div class="text-xs text-[#58636C] text-nowrap">2,4ГГц</div>
        </div>
        <div class="w-full border-1 border-solid border-[#43668A] bg-gray-200 h-[12px] dark:bg-gray-700">
          <div class="h-[10px] bg-linear-to-r from-[#452587] via-47% to-[#470ABF] transition-[width] ease-in-out"
            :style="[progressComp]"></div>
        </div>
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">0%</div>
          <div class="text-xs text-[#58636C] text-nowrap">{{ progress }} %</div>
        </div>
      </div>
      <router-link to="/settings" class="p-3 bg-[#37343D] border-1 border-solid border-[#27242C] text-nowrap text-xs">
        Информация о сети
      </router-link>
    </div>
    <div class="flex flex-row items-center gap-4">
      <img :src="wifi" alt="">
      <span class="w-[120px] text-xs text-[#58636C] text-nowrap">{{ wifiStore.frequency5.ssid }}</span>

      <div class="">
        <Switch v-model="wifiStore.frequency5.isActive" :disabled="wifiStore.loading" :class="{ 'opacity-50 pointer-events-none' : wifiStore.loading }" as="template" v-slot="{ checked }">
          <button
            class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
            :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
            <span class="sr-only">Enable notifications</span>
            <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
              class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
          </button>
        </Switch>
      </div>
      <div class="w-full flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">Загруженность канала</div>
          <div class="text-xs text-[#58636C] text-nowrap">5 ГГц</div>
        </div>
        <div class="w-full border-1 border-solid border-[#43668A] bg-gray-200 h-[12px] dark:bg-gray-700">
          <div class="h-[10px] bg-linear-to-r from-[#452587] via-47% to-[#470ABF] transition-[width] ease-in-out"
            :style="[progressComp]"></div>
        </div>
        <div class="flex justify-between">
          <div class="text-xs text-[#58636C] text-nowrap">0%</div>
          <div class="text-xs text-[#58636C] text-nowrap">{{ progress }} %</div>
        </div>
      </div>
      <router-link to="/settings" class="p-3 bg-[#37343D] border-1 border-solid border-[#27242C] text-nowrap text-xs">
        Информация о сети
      </router-link>
    </div>
  </div>
</template>