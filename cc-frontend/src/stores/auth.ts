import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAuthStore = defineStore("auth", {
  state: () => ({ email: "", authError: false, roles: [] }),
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
        this.authError = false;
      } catch (error) {
        console.log(error);
        this.authError = true;
      }
    },
  },
  getters: {
    getRoles: (state) => state.roles,
  },
});
