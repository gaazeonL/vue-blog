<template>
  <el-container style="height: 100vh">
    <el-aside
      v-show="!isCollapse"
      class="aside-base"
      :class="{
        'aside-not-collapse': !isCollapse,
        'aside-collapse': isCollapse,
        'aside-theme-light': theme,
        'aside-theme-dark': !theme,
      }"
    >
      <gz-side-bar />
    </el-aside>
    <gz-move-cloack v-if="!isCollapse &&isMoveMode"></gz-move-cloack>
    <el-container>
      <el-header
        class="header"
        :class="{
          'header-not-collapse': !isCollapse && !isMoveMode,
          'header-collapse': isCollapse,
          'header-theme-light': theme,
          'header-theme-dark': !theme,
        }"
      >
        <gz-header />
      </el-header>
      <el-main
        class="main"
        :class="{
          'main-not-collapse': !isCollapse && !isMoveMode,
          'main-collapse': isCollapse,
          'main-theme-light': theme,
          'main-theme-dark': !theme,
        }"
      >
        <gzContent />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useStore } from "@store/index";
import { ElContainer, ElAside, ElHeader, ElMain } from "element-plus";
import gzHeader from "./GzHeader/index.vue";
import gzSideBar from "./GzSideBar/index.vue";
import gzContent from "./GzContent/index.vue";
import gzMoveCloack from "@components/GzMoveCloack/index.vue";
const store = useStore();
const isCollapse = ref(store.state.modelSystem.siderBarControl.isCollapse);
const theme = ref(store.state.modelSystem.globalControl.theme);
const isMoveMode = ref(store.state.modelSystem.globalControl.isMoveMode);
watchEffect(() => {
  isCollapse.value = store.state.modelSystem.siderBarControl.isCollapse;
  theme.value = store.state.modelSystem.globalControl.theme;
  isMoveMode.value = store.state.modelSystem.globalControl.isMoveMode;
});
const siderWidth = store.state.modelSystem.menuControl.width + "px";
</script>

<style scoped lang="less">
.aside-not-collapse {
  width: v-bind("siderWidth");
}
.aside-collapse {
  width: 0px;
  opacity: 0;
}
.aside-base {
  height: 100vh;
  position: fixed;
  box-shadow: 1px 0px 1px rgb(240 240 240);
  z-index: 100;
  transition: all ease 0.2s;
}

.header-not-collapse {
  .gz-header {
    margin-left: 260px;
  }
}
.header-collapse {
  .gz-header {
    margin-left: 0px;
  }
}
.header-theme-light {
  background-color: #ffffff;
}
.header-theme-dark {
  background-color: #292a2d;
}
.header {
  width: 100%;
  height: 64px;
  line-height: 64px;
  padding: 0px 20px 0px 20px;
  position: fixed;
  top: 0px;
  z-index: 97;
  box-shadow: inset 0px -2px 2px -1px rgb(200 200 200);
  transition: all ease 0.2s;
}
.aside-theme-light {
  background-color: #ffffff;
}
.aside-theme-dark {
  background-color: #292a2d;
}
.main-theme-light {
  background-color: whitesmoke;
}
.main-theme-dark {
  background-color: #202124;
}
.main-not-collapse {
  margin-left: v-bind("siderWidth");
}
.main-collapse {
  margin-left: 0px;
}
.main {
  height: 100vh;
  padding: 0;
  margin-top: 64px;
  overflow: hidden;
  transition: all ease 0.2s;
}
</style>
