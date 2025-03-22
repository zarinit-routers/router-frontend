<template>
  <div
    class="cursor-pointer bg-neutral-800 hover:bg-neutral-700 rounded-xl p-2 px-3"
    @click="toggleModal"
  >
    <div class="flex gap-2">
      <span v-if="modem.generic.state == 'enabled'" class="text-green-300"
        ><i class="fa-solid fa-circle-check"></i>
      </span>
      <span v-else class="text-[#B99209]"
        ><i class="fa-solid fa-circle-xmark"></i
      ></span>
      <span class="font-mono">
        {{ modem["dbus-path"] }}
      </span>
    </div>
    <div v-if="modem.generic.state == 'enabled'">Включён</div>
    <div v-else class="text-[#B99209]">Выключен</div>
  </div>
  <ModalContainer :show="showModal" :close="toggleModal">
    <div
      class="bg-neutral-800 rounded-lg border border-neutral-600 p-4 h-max flex flex-col gap-4 w-md"
    >
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
          :checked="modem.generic.state == 'enabled'"
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

      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Состояние:</h3>
        <div>
          {{ modem.generic.state == "enabled" ? "Включён" : "Выключен" }}
        </div>
      </div>
      <button class="button primary button-sm" @click="toggleModal">
        Закрыть
      </button>
    </div>
  </ModalContainer>
</template>

<script setup>
defineProps({
  modem: {
    type: Object,
    required: true,
  },
});
import { ref } from "vue";
import ModalContainer from "./ModalContainer.vue";
import axios from "axios";
const showModal = ref(false);
const toggleModal = () => {
  console.log("toggleModal");
  showModal.value = !showModal.value;
};

const toggleModemState = (modem) => {
  let modemEnabled = modem.generic.state === "enabled";
  const postAction = modemEnabled ? "disable" : "enable";
  console.log(postAction);
  const param = encodeURIComponent(modem["dbus-path"].split("/").pop());

  axios.post(`/api/modems/${postAction}/${param}`).then((response) => {
    console.log(response.data);
    modem.generic.state = response.data.enabled ? "enabled" : "disabled";
  });
};
</script>
