<script setup>
import { ref, reactive } from 'vue'; // Добавляем импорт 'reactive' и 'ref'


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

<template >
  <div class="Monitor">
    <h1>Монитор</h1>

    <div class="simcard">
      <div v-if="!modem.operator" class="simcard_row simcard_none" id="none">
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

                <option value="5m" selected>Последние 5 минут</option>

                <option value="5m" selected>Последние 5 минут</option>

                <option value="5m">Последние 5 минут</option>


                <option value="15m" selected>Последние 15 минут</option>

                <option value="15m">Последние 15 минут</option>

                <option value="30m" selected>Последние 30 минут</option>

                <option value="30m">Последние 30 минут</option>

                <option value="1h" selected>Последний час</option>

                <option value="1h">Последний час</option>

                <option value="3h" selected>Последние 3 часа</option>

                <option value="3h">Последние 3 часа</option>

                <option value="6h" selected>Последние 6 часа</option>

                <option value="6h">Последние 6 часа</option>

                <option value="12h" selected>Последние 12 часа</option>

                <option value="12h">Последние 12 часа</option>


                <option value="24h" selected>Последние 24 часа</option>

                <option value="24h">Последние 24 часа</option>


                <option value="2d" selected>Последние 2 дня</option>

                <option value="2d">Последние 2 дня</option>


                <option value="7d" selected>Последние 7 дней</option>

                <option value="7d">Последние 7 дней</option>


                <option value="30d" selected>Последние 30 дней</option>

                <option value="30d">Последние 30 дней</option>


                <option value="90d" selected>Последние 90 дней</option>

                <option value="90d">Последние 90 дней</option>


                <option value="6M" selected>Последние 6 месяцев</option>

                <option value="6M">Последние 6 месяцев</option>


                <option value="1y" selected>Последний год</option>

                <option value="1y">Последний год</option>


                <option value="2y" selected>Последний 2 года</option>

                <option value="2y">Последний 2 года</option>


                <option value="5y" selected>Последние 5 лет</option>

                <option value="5y">Последние 5 лет</option>

              </select>
            </form>
          </td>

          <td class="graf_card">
            <p>Параметр</p>
            <form method="get">
              <select id="select_graf" name="range" class="time">

                <option value="5m" selected>Последние 5 минут</option>

                <option value="5m" selected>Последние 5 минут</option>

                <option value="5m">Последние 5 минут</option>


                <option value="15m" selected>Последние 15 минут</option>

                <option value="15m">Последние 15 минут</option>

                <option value="30m" selected>Последние 30 минут</option>

                <option value="30m">Последние 30 минут</option>


                <option value="1h" selected>Последний час</option>

                <option value="1h">Последний час</option>


                <option value="3h" selected>Последние 3 часа</option>

                <option value="3h">Последние 3 часа</option>


                <option value="6h" selected>Последние 6 часа</option>

                <option value="6h">Последние 6 часа</option>


                <option value="12h" selected>Последние 12 часа</option>

                <option value="12h">Последние 12 часа</option>


                <option value="24h" selected>Последние 24 часа</option>

                <option value="24h">Последние 24 часа</option>


                <option value="2d" selected>Последние 2 дня</option>

                <option value="2d">Последние 2 дня</option>


                <option value="7d" selected>Последние 7 дней</option>

                <option value="7d">Последние 7 дней</option>


                <option value="30d" selected>Последние 30 дней</option>

                <option value="30d">Последние 30 дней</option>


                <option value="90d" selected>Последние 90 дней</option>

                <option value="90d">Последние 90 дней</option>


                <option value="6M" selected>Последние 6 месяцев</option>

                <option value="6M">Последние 6 месяцев</option>


                <option value="1y" selected>Последний год</option>

                <option value="1y">Последний год</option>


                <option value="2y" selected>Последний 2 года</option>

                <option value="2y">Последний 2 года</option>


                <option value="5y" selected>Последние 5 лет</option>

                <option value="5y">Последние 5 лет</option>

              </select>
            </form>
          </td>
        </tr>

        <tr class="graf">
          <td class="graf_card">
            <p id="time_graf" class="time">Показать</p>
            <form method="get">
              <select id="select_graf" name="range" class="time">

                <option value="5m" selected>Последние 5 минут</option>

                <option value="5m" selected>Последние 5 минут</option>

                <option value="5m">Последние 5 минут</option>


                <option value="15m" selected>Последние 15 минут</option>

                <option value="15m">Последние 15 минут</option>


                <option value="30m" selected>Последние 30 минут</option>

                <option value="30m">Последние 30 минут</option>


                <option value="1h" selected>Последний час</option>

                <option value="1h">Последний час</option>


                <option value="3h" selected>Последние 3 часа</option>

                <option value="3h">Последние 3 часа</option>


                <option value="6h" selected>Последние 6 часа</option>

                <option value="6h">Последние 6 часа</option>


                <option value="12h" selected>Последние 12 часа</option>

                <option value="12h">Последние 12 часа</option>


                <option value="24h" selected>Последние 24 часа</option>

                <option value="24h">Последние 24 часа</option>


                <option value="2d" selected>Последние 2 дня</option>

                <option value="2d">Последние 2 дня</option>


                <option value="7d" selected>Последние 7 дней</option>

                <option value="7d">Последние 7 дней</option>


                <option value="30d" selected>Последние 30 дней</option>

                <option value="30d">Последние 30 дней</option>


                <option value="90d" selected>Последние 90 дней</option>

                <option value="90d">Последние 90 дней</option>


                <option value="6M" selected>Последние 6 месяцев</option>

                <option value="6M">Последние 6 месяцев</option>


                <option value="1y" selected>Последний год</option>

                <option value="1y">Последний год</option>


                <option value="2y" selected>Последний 2 года</option>

                <option value="2y">Последний 2 года</option>


                <option value="5y" selected>Последние 5 лет</option>

                <option value="5y">Последние 5 лет</option>

              </select>
            </form>
          </td>
          <td class="graf_card">
            <p id="time_graf" class="time">Шаг обновления</p>
            <form method="GET">
              <select id="select_graf" name="range" class="time">

                <option value="5m" selected>Последние 5 минут</option>
                <option value="5m" selected>Последние 5 минут</option>

                <option value="5m">Последние 5 минут</option>


                <option value="15m" selected>Последние 15 минут</option>

                <option value="15m">Последние 15 минут</option>


                <option value="30m" selected>Последние 30 минут</option>

                <option value="30m">Последние 30 минут</option>


                <option value="1h" selected>Последний час</option>

                <option value="1h">Последний час</option>


                <option value="3h" selected>Последние 3 часа</option>

                <option value="3h">Последние 3 часа</option>


                <option value="6h" selected>Последние 6 часа</option>

                <option value="6h">Последние 6 часа</option>


                <option value="12h" selected>Последние 12 часа</option>

                <option value="12h">Последние 12 часа</option>


                <option value="24h" selected>Последние 24 часа</option>

                <option value="24h">Последние 24 часа</option>


                <option value="2d" selected>Последние 2 дня</option>

                <option value="2d">Последние 2 дня</option>


                <option value="7d" selected>Последние 7 дней</option>

                <option value="7d">Последние 7 дней</option>


                <option value="30d" selected>Последние 30 дней</option>

                <option value="30d">Последние 30 дней</option>


                <option value="90d" selected>Последние 90 дней</option>

                <option value="90d">Последние 90 дней</option>


                <option value="6M" selected>Последние 6 месяцев</option>

                <option value="6M">Последние 6 месяцев</option>


                <option value="1y" selected>Последний год</option>

                <option value="1y">Последний год</option>


                <option value="2y" selected>Последний 2 года</option>

                <option value="2y">Последний 2 года</option>


                <option value="5y" selected>Последние 5 лет</option>

                <option value="5y">Последние 5 лет</option>

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
          <img class="Local_network_img" src=" ../assets/free-icon-ethernet-1176956.png ">
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
.Monitor{
  margin-top: 90px;
}
h1 {
  margin-bottom: 15px;
}

h2 {
  margin-top: 15px;
}

h4 {
  padding: 0px;
}

#table_speed {
  padding-left: 40%;
  background-color: #e7e7e7bf;
  border: 10px;
}

.test {
  display: flex;
  margin: 7px;
}

.test_card {
  display: flex;
  flex-direction: column;
  margin: 5px;
}

.test_cards {
  display: flex;
}

.test_h {
  display: flex;
  align-items: center;
}

.test_error {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #b90000;
  margin-left: -2px;
}

.test_succes {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #00B956;
  margin-left: -2px;
}

#button_test {
  float: right;
}

#table_speed {
  width: 300px;
}

.p_none {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  height: 45px;
  margin: 0 14px 0 0;
  color: #8B8794;

}




#oper_back {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: azure;
  backdrop-filter: blur(10px);
}

.oper {
  width: 30px;
  height: 30px;
  display: block;
}

.oper_none {
  margin-left: 14px;
  margin-right: 5px;
}

#time {
  display: block;

}

.time {
  border: #37343D;
}

#map {
  width: 100px;
  height: 450px;
}

.simcard {
  display: flex;
  margin-left: -6px;

}

.simcard_row {
  margin: 6px;
  height: 125px;
  width: 128px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  /* Вертикальное центрирование */
  justify-content: center;

  justify-content: space-between;

}

#none {
  background-color: #37343D;

}

#MTS {
  background: linear-gradient(93.69deg, #EF313B 0%, #FF5280 100.34%);
}

#MegaFon {
  background: linear-gradient(93.69deg, #07B755 0%, #23E390 100.34%);

}

#Beeline {
  background: linear-gradient(93.69deg, #E4B600 0%, #FEBB6C 100.34%);

}

#Tele2 {
  background: linear-gradient(93.69deg, #000000 0%, #020024 100.34%);

}

#open_logo {
  padding-left: 7%;
  height: 40px;
}

#Open_name {
  padding-left: 6%;
  font-size: 20px;
  font-style: normal;
}

#signal {
  padding-left: 7%;
  height: 30px;
}

#status_connect {
  padding-left: 2%;
  font-size: 20px;
  text-transform: uppercase;
}

#updown {
  padding-left: 15%;
}

#rows_speed {
  padding-left: 2%;
  padding-right: 10px;
  height: 15px;
}

#Open_name_h {
  width: 100px;
}

#speed_test {
  padding-left: 2%;
}

/*.measure_speed {
    width: 100px;
    height: 60px;
    border-radius: 10px;
    background-color: #000000;
    color: white;
    border: 2px solid rgb(255, 255, 255);
    box-shadow: 5px 5px 3px #888888;
    /* смещение по оси X, смещение по оси Y, размытие, цвет 
}
*/
.sect {
  padding-bottom: 5%;
}




#select_graf {
  width: 270px;
  height: 45px;
  background: #37343D;
  color: white;
  border-radius: 10px;

}

.graf {
  margin-left: -6px;
  display: flex;
}

#graf_butt {
  width: 150px;
  height: 35px;
  border-radius: 10px;
  background-color: #000000;
  color: white;
  border: 2px solid rgb(255, 255, 255);
  box-shadow: 5px 5px 3px #888888;
  /* смещение по оси X, смещение по оси Y, размытие, цвет */
}

.graf_card {
  display: flex;
  flex-direction: column;
  margin: 6px 4px;
}

#wifi_table {
  width: 175%;
  height: 150px;
  background-color: #909090;
}

#db {
  display: inline-block;
}

#test_wifi {
  width: 87%;
  height: 150px;
  background-color: #909090;
}

.Local_network {
  display: flex;
}

.Local_network_card {
  display: flex;
  margin: 29px 29px 29px 0px;
}

.Local_network_img {
  width: 49px;
  height: 49px;
  margin-left: 8px;
}

#select_device {
  border-radius: 26px;
  width: 266px;
  height: 40px;
  border-color: 2px solid #54505B;
  margin: 20px 0px 10px 0px;
  background: #1B1B1F;
  color: white;
  display: flex;


}



.device {
  padding: 18px;
  width: 546px;
  border-radius: 10px;
  background: #37343D;
  margin: 10px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.device * {
  font-size: 15px;
}

.device_speed {
  display: flex;
}

.device_icon {
  width: 17px;
  height: 12px;
  margin-right: 10px;
}

.device_title {
  display: flex;
  margin-bottom: 11px;
}

.download {
  margin-bottom: 11px;
}

.distribution {
  margin-top: 11px;
}

.device_IP {
  margin: 0;
  color: white;
}

.device_name {
  margin: 0;
  color: #979797;

}
</style>
