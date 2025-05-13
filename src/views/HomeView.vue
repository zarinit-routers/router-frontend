<script setup>
import DeviceNetworkSpeed from "../components/OS/DeviceNetworkSpeed.vue";
import CPUsage from "../components/OS/CPUsage.vue";
import RamUsage from "../components/OS/RamUsage.vue";
import DiskUsage from "../components/OS/DiskUsage.vue";
import LAN from "../components/LAN.vue";
import ConnectedClients from "../components/network/ConnectedClients.vue";
import ModemList from "../components/ModemList.vue";

const miniStatiusticsComponents = [
  { component: CPUsage, title: "CPU usage" },
  { component: RamUsage, title: "RAM usage" },
  { component: DeviceNetworkSpeed, title: "Network speed" },
];
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="c in miniStatiusticsComponents"
        class="bg-neutral-800 flex flex-col h-full p-2"
      >
        <h4 class="text-lg font-bold mb-2 text-center">{{ c.title }}</h4>
        <component :is="c.component" />
      </div>
    </div>

    <div class="flex flex-wrap gap-4">
      <div>
        <h3>Диски</h3>
        <DiskUsage />
      </div>
      <div>
        <h3>LAN ports</h3>
        <LAN />
      </div>
      <div>
        <h3>Connected clients</h3>
        <ConnectedClients />
      </div>
      <div>
        <h3>Modems</h3>
        <ModemList />
      </div>
    </div>
  </div>
</template>

<style>
@import "../style.css";
h3 {
  @apply text-xl font-bold mb-2;
}
</style>
