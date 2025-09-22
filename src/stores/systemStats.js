import { defineStore } from "pinia";
import axios from "axios";
import { getToken } from "../auth";

export const useSystemStatsStore = defineStore("system-stats", {
  state: () => ({
    cpuUsage: {},
    memoryUsage: {},
    diskUsage: {},
    networkUsage: [],
    loadAverage: [],
    osInfo: {},
    loading: true,
    error: "",
  }),

  actions: {
    async getSystemUsage() {
      try {
        // Отправляем команду без nodeId (на устройстве он не нужен)
        const response = await axios.post("/api/cmd/", {
          command: "v1/system/get-os-info"
        }, {
          headers: {
            Authorization: getToken(),
          },
        });

        console.log(response.data);
        // Данные приходят напрямую, а не в поле data
        this.cpuUsage = response.data.CpuStats || {};
        this.memoryUsage = response.data.Memory || {};
        this.diskUsage = response.data.DiskStats || {};
        this.networkUsage = response.data.NetworkStats || [];
        this.loadAverage = response.data.LoadAverage || [];
        this.osInfo = response.data;
        
        this.loading = false;
        this.error = "";
      } catch (error) {
        this.error = `Ошибка получения системных статистик: ${error.response?.data?.error || error.message}`;
        console.error("Ошибка получения системных статистик:", error);
        this.loading = false;
      }
    },
  },
});