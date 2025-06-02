<template>
  <div class="flex items-center justify-center h-12 space-x-1">
    <div
      v-for="i in 3"
      :key="i"
      class="w-2 h-8 bg-violet-600 rounded-full animate-pulse"
      :style="`animation-delay: ${0.15 * (i - 1)}s`"
    ></div>
  </div>
</template>

<style scoped>
@keyframes custom-pulse {
  0%, 100% {
    transform: scaleY(0.6);
    opacity: 0.6;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

.animate-pulse {
  animation: custom-pulse 1s infinite ease-in-out;
}
</style>
