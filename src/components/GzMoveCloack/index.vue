<template>
  <div class="move-cloack" @click="onClick"></div>
</template>

<script setup lang="ts">
import { useStore } from "@store/index";
const store = useStore();
const onClick = () => {
  store.commit("modelSystem/changeCollapse", true);
};
</script>

<style lang="less" scoped>
.move-cloack {
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 98;
}
</style>
