import axios from "axios";
import { defineStore } from "pinia";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useStatStore = defineStore("stat", {
  state: () => ({
    todaysCalorieCount: 0,
    maxDailyCalorieCount: 0,
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
  },
});
