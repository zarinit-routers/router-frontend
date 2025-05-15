<template>
  <div class="pt-2">
    <strong>SIM:</strong>
    <span class="font-mono text-blue-700">{{ name }}</span>
  </div>
</template>

<script setup>
defineProps(["name"]);
</script>
