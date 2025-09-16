import axios from "axios";
import { defineStore } from "pinia";

export const useWifiStore = defineStore("wifi", {
  state: () => ({
    frequency24: {
      isActive: true,
      channel: null,
      hidden: false,
      ssid: "",
      password: "",
    },
    frequency5: {
      isActive: true,
      channel: null,
      hidden: false,
      ssid: "",
      password: "",
    },
    loading: false,
    error: "",
    isInitialize: false,
  }),
  actions: {
    async init() {
      await this.status(2);
      await this.status(5);
      this.isInitialize = true;
    },
    async togglePower(action, frequency) {
      try {
        this.loading = true;
        await axios.post(`/api/wifi/${frequency}/${action}`).then(() => {
          this.loading = false;
          this.status(2);
          this.status(5);
          this.error = "";
        });
      } catch (error) {
        this.loading = false;
        this.error = `Произошла ошибка: ${error.response.data.error}`;
        console.error("Ошибка при переключении Wi-Fi:", error);
      }
    },
    async status(frequency) {
      try {
        await axios.get(`/api/wifi/${frequency}/status`).then((res) => {
          if (frequency === 2) {
            this.frequency24.isActive = res.data.active;
            this.frequency24.channel = res.data.channel;
            this.frequency24.hidden = res.data.hidden;
            this.frequency24.ssid = res.data.ssid;
            this.frequency24.password = res.data.password;
          } else {
            this.frequency5.isActive = res.data.active;
            this.frequency5.channel = res.data.channel;
            this.frequency5.hidden = res.data.hidden;
            this.frequency5.ssid = res.data.ssid;
            this.frequency5.password = res.data.password;
          }
        });
      } catch (error) {
        console.error("Ошибка при получении статуса Wi-Fi:", error);
      }
    },
    async update(frequency) {
      try {
        this.loading = true;
        let data = {};
        if (frequency === 2) {
          data = {
            channel: this.frequency24.channel,
            hide: this.frequency24.hidden,
            ssid: this.frequency24.ssid,
            password: this.frequency24.password,
          };
        } else {
          data = {
            channel: this.frequency5.channel,
            hide: this.frequency5.hidden,
            ssid: this.frequency5.ssid,
            password: this.frequency5.password,
          };
        }
        await axios.post(`/api/wifi/${frequency}/update`, data).then((res) => {
          this.loading = false;
          this.status(2);
          this.status(5);
        });
        this.error = "";
      } catch (error) {
        this.loading = false;
        this.error = `Произошла ошибка: ${error.response.data.error}`;
        console.error("Ошибка при получении статуса Wi-Fi:", error);
      }
    },
  },
});
