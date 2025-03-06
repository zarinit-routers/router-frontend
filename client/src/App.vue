<script setup>
import { createMemoryHistory, createRouter } from 'vue-router'
import Login from './components/Login.vue';
import Home from './components/Home.vue'

const authMode = import.meta.env.VITE_AUTH_MODE;

</script>

<template>
 <Login></Login>
  <!-- <HelloWorld v-if="authMode === 'router'" msg="Vite + Vue" /> -->
  
</template>

<style>

</style>
