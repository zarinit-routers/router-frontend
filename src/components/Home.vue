<script setup>
import { ref, reactive } from 'vue';
import SideBar from "./SideBar.vue";
import Header from "./Header.vue"; // Добавляем импорт 'reactive' и 'ref'


const modem = reactive({
  operator: null, // или "MTS", "MegaFon", "Beeline", "Tele2"
  signal: 0,
  mode: 'online',
  rxSpeed: 0,
  txSpeed: 0
});

const selectedRange = ref('5m');

const ranges = [
  { value: '5m', label: 'Последние 5 минут' },
  { value: '15m', label: 'Последние 15 минут' },
  { value: '30m', label: 'Последние 30 минут' },
  { value: '1h', label: 'Последний час' },
  { value: '3h', label: 'Последние 3 часа' },
  { value: '6h', label: 'Последние 6 часов' },
  { value: '12h', label: 'Последние 12 часов' },
  { value: '24h', label: 'Последние 24 часа' },
  { value: '2d', label: 'Последние 2 дня' },
  { value: '7d', label: 'Последние 7 дней' },
  { value: '30d', label: 'Последние 30 дней' },
  { value: '90d', label: 'Последние 90 дней' },
  { value: '6M', label: 'Последние 6 месяцев' },
  { value: '1y', label: 'Последний год' },
  { value: '2y', label: 'Последний 2 года' },
  { value: '5y', label: 'Последние 5 лет' }
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
</script>

<template>
  <Header v-if="$route.path !== './components/Login'"></Header>
  <SideBar></SideBar>
  <div class="Monitor container mx-auto">
    <h1>Монитор</h1>

    <div class="simcard">
      <div v-if="!modem.operator" class="w" id="none">
        <img class="oper oper_none" src="../assets/oper/no_sim.svg" alt="">
        <p class="p_none">Вставьте в слот сим-карту</p>
      </div>

      <div v-else :id="modem.operator" class="simcard_row">
        <img :id="open_logo" :src="getOperatorLogo(modem.operator)" />
        <div id="Open_name_h">
          <p id="Open_name">{{ modem.operator }}</p>
        </div>

        <img :id="signal" :src="getSignalImage(modem.signal)" />
        <p id="status_connect">{{ modem.mode }}</p>

        <p id="updown">
          <img id='rows_speed' src="../assets/rows/up.png" />
          <span id="modem_0_rx">{{ modem.rxSpeed }}</span> Мб/сек
          <img id='rows_speed' src="../assets/rows/down.png" />
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
                <option v-for="option in ranges" :value="option.value" :selected="option.selected">{{ option.label }}
                </option>
              </select>
            </form>
          </td>

          <td class="graf_card">
            <p>Параметр</p>
            <form method="get">
              <select id="select_graf" name="range" class="time">
                <option v-for="option in ranges" :value="option.value" :selected="option.selected">{{ option.label }}
                </option>
              </select>
            </form>
          </td>
        </tr>

        <tr class="graf">
          <td class="graf_card">
            <p id="time_graf" class="time">Показать</p>
            <form method="get">
              <select id="select_graf" name="range" class="time">
                <option v-for="option in ranges" :value="option.value" :selected="option.selected">{{ option.label }}
                </option>
              </select>
            </form>
          </td>
          <td class="graf_card">
            <p id="time_graf" class="time">Шаг обновления</p>
            <form method="GET">
              <select id="select_graf" name="range" class="time">
                <option v-for="option in ranges" :value="option.value" :selected="option.selected">{{ option.label }}
                </option>
              </select>

            </form>
          </td>
        </tr>
      </table>
      <iframe src="" width="100%" height="450px" frameborder="0"></iframe>
    </section>

    <div class="test_wifi">
      <table class="table_wifi">
        <tr class="test_cards">
          <td class="test_card">
            <!-- <div class="test_h">
              <div class="test test_error"></div>
              <h2 class="test">Wi-Fi 2.4 Mhz</h2>
            </div>
            <p>Имя сети</p>-->
            <div class="test_h">
              <div class="test test_succes"></div>
              <h2 class="test">Wi-Fi 2.4 Mhz</h2>
            </div>
            <p>Имя сети</p>
            <select id="select_graf" name="range" class="time"></select>
          </td>
          <td class="test_card">
            <div class="test_h">
              <div class="test test_error"></div>
              <h2 class="test">Wi-Fi 5 Mhz</h2>
            </div>
            <p>Имя сети</p>
            <!--  <div class="test_h">
              <div class="test test_succes"></div>
              <h2 class="test">Wi-Fi 5 Mhz</h2>
            </div>
            <p>Имя сети</p>-->
            <select id="select_graf" name="range" class="time"></select>
          </td>
        </tr>
      </table>
    </div>
    <section>
      <h2>Локальная сеть</h2>

      <div class="Local_network">
        <div class="Local_network_card">
          <h2>1</h2>
          <img class="Local_network_img" src="../assets/free-icon-ethernet-1176956.png ">
        </div>
        <div class="Local_network_card">
          <h2>2</h2>
          <img class="Local_network_img" src="../assets/free-icon-ethernet-1176956.png ">
        </div>
        <div class="Local_network_card">
          <h2>3</h2>
          <img class="Local_network_img" src="../assets/free-icon-ethernet-1176956.png  ">
        </div>
        <div class="Local_network_card">
          <h2>4</h2>
          <img class="Local_network_img" src="../assets/free-icon-ethernet-1176956.png ">
        </div>
      </div>
    </section>
    <section style="margin-bottom: 75px;">
      <h2>Подключенные устройства</h2>
      <select id="select_device" name="range">
        <option value="" disabled selected>Все типы подключения</option>
      </select>

      <div class="devices">
        <div class="device">
          <div>
            <div class="device_title">
              <img class="device_icon" src="../assets/device/icon_WiFi.svg" alt="">
              <p class="device_name">IPhone 14 Pro Max</p>
            </div>
            <div>
              <p class="device_IP">00:26:57:00:1f:02</p>
            </div>
          </div>
          <div>
            <div class="device_speed download">
              <img class="device_icon" src="../assets/device/icon_download.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
            <div class="device_speed distribution">
              <img class="device_icon" src="../assets/device/icon_distribution.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
          </div>
        </div>


        <div class="device">
          <div>
            <div class="device_title">
              <img class="device_icon" src="../assets/device/icon_WiFi.svg" alt="">
              <p class="device_name">IPhone 14 Pro Max</p>
            </div>
            <div>
              <p class="device_IP">00:26:57:00:1f:02</p>
            </div>
          </div>
          <div>
            <div class="device_speed download">
              <img class="device_icon" src="../assets/device/icon_download.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
            <div class="device_speed distribution">
              <img class="device_icon" src="../assets/device/icon_distribution.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
          </div>
        </div>


        <div class="device">
          <div>
            <div class="device_title">
              <img class="device_icon" src="../assets/device/icon_WiFi.svg" alt="">
              <p class="device_name">IPhone 14 Pro Max</p>
            </div>
            <div>
              <p class="device_IP">00:26:57:00:1f:02</p>
            </div>
          </div>
          <div>
            <div class="device_speed download">
              <img class="device_icon" src="../assets/device/icon_download.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
            <div class="device_speed distribution">
              <img class="device_icon" src="../assets/device/icon_distribution.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
          </div>
        </div>


        <div class="device">
          <div>
            <div class="device_title">
              <img class="device_icon" src="../assets/device/icon_WiFi.svg" alt="">
              <p class="device_name">IPhone 14 Pro Max</p>
            </div>
            <div>
              <p class="device_IP">00:26:57:00:1f:02</p>
            </div>
          </div>
          <div>
            <div class="device_speed download">
              <img class="device_icon" src="../assets/device/icon_download.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
            <div class="device_speed distribution">
              <img class="device_icon" src="../assets/device/icon_distribution.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
          </div>
        </div>


        <div class="device">
          <div>
            <div class="device_title">
              <img class="device_icon" src="../assets/device/icon_WiFi.svg" alt="">
              <p class="device_name">IPhone 14 Pro Max</p>
            </div>
            <div>
              <p class="device_IP">00:26:57:00:1f:02</p>
            </div>
          </div>
          <div>
            <div class="device_speed download">
              <img class="device_icon" src="../assets/device/icon_download.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
            <div class="device_speed distribution">
              <img class="device_icon" src="../assets/device/icon_distribution.svg" alt="">
              <p class="device_IP">150 Мбит/с</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<style scoped>

</style>
