import axios from "axios";
import { defineStore } from "pinia";

export const useWifiStore = defineStore("wifi", {
  state: () => ({
    wifi24: {
      isActive: true,
      channel: null,
      hidden: false,
      ssid: "",
      password: "",
    },
    wifi5: {
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
            this.wifi24.isActive = res.data.active;
          } else {
            this.wifi5.isActive = res.data.active;
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
            this.wifi24.isActive = res.data.active;
            this.wifi24.channel = res.data.channel;
            this.wifi24.hidden = res.data.hidden;
            this.wifi24.ssid = res.data.ssid;
            this.wifi24.password = res.data.password;
          } else {
            this.wifi5.isActive = res.data.active;
            this.wifi5.channel = res.data.channel;
            this.wifi5.hidden = res.data.hidden;
            this.wifi5.ssid = res.data.ssid;
            this.wifi5.password = res.data.password;
          }
        });
      } catch (error) {
        console.error("Ошиька при получении статуса Wi-Fi:", error);
      }
    },
  },
});
