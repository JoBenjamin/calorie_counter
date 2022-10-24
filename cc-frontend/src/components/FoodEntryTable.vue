<template lang="pug">
DataTable(:value="foodEntries")
    Column(field="name" header="Name")
    Column(field="calorieCount" header="Calories")
    Column(field="date" header="Date")
</template>

<script lang="ts" setup>
import { ref } from "vue";

const foodEntries = ref([
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
  { name: "Hamburger", calorieCount: 5500, date: new Date().toDateString() },
]);
</script>
