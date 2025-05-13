<template>
  <div class="flex flex-col flex-wrap gap-2">
    <div
      v-for="disk in disks"
      :key="disk.name"
      class="bg-[#2e2c35] p-4 rounded-lg flex flex-col items-center"
    >
      <svg width="100" height="100" viewBox="0 0 100 100">
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
      <div class="text-sm text-white text-center mt-2">
        <div class="font-mono">{{ disk.name }} -> {{ disk.mountPoint }}</div>
        <div>
          Использовано
          {{ formatMb(disk.used) }} из {{ formatMb(disk.size) }} МБ
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

// const props = defineProps({
//   disks: {
//     type: Array,
//     required: true,
//   },
// });

const disks = ref([]);
function getPercent(disk) {
  const used = parseInt(disk.used);
  const size = parseInt(disk.size);
  if (!size) return 0;
  return (used / size) * 100;
}

function getArcPath(percent) {
  const angle = (percent / 100) * 180;
  const r = 40;
  const cx = 50;
  const cy = 90;
  const rad = (Math.PI * angle) / 180;
  const x = cx + r * Math.cos(Math.PI - rad);
  const y = cy - r * Math.sin(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;
  return `M${cx - r},${cy} A${r},${r} 0 ${largeArcFlag},1 ${x},${y}`;
}

function formatMb(bytes) {
  return (parseInt(bytes) / 1024 / 1024).toFixed(0);
}
const fetchOsInfo = async () => {
  try {
    const response = await fetch(`/api/os-info`);
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    const data = await response.json();
    disks.value = data.DiskStats;
    console.log(data.DiskStats); // Логируем данные, полученные с сервера
  } catch (err) {
  } finally {
  }
};

// Загружаем данные при монтировании компонента
onMounted(fetchOsInfo);
</script>
