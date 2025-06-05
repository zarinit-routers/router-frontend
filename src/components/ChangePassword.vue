<template>
    <div class="max-w-md space-y-4">
      <h2 class="text-xl font-semibold">Смена пароля</h2>
  
      <div>
        <label class="block text-sm font-medium">Старый пароль</label>
        <Input
          v-model="form.oldPassword"
          type="password"
          placeholder="Введите старый пароль"
          class="mt-1 block w-full p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div>
        <label class="block text-sm font-medium">Новый пароль</label>
        <Input
          v-model="form.newPassword"
          type="password"
          placeholder="Введите новый пароль"
          class="mt-1 block w-full p-2 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <Button
        @click="changePassword"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Сменить пароль
      </Button>
  
      <p v-if="success" class="text-green-600 text-sm">Пароль успешно изменён</p>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import Input from './baseComponents/Input.vue';
  import Button from './baseComponents/Button.vue';
  
  const form = ref({
    oldPassword: '',
    newPassword: ''
  });
  
  const success = ref(false);
  const error = ref('');
  
  const changePassword = () => {
    success.value = false;
    error.value = '';
  
    axios
      .post('/api/auth/change-password', form.value)
      .then(() => {
        success.value = true;
        form.value.oldPassword = '';
        form.value.newPassword = '';
      })
      .catch((err) => {
        error.value =
          err.response?.data?.error || 'Ошибка при смене пароля';
      });
  };
  </script>
  