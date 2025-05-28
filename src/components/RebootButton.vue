<script setup>
import axios from "axios";

const reboot = () => {
  axios
    .post("/api/reboot")
    .then(() => {})
    .catch((err) => alert("Ошибка перезагрузки: " + err.message));
};
</script>

<template>
  <button
    class="mr-3 flex cursor-pointer items-baseline gap-2 bg-neutral-400/70 px-4 py-2 rounded-lg hover:bg-neutral-600/70 active:bg-neutral-700/50"
    @click="reboot"
    href=""
  >
    Перезагрузка
    <i class="fas fa-rotate-right"></i>
  </button>
</template>
