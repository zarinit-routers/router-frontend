<script setup>
import logo from "../../assets/logo.svg";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import axios from "axios";
import RebootButton from "../RebootButton.vue";
import { logout, isAuthenticated } from "../../auth";

const router = useRouter();

const navLinks = [
  { title: "Дашборд", to: "/Home", icon: "fas fa-table-columns" },
  { title: "Настройки", to: "/settings", icon: "fas fa-gear" },
];

const info = ref({});
const isLoggedIn = ref(false);

const checkAuth = () => {
  isLoggedIn.value = isAuthenticated();
};

const handleLogout = () => {
  logout();
  router.push("/login");
};

onMounted(() => {
  axios.get("/api/device-info").then((res) => {
    info.value = res.data;
  });

  checkAuth();
  window.addEventListener("authChanged", checkAuth);
});

onUnmounted(() => {
  window.removeEventListener("authChanged", checkAuth);
});
</script>

<template>
  <header
    class="container flex justify-between mb-12 max-w-full bg-linear-to-br from-[#452587] to-[#470ABF] px-3"
  >
    <div class="flex items-center">
      <img :src="logo" alt="Zarinit logo" />
      <p class="ml-5 text-lg">
        {{ info.manufacturer }}
        {{ info.model }}
        <span class="text-sm text-gray-300">{{ info.modelVersion }} </span>
      </p>
    </div>

    <div class="flex justify-center items-center gap-2" v-if="isLoggedIn">
      <RouterLink
        v-for="l in navLinks"
        :key="l.to"
        :to="l.to"
        class="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg cursor-pointer active:bg-white/5"
        active-class="bg-white/30 text-neutral-300"
      >
        <i v-if="l.icon" class="me-1" :class="l.icon"></i>
        {{ l.title }}
      </RouterLink>
    </div>

    <div id="button" class="flex items-center" v-if="isLoggedIn">
      <RebootButton />

      <button
        class="px-6 py-3 flex items-center bg-[#222228] hover:bg-zinc-800 justify-center rounded-xl cursor-pointer"
        @click="handleLogout"
      >
        <i class="fas fa-right-from-bracket"></i>
      </button>
    </div>
  </header>
</template>
