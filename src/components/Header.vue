<template>
  <header class="flex justify-between my-12 container mx-auto">


    <div class="logotip">
      <img src="../assets/logo.svg" alt="">
    </div>
    <div id="button" class="flex items-center ">
      <Select v-model="selectedLanguage" classLabel="text-xs text-[#54505B] pb-2 pt-3"
        classSelect="p-3 rounded-lg bg-[#37343D] w-full" :options="[
          { value: 'en', label: 'English' },
          { value: 'ru', label: 'Русский' }
        ]" class=" bg-[#222228] w-[130px] h-[39px] rounded-xl" name="language" id="">
      </Select>
      <div class="flex items-center  justify-between bg-[#222228] px-[12px] rounded-xl w-[200px] h-[39px] "
        action="" type="submit">
        <Button class="flex justify-start  ">Перезагрузка </Button>
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
import Select from './Select.vue';
import { ref } from 'vue';
import Button from './Button.vue';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
}


const selectedLanguage = ref('ru')
</script>

<style></style>
