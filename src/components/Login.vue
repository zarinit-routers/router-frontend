<template>
  <div class="container mx-auto py-25 flex align-center flex-col px-100 text-center">
    <div class="h-18 flex justify-center">
      <img :src="logo" alt="logo">
    </div>
    <p class="text-lg pt-16 pb-14">Добро пожаловать!</p>
    <form @submit.prevent="login">
      <div class="form__fields">
        <div class="form__field flex flex-col text-left">
          <Input
              v-model="username"
              label="Логин"
              classLabel="text-xs text-[#54505B] pb-2 pt-3"
              classInput="p-4 rounded-lg w-full bg-[#37343D]"
              type="text"
              placeholder=""
          />
        </div>
        <div class="form__field flex flex-col text-left">
          <Input
              v-model="password"
              label="Пароль"
              classLabel="text-xs text-[#54505B] pb-2 pt-3"
              classInput="p-4 rounded-lg w-full bg-[#37343D]"
              type="password"
              placeholder=""
          />
        </div>
      </div>
      <div class="form__controls pt-8">
        <button
            type="submit"
            class="p-3 rounded-[3vw] w-full bg-gradient-to-r from-[#452587] to-[#470ABF] text-white"
        >
          Войти
        </button>
      </div>
    </form>
  </div>
</template>

<style>

</style>

<script setup>
import logo from '../assets/logo.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import Input from '../components/Input.vue';

const router = useRouter();
const username = ref('');
const password = ref('');

const login = () => {
  if (username.value && password.value) {
    router.push('/home'); // Переход на главную страницу
  } else {
    alert('Введите логин и пароль');
  }
};
</script>
