<template>
    <button
      :class="['w-[391px] h-[80px] flex items-center justify-center', customClass]"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    customClass: String,
  });
  </script>
  