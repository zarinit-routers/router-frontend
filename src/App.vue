<script setup>
const authMode = import.meta.env.VITE_AUTH_MODE;
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import Header from './components/Header.vue';
import SideBar from './components/SideBar.vue';

const route = useRoute();
const isLoginPage = route.path === '/';


const router = useRouter();
const login = () => {
    router.push('/'); // Переход на главную страницу
  };
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
