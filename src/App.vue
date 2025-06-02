<script setup>
import { useRouter, RouterView } from "vue-router";
import { onMounted, watch } from "vue";
import { isAuthenticated } from "./auth";
import { useWifiStore } from "./stores/wifiStore";
import { useConnectedClientsStore } from "./stores/connectedClientsStore";

const connectedClientsStore = useConnectedClientsStore();
const wifiStore = useWifiStore();

import TheHeader from "./components/layout/TheHeader.vue";

watch([() => wifiStore.frequency24.isActive, () => wifiStore.frequency5.isActive], ([new2, new5], [old2, old5]) => {
  if(!wifiStore.isInitialize) return

  if (new2 != old2) {
    const action = new2 ? 'enable' : 'disable'
    wifiStore.togglePower(action, 2)
  }
  if (new5 != old5) {
    const action = new5 ? 'enable' : 'disable'
    wifiStore.togglePower(action, 5)
  }
})

const router = useRouter();
onMounted(async () => {
  if (!isAuthenticated) {
    router.push("/login");
  }

  await connectedClientsStore.getClients();
  await wifiStore.initWifi()
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
