<template>
  <div
    role="dialog"
    v-if="show"
    @click.self="close"
    class="z-50 h-full fixed inset-0 w-screen flex items-end sm:items-center justify-center bg-black/50 p-8 backdrop-blur-md"
  >
    <slot class="" />
  </div>
</template>
<script setup>
defineProps({ show: { type: Boolean }, close: { type: Function } });
</script>
