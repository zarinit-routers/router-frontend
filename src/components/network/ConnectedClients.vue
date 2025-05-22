<script setup>
import { ref } from "vue";
import eth from "../../assets/eth.svg";
import wifi from "../../assets/wifi.svg";
import arrowBottom from "../../assets/arrow-bottom.svg";
import arrowTop from "../../assets/arrow-top.svg";

const clients = ref([
  {
    interface: "eth0",
    name: "Client 1",
    ip: "192.168.1.1",
    mac: "00:00:00:00:00:01",
    connected: true,
  },
  {
    interface: "wifi",
    name: "Client 2",
    ip: "192.168.1.1",
    mac: "00:00:00:00:00:01",
    connected: true,
  },
  {
    interface: "wifi",
    name: "Client 3",
    ip: "192.168.1.1",
    mac: "00:00:00:00:00:01",
    connected: false,
  },
  {
    interface: "wifi",
    name: "Client 4",
    ip: "192.168.1.1",
    mac: "00:00:00:00:00:01",
    connected: true,
  },
  {
    interface: "wifi",
    name: "Client 5",
    ip: "192.168.1.1",
    mac: "00:00:00:00:00:01",
    connected: true,
  },
]);

function interfaceIcon(inter) {
  switch (inter) {
    case inter.includes('eth'):
      return eth.value;
      break;
    case inter.includes('wifi'):
      return wifi.value;
    default:
      break;
  }
}
</script>
<template>
  <div class="flex flex-col gap-2">
    <div v-for="client in clients" :key="client.mac"
      class="bg-[#37343D] rounded-lg flex flex-row px-6 py-4 gap-2 justify-between">

      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <img :src="client.interface.includes('eth') ? eth : wifi" :alt="client.interface">
          <div class="text-sm text-[#F9FAFB]">{{ client.name }}</div>
          <div class="rounded-full h-2 w-2" :class="client.connected
            ? 'bg-green-400 shadow-green-600'
            : 'bg-yellow-300 shadow-yellow-500'
            " :title="client.connected ? 'Connected' : 'Disconnected'">
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div>{{ client.mac }}</div>
          <div>{{ client.ip }}</div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
          <div class="flex gap-4 items-center">
            <img :src="arrowBottom" alt="">
            <span>150 Мбит/с</span>
          </div>
          <div class="flex gap-4 items-center mt-auto">
            <img :src="arrowTop" alt="">
            <span>150 Мбит/с</span>
          </div>
      </div>
    </div>
  </div>
</template>
