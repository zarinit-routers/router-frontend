<script setup>
import Loader from "../baseComponents/Loader.vue";

import { useSystemStatsStore } from "../../stores/systemStats";

const systemStatsStore = useSystemStatsStore();

const getPercent = (disk) => {
  const used = parseInt(disk.used);
  const size = parseInt(disk.size);
  if (!size) return 0;
  return (used / size) * 100;
};

const getArcPath = (percent) => {
  const angle = (percent / 100) * 180;
  const r = 40;
  const cx = 50;
  const cy = 90;
  const rad = (Math.PI * angle) / 180;
  const x = cx + r * Math.cos(Math.PI - rad);
  const y = cy - r * Math.sin(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;
  return `M${cx - r},${cy} A${r},${r} 0 ${largeArcFlag},1 ${x},${y}`;
};

const formatMb = (bytes) => {
  return (parseInt(bytes) / 1024 / 1024).toFixed(0);
};
</script>

<template>
  <Loader v-if="systemStatsStore.loading" />
  <div v-else-if="systemStatsStore.error" class="text-red-700">
    {{ systemStatsStore.error }}
  </div>
  <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-2 my-5">
    <div
      v-for="disk in systemStatsStore.diskUsage"
      :key="disk.name"
      class="bg-[#2e2c35] p-1 rounded-lg flex flex-col items-center gap-2"
    >
      <svg class="w-30 h-30">
        <path
          d="M10,90 A40,40 0 0,1 90,90"
          fill="none"
          stroke="#444"
          stroke-width="10"
          stroke-linecap="round"
        />
        <path
          :d="getArcPath(getPercent(disk))"
          fill="none"
          stroke="#0066FF"
          stroke-width="10"
          stroke-linecap="round"
        />
        <text x="50" y="90" text-anchor="middle" font-size="16" fill="#fff">
          {{ getPercent(disk).toFixed(0) }}%
        </text>
      </svg>
      <div class="text-sm text-white text-center">
        <div class="font-mono">{{ disk.name }}</div>
        <div>
          Использовано
          {{ formatMb(disk.used) }} из {{ formatMb(disk.size) }} GB
        </div>
      </div>
    </div>
  </div>
</template>
