<template>
  <el-config-provider :locale="locale">
    <mainPlan></mainPlan>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useStore } from "@store/index";
import { ElConfigProvider } from "element-plus";
import { Language } from "element-plus/es/locale";
import initHooks from "@hooks/initHooks";
import mainPlan from "./components/MainPlan/index.vue";
initHooks();
const store = useStore();
const locale = ref<Language | undefined>(undefined);
watchEffect(() => {
  if (store.state.modelSystem.globalControl.languagePack) {
    locale.value = store.state.modelSystem.globalControl.languagePack;
  }
});
</script>

<style scoped></style>
