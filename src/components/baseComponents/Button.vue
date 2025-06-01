<script setup>
const props = defineProps({
  customClass: String,
});
</script>

<template>
  <button
    :class="[
      'w-xs flex items-center justify-center',
      'bg-gradient-to-br from-[#452587] to-[#470ABF]',
      'text-white px-4 py-2 rounded-3xl',
      'hover:brightness-90 active:scale-98 transition-all duration-200',
      customClass
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
