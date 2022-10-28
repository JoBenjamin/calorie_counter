<template lang="pug">
.flex.flex-column.h-screen
    .surface-card.w-screen.h-4rem.shadow-1.flex.align-items-center.justify-content-between.p-3
        .text-4xl.text-color Calorie Counter
        NavBarWidget
        .text-2xl.text-color.mr-4.font-light {{authStore.email}}
    .py-3.px-5.flex-grow-1
        slot(v-if="authStore.email")
        ErrorCard(v-else-if="authStore.authError" error-message="Couldn't authenticate user") 
ConfirmDialog
Toast(position="bottom-left")
PButton(icon="pi pi-user-plus" @click="addFriendDialogOpen = true" class="p-button-rounded p-button-lg" v-tooltip="'Invite a friend!'").fixed.bottom-0.right-0.m-6
Dialog(header="Invite a friend" v-model:visible="addFriendDialogOpen" @hide="resetFieldData")
  .card
    .field.h-5rem
        label(for="email") Email
        InputText(id="email" v-model="$v.email.$model" :class="{'p-invalid': $v.email.$error}").w-full
        small.p-error.h-1rem {{$v.email.$error ? $v.email.$errors[0].$message : ' '}}
  template(#footer)
      PButton(label="Submit" @click="submitData" :loading="loading")
      PButton(label="Cancel" class="p-button-secondary" @click="resetFieldData")

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import ErrorCard from "@/components/ErrorCard.vue";
import NavBarWidget from "@/components/NavBarWidget.vue";
import { useStatStore } from "@/stores/stat";
import { useUserStore } from "@/stores/user";
import Dialog from "primevue/dialog";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useToast } from "primevue/usetoast";

const authStore = useAuthStore();
const stat = useStatStore();
const user = useUserStore();
const toast = useToast();
const addFriendDialogOpen = ref(false);
const loading = ref(false);

onMounted(async () => {
  await authStore.fetchAuth();
  stat.fetchTodaysCalorieCount();
  stat.fetchAdminStats();
  user.fetchUserList();
});

const validationRules = {
  email: { required, email },
};

const formState = reactive({
  email: "",
});

const resetFieldData = () => {
  addFriendDialogOpen.value = false;
  formState.email = "";
  $v.value.$reset();
};

const submitData = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) return;

  try {
    loading.value = true;
    await user.inviteFriend(formState.email);
    addFriendDialogOpen.value = false;
    toast.add({
      severity: "success",
      summary: "Friend successfully invited!",
      detail: `${formState.email} is now on board`,
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Oops something went wrong!",
      detail: `Could not invite ${formState.email}`,
      life: 3000,
    });
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const $v = useVuelidate(validationRules, formState, { $scope: false });
</script>
