import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface createFoodRecordDto {
  name: string;
  calorieCount: number;
  date: string;
}

export const useFoodRecordStore = defineStore("foodRecord", {
  actions: {
    async submitFoodRecord(data: createFoodRecordDto) {
      try {
        await axios.post(`${baseUrl}/foodrecord`, data);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
