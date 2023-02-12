<template>
  <gz-side-card></gz-side-card>
  <el-divider content-position="left">{{ t("sider.divider") }}</el-divider>
  <el-menu class="side-menu" :default-active="keyPath[0]">
    <gzMenuItem
      :key="menuData.toString()"
      :menu-data="menuData"
      :item-click="itemClick"
    ></gzMenuItem>
  </el-menu>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@store/index";
import { useI18n } from "vue-i18n";
import { ElMenu, MenuItemRegistered, ElDivider } from "element-plus";
import gzMenuItem from "@components/GzMenuItem/index.vue";
import gzSideCard from "./GzSiderCard/index.vue";
import { menuData } from "@store/system/type";
const store = useStore();
const { t } = useI18n();
const router = useRouter();
const menuData = ref<menuData[]>([]);
const keyPath = ref<string[]>([]);
const isMoveMode = ref(store.state.modelSystem.globalControl.isMoveMode);
watchEffect(() => {
  menuData.value = store.state.modelSystem.menuControl.data;
  keyPath.value = store.state.modelSystem.globalControl.keyPath;
  isMoveMode.value = store.state.modelSystem.globalControl.isMoveMode;
});
const itemClick = (item: MenuItemRegistered) => {
  if(isMoveMode.value){
    store.commit("modelSystem/changeCollapse",true)
  }
  router.push("/" + item.indexPath.join("/"));
  // store.commit("modelSystem/changeKeyPath", item.indexPath);
};
</script>
<style scoped lang="less">
.side-menu {
  border-right: none;
}
</style>
