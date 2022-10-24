<template lang="pug">
.h-full.flex.justify-content-center.align-items-center
    .p-5.shadow-1
        .text-red-600.font-light.text-3xl {{props.errorMessage}}
</template>

<script lang="ts" setup>
const props = defineProps({
  errorMessage: {
    type: String,
    default: "Ooops something went wrong!",
  },
});
</script>
