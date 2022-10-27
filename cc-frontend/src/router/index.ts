import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HistoryView from "../views/HistoryView.vue";
import StatsView from "../views/StatsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/history",
      name: "history",
      component: HistoryView,
    },
    {
      path: "/stats",
      name: "stats",
      component: StatsView,
    },
  ],
});

export default router;
