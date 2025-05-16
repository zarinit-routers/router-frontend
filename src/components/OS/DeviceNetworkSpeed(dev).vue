<template>
  <div class="bg-[#222228] rounded-lg pt-[17px] pr-[30px] pb-[12px] pl-[17px] mx-auto">
    <canvas ref="chartCanvas" width="507" height="220"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend)

const chartCanvas = ref(null)
let chartInstance = null

const lastRx = {}
const lastTx = {}
const rxHistory = {}
const txHistory = {}
const labels = {}

const fetchNetload = () => {
  axios.get('/api/os-info').then(res => {
    const interfaces = res.data.NetworkStats

    interfaces.forEach(iface => {
      const { Name, RxBytes, TxBytes } = iface

      if (Name === "eth0" || Name === "wwan0") {
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
}

const setupChart = () => {
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: [], // будет обновляться динамически
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
          padding: 45,
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
            padding: 20, color: '#FFFFFF',
            maxTicksLimit: 5,
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
    wwan0: { rx: '#07B755', tx: '#07B755' }
  }

  Object.keys(rxHistory).forEach(iface => {
    chartInstance.data.datasets.push({
      label: `${iface}`,
      data: rxHistory[iface],
      borderColor: colors[iface]?.rx || 'blue',
      backgroundColor: colors[iface]?.rx || 'blue',
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 2
    })

    /*chartInstance.data.datasets.push({
      label: `${iface} Upload`,
      data: txHistory[iface],
      borderColor: 'rgba(255, 99, 132, 0.8)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      tension: 0.4
    })*/
  })

  // Используем метки одного интерфейса (например, первого)
  const firstIface = Object.keys(labels)[0]
  chartInstance.data.labels = labels[firstIface] || []

  chartInstance.update()
}


onMounted(() => {
  setupChart()
  fetchNetload()
  setInterval(fetchNetload, 5000)
})
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>