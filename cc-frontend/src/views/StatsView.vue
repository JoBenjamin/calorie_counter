<template lang="pug">
main
    .flex.justify-content-evenly.align-items-center.pt-6
        .card
            .text-lg.text-color Items added in the last 7 days
            .text-4xl.text-color {{stat.lastSevenDayItemCount}}
        .card
            .text-lg.text-color Items added the week before that
            .text-4xl.text-color {{ stat.beforeLastSevenDayItemCount}}
        .card
            .text-lg.text-color Average calories per user in the last 7 days
            .text-4xl.text-color {{ stat.sevenDayUserAverageCalorie}}
</template>

<script lang="ts" setup>
import { useStatStore } from "@/stores/stat";
import { onMounted } from "vue";

const stat = useStatStore();

onMounted(stat.fetchAdminStats);
</script>
