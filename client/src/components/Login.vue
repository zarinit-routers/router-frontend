<template>
    <img :src="logo">
    <form @submit.prevent="login">
      <h1>Добро пожаловать!</h1>
      <p>Логин</p>
      <input type="text" v-model="username" required class="input">
      
      <p>Пароль</p>
      <input type="password" v-model="password" required class="input">
      
      <br>
      <button class="btn" type="submit">Войти</button>
      <br>
      <h3><a href="#">Восстановить</a></h3>
    </form>
  </template>
<style scoped>

h1{
    margin: 50px;
    font-size: 20px;
}
button,
input{
    width: 430px;
}
p{
    display: flex;
}

</style>

<script setup>
import logo from '../assets/logo.svg'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

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