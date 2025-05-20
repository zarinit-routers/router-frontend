<template>
  <div class="p-5 bg-[#222228] max-w-xl rounded-xl mx-auto">
    <div v-if="error" class="text-red-400 mb-3">{{ error }}</div>
    <div v-else>
      <div v-if="ntpData.active">
        <p class="text-green-500 text-lg pb-2">Синхронизация времени активна</p>

        <ul v-if="ntpData.servers" class="flex flex-col gap-2 mb-4">
          <li v-for="(server, index) in ntpData.servers" :key="index"
            class="flex justify-between items-center p-2 rounded-lg bg-[#37343D]">
            <div>
              <div>{{ server.address }}</div>
              <div class="font-mono text-[#7b7b7b] text-sm">
                {{ Array.isArray(server.options) ? server.options.join(", ") : "" }}
              </div>
            </div>
            <button @click="removeServer(server)" class="text-red-400 hover:text-red-600">
              Удалить
            </button>
          </li>
        </ul>

        <form @submit.prevent="addServer" class="flex flex-col gap-2">
          <Input v-model="newServer" type="text" placeholder="Новый NTP сервер (например, time.google.com)"
            class="p-2 rounded text-white " :class="{ 'border-red-500': validationError }" />
          <p v-if="validationError" class="text-red-400 text-sm">
            Введите корректный домен или IP-адрес
          </p>
          <Button type="submit" class="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded self-start">
            Добавить сервер
          </Button>
        </form>
      </div>
      <div v-else>
        <p class="text-red-500">NTP не активно</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Button from './baseComponents/Button.vue'
import Input from './baseComponents/Input.vue'


const ntpData = ref({ active: false, servers: [] });
const loading = ref(true);
const error = ref(null);
const newServer = ref("");
const validationError = ref(false);

const fetchNtpServers = async () => {
  try {
    const response = await axios.get("/api/ntp");
    ntpData.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Ошибка загрузки данных";
  } finally {
    loading.value = false;
  }
};

const isValidHost = (host) => {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)(\.(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)){3}$/;
  const domainRegex =
    /^(?=.{1,253}$)(([a-zA-Z0-9_]{1,63}\.)+[a-zA-Z]{2,63}|localhost)$/;
  return ipRegex.test(host) || domainRegex.test(host);
};

const addServer = async () => {
  validationError.value = false;

  if (!isValidHost(newServer.value)) {
    validationError.value = true;
    return;
  }

  try {
    await axios.post("/api/ntp/add", {
      address: newServer.value,
      options: []
    });

    newServer.value = "";
    await fetchNtpServers();
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Ошибка при добавлении";
  }
};

const removeServer = async (server) => {
  try {
    await axios.delete("/api/ntp/remove", { data: server });
    await fetchNtpServers();
  } catch (err) {
    error.value = err.response?.data?.message || err.message || "Ошибка при удалении";
  }
};

onMounted(fetchNtpServers);
</script>
