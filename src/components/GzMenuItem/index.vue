<template>
  <template v-for="menu in menuData">
    <el-menu-item
      :key="menu.id"
      v-if="menu.type === 1"
      :index="menu.key"
      @click="props.itemClick"
    >
      <el-icon v-if="menu.vue_icon"
        ><component :is="icon[menu.vue_icon]"></component
      ></el-icon>
      {{ t("sider.menu." + menu.key) }}
    </el-menu-item>
    <el-sub-menu v-else-if="menu.type === 2" :index="menu.key">
      <template #title>
        <el-icon v-if="menu.vue_icon"
          ><component :is="icon[menu.vue_icon]"></component
        ></el-icon>
        <span>{{ t("sider.menu." + menu.key) }}</span>
      </template>
      <gz-menu-item
        v-if="menu.children"
        :menuData="menu.children"
        :item-click="props.itemClick"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ElSubMenu, ElMenuItem, ElIcon } from "element-plus";
import * as icons from "./icon";
import gzMenuItem from "./index.vue";
import { menuData } from "@store/system/type";
import { MenuItemRegistered } from "element-plus/es/components/menu";
const { t } = useI18n();
const props = defineProps<{
  menuData: menuData[];
  itemClick?: (item: MenuItemRegistered) => void;
}>();
const icon: any = icons;
const menuData = props.menuData;
</script>

<style scoped></style>
