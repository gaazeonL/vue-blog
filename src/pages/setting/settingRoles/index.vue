<template>
  <gz-curd-page ref="curdPageRef" :config="config"></gz-curd-page>
</template>
<script setup lang="ts">
import { ref } from "vue";
import GzCurdPage from "@components/GzCurdPage/index.vue";
import getCurdConfig from "./config";
const curdPageRef = ref<InstanceType<typeof GzCurdPage>>();
const config = getCurdConfig(curdPageRef);
</script>

<style scoped></style>
