<script setup>
import { ref } from "vue";
import axios from "axios";
import { getToken } from "../auth";
import Input from "./baseComponents/Input.vue";
import Button from "./baseComponents/Button.vue";
import { getCloudStatus } from "../api";

const password = ref("");
const organizationId = ref("");

const login = async () => {
  await axios.post(
    "/api/cloud/config",
    {
      organizationId: organizationId.value,
      password: password.value,
    },
    { headers: { Authorization: getToken() } },
  );
};
const cloud = getCloudStatus();
</script>

<template>
  <div v-if="cloud.status.connected">
    <h1>Подключение к облаку</h1>
    <form method="POST" @submit.prevent="login">
      <p for="id_username">Идентификатор организации</p>
      <Input
        v-model="organizationId"
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
        v-model="password"
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
