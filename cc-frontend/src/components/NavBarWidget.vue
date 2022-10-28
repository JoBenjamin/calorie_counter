<template lang="pug">
.flex.justify-content-center.align-items-center
    span(class="p-button-set")
        PButton(label="Dashboard" class="p-button-text p-button-secondary p-button-lg" @click="router.push('/')")
        PButton(label="Stats" class="p-button-text p-button-secondary p-button-lg" @click="router.push('/stats')" v-if="auth.getRoles.includes('ADMIN')")
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const router = useRouter();
</script>
