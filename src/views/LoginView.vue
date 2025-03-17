<script setup>
import logo from "../assets/logo.svg";
import { ref } from "vue";
import Input from "../components/Input.vue";
import axios from "axios";

import { login } from "../auth";

const email = ref("");
const password = ref("");

// Логика авторизации
const onSubmit = async (e) => {
    login(email.value, password.value, true);
};
</script>

<template>
    <div class="container mx-auto py-25 flex align-center items-center flex-col px-100 text-center">
        <div class="h-18 flex justify-center">
            <img :src="logo" alt="logo" />
        </div>
        <h2 class="text-lg pt-16 pb-14">Добро пожаловать!</h2>
        <form @submit.prevent="onSubmit" class="w-md flex flex-col gap-4">
            <Input v-model="email" label="Email" type="email" autocomplete="email" />
            <Input v-model="password" label="Пароль" type="password" autocomplete="current-password" />
            <button type="submit" class="button primary pill">Войти</button>
        </form>
    </div>
</template>
