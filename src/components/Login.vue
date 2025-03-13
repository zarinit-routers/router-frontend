<script setup>
import logo from '../assets/logo.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '../components/Input.vue'
import axios from 'axios';

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('');
const successMessage = ref('');

// Логика авторизации
const onSubmit = async (e) => {
  e.preventDefault();

  try {
    // Отправка данных на сервер
    const response = await axios.post('/api/auth', {
      email: email.value,
      password: password.value
    });

    if (response.status === 200) {
      // Успешная авторизация
      successMessage.value = 'Авторизация прошла успешно!';
      errorMessage.value = '';
      localStorage.setItem('authToken', response.data.token);  // Пример
      router.push({ path: '/' });
    }
  } catch (error) {
    // Ошибка авторизации
    errorMessage.value = 'Неверный логин или пароль. Попробуйте снова.';
    successMessage.value = '';
  }
};
</script>

<template>
  <div class="container mx-auto py-25 flex align-center  items-center flex-col px-100 text-center">
    <div class="h-18 flex justify-center">
      <img :src="logo" alt="logo" />
    </div>
    <p class="text-lg pt-16 pb-14">Добро пожаловать!</p>
    <form @submit.prevent="onSubmit" class="w-md">
      <div class="">
        <div class="flex flex-col text-left w-md">
          <Input v-model="email" label="Email" classLabel="text-xs text-[#54505B] pb-2 pt-3"
            classInput="p-4 rounded-lg  bg-[#37343D]" type="email" placeholder="" />
        </div>
        <div class="form__field flex flex-col w-md text-left">
          <Input v-model="password" label="Пароль" classLabel="text-xs text-[#54505B] pb-2 pt-3"
            classInput="p-4 rounded-lg  bg-[#37343D]" type="password" placeholder="" />
        </div>
      </div>
      <div class="form__controls pt-8">
        <button type="submit" class="p-3 rounded-[3vw] w-full bg-gradient-to-r from-[#452587] to-[#470ABF] text-white">
          Войти
        </button>
      </div>
    </form>
  </div>
</template>

