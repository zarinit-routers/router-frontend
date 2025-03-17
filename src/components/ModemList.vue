<template>
  <div class="p-2">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <ul v-if="modems">
      <li v-for="(modem, index) in modems" :key="index" class="bg-red">
        <div>
          <div>{{ modem.generic.model }}</div>
          <div v-if="modemOperator(modem).name">
            <strong>Оператор:</strong>
            {{ modemOperator(modem).name }}
            <span class="font-mono">
              {{ modemOperator(modem).code }}
            </span>
          </div>
          <div>
            <span v-if="modemEnabled(modem)">Включён</span>
            <span v-else class="text-[#B99209]">Выключен</span>
          </div>
          <SimInfo :name="modem.generic.sim" />
          <div
            v-if="!modemOperator(modem)"
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
            <!-- <img :id="open_logo" :src="getOperatorLogo(modem.operator)" /> -->
            <!-- <div id="Open_name_h"> -->
            <!-- <p id="Open_name">{{ modem.operator }}</p> -->
            <!-- </div> -->

            <div>
              <i class="fas fa-signal"></i>
            </div>

            <!-- <img :id="signal" :src="getSignalImage(modem.signal)" />
            <p id="status_connect">{{ modem.mode }}</p>

            <p id="updown">
              <img id="rows_speed" src="../assets/rows/up.png" />
              <span id="modem_0_rx">{{ modem.rxSpeed }}</span> Мб/сек
              <img id="rows_speed" src="../assets/rows/down.png" />
              <span id="modem_0_tx">{{ modem.txSpeed }}</span> Мб/сек
            </p> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SimInfo from "./SimInfo.vue";
const modems = ref([]);
const loading = ref(true);
const error = ref(null);
const modemEnabled = (modem) => {
  return modem.generic.state !== "disabled";
};
const modemOperator = (modem) => {
  if (
    !modem["3gpp"]["operator-name"] ||
    modem["3gpp"]["operator-name"] === "--"
  ) {
    return false;
  }
  return {
    name: modem["3gpp"]["operator-name"],
    code: modem["3gpp"]["operator-code"],
  };
};

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
