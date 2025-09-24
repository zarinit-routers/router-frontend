import axios from "axios";
import { defineStore } from "pinia";

export const useWifiHotspotStore = defineStore("wifiHotspot", {
  state: () => ({
    enabled: false,
    ssid: "",
    password: "",
    channel: "",
    hidden: false,
    loading: false,
    error: "",
  }),
  actions: {
    async fetchStatus() {
      try {
        this.loading = true;
        const response = await axios.post("/api/cmd", {
          command: "v1/wifi-hotspot/get-status"
        });
        Object.assign(this, response.data.data);
        this.error = "";
      } catch (error) {
        this.error = "Ошибка загрузки статуса";
        console.error("Ошибка при получении статуса:", error);
      } finally {
        this.loading = false;
      }
    },

    async toggleEnabled() {
      try {
        this.loading = true;
        const command = this.enabled ? "v1/wifi-hotspot/disable" : "v1/wifi-hotspot/enable";
        
        await axios.post("/api/cmd", { command });
        await this.fetchStatus(); // Обновляем статус после изменения
      } catch (error) {
        this.error = "Ошибка переключения";
        console.error("Ошибка при переключении:", error);
      } finally {
        this.loading = false;
      }
    },

    async updateSetting(endpoint, data) {
      try {
        this.loading = true;
        await axios.post("/api/cmd", {
          command: endpoint,
          ...data
        });
        this.error = "";
        return true;
      } catch (error) {
        this.error = `Ошибка обновления: ${error.response?.data?.message || error.message}`;
        console.error("Ошибка при обновлении настроек:", error);
        return false;
      } finally {
        this.loading = false;
      }
    }
  },
});