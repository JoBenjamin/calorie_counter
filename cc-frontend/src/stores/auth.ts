import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({ email: "", authError: false }),
  actions: {
    async fetchAuth() {
      try {
        const response = await axios.get(`${baseUrl}/auth/whoami`);
        if (!response.data || !response.data.email) {
          this.authError = true;
          return;
        }
        this.email = response.data.email;
        this.authError = false;
      } catch (error) {
        console.log(error);
        this.authError = true;
      }
    },
  },
});
