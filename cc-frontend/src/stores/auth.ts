import { defineStore } from "pinia";
import { useStatStore } from "./stat";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    userId: "",
    authError: false,
    roles: [] as string[],
  }),
  actions: {
    async fetchAuth() {
      try {
        const response = await axios.get(`${baseUrl}/auth/whoami`);
        if (!response.data || !response.data.email || !response.data.roles) {
          this.authError = true;
          return;
        }
        this.email = response.data.email;
        this.roles = response.data.roles;
        this.userId = response.data._id;
        const stat = useStatStore();
        stat.setDailyLimit(response.data.dailyCalorieLimit);
        this.authError = false;
      } catch (error) {
        console.log(error);
        this.authError = true;
      }
    },
  },
  getters: {
    getRoles: (state): string[] => state.roles,
  },
});
