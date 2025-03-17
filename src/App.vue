<script setup>
import { useRouter, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import { isAuthenticated } from "./auth";

const router = useRouter();
// Проверка авторизации при монтировании компонента
onMounted(() => {
    if (!isAuthenticated) {
        router.push("/login"); // Если токена нет, перенаправляем на страницу логина
    }
});
</script>

<template>
    <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

body {
    background: #1b1b1f;
    color: white;
    font-family: Inter, "sans-serif";
}
</style>
