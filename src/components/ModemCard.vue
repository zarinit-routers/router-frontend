<template>
  <div class="space-y-4">
    <!-- Оператор -->
    <div v-if="modemOperator" class="flex items-center">
      <strong class="w-1/4 text-gray-600">Оператор:</strong>
      <span>{{ modemOperator.name }}</span>
      <span class="text-gray-500 font-mono ml-2">{{ modemOperator.code }}</span>
    </div>

    <!-- Состояние модема -->
    <div class="flex items-center">
      <strong class="w-1/4 text-gray-600">Состояние:</strong>
      <span :class="modemEnabled ? 'text-green-500' : 'text-yellow-500'">
        {{ modemEnabled ? 'Включён' : 'Выключен' }}
      </span>
    </div>

    <!-- IMEI -->
    <div class="flex items-center">
      <strong class="w-1/4 text-gray-600">IMEI:</strong>
      <span class="font-mono">{{ modem["equipment-identifier"] || '—' }}</span>
    </div>

    <!-- ICCID -->
    <div class="flex items-center">
      <strong class="w-1/4 text-gray-600">ICCID:</strong>
      <span class="font-mono">{{ modem["generic"]?.iccid || '—' }}</span>
    </div>

    <!-- IMSI -->
    <div class="flex items-center">
      <strong class="w-1/4 text-gray-600">IMSI:</strong>
      <span class="font-mono">{{ modem["generic"]?.imsi || '—' }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modem: Object,
});

const modemEnabled = computed(() => modem.generic.state !== 'disabled');
const modemOperator = computed(() => {
  const operatorName = modem["3gpp"]?.["operator-name"];
  if (operatorName && operatorName !== "--") {
    return {
      name: operatorName,
      code: modem["3gpp"]?.["operator-code"] || "—",
    };
  }
  return null;
});
</script>

<style scoped>
/* Стили для визуального оформления */
</style>
