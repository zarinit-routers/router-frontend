<template>
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
      {{ modem.operator }}
    </h2>
    <div class="text-sm text-gray-600 dark:text-gray-300">
      <p><strong>ICCID:</strong> {{ modem.iccid }}</p>
      <p><strong>IMEI:</strong> {{ modem.imei || '—' }}</p>
      <p><strong>Состояние:</strong> {{ modem.status || '—' }}</p>
      <p><strong>Сигнал:</strong> {{ modem.signal || '—' }}</p>
      <!-- Добавь любые другие поля, которые есть -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modem: {
    type: Object,
    required: true,
  },
})
</script>
