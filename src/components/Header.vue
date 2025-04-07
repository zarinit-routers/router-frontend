<template>
  <header class=" container flex justify-between mb-12  max-w-full bg-linear-to-br from-[#452587] to-[#470ABF] px-3">


    <div class="logotip flex items-center">
      <img src="../assets/logo.svg" alt="">
      <p class="ml-5">
        Zarinit MA4.16 | 00000001
      </p>
    </div>

    <div id="button" class="flex items-center ">
    
     <RebootButton />

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
import RebootButton from './RebootButton.vue'

const router = useRouter();

const logout = () => {
  localStorage.removeItem('authToken');
  router.push('/login');
}

const selectedLanguage = ref('ru')
</script>
