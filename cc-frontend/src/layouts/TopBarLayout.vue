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
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import ErrorCard from "@/components/ErrorCard.vue";
import NavBarWidget from "@/components/NavBarWidget.vue";
import { useStatStore } from "@/stores/stat";
import { useUserStore } from "@/stores/user";

const authStore = useAuthStore();
const stat = useStatStore();
const user = useUserStore();

onMounted(async () => {
  await authStore.fetchAuth();
  stat.fetchTodaysCalorieCount();
  user.fetchUserList();
});
</script>
