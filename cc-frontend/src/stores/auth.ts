import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({ email: "", authError: false }),
  actions: {
    async fetchAuth() {
      const response = await axios.get("http://localhost:3000/auth/whoami");
      if (!response.data || !response.data.email) {
        this.authError = true;
        return;
      }
      this.email = response.data.email;
      this.authError = false;
    },
  },
});
