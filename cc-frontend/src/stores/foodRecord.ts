import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

interface createFoodRecordDto {
  name: string;
  calorieCount: number;
  date: string;
  user?: string;
}

interface editFoodRecordDto extends createFoodRecordDto {
  _id: string;
}

interface FoodRecord {
  name: string;
  calorieCount: number;
  date: string;
  user: string;
}

export const useFoodRecordStore = defineStore("foodRecord", {
  state: () => ({ foodRecords: [] }),
  actions: {
    async submitFoodRecord(data: createFoodRecordDto) {
      await axios.post(`${baseUrl}/foodrecord`, data);
    },
    async editFoodRecord(data: editFoodRecordDto) {
      await axios.put(`${baseUrl}/foodrecord/${data._id}`, data);
    },
    async fetchFoodRecords() {
      try {
        const response = await axios.get(`${baseUrl}/foodrecord`);
        this.foodRecords = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFoodRecord(id: string) {
      await axios.delete(`${baseUrl}/foodrecord/${id}`);
      await this.fetchFoodRecords();
    },
  },
  getters: {
    getFoodRecords: (state): FoodRecord[] => state.foodRecords,
  },
});
