<template>
    <div>
      <h1>Монитор</h1>
      
      <div class="simcard">
        <div v-if="!modem.operator" class="simcard_row simcard_none" id="none">
          <img class="oper oper_none" src="./src/oper/no_sim.svg" alt="">
          <p class="p_none">Вставьте в слот сим-карту</p>
        </div>
  
        <div v-else :id="modem.operator" class="simcard_row">
          <img :id="open_logo" :src="getOperatorLogo(modem.operator)">
          <div id="Open_name_h">
            <p id="Open_name">{{ modem.operator }}</p>
          </div>
          
          <img :id="signal" :src="getSignalImage(modem.signal)">
          <p id="status_connect">{{ modem.mode }}</p>
          
          <p id="updown">
            <img id='rows_speed' src="./src/rows/up.png">
            <span id="modem_0_rx">{{ modem.rxSpeed }}</span> Мб/сек
            <img id='rows_speed' src="./src/rows/down.png">
            <span id="modem_0_tx">{{ modem.txSpeed }}</span> Мб/сек
          </p>
        </div>
      </div>
  
      <section>
        <h2>График</h2>
        <table>
  <thead>
    <tr>
      <th>Модем</th>
      <th>Параметр</th>
    </tr>
  </thead>
  <tbody>
    <tr class="graf">
      <td class="graf_card">
        <p>Модем</p>
        <select v-model="selectedRange" class="time">
          <option v-for="range in ranges" :key="range.value" :value="range.value">
            {{ range.label }}
          </option>
        </select>
      </td>
      <td class="graf_card">
        <p>Параметр</p>
      </td>
    </tr>
  </tbody>
</table>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        modem: {
          operator: null, // или "MTS", "MegaFon", "Beeline", "Tele2"
          signal: 0,
          mode: 'online',
          rxSpeed: 0,
          txSpeed: 0
        },
        selectedRange: '5m',
        ranges: [
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
          { value: '5y', label: 'Последние 5 лет' },
        ]
      };
    },
    methods: {
      getOperatorLogo(operator) {
        const logos = {
          MTS: "./src/oper/mts.svg",
          MegaFon: "./src/oper/megafon.svg",
          Beeline: "./src/oper/beeline.svg",
          Tele2: "./src/oper/tele2.svg",
        };
        return logos[operator] || "";
      },
      getSignalImage(signal) {
        if (signal <= 20) return "./src/signal/signal_1.svg";
        if (signal <= 40) return "./src/signal/signal_2.svg";
        if (signal <= 60) return "./src/signal/signal_3.svg";
        if (signal <= 80) return "./src/signal/signal_4.svg";
        return "./src/signal/signal_5.svg";
      }
    }
  };
  </script>
  
  <style scoped>
  /* Здесь ваши стили */
  </style>