import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useStatStore = defineStore("stat", {
  state: () => ({
    todaysCalorieCount: 0,
    maxDailyCalorieCount: 0,
    lastSevenDayItemCount: 0,
    beforeLastSevenDayItemCount: 0,
    sevenDayUserAverageCalorie: 0,
  }),
  actions: {
    setDailyLimit(newLimit: number) {
      this.maxDailyCalorieCount = newLimit;
    },
    async fetchTodaysCalorieCount() {
      try {
        const response = await axios.get(`${baseUrl}/stat/calorie-count`);
        this.todaysCalorieCount = response.data || 0;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAdminStats() {
      const auth = useAuthStore();
      const roles = auth.roles;
      if (!roles.includes("ADMIN")) return;
      try {
        const response = await axios.get(`${baseUrl}/stat/admin`);
        this.lastSevenDayItemCount = response?.data.lastSeven || 0;
        this.beforeLastSevenDayItemCount = response?.data.weekBefore || 0;
        this.sevenDayUserAverageCalorie = response?.data.userAverage || 0;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
