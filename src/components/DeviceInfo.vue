<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Информация об устройстве</h2>
        <p><strong>Производитель:</strong> {{ deviceInfo.manufacturer }}</p>
        <p><strong>Модель:</strong> {{ deviceInfo.model }}</p>
        <p><strong>Версия модели:</strong> {{ deviceInfo.modelVersion }}</p>
        <p><strong>Прошивка:</strong> {{ deviceInfo.firmwareVersion }}</p>

        <div class="mt-8">
            <h3 class="text-lg font-semibold mb-2">Загрузка сети</h3>
            <p class="text-sm text-gray-600 mb-2">Отображается в килобайтах в секунду (KB/s)</p>
            <canvas ref="chartCanvas" width="600" height="200"></canvas>
        </div>
    </div>
    <div>
        <h2 class="text-xl font-bold mt-6">Traceroute</h2>
    <form @submit.prevent="runTraceroute">
        <input v-model="traceTarget" placeholder="Введите адрес" class="border p-2 rounded mr-2" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Пуск</button>
    </form>
    <pre class="bg-black-100 p-2 mt-2 whitespace-pre-wrap">{{ traceOutput }}</pre>

    </div>
   
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const deviceInfo = ref({});
const chartCanvas = ref(null);
let chartInstance = null;

let lastRx = null;
let lastTx = null;

const rxHistory = [];
const txHistory = [];
const labels = [];

const fetchDeviceInfo = () => {
    axios.get("/api/device-info").then(res => {
        deviceInfo.value = res.data;
    });
};

const fetchNetload = () => {
    axios.get("/api/netload").then(res => {
        const { rxBytes, txBytes } = res.data;

        if (lastRx !== null && lastTx !== null) {
            const rxDelta = rxBytes - lastRx;
            const txDelta = txBytes - lastTx;

            const rxKbps = (rxDelta / 1024).toFixed(2);
            const txKbps = (txDelta / 1024).toFixed(2);

            rxHistory.push(rxKbps);
            txHistory.push(txKbps);
            labels.push(new Date().toLocaleTimeString());

            if (rxHistory.length > 20) {
                rxHistory.shift();
                txHistory.shift();
                labels.shift();
            }

            updateChart();
        }

        lastRx = rxBytes;
        lastTx = txBytes;
    });
};

const setupChart = () => {
    chartInstance = new Chart(chartCanvas.value, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Download (KB/s)",
                    data: rxHistory,
                    borderColor: "rgb(54, 162, 235)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                },
                {
                    label: "Upload (KB/s)",
                    data: txHistory,
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            animation: false,
            plugins: {
                title: {
                    display: false,
                },
                legend: {
                    display: true,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "KB/s",
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "Время",
                    },
                },
            },
        },
    });
};

const updateChart = () => {
    if (!chartInstance) return;
    chartInstance.data.labels = [...labels];
    chartInstance.data.datasets[0].data = [...rxHistory];
    chartInstance.data.datasets[1].data = [...txHistory];
    chartInstance.update();
};
const traceTarget = ref('')
const traceOutput = ref('')

const runTraceroute = async () => {
  const address = traceTarget.value.trim()

  if (!address) {
    traceOutput.value = 'Введите адрес.'
    return
  }

  try {const res = await axios.post(`/api/diagnostics/traceroute/${encodeURIComponent(address)}`)

    traceOutput.value = res.data.output || 'Нет данных.'
  } catch (err) {
    if (err.response && err.response.status === 400) {
      traceOutput.value = 'Неверный адрес.'
    } else {
      traceOutput.value = 'Ошибка при выполнении traceroute.'
    }
  }
}

onMounted(() => {
    fetchDeviceInfo();
    setupChart();

    fetchNetload();
    setTimeout(() => fetchNetload(), 1000);
    setInterval(fetchNetload, 5000);
});
</script>

<style scoped>
canvas {
    max-width: 100%;
}
</style>