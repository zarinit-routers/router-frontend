<script setup>
import { useRouter, RouterView } from "vue-router";
import { onMounted, watch } from "vue";
import { isAuthenticated } from "./auth";
import { useWifiHotspotStore } from "./stores/wifi"; 
import { useConnectedClientsStore } from "./stores/connectedClientsStore";

import TheHeader from "./components/layout/TheHeader.vue";

const wifiHotspotStore = useWifiHotspotStore(); 
const connectedClientsStore = useConnectedClientsStore();


watch(
  () => wifiHotspotStore.enabled,
  async (newEnabled, oldEnabled) => {
    if (newEnabled !== oldEnabled) {
      await wifiHotspotStore.toggleEnabled(); 
    }
  }
);

const router = useRouter();
onMounted(async () => {
  if (!isAuthenticated) {
    router.push("/login");
  }

  await connectedClientsStore.getClients();
  await wifiHotspotStore.fetchStatus(); 
});
</script>

<template>
  <TheHeader class="sticky top-0 z-50 shadow-md shadow-gray-800"></TheHeader>
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
@import "./style.css";

body {
  font-family: Inter, "sans-serif";
}
</style>