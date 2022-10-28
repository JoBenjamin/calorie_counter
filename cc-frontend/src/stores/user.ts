import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useUserStore = defineStore("user", {
  state: () => ({
    userList: [],
  }),
  actions: {
    async fetchUserList() {
      const auth = useAuthStore();
      const isAdmin = auth.roles.includes("ADMIN");
      if (!isAdmin) return;
      try {
        const response = await axios.get(`${baseUrl}/user/all`);
        this.userList = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
