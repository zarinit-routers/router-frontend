import { defineStore } from "pinia";
import axios from "axios";

export const useSystemStatsStore = defineStore("system-stats", {
  state: () => ({
    cpuUsage: {},
    memoryUsage: {},
    diskUsage: {},
    networkUsage: [],
    loadAverage: [],
    loading: true,
    error: "",
  }),
  actions: {
    async getSystemUsage() {
      try {
        await axios.get("/api/os-info").then((response) => {
          this.cpuUsage = response.data.CpuStats;
          this.memoryUsage = response.data.Memory;
          this.diskUsage = response.data.DiskStats;
          this.networkUsage = response.data.NetworkStats;
          this.loadAverage = response.data.LoadAverage;
        });
        this.loading = false;
        this.error = "";
      } catch (err) {
        this.error = `Ошибка получения системных статистик: ${error.response.data.error}`;
        console.error("Ошибка получения системных статистик:", err);
      }
    },
  },
});
