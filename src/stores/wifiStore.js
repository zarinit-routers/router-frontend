import axios from "axios";
import { defineStore } from "pinia";

export const useWifiStore = defineStore('wifi', {
    state: () => ({
        isActive: true,
    }),
    actions: {
        async togglePower(action) {
            try {
                await axios.post(`/api/wifi/${action}`).then((res) => {
                    this.isActive = res.data.active
                })
            } catch(error) {
                console.error('Ошибка при переключении Wi-Fi:', error);
            }
        },
        async wifiStatus() {
            try {
                await axios.get('/api/wifi/status').then((res) => {
                    this.isActive = res.data.active
                })
            } catch(error) {
                console.error('Ошиька при получении статуса Wi-Fi:', error)
            }
        }
    }
})