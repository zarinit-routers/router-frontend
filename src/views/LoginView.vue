<script setup>
import logo from "../assets/logo.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "../components/baseComponents/Input.vue";
import { login } from "../auth";

const router = useRouter();
const password = ref("");

const onSubmit = () => {
    login(password.value, true, router);
};
</script>

<template>
    <div class="container mx-auto py-25 flex flex-col items-center text-center px-100 absolute welcomeAlert z-49">
        <div class="h-18 flex justify-center">
            <img :src="logo" alt="logo" />
        </div>
        <h2 class="text-lg pt-16 pb-14">Добро пожаловать!</h2>
        <form @submit.prevent="onSubmit" class="w-md flex flex-col gap-4">
            <Input v-model="password" label="Пароль" type="password" autocomplete="current-password" />
            <button type="submit" class="button primary pill">Войти</button>
        </form>
    </div>
</template>

<style>
.welcomeAlert {
  position-area: center;
  min-block-size: -webkit-fill-available;
  min-inline-size: -webkit-fill-available;
}
</style>
