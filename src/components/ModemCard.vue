<script setup>
import { computed, ref, watchEffect, defineEmits, watch } from "vue";
import axios from "axios";
import { Switch } from "@headlessui/vue";
import SimInfo from "./SimInfo.vue";
import { elements } from "chart.js";

const emit = defineEmits(['modem-changed'])

const props = defineProps({
  modem: {
    type: Object,
    required: true,
  },
});

const isEnable = ref(props.modem['3gpp']?.['operator-name'] !== '--')

const modemId = computed(() => {
  const dBusPath = props.modem['dbus-path'].split('/')
  return dBusPath[dBusPath.length - 1]
})

watch(isEnable,  (newState) => {
  console.log(newState)
  const action = newState ? 'enable' : 'disable' 
    axios.post(`/api/modems/${action}/${modemId.value}`).then(
      () => emit('modem-changed')    
    ).catch(error => console.error('Ошибка при смене состояния модема:', error))
    
})

const operatorName = computed(() => props.modem["3gpp"]?.["operator-name"] || "Нет оператора");

const operatorClass = computed(() => {
  const operator = operatorName.value.toLowerCase();
  if (operator.includes("tele2"));
  if (operator.includes("mts"));
  if (operator.includes("megafon"));
  if (operator.includes("beeline"));
  return "bg-gray-700";
});
</script>

<template>
  <div :class="['p-4 rounded-lg', operatorClass]">
    <h3 class="text-xl font-bold mb-2">{{ modem.generic.name }}</h3>
    <div class="flex justify-between">
      <p class="text-sm text-gray-300 mb-4">
        Оператор: {{ operatorName }}
      </p>
      <Switch v-model="isEnable" as="template" v-slot="{ checked }">
        <button
          class="relative inline-flex h-[20px] w-[36px] items-center rounded-full border-1 border-solid border-black"
          :class="checked ? 'bg-[#470ABF]' : 'bg-gray-200'">
          <span class="sr-only">Enable notifications</span>
          <span :class="checked ? 'translate-x-[16px]' : 'translate-x-[1px]'"
            class="inline-block h-[17px] w-[17px] transform rounded-full bg-white transition" />
        </button>
      </Switch>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div>
        <p class="text-sm text-gray-400">IMEI</p>
        <p class="text-white font-mono">{{ modem['3gpp']['imei'] }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Operator Code</p>
        <p class="text-white font-mono">{{ modem['3gpp']['operator-code'] }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Access Technologies</p>
        <p class="text-white font-mono">{{ modem['generic']['access-technologies'][0] }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Current Modes</p>
        <p class="text-white font-mono">{{ modem['generic']['current-modes'] }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Manufacturer</p>
        <p class="text-white font-mono">{{ modem['generic']['manufacturer'] }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-400">Model</p>
        <p class="text-white font-mono">{{ modem['generic']['model'] }}</p>
      </div>
    </div>
    <div class="mt-4">
      <SimInfo :simName="modem.sim" />
    </div>
  </div>
</template>
