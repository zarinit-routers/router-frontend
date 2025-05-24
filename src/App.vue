<script setup>
import { useRouter, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { isAuthenticated } from "./auth";
import TheHeader from "./components/layout/TheHeader.vue";

const router = useRouter();
// Проверка авторизации при монтировании компонента
onMounted(() => {
  if (!isAuthenticated) {
    router.push("/login"); // Если токена нет, перенаправляем на страницу логина
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
  @apply bg-[#1b1b1f] text-white;
  font-family: Inter, "sans-serif";
}
</style>
