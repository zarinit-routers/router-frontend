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
  }),
  actions: {
    async togglePower(action, frequency) {
      try {
        await axios.post(`/api/wifi/${frequency}/${action}`).then((res) => {
          if (frequency === 2) {
            this.frequency24.isActive = res.data.active;
          } else {
            this.frequency5.isActive = res.data.active;
          }
        });
      } catch (error) {
        console.error("Ошибка при переключении Wi-Fi:", error);
      }
    },
    async wifiStatus(frequency) {
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
        console.error("Ошиька при получении статуса Wi-Fi:", error);
      }
    },
    async wifiUpdate(frequency) {
      try {
        let data = {}
        if (frequency === 2) {
          data = {
            channel: this.frequency24.channel,
            hide: this.frequency24.hidden,
            ssid: this.frequency24.ssid,
            password: this.frequency24.password,
          }
        } else {
          data = {
            channel: this.frequency5.channel,
            hide: this.frequency5.hidden,
            ssid: this.frequency5.ssid,
            password: this.frequency5.password
          }
        }
        await axios.post(`/api/wifi/${frequency}/update`, data).then((res) => {
          this.wifiStatus(frequency)
        });
      } catch (error) {
        console.error("Ошиька при получении статуса Wi-Fi:", error);
      }
    },
  },
});
