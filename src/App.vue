<script setup>
const authMode = import.meta.env.VITE_AUTH_MODE;
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Header from './components/Header.vue';
import SideBar from './components/SideBar.vue';

const route = useRoute();
const isLoginPage = route.path === '/';


const router = useRouter();



  const token = ref(localStorage.getItem('jwtToken'));  // Храним токен в localStorage

// Логика для логина
const login = async (email, password) => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      token.value = data.token;
      localStorage.setItem('jwtToken', token.value);  // Сохраняем токен в localStorage
      router.push('/');  // Перенаправляем после успешного логина
    } else {
      console.error('Ошибка авторизации');
    }
  } catch (error) {
    console.error('Ошибка при запросе авторизации', error);
  }
};

// Логика для логаута
const logout = () => {
  localStorage.removeItem('jwtToken');
  token.value = null;
  router.push('/login');
};

// Функция для отправки запросов с авторизацией
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token.value}`,  // Добавляем токен в заголовок
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error('Ошибка запроса');
  }

  return response.json();
};

// Проверка авторизации при монтировании компонента
onMounted(() => {
  if (!token.value) {
    router.push('/login');  // Если токена нет, перенаправляем на страницу логина
  }
});
</script>

<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

body {
  background: #1B1B1F;
  color: white;
  font-family: Inter, 'sans-serif';
}
</style>
