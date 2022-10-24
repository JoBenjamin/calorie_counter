<template lang="pug">
.flex.flex-column.h-screen
    .surface-card.w-screen.h-4rem.shadow-1.flex.align-items-center.justify-content-between.p-3
        .text-4xl.text-color Calorie Counter
        .text-2xl.text-color.mr-4.font-light {{authStore.email}}
    .py-3.px-5.flex-grow-1
        slot(v-if="authStore.email")
        ErrorCard(v-else error-message="Couldn't authenticate user") 
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import ErrorCard from "@/components/ErrorCard.vue";

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchAuth();
});
</script>
