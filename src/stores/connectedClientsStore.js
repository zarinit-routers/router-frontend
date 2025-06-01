import axios from "axios";
import { defineStore } from "pinia";

export const useConnectedClientsStore = defineStore("connected-clients", {
  state: () => ({
    clients: [],
    loading: false,
    error: '',
  }),
  actions: {
    async getClients() {
      try {
        this.loading = true
        await axios.get(`/api/wifi/connected-clients`).then((res) => {
          this.clients = res.data.clients
          this.loading = false
          this.error = ''
        });
      } catch (error) {
        this.loading = false
        this.error = `Произошла ошибка: ${error.response.data.error}`
        console.error("Ошибка при получении подключенных клиентов:", error);
      }
    }
  },
});
