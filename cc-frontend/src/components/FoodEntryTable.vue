<template lang="pug">
DataTable(:value="filteredFoodRecords" :loading="loading" :paginator="true" :rows="10")
    template(#empty)
      .text-lg.text-color.text-center No records found
    template(#header)
      .flex.align-items-center.justify-content-end
        .text-lg.text-color.mr-3 Date filter:
        Calendar(selection-mode="range" v-model="dateFilter")
        PButton(v-if="dateFilter.length && dateFilter.some(date => date)" @click="dateFilter=[]" icon="pi pi-times" class="p-button-rounded p-button-text") 
    Column(field="name" header="Name" :sortable="true")
    Column(v-if="auth.getRoles.includes('ADMIN')" field="user.email" header="User" :sortable="true")
    Column(field="calorieCount" header="Calories" :sortable="true")
    Column(field="date" header="Date" :sortable="true")
      template(#body="{ data }")
        .text-lg {{formatDate(data.date)}}
    Column(v-if="auth.getRoles.includes('ADMIN')" header="Actions" field="_id")
      template(#body="{ data }")
        PButton(icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="handleEditItem(data)")
        PButton(icon="pi pi-trash" class="p-button-rounded p-button-text" @click="handleDeleteItem(data._id)")
ConfirmDialog
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useFoodRecordStore } from "@/stores/foodRecord";
import dayjs from "dayjs";
import { computed } from "@vue/reactivity";
import { useAuthStore } from "@/stores/auth";
import { useConfirm } from "primevue/useconfirm";

const loading = ref(false);
const auth = useAuthStore();
const confirm = useConfirm();

const foodRecord = useFoodRecordStore();

const handleDeleteItem = (id) => {
  confirm.require({
    message: "Are you sure you want to delete this item?",
    header: "Delete confirmation",
    accept: async () => {
      try {
        loading.value = true;
        await foodRecord.deleteFoodRecord(id);
      } catch (error) {
        console.log(error);
      } finally {
        loading.value = false;
      }
    },
  });
  console.log("delete", id);
};

const handleEditItem = (id) => {
  console.log("edit", id);
};

const filteredFoodRecords = computed(() => {
  if (dateFilter.value.length < 2 || dateFilter.value.some((date) => !date))
    return foodRecord.getFoodRecords;
  const startDate = dayjs(dateFilter.value[0]);
  const endDate = dayjs(dateFilter.value[1]);
  return foodRecord.getFoodRecords.filter((record) => {
    return (
      dayjs(record.date).isAfter(startDate.subtract(1, "d")) &&
      dayjs(record.date).isBefore(endDate.add(1, "d"))
    );
  });
});

const dateFilter = ref([]);

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
