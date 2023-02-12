<template>
  <div class="gz-header">
    <div class="left-item">
      <el-button @click="changeCollapse" circle text size="large"
        ><el-icon
          class="icon-base"
          :class="{
            'icon-not-collapse': !isCollapse,
            'icon-collapse': isCollapse,
          }"
          size="large"
          ><Back /></el-icon
      ></el-button>
    </div>
    <div class="middle-item">
      <el-breadcrumb>
        <el-breadcrumb-item :key="kp" v-for="kp in keyPath">{{
          t("sider.menu." + kp)
        }}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :key="kp" v-for="kp in keyPath">{{
          kp
        }}</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="right-item">
      <el-space>
        <el-tooltip :content="t('header.g2github')">
          <el-button text type="primary"
            ><el-icon><Link /></el-icon>Github</el-button
          >
        </el-tooltip>
        <el-dropdown @command="changeLanguage">
          <el-button text size="large">
            <el-icon><Document /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh_CN">简体中文</el-dropdown-item>
              <el-dropdown-item command="zh_HK">繁體中文</el-dropdown-item>
              <el-dropdown-item command="en_US">English</el-dropdown-item>
              <el-dropdown-item command="ja_JP">日本語</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-switch
          v-model="isLight"
          @change="isLightOnChange"
          size="large"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
        />
      </el-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  ElButton,
  ElIcon,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElSpace,
  ElSwitch,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElTooltip,
} from "element-plus";
import { useI18n } from "vue-i18n";
import { Back, Sunny, Moon, Document, Link } from "@element-plus/icons-vue";
import { useStore } from "@store/index";
const store = useStore();
const { t, locale } = useI18n();
const isCollapse = ref(store.state.modelSystem.siderBarControl.isCollapse);
const keyPath = ref(store.state.modelSystem.globalControl.keyPath);
const isLight = ref(store.state.modelSystem.globalControl.theme);
watchEffect(() => {
  isCollapse.value = store.state.modelSystem.siderBarControl.isCollapse;
  keyPath.value = store.state.modelSystem.globalControl.keyPath;
  isLight.value = store.state.modelSystem.globalControl.theme;
});
const isLightOnChange = (newValue: string | number | boolean) => {
  store.commit("modelSystem/changeTheme", newValue);
};
const changeCollapse = () => {
  store.commit("modelSystem/changeCollapse", !isCollapse.value);
};
const changeLanguage = (language: string) => {
  store.dispatch("modelSystem/changeLanguage", language);
  locale.value = language;
};
</script>

<style scoped lang="less">
.gz-header {
  display: flex;

  .left-item {
    min-width: 45px;
    flex: 1;
    .icon-base {
      transition: all ease 0.2s;
    }
    .icon-collapse {
      transform: rotate(0.5turn);
    }
    .icon-not-collapse {
      transform: rotate(0turn);
    }
  }
  .middle-item {
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 11;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .right-item {
    display: flex;
    min-width: 200px;
  }
}
</style>
