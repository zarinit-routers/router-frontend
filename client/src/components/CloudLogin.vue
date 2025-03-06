<template>
    <img id="" :src="logo">
         <form method="POST">
             <h1>Добро пожаловать!</h1>
             <p for="id_username">Логин</p>
             <input type="text" name="username" autofocus="" autocapitalize="none" autocomplete="username"
                 maxlength="150" required="" id="id_username" class="input">
             <p for="id_password">Пароль</p>
             <input type="password" name="password" autocomplete="current-password" required="" id="id_password"
                 class="input">
             <br>
             <button class="btn" type="submit" id="sub"> Войти</button>
             <br>
             <h3><a href="">Восстановить</a></h3>
         </form>
</template>

<style scoped>
</style>

<script setup>
import logo from '../assets/logo.svg'
</script>
