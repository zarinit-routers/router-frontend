<script setup>
import { ref } from "vue";
import axios from "axios";
import { getToken } from "../auth";
import Input from "./baseComponents/Input.vue";
import Button from "./baseComponents/Button.vue";
import { getCloudConfig, getCloudStatus } from "../api";

const cloud = getCloudStatus();
const config = getCloudConfig();
const login = async () => {
  await axios.post(
    "/api/cloud/config",
    {
      organizationId: config.value.organizationId,
      password: config.value.passphrase,
    },
    { headers: { Authorization: getToken() } },
  );
};
</script>

<template>
  <div v-if="!cloud.status.connected">
    <h1>Подключение к облаку</h1>
    <form method="POST" @submit.prevent="login">
      <p for="id_username">Идентификатор организации</p>
      <Input
        v-model="config.organizationId"
        type="text"
        name="username"
        autofocus=""
        autocapitalize="none"
        autocomplete="username"
        maxlength="150"
        required=""
        id="id_username"
        class="input"
      />
      <p for="id_password">Парольная фраза</p>
      <Input
        v-model="config.passphrase"
        type="password"
        name="password"
        autocomplete="current-password"
        required=""
        id="id_password"
        class="input"
      />
      <br />
      <Button type="submit" class="button">Подключиться к организации</Button>
    </form>
  </div>
</template>
