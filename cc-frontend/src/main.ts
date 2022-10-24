/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";

import axios from "axios";

const app = createApp(App);
const pinia = createPinia();

axios.interceptors.request.use((config) => {
  if (!config || !config.headers) return config;
  config.headers.authorization = `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;
  return config;
});

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/main.css";
import "@/assets/fonts.css";

app.use(PrimeVue);
app.use(pinia);
app.component("PButton", Button);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Dialog", Dialog);
app.component("Calendar", Calendar);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);

app.use(router);

app.mount("#app");
