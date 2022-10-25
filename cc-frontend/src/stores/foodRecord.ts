import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface createFoodRecordDto {
  name: string;
  calorieCount: number;
  date: string;
}

export const useFoodRecordStore = defineStore("foodRecord", {
  state: () => ({ foodRecords: [] }),
  actions: {
    async submitFoodRecord(data: createFoodRecordDto) {
      try {
        await axios.post(`${baseUrl}/foodrecord`, data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchFoodRecords() {
      try {
        const response = await axios.get(`${baseUrl}/foodrecord`);
        this.foodRecords = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    getFoodRecords: (state) => state.foodRecords,
  },
});
