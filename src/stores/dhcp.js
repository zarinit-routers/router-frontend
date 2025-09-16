import { defineStore } from "pinia";
import axios from "axios";

export const useDhcpStore = defineStore("dhcp", {
  state: () => ({
    enabled: false,
    loading: false,
  }),
  actions: {
    async fetchStatus() {
      try {
        const res = await axios.get("/api/dhcp/status");
        console.log("Получен статус DHCP:", res.data); // Логирование полученного статуса
        this.enabled = res.data.enabled;
      } catch (err) {
        console.error("Ошибка получения статуса DHCP:", err);
      }
    },
    async toggleDHCP() {
      this.loading = true;
      const url = this.enabled ? "/api/dhcp/disable" : "/api/dhcp/enable";
      console.log("Переключение DHCP. Запрос по адресу:", url); // Логирование URL запроса
      try {
        await axios.post(url);
        console.log("Статус переключен, обновляем состояние..."); // Логирование успешного переключения
        this.enabled = !this.enabled;
      } catch (err) {
        console.error("Ошибка переключения DHCP:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});
