<template>
  <div>
    <el-card class="chart-card" :style="charStyle">
      <template #header>
        <div class="header">
          <div class="title">{{ props.config.title }}</div>
          <div class="extra">
            <el-button
              v-if="props.config.extra?.zoom ? props.config.extra?.zoom : true"
              text
              @click="onZoom"
              ><el-icon><ZoomIn /></el-icon
            ></el-button>
            <el-button
              v-if="props.config.extra?.collapse"
              text
              @click="onCollapse"
              ><el-icon><ArrowUp /></el-icon
            ></el-button>
            <el-button v-if="props.config.extra?.close" text @click="onClose"
              ><el-icon><Close /></el-icon
            ></el-button>
          </div>
        </div>
      </template>
      <div class="chart" ref="charCardMainRef"></div>
      <div
        class="description"
        :class="{ 'description-light': theme, 'description-dark': !theme }"
      >
        {{ props.config.description }}
      </div>
    </el-card>
    <Teleport to="body">
      <div v-if="isZoom" class="modal">
        <div class="zoom-chart-close">
          <el-button @click="closeZoom" circle
            ><el-icon><Close /></el-icon
          ></el-button>
        </div>
        <div class="zoom-chart-space"></div>
        <div
          class="zoom-move-limit"
          :class="{
            'zoom-move-limit-scroll': isMoveMode,
            'zoom-move-limit-light': theme,
            'zoom-move-limit-dark': !theme,
          }"
        >
          <div
            class="zoom-chart"
            :class="{ 'zoom-chart-move': !isMoveMode }"
            :uuid="zoomModalUUID"
          ></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  ref,
  Teleport,
  nextTick,
  watchEffect,
} from "vue";
import { useStore } from "@store/index";
import { ElCard, ElButton, ElIcon } from "element-plus";
import { Close, ArrowUp, ZoomIn } from "@element-plus/icons-vue";
import { v4 } from "uuid";
import echarts from "@register/echarts";
import { charConfig } from "./type";

const store = useStore();
const theme = ref(store.state.modelSystem.globalControl.theme);
const isMoveMode = ref(store.state.modelSystem.globalControl.isMoveMode);
watchEffect(() => {
  theme.value = store.state.modelSystem.globalControl.theme;
  isMoveMode.value = store.state.modelSystem.globalControl.isMoveMode;
});
const props = defineProps<{
  config: charConfig;
}>();
const chartDefaultWidth = "375px";
const chartDefaultHeight = "375px";
const charStyle = {
  maxWidth: props.config.chartStyle?.width
    ? props.config.chartStyle?.width
    : chartDefaultWidth,
};
const charCardMainRef = ref<HTMLDivElement>();
const isCollapse = ref<boolean>(false);
const onCollapse = () => {
  //收缩时候需要卸载echarts
  if (charCardMainRef.value && !isCollapse.value) {
    charCardMainRef.value.style.height = "0px";
    echarts.dispose(charCardMainRef.value);
    isCollapse.value = true;
  } else if (charCardMainRef.value && isCollapse.value) {
    if (props.config.chartStyle?.height) {
      charCardMainRef.value.style.height = props.config.chartStyle?.height;
    } else {
      charCardMainRef.value.style.height = chartDefaultHeight;
    }
    const myChart = theme.value
      ? echarts.init(charCardMainRef.value)
      : echarts.init(charCardMainRef.value, "chalk");
    myChart.setOption(props.config.chartOption);
    isCollapse.value = false;
  }
};
const onClose = () => {
  if (charCardMainRef.value) {
    echarts.dispose(charCardMainRef.value);
    const parentNode =
      charCardMainRef.value.parentNode?.parentNode?.parentNode?.parentNode;
    parentNode?.removeChild(parentNode.children[0]);
  }
};

const zoomModalUUID = v4();
const isZoom = ref<boolean>(false);
const onZoom = () => {
  isZoom.value = true;
  nextTick(() => {
    const zoomModalEL = document.querySelector(
      "[uuid='" + zoomModalUUID + "']"
    ) as HTMLElement;
    if (zoomModalEL) {
      const myChart = theme.value
        ? echarts.init(zoomModalEL)
        : echarts.init(zoomModalEL, "chalk");
      myChart.setOption(props.config.chartOption);
    }
  });
};
const closeZoom = () => {
  //关闭需要卸载echarts
  const zoomModalEL = document.querySelector(
    "[uuid='" + zoomModalUUID + "']"
  ) as HTMLElement;
  if (zoomModalEL) {
    echarts.dispose(zoomModalEL);
  }
  isZoom.value = false;
};
watchEffect(() => {
  if (charCardMainRef.value) {
    echarts.dispose(charCardMainRef.value);
    charCardMainRef.value.style.width = props.config.chartStyle?.width
      ? props.config.chartStyle?.width
      : chartDefaultWidth;
    charCardMainRef.value.style.height = props.config.chartStyle?.height
      ? props.config.chartStyle?.height
      : chartDefaultHeight;
    const myChart = theme.value
      ? echarts.init(charCardMainRef.value)
      : echarts.init(charCardMainRef.value, "chalk");
    myChart.setOption(props.config.chartOption);
  }
});
// onMounted(() => {});
onUnmounted(() => {
  if (charCardMainRef.value) {
    echarts.dispose(charCardMainRef.value);
  }
});
</script>

<style lang="less" scoped>
.chart-card {
  min-width: 425px;
  overflow: hidden;
  .header {
    display: flex;
    .title {
      font-weight: 1000;
      line-height: 32px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
    }
  }
  .chart {
    width: 375px;
    height: 375px;
  }
  .description {
    font-weight: 300;
    font-size: 0.8em;
  }
  .description-light {
    color: rgba(0, 0, 0, 0.45);
  }
  .description-dark {
    color: rgba(255, 255, 255, 0.45);
  }
}
.modal {
  .zoom-chart-close {
    margin: 10px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 102;
  }
  .zoom-chart-space {
    width: 100vw;
    // height: 100vh;
    height: 100vh;
    position: absolute;
    z-index: 101;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .zoom-move-limit {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 101;
  }
  .zoom-move-limit-scroll {
    overflow: scroll;
  }

  .zoom-move-limit-light::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: whitesmoke;
  }
  .zoom-move-limit-dark::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #202124;
  }
  .zoom-move-limit-light::-webkit-scrollbar-thumb {
    background-color: #409eff;
  }
  .zoom-move-limit-dark::-webkit-scrollbar-thumb {
    background-color: whitesmoke;
  }
  .zoom-chart {
    width: 1000px;
    height: 1000px;
    z-index: 101;
    background-color: white;
    border-radius: 15px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .zoom-chart-move {
    top: 50%;
    left: 50%;
    transform: translate(-500px, -500px);
  }
}
</style>
