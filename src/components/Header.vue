<template>
  <header class="flex justify-between">


    <div class="logotip">
      <img src="../assets/logo.svg" alt="">
    </div>
    <div id="button" class="h_card flex align-center">
      <select class="language_select button_hover" name="language" id="">
        <option value="English" selected>English</option>
        <option value="Russian" selected>Russian</option>
      </select>
      <form class="h_button button_hover" action="" method="POST">
        <button class="h_but button_hover" style="padding-left: 10px;" type="submit">Перезагрузка <img
            style="padding-right: 10px;" src="../assets/header_buttons/refresh.svg" alt=""></button>
      </form>
      <form class="h_button button_hover" action="login" @submit.prevent="login" method="POST">

        <router-link class="nav_but " to="/" stype="submit"><img src="../assets/header_buttons/exit.svg" alt=""></router-link>
      </form>
    </div>


  </header>

</template>

<script>
const authMode = import.meta.env.VITE_AUTH_MODE;
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();


const router = useRouter();
const login = () => {
  router.push('/'); // Переход на главную страницу
};
</script>

<style>

</style>
