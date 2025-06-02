<script setup>
import { ref, computed } from "vue";

import Loader from "../baseComponents/Loader.vue";

import { useSystemStatsStore } from "../../stores/systemStatsStore";

const systemStatsStore = useSystemStatsStore();

const percent = computed(() =>
  systemStatsStore.memoryUsage.Used ? (systemStatsStore.memoryUsage.Used / systemStatsStore.memoryUsage.Total) * 100 : 0,
);

const arcPath = computed(() => {
  const angle = (percent.value / 100) * 180;
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
  <Loader v-if="systemStatsStore.loading" />
  <div v-else-if="systemStatsStore.error" class="text-red-700">
    {{ systemStatsStore.error }}
  </div>
  <div v-else class="flex flex-col">
    <h4>RAM</h4>
    <div class="text-sm text-white">
      Память: 
      <span class="font-mono">{{ (systemStatsStore.memoryUsage.Used / 1024 / 1024).toFixed(0) }}</span> из
      <span class="font-mono">{{ (systemStatsStore.memoryUsage.Total / 1024 / 1024).toFixed(0) }}</span> МБ
    </div>
    <div class="p-5 mx-1">
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
        {{ percent.toFixed(0) }}%
      </text>
    </svg>
    </div>
  </div>
</template>

<style scoped>
text {
  dominant-baseline: middle;
}
</style>
