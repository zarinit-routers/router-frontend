<template>
  <div class="text-sm text-gray-800 space-y-2">
    <div>
      <strong>Имя:</strong> {{ modem.generic.name }}
    </div>
    <div>
      <strong>Оператор:</strong>
      <span v-if="modem['3gpp']['operator-name'] && modem['3gpp']['operator-name'] !== '--'">
        {{ modem["3gpp"]["operator-name"] }} ({{ modem["3gpp"]["operator-code"] }})
      </span>
      <span v-else class="text-gray-500">Неизвестно</span>
    </div>
    <div>
      <strong>Состояние:</strong>
      <span :class="modemEnabled(modem) ? 'text-green-600' : 'text-yellow-500'">
        {{ modemEnabled(modem) ? "Включён" : "Выключен" }}
      </span>
    </div>
    <SimInfo :name="modem.generic.sim" />
  </div>
</template>

<script setup>
import SimInfo from "./SimInfo.vue";
defineProps(["modem"]);

const modemEnabled = (modem) => modem.generic.state !== "disabled";
</script>
