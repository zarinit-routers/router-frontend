<script setup>
import { ref, reactive } from "vue";
import SideBar from "./SideBar.vue";
import Header from "./Header.vue";
import OsInfo from './OsInfo.vue';
import Timezone from './Timezone.vue';
import NtpServers from './NtpServers.vue';
import Select from '../components/Select.vue';

const modem = reactive({
  operator: null,
  signal: 0,
  mode: 'online',
  rxSpeed: 0,
  txSpeed: 0
});

const selectedRange = ref("5m");

const ranges = [
    { value: "5m", label: "Последние 5 минут" },
    { value: "15m", label: "Последние 15 минут" },
    { value: "30m", label: "Последние 30 минут" },
    { value: "1h", label: "Последний час" },
    { value: "3h", label: "Последние 3 часа" },
    { value: "6h", label: "Последние 6 часов" },
    { value: "12h", label: "Последние 12 часов" },
    { value: "24h", label: "Последние 24 часа" },
    { value: "2d", label: "Последние 2 дня" },
    { value: "7d", label: "Последние 7 дней" },
    { value: "30d", label: "Последние 30 дней" },
    { value: "90d", label: "Последние 90 дней" },
    { value: "6M", label: "Последние 6 месяцев" },
    { value: "1y", label: "Последний год" },
    { value: "2y", label: "Последний 2 года" },
    { value: "5y", label: "Последние 5 лет" },
];

// Функция для получения логотипа оператора
const getOperatorLogo = (operator) => {
    const logos = {
        MTS: "../assets/oper/mts.svg",
        MegaFon: "../assets/oper/megafon.svg",
        Beeline: "../assets/oper/beeline.svg",
        Tele2: "../assets/oper/tele2.svg",
    };
    return logos[operator] || "";
};

// Функция для получения картинки сигнала
const getSignalImage = (signal) => {
    if (signal <= 20) return "../assets/signal/signal_1.svg";
    if (signal <= 40) return "../assets/signal/signal_2.svg";
    if (signal <= 60) return "../assets/signal/signal_3.svg";
    if (signal <= 80) return "../assets/signal/signal_4.svg";
    return "../assets/signal/signal_5.svg";
};



import { onMounted } from 'vue';
import serverUrl from '../../config/serverUrl';

const modems = ref([]);
const loading = ref(true);
const error = ref(null);

// Функция для загрузки списка модемов
const fetchModems = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/modems`);
    if (!response.ok) throw new Error('Ошибка загрузки модемов');
    const data = await response.json();
    modems.value = data.modems;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchModems);
</script>

<template>
  <Header v-if="$route.path !== './components/Login'"></Header>
  <SideBar></SideBar>
  <div class="Monitor container mx-auto">
    <h1>Монитор</h1>
    <hr class="my-3">
    <OsInfo />
    <Timezone />
    <NtpServers />
    <div class="simcard mb-[30px]">
      <div v-if="!modem.operator" class="w-[130px] h-[125px] bg-[#37343D] flex items-center justify-between rounded-xl" id="none">
        <img class="w-[30px] mx-[12px]" src="../assets/oper/no_sim.svg" alt="">
        <p class="text-xs">Вставьте в слот сим-карту</p>
      </div>
            <div v-else :id="modem.operator" class="simcard_row">
                <img :id="open_logo" :src="getOperatorLogo(modem.operator)" />
                <div id="Open_name_h">
                    <p id="Open_name">{{ modem.operator }}</p>
                </div>

                <img :id="signal" :src="getSignalImage(modem.signal)" />
                <p id="status_connect">{{ modem.mode }}</p>

                <p id="updown">
                    <img id="rows_speed" src="../assets/rows/up.png" />
                    <span id="modem_0_rx">{{ modem.rxSpeed }}</span> Мб/сек
                    <img id="rows_speed" src="../assets/rows/down.png" />
                    <span id="modem_0_tx">{{ modem.txSpeed }}</span> Мб/сек
                </p>
            </div>
        </div>

        <section>
            <h2>График</h2>

            <table>
                <tr class="graf">
                    <td class="graf_card">
                        <p>Модем</p>
                        <form method="get">
                            <select id="select_graf" name="range" class="time">
                                <option v-for="option in ranges" :value="option.value" :selected="option.selected">{{ option.label }}</option>
                            </select>
                        </form>
                    </td>
    <div class="simcard mb-[30px]">
      <h2>Список модемов</h2>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="simcard mb-[30px]">
      <ul>
        <li v-for="(modem, index) in modems" :key="index">
          <strong>Модем:</strong> {{ modem.name }}
          <div><strong>Модель:</strong> {{ modem.model }}</div>
          <div><strong>Статус:</strong> {{ modem.status }}</div>
        </li>
      </ul>
    </div>
    </div>
                    <td class="graf_card">
                        <p>Параметр</p>
                        <form method="get">
                            <select id="select_graf" name="range" class="time">
                                <option v-for="option in ranges" :value="option.value" :selected="option.selected">{{ option.label }}</option>
                            </select>
                        </form>
                    </td>
                </tr>

      <table>
        <tr class="graf">
          <td class="flex flex-col">
            
            <Select 
              v-model="selectedRange"
              label="Модем"
              classLabel=""
              classSelect="bg-black"
              :options="ranges"
            />
          </td>

          <td class="flex flex-col">
            
            <Select 
              v-model="selectedRange"
              label="Параметр"
              classSelect=""
              :options="ranges"
            />
          </td>
        </tr>

        <tr class="graf">
          <td class="flex flex-col">
            <Select 
              v-model="selectedRange"
              label="Показать"
              classSelect="time"
              :options="ranges"
            />
          </td>

          <td class="flex flex-col">
            <Select 
              v-model="selectedRange"
              label="Шаг обновления"
              classSelect="time"
              :options="ranges"
            />
          </td>
        </tr>
      </table>

      <iframe src="" width="100%" height="450px" frameborder="0"></iframe>
    </section>

    <div class="test_wifi">
      <table class="table_wifi">
        <tr class="test_cards">
          <td class="test_card">
            <div class="test_h">
              <div class="test test_succes"></div>
              <h2 class="test">Wi-Fi 2.4 Mhz</h2>
            </div>
            <p>Имя сети</p>
            <Select 
              v-model="selectedRange"
              label=""
              classSelect="time"
              :options="ranges"
            />
          </td>

          <td class="test_card">
            <div class="test_h">
              <div class="test test_error"></div>
              <h2 class="test">Wi-Fi 5 Mhz</h2>
            </div>
            <p>Имя сети</p>
            <Select 
              v-model="selectedRange"
              label=""
              classSelect="time"
              :options="ranges"
            />
          </td>
        </tr>
      </table>
    </div>

    <section>
      <h2>Подключенные устройства</h2>
      <Select 
        v-model="selectedRange"
        label=""
        classSelect="time"
        :options="[{ value: '', label: 'Все типы подключения', disabled: true }, ...ranges]"
      />
    </section>
  </div>
</template>
