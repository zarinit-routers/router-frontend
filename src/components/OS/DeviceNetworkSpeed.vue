<script setup>
import { ref, watch, onMounted, watchEffect } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from 'chart.js'

import { useSystemStatsStore } from '../../stores/systemStatsStore'

import DropDown from '../baseComponents/DropDown.vue'

const systemStatsStore = useSystemStatsStore()

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend)

const chartCanvas = ref(null)
let chartInstance = null

const lastRx = {}
const lastTx = {}
const rxHistory = {}
const txHistory = {}
const labels = {}

const selectedInterfaces = ref(["eth0", "wwan0", "wwan1", "wwan2", "wwan3"])
const availableInterfaces = [
  { value: "eth0", label: "eth0" },
  { value: "wwan0", label: "wwan0" },
  { value: "wwan1", label: "wwan1" },
  { value: "wwan2", label: "wwan2" },
  { value: "wwan3", label: "wwan3" }
]
const selectedMetric = ref("Входящая скорость")
const availableMetrics = [
  { value: "Входящая скорость", label: "Входящая скорость" },
  { value: "Исходящая скорость", label: "Исходящая скорость" }
]

const setupChart = () => {
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: [],
      datasets: [] // создадим по два для каждого интерфейса
    },
    options: {
      layout: {
        padding: 0
      },
      maintainAspectRatio: false,
      responsive: true,
      animation: false,
      plugins: {
        beforeInit: function (chart, options) {
          chart.legend.afterFit = function () {
            this.height = this.height + 50;
          };
        },
        legend: {
          position: 'top',
          align: 'start',
          labels: {
            color: '#FFFFFF',
            boxWidth: 20,
            font: {
              size: 10,
              weight: 700,
              family: 'Montserrat'
            }
          },
        }
      },
      scales: {
        y: {
          grid: { drawTicks: false, drawBorder: false, color: '#555558' },
          ticks: {
            callback: function (value) {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + ' Gb'
              if (value >= 1000) return (value / 1000).toFixed(1) + ' Mb'
              return value + ' Kb'
            },
            count: 5,
            padding: 20, color: '#FFFFFF',
            font: {
              size: 10,
              weight: 300,
              family: 'Montserrat',
            }
          }
        },
        x: {
          grid: { drawTicks: false, drawBorder: false, color: '#555558', tickColor: '#FFFFFF' },
          ticks: {
            count: 24,
            autoSkip: false,
            color: '#FFFFFF', maxRotation: 41, minRotation: 41,
            padding: 8,
            maxTicksLimit: 24,
            font: {
              size: 8,
              weight: 'normal',
              family: 'Montserrat',
            }
          }
        }
      }
    }
  })
}

const circlePlugin = {
  id: 'xAxisCircles',
  afterDraw(chart) {
    const ctx = chart.ctx
    const xAxis = chart.scales.x

    const y = chart.chartArea.bottom

    xAxis.ticks.forEach((_, index) => {
      const x = xAxis.getPixelForTick(index)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = '#FFFFFF'
      ctx.fill()
    })
  }
}


Chart.register(circlePlugin)

const updateChart = () => {
  if (!chartInstance) return

  chartInstance.data.datasets = []
  const colors = {
    eth0: { rx: '#0066FF', tx: '#0066FF' },
    wwan0: { rx: '#07B755', tx: '#07B755' },
    wwan1: { rx: '#FF1D8D', tx: '#FF1D8D' },
    wwan2: { rx: '#C70039', tx: '#C70039' },
    wwan3: { rx: '#00FFFF', tx: '#00FFFF' }
  }

  Object.keys(rxHistory).forEach(iface => {
    if (!selectedInterfaces.value.includes(iface)) return

    chartInstance.data.datasets.push({
      label: `${iface}`,
      data: selectedMetric.value === 'Входящая скорость' ? rxHistory[iface] : txHistory[iface],
      borderColor: colors[iface]?.rx || 'blue',
      backgroundColor: colors[iface]?.rx || 'blue',
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 2
    })
  })

  const firstIface = Object.keys(labels)[0]
  chartInstance.data.labels = labels[firstIface] || []

  chartInstance.update()
}

watch(selectedMetric, () => {
  updateChart()
})

watchEffect(() => {
  systemStatsStore.networkUsage.forEach(iface => {
    const { Name, RxBytes, TxBytes } = iface

    if (Name === "eth0" || Name === "wwan0" || Name === "wwan1" || Name === "wwan2" || Name === "wwan3") {
      if (!(Name in lastRx)) {
        lastRx[Name] = RxBytes
        lastTx[Name] = TxBytes
        rxHistory[Name] = []
        txHistory[Name] = []
        labels[Name] = []
        return
      }

      const rxDelta = RxBytes - lastRx[Name]
      const txDelta = TxBytes - lastTx[Name]

      const rxKbps = (rxDelta / 1024).toFixed(2)
      const txKbps = (txDelta / 1024).toFixed(2)

      rxHistory[Name].push(rxKbps)
      txHistory[Name].push(txKbps)
      labels[Name].push(new Date().toLocaleTimeString())

      if (rxHistory[Name].length > 23) {
        rxHistory[Name].shift()
        txHistory[Name].shift()
        labels[Name].shift()
      }

      lastRx[Name] = RxBytes
      lastTx[Name] = TxBytes
    }

  })

  updateChart()
})

onMounted(() => {
  setupChart()
})
</script>

<template>
  <div class="flex gap-2 mb-6">
    <DropDown v-model="selectedInterfaces" :options="availableInterfaces" :multiple="true"
      placeholder="Выберите интерфейсы" />
    <DropDown v-model="selectedMetric" :options="availableMetrics" placeholder="Выберите метрику" />

  </div>

  <div class="bg-[#222228] rounded-lg pt-[17px] pr-[30px] pb-[12px] pl-[17px]">
    <canvas ref="chartCanvas" width="620" height="330"></canvas>
  </div>
</template>

<style scoped>
canvas {
  max-width: 100%;
}
</style>