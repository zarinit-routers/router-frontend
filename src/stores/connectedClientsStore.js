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
        const response = await axios.post("/api/cmd/", {
          command: "v1/wifi/get-connected-clients"
        }, {
          headers: {
            Authorization: getToken(),
          },
        });
        this.loading = false
        this.clients = response.data.clients


      } catch (error) {
        this.loading = false
        this.error = `Произошла ошибка: ${error.response.data.error}`
        console.error("Ошибка при получении подключенных клиентов:", error);
      }
    }
  },
});
