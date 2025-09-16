<script setup>
import Loader from "../baseComponents/Loader.vue";

import { computed } from "vue";

import { useSystemStatsStore } from "../../stores/systemStats";

const systemStatsStore = useSystemStatsStore();

const cpuLoad = computed(() => {
  const load = systemStatsStore.loadAverage?.Loadavg1 || 0;
  const cpuCount = systemStatsStore.cpuUsage?.CPUCount || 1;
  const loadPercentage = (load / cpuCount) * 100;
  return Math.min(loadPercentage, 100);
});

const arcPath = computed(() => {
  const angle = (cpuLoad.value / 100) * 180;
  const r = 40;
  const cx = 50;
  const cy = 90;
  const rad = (Math.PI * angle) / 180;
  const x = cx + r * Math.cos(Math.PI - rad);
  const y = cy - r * Math.sin(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;
  return `M${cx - r},${cy} A${r},${r} 0 ${largeArcFlag},1 ${x},${y}`;
});
</script>

<template>
  <div>
    <template v-if="systemStatsStore.loading">
      <Loader />
    </template>
    <template v-else-if="systemStatsStore.error">
      {{ systemStatsStore.error }}
    </template>
    <div v-else>
      <div>CPU</div>
      <div class="text-sm text-white">
        <p>
          <strong>Процессор:</strong>
          {{ systemStatsStore.cpuUsage.CPUCount }} ядер
        </p>
        <strong>Загруженность процессора:</strong> {{ Math.round(cpuLoad) }} %
      </div>
      <div class="flex flex-col p-5 mx-1">
        <svg width="100" height="70" viewBox="0 50 100 50">
          <path
            d="M10,90 A40,40 0 0,1 90,90"
            fill="none"
            stroke="#444"
            stroke-width="10"
            stroke-linecap="round"
          />
          <path
            :d="arcPath"
            fill="none"
            stroke="#0066FF"
            stroke-width="10"
            stroke-linecap="round"
          />
          <text x="50" y="90" text-anchor="middle" font-size="16" fill="#fff">
            {{ cpuLoad.toFixed(0) }}%
          </text>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
text {
  dominant-baseline: middle;
}
</style>
