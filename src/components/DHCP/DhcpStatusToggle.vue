<template>
    <div>
      <h1>DHCP Status</h1>
      <Switch
        v-model="dhcpStatus"
        @change="handleDhcpToggle(dhcpStatus)"
        class="relative inline-flex items-center h-6 rounded-full w-11"
      >
        <template #default="{ checked }">
          <span>{{ checked ? 'DHCP is Enabled' : 'DHCP is Disabled' }}</span>
        </template>
      </Switch>
    </div>
  </template>
  
  <script>
  import { Switch } from "@headlessui/vue";
  
  export default {
    components: {
      Switch,
    },
    data() {
      return {
        dhcpStatus: false, // начальное состояние
      };
    },
    created() {
      this.getDhcpStatus();
    },
    methods: {
      // Получаем состояние DHCP
      getDhcpStatus() {
        this.$axios
          .get("/api/dhcp/status")
          .then((response) => {
            this.dhcpStatus = response.data.status; // обновляем состояние
          })
          .catch((error) => {
            console.error("Ошибка при получении состояния DHCP:", error);
          });
      },
  
      // Обрабатываем переключение состояния DHCP
      handleDhcpToggle(value) {
        const action = value ? "enable" : "disable";
        this.$axios
          .post(`/api/dhcp/${action}`)
          .then((response) => {
            console.log(`DHCP ${action}d successfully`);
          })
          .catch((error) => {
            console.error("Ошибка при переключении DHCP:", error);
          });
      },
    },
  };
  </script>
  
  