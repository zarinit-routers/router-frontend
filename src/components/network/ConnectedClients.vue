<script setup>
import { ref } from "vue";
import eth from "../../assets/eth.svg";
import wifi from "../../assets/wifi.svg";
import arrowBottom from "../../assets/arrow-bottom.svg";
import arrowTop from "../../assets/arrow-top.svg";
import { useConnectedClientsStore } from "../../stores/connectedClientsStore";

const connectedClientsStore = useConnectedClientsStore();
</script>
<template>
  <div class="flex flex-col gap-2">
    <div v-for="(client, index) in connectedClientsStore.clients"
      class="bg-[#37343D] rounded-lg flex flex-row px-6 py-4 gap-2 justify-between">

      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <img :src="client.interface.includes('eth') ? eth : wifi" :alt="client.interface">
          <div class="text-sm text-[#F9FAFB]">Client {{ index }}</div>
          <div class="rounded-full h-2 w-2 bg-green-400 shadow-green-600">
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div>{{ client.mac }}</div>
          <div>192.168.1.1</div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
          <div class="flex gap-4 items-center">
            <img :src="arrowBottom" alt="">
            <span>{{ (client.rxBitrate/1024).toPrecision(2) }} КБит/с</span>
          </div>
          <div class="flex gap-4 items-center mt-auto">
            <img :src="arrowTop" alt="">
            <span>{{ (client.txBitrate/1024).toPrecision(2) }} КБит/с</span>
          </div>
      </div>
    </div>
  </div>
</template>
