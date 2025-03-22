<template>
  <div
    v-if="show"
    @click.self="close"
    class="z-50 w-full h-full fixed top-0 left-0 right-0 flex justify-end bg-black/50 p-8 container"
  >
    <slot class="" />
  </div>
</template>
<script setup>
defineProps({ show: { type: Boolean }, close: { type: Function } });
</script>
