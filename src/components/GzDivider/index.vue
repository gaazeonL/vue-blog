<template>
  <div class="main">
    <el-divider
      v-change-theme="{
        theme,
        attributes: ['cssText'],
        light: ['--el-bg-color:#f5f5f5'],
        dark: ['--el-bg-color:#202124'],
      }"
      content-position="left"
      ><span v-if="props.title" class="title">{{ t(props.title) }}</span>
      <slot name="title"></slot>
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useStore } from "@store/index";
import { useI18n } from "vue-i18n";
import { ElDivider } from "element-plus";
const props = defineProps<{
  title?: string;
}>();
const store = useStore();
const { t } = useI18n();
const theme = ref(store.state.modelSystem.globalControl.theme);
watchEffect(() => {
  theme.value = store.state.modelSystem.globalControl.theme;
});
</script>

<style lang="less" scoped>
.main {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.title {
  font-weight: 600;
  font-size: 38px;
}
</style>
