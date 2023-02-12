<template>
  <div class="divider">
    <el-tooltip :content="title">
      <gz-divider>
        <template #title>
          <span class="title"> {{ title }} </span>
        </template>
      </gz-divider>
    </el-tooltip>
  </div>
  <div
    v-html="content"
    class="content"
    :class="{ 'content-scroll-light': theme, 'content-scroll-dark': !theme }"
    v-change-theme="{
      theme,
      attributes: ['backgroundColor', 'color'],
      light: ['white', 'rgb(0, 0, 0)'],
      dark: ['rgb(53, 54, 58)', 'white'],
    }"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "@store/index";
import { useRoute } from "vue-router";
import { ElTooltip } from "element-plus";
import GzDivider from "@components/GzDivider/index.vue";
import { getArticleService } from "@service/article";
const store = useStore();
const route = useRoute();
const theme = ref(store.state.modelSystem.globalControl.theme);
watchEffect(() => {
  theme.value = store.state.modelSystem.globalControl.theme;
});
const title = ref("");
const content = ref("");

onMounted(() => {
  getArticleService(route.params.uuid as string).then((result) => {
    if (typeof result.message !== "string" && result.message.aticle) {
      title.value = result.message.aticle.title;
      content.value = result.message.aticle.content;
    }
  });
});
</script>

<style lang="less" scoped>
.divider {
  margin: 60px 0;
}
.title {
  font-weight: 600;
  font-size: 38px;
}
.content {
  width: 95%;
  min-height: 1050px;
  padding: 20px;
  margin: 0px auto;
  overflow: scroll;
  overflow-wrap: break-word;
}
.content-scroll {
  width: 5px;
  height: 8px;
}
.content-scroll-light::-webkit-scrollbar {
  &:extend(.content-scroll);
  background-color: whitesmoke;
}
.content-scroll-dark::-webkit-scrollbar {
  &:extend(.content-scroll);
  background-color: #202124;
}
.content-scroll-light::-webkit-scrollbar-thumb {
  background-color: #409eff;
}
.content-scroll-dark::-webkit-scrollbar-thumb {
  background-color: whitesmoke;
}
</style>
