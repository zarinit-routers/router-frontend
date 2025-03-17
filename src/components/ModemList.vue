<template>
  <h2>Список модемов</h2>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else class="simcard mb-[30px]">
    <ul v-if="modems">
      <li v-for="(modem, index) in modems" :key="index" class="bg-red">
        <strong>Модем:</strong> {{ modem.name }}
        <div><strong>Модель:</strong> {{ modem.model }}</div>
        <div><strong>Статус:</strong> {{ modem.status }}</div>
        <div
          v-if="!modem.operator"
          class="w-[130px] h-[125px] bg-[#37343D] flex items-center justify-between rounded-xl"
          id="none"
        >
          <img
            class="w-[30px] mx-[12px]"
            src="../assets/oper/no_sim.svg"
            alt=""
          />
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
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const modems = ref([]);
const loading = ref(true);
const error = ref(null);

// Функция для загрузки списка модемов
const fetchModems = async () => {
  try {
    const response = await fetch(`/api/modems`);
    if (!response.ok) throw new Error("Ошибка загрузки модемов");
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
