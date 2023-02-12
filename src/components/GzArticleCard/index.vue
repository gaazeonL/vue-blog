<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <div class="card-header-title">{{ props.config.title }}</div>
        <div>
          <div>
            <!-- 用来防止按钮错位 -->
          </div>
          <el-button
            @click="
              props.config.onEdit && props.config.onEdit(props.config.key)
            "
            v-if="editArticlePermission"
            type="info"
            >{{ editBtnText }}</el-button
          >
          <el-button
            @click="
              props.config.onDelete && props.config.onDelete(props.config.key)
            "
            v-if="deleteArticlePermission"
            type="danger"
            >{{ deleteBtnText }}</el-button
          >
        </div>
      </div>
    </template>
    <div class="main" @click="props.config.onClick">
      <div class="cover">
        <img
          :src="props.config.cover ? props.config.cover : noImgPng"
          class="cover-img"
        />
      </div>
      <div class="content">
        <div class="description">
          {{ props.config.description }}
        </div>
        <div class="time">
          <span>{{ dayjs(props.config.time).format("YYYY-MM-DD") }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useStore } from "@store/index";
import { useI18n } from "vue-i18n";
import { ElCard, ElButton, dayjs } from "element-plus";
import { articleCardConfig } from "./type";
import noImgPng from "@assets/img/no-image.png";
import checkPermission from "@hooks/checkPermission";

const props = defineProps<{
  config: articleCardConfig;
}>();
const store = useStore();
const { t } = useI18n();
const theme = ref(store.state.modelSystem.globalControl.theme);
watchEffect(() => {
  theme.value = store.state.modelSystem.globalControl.theme;
});
const editArticlePermission = checkPermission("article::editArticle");
const deleteArticlePermission = checkPermission("article::deleteArticle");
const deleteBtnText = ref(t("components.article.extra.delete"));
const editBtnText = ref(t("components.article.extra.edit"));
watchEffect(() => {
  store.state.modelSystem.globalControl.language;
  deleteBtnText.value = t("components.article.extra.delete");
  editBtnText.value = t("components.article.extra.edit");
});
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  .card-header-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 32px;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.main {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.cover {
  width: 150px;
  height: 150px;
  //   display: flex;
  //   justify-content: center;
  .cover-img {
    width: inherit;
    height: inherit;
    background-position: center;
    background-size: cover;
  }
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  font-weight: 300;
  min-width: 240px;
  margin: 20px 20px 0 20px;
  .description {
    color: #777;
  }
  .time {
    font-size: 12px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
