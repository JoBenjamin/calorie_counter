<template lang="pug">
.w-full.pb-5.pt-3
    PButton(label="New entry" icon="pi pi-plus" @click="dialogOpen = true")
    Dialog(v-model:visible="dialogOpen" header="Add new food entry").w-4
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
            PButton(label="Submit" @click="$v.$validate")
            PButton(label="Cancel" class="p-button-secondary" @click="dialogOpen = false")
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

const formState = reactive({
  name: "",
  calories: 0,
  date: new Date(),
});

const validationRules = {
  name: { required },
  calories: { required, minValue: minValue(1) },
};

const $v = useVuelidate(validationRules, formState);

const dialogOpen = ref(false);
</script>
