<template>
  <div
    class="content"
    :class="{ 'content-scroll-light': theme, 'content-scroll-dark': !theme }"
  >
    <!-- <read></read> -->
    <!-- <edit></edit> -->
    <!-- <about-me></about-me> -->
    <!-- <setting-permissions></setting-permissions> -->
    <!-- <setting-role></setting-role> -->
    <!-- <setting-user></setting-user> -->
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useStore } from "@store/index";
import { RouterView } from "vue-router";

import edit from "@pages/edit/index.vue";
import Read from "@pages/read/index.vue";
import aboutMe from "@pages/aboutMe/index.vue";
import settingUser from "@pages/setting/settingUsers/index.vue";
import settingRole from "@pages/setting/settingRoles/index.vue";
import settingPermissions from "@pages/setting/settingPermissions/index.vue";

const store = useStore();
const theme = ref(store.state.modelSystem.globalControl.theme);
watchEffect(() => {
  theme.value = store.state.modelSystem.globalControl.theme;
});
</script>

<style scoped lang="less">
.content {
  height: 100%;
  overflow: scroll;
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
