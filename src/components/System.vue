<template>
  <div>
    <h1>Система</h1>
    <hr />

    <div class="form-list">
      <div>
        <Input
          class="unchange"
          label="Производитель"
          :model-value="Manufacturer"
          disabled
        />
      </div>
      <div>
        <Input
          class="unchange"
          label="Серийный номер"
          :model-value="sn"
          disabled
        />
      </div>
    </div>

    <div class="form-list">
      <div>
        <Input class="unchange" label="Модель" :model-value="Model" disabled />
      </div>
      <div>
        <Input
          class="unchange"
          label="Версия модели"
          :model-value="Model_version"
          disabled
        />
      </div>
    </div>

    <div>
      <div>
        <Input
          class="unchange"
          label="Версия прошивки"
          :model-value="Firmware_version"
          disabled
        />
      </div>
      <div>
        <Input
          class="unchange"
          label="Время работы"
          :model-value="uptime"
          disabled
        />
      </div>
    </div>

    <div class="form-list">
      <div>
        <Input
          class="unchange"
          label="Загрузка ЦП, %"
          :model-value="procload"
          disabled
        />
      </div>
      <div>
        <Input
          class="unchange"
          label="Загрузка памяти, %"
          :model-value="mem"
          disabled
        />
      </div>
    </div>

    <div>
      <Input
        class="unchange"
        label="Дата и время"
        :model-value="date"
        disabled
      />
    </div>

    <div class="form-list">
      <div>
        <Input label="IP-сервера" v-model="serverIp" />
      </div>
      <div>
        <Input label="Ключ сервера" v-model="serverKey" />
      </div>
    </div>

    <div class="form-list">
      <div>
        <Input label="Логин" v-model="login" />
      </div>
      <div>
        <Input label="Пароль" v-model="password" type="password" />
      </div>
    </div>

    <div class="local_button">
      <Button customClass="btn" @click="applySettings">Применить</Button>
      <Button customClass="btn btn_cancel" @click="cancelSettings"
        >Отменить</Button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "../components/baseComponents/Input.vue";
import Button from "../components/baseComponents/Button.vue";

const Manufacturer = ref("");
const sn = ref("");
const Model = ref("");
const Model_version = ref("");
const Firmware_version = ref("");
const uptime = ref("");
const procload = ref("");
const mem = ref("");
const date = ref("");
const serverIp = ref("");
const serverKey = ref("");
const login = ref("root");
const password = ref("afwawf");
</script>
