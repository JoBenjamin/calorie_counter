<template lang="pug">
.w-full.pb-5.pt-3
    PButton(label="New entry" icon="pi pi-plus" @click="dialogOpen = true")
    Dialog(v-model:visible="dialogOpen" header="Add new food entry" @hide="resetFieldData" ).w-4
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
            PButton(label="Submit" @click="submitData" :loading="loading")
            PButton(label="Cancel" class="p-button-secondary" @click="dialogOpen = false")
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { useFoodRecordStore } from "@/stores/foodRecord";
import { useToast } from "primevue/usetoast";

const foodRecord = useFoodRecordStore();
const loading = ref(false);
const dialogOpen = ref(false);
const toast = useToast();

const formState = reactive({
  name: "",
  calories: null as number | null,
  date: new Date(),
});

const validationRules = {
  name: { required },
  calories: { required, minValue: minValue(1) },
};

const resetFieldData = () => {
  formState.calories = 0;
  formState.date = new Date();
  formState.name = "";
  $v.value.$reset();
};

const submitData = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) return;

  const itemName = formState.name;
  try {
    loading.value = true;
    await foodRecord.submitFoodRecord({
      name: formState.name,
      calorieCount: formState.calories || 0,
      date: formState.date.toISOString(),
    });
    dialogOpen.value = false;
    resetFieldData();
    foodRecord.fetchFoodRecords();
    toast.add({
      severity: "success",
      summary: "Item successfully added!",
      detail: `${itemName} is now on the list!`,
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Oops something went wrong!",
      detail: `Could not add ${itemName}`,
      life: 3000,
    });
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const $v = useVuelidate(validationRules, formState);
</script>
