import axios from "axios";
import { defineStore } from "pinia";
import { watch } from "vue";

export const useWifiStore = defineStore("wifi", {
  state: () => ({
    isActive: true,
    channel: null,
    hidden: false,
    ssid: "",
    password: "",
  }),
  actions: {
    async togglePower(action) {
      try {
        await axios.post(`/api/wifi/${action}`).then((res) => {
          this.isActive = res.data.active;
        });
      } catch (error) {
        console.error("Ошибка при переключении Wi-Fi:", error);
      }
    },
    async wifiStatus() {
      try {
        await axios.get("/api/wifi/status").then((res) => {
          this.isActive = res.data.active;
          this.channel = res.data.channel;
          this.hidden = res.data.hidden;
          this.ssid = res.data.ssid;
          this.password = res.data.password;
        });
      } catch (error) {
        console.error("Ошиька при получении статуса Wi-Fi:", error);
      }
    },
    async wifiUpdateData() {
      try {
        /*axios.post('/api/wifi/channel/set', {
            "channel": this.channel
        });*/
        await axios.post('/api/wifi/ssid/set', {
            "ssid": this.ssid
        });
        await axios.post('/api/wifi/password/set', {
            "password": this.password
        });
        /*const hidden = this.hidden === "true" ? true : false
        await axios.post('/api/wifi/ssid/hide', {
            "hidden": hidden
        });*/
        this.wifiStatus()
      } catch (error) {
        console.error("Ошибка при изменении данных Wi-Fi:", error);
      }
    },
  },
});
