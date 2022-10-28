<template lang="pug">
DataTable(:value="filteredFoodRecords" :loading="loading" :paginator="true" :rows="10")
    template(#empty)
      .text-lg.text-color.text-center No records found
    template(#header)
      .flex.align-items-center.justify-content-between
        div
          .flex.align-items-center(v-if="dateFilter.length === 2 && dateFilter.every(date => date)")
            .text-lg.text-color.mr-2 Filtered calorie count: 
            .text-lg.text-primary {{filteredCalorieCount}}
        .flex.align-items-center
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
        PButton(icon="pi pi-trash" class="p-button-rounded p-button-text" @click="handleDeleteItem(data)")
Dialog(v-model:visible="editDialogOpen" header="Edit food entry" @hide="resetFieldData" ).w-4
    .card
        .field.h-5rem
            label(for="name") Name
            InputText(id="name" v-model="$v.name.$model" :class="{'p-invalid': $v.name.$error}").w-full
            small.p-error.h-1rem {{$v.name.$error ? $v.name.$errors[0].$message : ' '}}
        .field.h-5rem
            label(for="calorie") Calories
            InputNumber(id="calorie" v-model="$v.calories.$model" :class="{'p-invalid': $v.calories.$error}").w-full
            small.p-error {{$v.calories.$error ? $v.calories.$errors[0].$message : ' '}}
        .field.h-5rem
            label(for="date") Date
            Calendar(id="date" v-model="formState.date" :max-date="new Date()").w-full
    template(#footer)
        PButton(label="Save" @click="submitData" :loading="loading" )
        PButton(label="Cancel" class="p-button-secondary" @click="editDialogOpen = false")
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, reactive } from "vue";
import { useFoodRecordStore } from "@/stores/foodRecord";
import dayjs from "dayjs";
import { useAuthStore } from "@/stores/auth";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { required, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { useStatStore } from "@/stores/stat";

const loading = ref(false);
const editDialogOpen = ref(false);
const auth = useAuthStore();
const confirm = useConfirm();
const toast = useToast();
const stat = useStatStore();

const foodRecord = useFoodRecordStore();

const filteredCalorieCount = computed(() => {
  return filteredFoodRecords.value.reduce((prev, current) => {
    return prev + current.calorieCount;
  }, 0);
});

const handleDeleteItem = (item: { _id: string; name: string }) => {
  confirm.require({
    message: "Are you sure you want to delete this item?",
    header: `Delete "${item.name}"`,
    accept: async () => {
      try {
        loading.value = true;
        await foodRecord.deleteFoodRecord(item._id);
        toast.add({
          severity: "success",
          summary: "Item successfully deleted!",
          detail: `${item.name} is no more!`,
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Oops something went wrong!",
          detail: `Could not delete ${item.name}`,
          life: 3000,
        });
        console.log(error);
      } finally {
        loading.value = false;
      }
    },
  });
};

const handleEditItem = (item) => {
  formState.name = item.name;
  formState.date = new Date(item.date);
  formState.calories = item.calorieCount;
  formState.id = item._id;
  editDialogOpen.value = true;
};

const submitData = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) return;

  const itemName = formState.name;
  try {
    loading.value = true;
    await foodRecord.editFoodRecord({
      name: formState.name,
      calorieCount: formState.calories || 0,
      date: formState.date.toISOString(),
      _id: formState.id,
    });
    editDialogOpen.value = false;
    resetFieldData();
    foodRecord.fetchFoodRecords();
    stat.fetchTodaysCalorieCount();
    toast.add({
      severity: "success",
      summary: "Item successfully edited!",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Oops something went wrong!",
      detail: `Could not edit ${itemName}`,
      life: 3000,
    });
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const filteredFoodRecords = computed(() => {
  if (dateFilter.value[0]) {
    console.log(new Date(dateFilter.value[0]).toISOString());
  }
  if (dateFilter.value.length < 2 || dateFilter.value.some((date) => !date))
    return foodRecord.getFoodRecords;
  const startDate = dayjs(dateFilter.value[0]);
  const endDate = dayjs(dateFilter.value[1]);
  return foodRecord.getFoodRecords.filter((record) => {
    return (
      dayjs(record.date).isAfter(startDate.startOf("d").subtract(1, "s")) &&
      dayjs(record.date).isBefore(endDate.endOf("d"))
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

const validationRules = {
  name: { required },
  calories: { required, minValue: minValue(1) },
};

const formState = reactive({
  name: "",
  calories: null as number | null,
  date: new Date(),
  id: "",
});

const resetFieldData = () => {
  formState.calories = null;
  formState.date = new Date();
  formState.name = "";
  formState.id = "";
  $v.value.$reset();
};
const $v = useVuelidate(validationRules, formState, { $scope: false });
</script>
