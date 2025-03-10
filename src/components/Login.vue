<template>
  <div class="container mx-auto py-25 flex align-center flex-col px-100 text-center">
    <div class="h-18 flex justify-center">
      <img :src="logo" alt="logo" />
    </div>
    <p class="text-lg pt-16 pb-14">Добро пожаловать!</p>
    <form @submit.prevent="login">
      <div class="form__fields">
        <div class="form__field flex flex-col text-left">
          <Input v-model="email" label="Email" classLabel="text-xs text-[#54505B] pb-2 pt-3"
            classInput="p-4 rounded-lg w-full bg-[#37343D]" type="email" placeholder="" />
        </div>
        <div class="form__field flex flex-col text-left">
          <Input v-model="password" label="Пароль" classLabel="text-xs text-[#54505B] pb-2 pt-3"
            classInput="p-4 rounded-lg w-full bg-[#37343D]" type="password" placeholder="" />
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

<script setup>
import logo from '../assets/logo.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Input from '../components/Input.vue'
import { fetchWithAuth } from '../utils/fetchWithAuth.js' // Импорт функции для авторизованных запросов

const router = useRouter()
const email = ref('')
const password = ref('')

// Логика авторизации
const login = async () => {
  if (email.value && password.value) {
    try {
      // Отправляем запрос на сервер для авторизации через fetchWithAuth
      const response = await fetchWithAuth('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })

      if (response.ok && data.token) {
        // Сохраняем JWT в localStorage
        localStorage.setItem('jwtToken', data.token);
        // Переход на главную страницу после успешного логина
        router.push('/home');
      } else {
        alert('Ошибка авторизации: ' + data.error);
      }
    } catch (error) {
      console.error('Ошибка при подключении:', error)
      alert('Ошибка при авторизации.')
    }
  } else {
    alert('Введите email и пароль')
  }
}
</script>
