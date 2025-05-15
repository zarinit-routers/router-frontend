<template>
  <div class="space-y-3 text-sm text-gray-800">
    <div>
      <strong class="block text-gray-600">Имя устройства:</strong>
      <span class="font-medium text-gray-900">{{ modem.generic.name }}</span>
    </div>

    <div>
      <strong class="block text-gray-600">Оператор:</strong>
      <span v-if="modem['3gpp']['operator-name'] && modem['3gpp']['operator-name'] !== '--'">
        {{ modem["3gpp"]["operator-name"] }} ({{ modem["3gpp"]["operator-code"] }})
      </span>
      <span v-else class="text-gray-500">Нет информации</span>
    </div>

    <div>
      <strong class="block text-gray-600">Состояние:</strong>
      <span :class="modemEnabled(modem) ? 'text-green-600' : 'text-yellow-500'">
        {{ modemEnabled(modem) ? "Включён" : "Выключен" }}
      </span>
    </div>

    <div>
      <strong class="block text-gray-600">IMEI:</strong>
      <span class="font-mono">{{ modem.generic.imei || '—' }}</span>
    </div>

    <div>
      <strong class="block text-gray-600">ICCID:</strong>
      <span class="font-mono">{{ modem.generic.iccid || '—' }}</span>
    </div>

    <div>
      <strong class="block text-gray-600">IMSI:</strong>
      <span class="font-mono">{{ modem.generic.imsi || '—' }}</span>
    </div>

    <div>
      <strong class="block text-gray-600">Слот:</strong>
      <span>{{ modem.generic.slot || '—' }}</span>
    </div>

    <div>
      <strong class="block text-gray-600">SIM:</strong>
      <SimInfo :name="modem.generic.sim" />
    </div>
  </div>
</template>

<script setup>
import SimInfo from "./SimInfo.vue";
defineProps(["modem"]);

const modemEnabled = (modem) => modem.generic.state !== "disabled";
</script>
