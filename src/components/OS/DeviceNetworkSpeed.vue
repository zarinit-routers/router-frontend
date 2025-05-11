<template>
    <div>
      <h3 class="text-lg font-semibold mb-2">Загрузка сети</h3>
      <p class="text-sm text-gray-600 mb-2">Отображается в килобайтах в секунду (KB/s)</p>
      <canvas ref="chartCanvas" width="600" height="200"></canvas>
  
      <!-- Вывод скорости загрузки и скачивания -->
      <div class="mt-4">
        <p><strong>Скорость загрузки:</strong> {{ downloadSpeed }} KB/s</p>
        <p><strong>Скорость скачивания:</strong> {{ uploadSpeed }} KB/s</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js'
  
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale)
  
  const chartCanvas = ref(null)
  let chartInstance = null
  
  let lastRx = null
  let lastTx = null
  const rxHistory = []
  const txHistory = []
  const labels = []
  
  // Для отображения скорости загрузки/скачивания
  const downloadSpeed = ref(0)
  const uploadSpeed = ref(0)
  
  const fetchNetload = () => {
    axios.get('/api/netload').then(res => {
      const { rxBytes, txBytes } = res.data
  
      if (lastRx !== null && lastTx !== null) {
        const rxDelta = rxBytes - lastRx
        const txDelta = txBytes - lastTx
  
        const rxKbps = (rxDelta / 1024).toFixed(2)  // Конвертируем в KB/s
        const txKbps = (txDelta / 1024).toFixed(2)
  
        // Обновляем последние значения скорости
        downloadSpeed.value = rxKbps
        uploadSpeed.value = txKbps
  
        rxHistory.push(rxKbps)
        txHistory.push(txKbps)
        labels.push(new Date().toLocaleTimeString())
  
        if (rxHistory.length > 20) {
          rxHistory.shift()
          txHistory.shift()
          labels.shift()
        }
  
        updateChart()
      }
  
      lastRx = rxBytes
      lastTx = txBytes
    })
  }
  
  const setupChart = () => {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Download (KB/s)',
            data: rxHistory,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4
          },
          {
            label: 'Upload (KB/s)',
            data: txHistory,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        animation: false,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'KB/s' } },
          x: { title: { display: true, text: 'Время' } }
        }
      }
    })
  }
  
  const updateChart = () => {
    if (!chartInstance) return
    chartInstance.data.labels = [...labels]
    chartInstance.data.datasets[0].data = [...rxHistory]
    chartInstance.data.datasets[1].data = [...txHistory]
    chartInstance.update()
  }
  
  onMounted(() => {
    setupChart()
    fetchNetload()
    setTimeout(fetchNetload, 1000)
    setInterval(fetchNetload, 5000)
  })
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
  }
  </style>
  