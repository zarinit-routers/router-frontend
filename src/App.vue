<script setup>
import { useRouter, RouterView } from "vue-router";
import { onMounted, watch } from "vue";
import { isAuthenticated } from "./auth";
import { useWifiStore } from "./stores/wifiStore";

const wifiStore = useWifiStore();

watch(() => wifiStore.isActive, (newValue) => {
  const action = newValue ? 'enable' : 'disable'
  wifiStore.togglePower(action)
})
import TheHeader from "./components/TheHeader.vue";

const router = useRouter();
onMounted(() => {
  wifiStore.wifiStatus()
  if (!isAuthenticated) {
    router.push("/login");
  }
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
