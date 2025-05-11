<template>
  <div
    class="cursor-pointer bg-neutral-800 hover:bg-neutral-700 rounded-xl p-2 px-3 flex flex-col gap-2"
    @click="toggleModal"
  >
    <div class="flex gap-2">
      <span v-if="modemEnabled(modem)" class="text-green-300"
        ><i class="fa-solid fa-circle-check"></i>
      </span>
      <span v-else class="text-[#B99209]"
        ><i class="fa-solid fa-circle-xmark"></i
      ></span>
      <span class="">
        {{ modem.generic.model }}
      </span>
    </div>
    <div class="text-sm font-mono">
      {{ modem["dbus-path"] }}
    </div>
    <div v-if="modemEnabled(modem)">Включён</div>
    <div v-else class="text-[#B99209]">Выключен</div>
  </div>

  <!-- Модальное окно с использованием Headless UI Dialog -->
  <Dialog as="div" class="relative z-10" v-if="showModal" @close="toggleModal">
    <template #default>
      <div class="fixed inset-0 bg-black bg-opacity-50"></div>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="bg-neutral-800 rounded-lg border border-neutral-600 p-4 flex flex-col gap-4 h-11/12 justify-between">
          <div class="flex flex-col gap-4 grow overflow-auto">
            <div>
              <h2 class="text-xl">{{ modem.generic.model }}</h2>
              <div class="text-sm text-neutral-500 font-mono">
                {{ modem.generic["device-identifier"] }}
              </div>
            </div>

            <div>
              <span v-if="modem.generic.state == 'enabled'" class="text-green-300"
                ><i class="fa-solid fa-circle-check"></i>
              </span>
              <span v-else class="text-[#B99209]"
                ><i class="fa-solid fa-circle-xmark"></i
              ></span>
              <input
                type="checkbox"
                :checked="modemEnabled(modem)"
                @change.prevent="toggleModemState(modem)"
              />
            </div>

            <div class="flex flex-col gap-2">
              <div class="text-lg font-semibold">Производитель</div>
              <div>{{ modem.generic.manufacturer }}</div>
            </div>

            <div class="flex flex-col gap-2">
              <div class="text-lg font-semibold">Модель</div>
              <div>{{ modem.generic.model }}</div>
            </div>

            <div class="flex flex-col gap-2">
              <div class="text-lg font-semibold">Оператор</div>
              <div>
                {{ modem["3gpp"]["operator-name"] }}

                <span class="text-xs font-mono">
                  {{ modem["3gpp"]["operator-code"] }}</span
                >
              </div>
            </div>

            <div
              class="flex flex-col gap-2"
              v-if="modem['3gpp'].eps['initial-bearer'].settings.apn"
            >
              <div class="text-lg font-semibold">APN:</div>
              <div>
                {{ modem["3gpp"].eps["initial-bearer"].settings.apn }}
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <h3 class="text-lg font-semibold">Bands:</h3>
              <div class="flex flex-wrap gap-1">
                <div
                  v-for="band in modem.generic['current-bands']"
                  class="text-xs bg-neutral-900 px-2 py-1 rounded"
                >
                  {{ band }}
                </div>
              </div>
            </div>

            <div>
              <h3>Signal:</h3>
              <div>Refresh rate {{ signal?.refresh?.rate }} seconds</div>
              <div>
                <h4>LTE</h4>
                <div>RSRP: {{ signal.lte.rsrp }} dBm</div>
                <div>RSRQ: {{ signal.lte.rsrq }} dBm</div>
                <div>RSSI: {{ signal.lte.rssi }} dBm</div>
                <div>S/N: {{ signal.lte.snr }} dB</div>
              </div>
              <div>
                <h4>UMTS</h4>
                <div>RSCP: {{ signal.umts.rscp }} dBm</div>
                <div>ECIO: {{ signal.umts.ecio }} dB</div>
                <div>RSSI: {{ signal.umts.rssi }} dBm</div>
              </div>
              <!-- TODO: Implement other parameters -->
            </div>

            <div v-if="modem.generic.sim">
              <SimInfo :simName="modem.generic.sim" />
            </div>
          </div>
          <div class="sticky top-[100vh]">
            <button class="button primary button-sm" @click="toggleModal">
              Закрыть
            </button>
          </div>
        </DialogPanel>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
const props = defineProps({
  modem: {
    type: Object,
    required: true,
  },
});
import { ref, onMounted } from "vue";
import { Dialog, DialogPanel } from "@headlessui/vue"; // Импортируем компоненты из Headless UI
import axios from "axios";
import SimInfo from "./SimInfo.vue";

const showModal = ref(false);
const signal = ref({ refresh: { rate: 0 } });

const modemEnabled = (modem) => {
  return modem.generic.state !== "disabled";
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const toggleModemState = (modem) => {
  const postAction = modemEnabled(modem) ? "disable" : "enable";
  const param = encodeURIComponent(modem["dbus-path"].split("/").pop());

  axios.post(`/api/modems/${postAction}/${param}`).then((response) => {
    modem.generic.state = response.data.enabled ? "enabled" : "disabled";
  });
};

onMounted(() => {
  axios
    .get(`/api/modems/signal/${props.modem["dbus-path"].split("/").pop()}`)
    .then((response) => {
      signal.value = response.data;
    });
});
</script>
