<template>
  <header class="flex justify-between my-12 container mx-auto">


    <div class="logotip">
      <img src="../assets/logo.svg" alt="">
    </div>
    <div id="button" class="flex items-center ">
      <select class=" bg-[#222228] w-[130px] h-[39px] rounded-xl" name="language" id="">
        <option value="English" selected>English</option>
        <option value="Russian" selected>Russian</option>
      </select>
      <div class="flex items-center justify-between bg-[#222228] px-[12px] rounded-xl w-[200px] h-[39px] mx-[10px]" action="" type="submit" >
        <button class="flex "  >Перезагрузка </button>
          <img class="h-[21px]" src="../assets/header_buttons/refresh.svg" alt="">
      </div>
      
      <button class="w-[60px] h-[39px] flex items-center bg-[#222228] justify-center rounded-xl" @click="logout">
        <img src="../assets/header_buttons/exit.svg" alt="">
      </button>
    </div>


  </header>

</template>

<script setup>
const authMode = import.meta.env.VITE_AUTH_MODE;
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
}
</script>

<style>

</style>
