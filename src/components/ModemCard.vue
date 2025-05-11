<script setup>
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SimInfo from './SimInfo.vue';

const props = defineProps({
  modem: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
const signal = ref({ refresh: { rate: 0 } });

const modemEnabled = (modem) => modem.generic.state !== "disabled";

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

<template>
  <div
    class="cursor-pointer bg-neutral-800 hover:bg-neutral-700 rounded-xl p-2 px-3 flex flex-col gap-2"
    @click="toggleModal"
  >
    <!-- Карточка -->
    <div class="flex gap-2">
      <span v-if="modemEnabled(modem)" class="text-green-300">
        <i class="fa-solid fa-circle-check"></i>
      </span>
      <span v-else class="text-[#B99209]">
        <i class="fa-solid fa-circle-xmark"></i>
      </span>
      <span>{{ modem.generic.model }}</span>
    </div>
    <div class="text-sm font-mono">{{ modem["dbus-path"] }}</div>
    <div :class="modemEnabled(modem) ? 'text-green-400' : 'text-[#B99209]'">
      {{ modemEnabled(modem) ? 'Включён' : 'Выключен' }}
    </div>
  </div>

  <!-- Модалка -->
  <Dialog v-model="showModal" class="relative z-50">
    <div class="fixed inset-0 bg-black/50" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="bg-neutral-800 border border-neutral-600 rounded-lg p-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto">
        <DialogTitle class="text-xl mb-4">{{ modem.generic.model }}</DialogTitle>

        <div class="text-sm text-neutral-500 font-mono mb-4">
          {{ modem.generic["device-identifier"] }}
        </div>

        <div class="mb-2">
          <span v-if="modem.generic.state == 'enabled'" class="text-green-300">
            <i class="fa-solid fa-circle-check"></i>
          </span>
          <span v-else class="text-[#B99209]">
            <i class="fa-solid fa-circle-xmark"></i>
          </span>
          <input
            type="checkbox"
            :checked="modemEnabled(modem)"
            @change.prevent="toggleModemState(modem)"
          />
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="font-semibold">Производитель</div>
            <div>{{ modem.generic.manufacturer }}</div>
          </div>
          <div>
            <div class="font-semibold">Модель</div>
            <div>{{ modem.generic.model }}</div>
          </div>
          <div>
            <div class="font-semibold">Оператор</div>
            <div>
              {{ modem["3gpp"]["operator-name"] }}
              <span class="text-xs font-mono">{{ modem["3gpp"]["operator-code"] }}</span>
            </div>
          </div>
          <div v-if="modem['3gpp'].eps['initial-bearer'].settings.apn">
            <div class="font-semibold">APN</div>
            <div>{{ modem["3gpp"].eps["initial-bearer"].settings.apn }}</div>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="font-semibold">Bands:</h3>
          <div class="flex flex-wrap gap-1 mt-1">
            <span
              v-for="band in modem.generic['current-bands']"
              class="text-xs bg-neutral-900 px-2 py-1 rounded"
            >
              {{ band }}
            </span>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="font-semibold">Signal:</h3>
          <div class="text-sm">Refresh rate: {{ signal?.refresh?.rate }} s</div>
          <div>
            <h4 class="font-medium mt-2">LTE</h4>
            <div>RSRP: {{ signal.lte.rsrp }} dBm</div>
            <div>RSRQ: {{ signal.lte.rsrq }} dBm</div>
            <div>RSSI: {{ signal.lte.rssi }} dBm</div>
            <div>S/N: {{ signal.lte.snr }} dB</div>
          </div>
          <div>
            <h4 class="font-medium mt-2">UMTS</h4>
            <div>RSCP: {{ signal.umts.rscp }} dBm</div>
            <div>ECIO: {{ signal.umts.ecio }} dB</div>
            <div>RSSI: {{ signal.umts.rssi }} dBm</div>
          </div>
        </div>

        <div class="mt-4" v-if="modem.generic.sim">
          <SimInfo :simName="modem.generic.sim" />
        </div>

        <div class="mt-6 text-right">
          <button class="button primary button-sm" @click="toggleModal">
            Закрыть
          </button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
