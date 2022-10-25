<template lang="pug">
DataTable(:value="foodRecord.getFoodRecords" :loading="loading")
    Column(field="name" header="Name")
    Column(field="calorieCount" header="Calories")
    Column(field="date" header="Date")
      template(#body="{ data }")
        .text-lg {{formatDate(data.date)}}
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFoodRecordStore } from "@/stores/foodRecord";
import dayjs from "dayjs";

const loading = ref(false);

const foodRecord = useFoodRecordStore();

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return dayjs(dateString).format("MM/DD/YYYY");
};

const loadFoodRecords = async () => {
  try {
    loading.value = true;
    await foodRecord.fetchFoodRecords();
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadFoodRecords);
</script>
