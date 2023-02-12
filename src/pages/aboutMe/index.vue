<template>
  <div>
    <gz-divider
      class="divider"
      title="pages.aboutMe.personal_TS_overview.title"
    >
    </gz-divider>
    <gz-chart class="chart" :config="treeChartConfig"></gz-chart>

    <gz-divider class="divider" title="pages.aboutMe.personal_TS_details.title">
    </gz-divider>
    <div class="chart-group">
      <gz-chart class="chart" :config="baseChartConfig"></gz-chart>
      <gz-chart class="chart" :config="expandChartConfig"></gz-chart>
      <gz-chart class="chart" :config="vueChartConfig"></gz-chart>
      <gz-chart class="chart" :config="reactChartConfig"></gz-chart>
    </div>
    <gz-divider
      class="divider"
      title="pages.aboutMe.projectTS.title"
    ></gz-divider>
    <div class="tag-group">
      <el-tag class="tag" :color="pi.color" v-for="pi in ProjectIntroductions"
        ><span style="color: #fff">
          {{ pi.name }}
        </span></el-tag
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useStore } from "@store/index";
import { ElTag } from "element-plus";
import GzChart from "@components/GzChart/index.vue";
import GzDivider from "@components/GzDivider/index.vue";
import {
  getTreeChartConfig,
  getBaseChartConfig,
  getExpandChartConfig,
  getVueChartConfig,
  getReactChartConfig,
} from "./config";
import { ref, watchEffect } from "vue";
import useChangePath from "@hooks/useChangePath"
useChangePath()
const { t } = useI18n();
const store = useStore();
store.dispatch("modelAboutMe/getAboutMedata");
const theme = ref(store.state.modelSystem.globalControl.theme);

//技术栈图表图表
const treeChartConfig = ref(
  getTreeChartConfig(t, store.state.modelAboutMe.data.technologyStack)
);
//前端基础技术图表
const baseChartConfig = ref(
  getBaseChartConfig(t, store.state.modelAboutMe.data.technologyStack)
);
//前端进阶技术图表
const expandChartConfig = ref(
  getExpandChartConfig(t, store.state.modelAboutMe.data.technologyStack)
);
//Vue技术图表
const vueChartConfig = ref(
  getVueChartConfig(t, store.state.modelAboutMe.data.technologyStack)
);
//React技术图表
const reactChartConfig = ref(
  getReactChartConfig(t, store.state.modelAboutMe.data.technologyStack)
);
watchEffect(() => {
  //技术栈图表
  treeChartConfig.value = getTreeChartConfig(
    t,
    store.state.modelAboutMe.data.technologyStack
  );
  //前端基础技术图表
  baseChartConfig.value = getBaseChartConfig(
    t,
    store.state.modelAboutMe.data.technologyStack
  );
  // 前端进阶技术图表
  expandChartConfig.value = getExpandChartConfig(
    t,
    store.state.modelAboutMe.data.technologyStack
  );
  //Vue技术图表
  vueChartConfig.value = getVueChartConfig(
    t,
    store.state.modelAboutMe.data.technologyStack
  );
  //React技术图表
  reactChartConfig.value = getReactChartConfig(
    t,
    store.state.modelAboutMe.data.technologyStack
  );
  theme.value = store.state.modelSystem.globalControl.theme;
});

const ProjectIntroductions = [
  {
    name: "vue3.2.0",
    color: "#E74C3C",
  },
  {
    name: "vuex4.0.2",
    color: "#8E44AD",
  },
  {
    name: "vue-router",
    color: "#3498DB",
  },
  {
    name: "ant-design-5.0.0",
    color: "#16A085",
  },
  {
    name: "styled-components-5.3.6",
    color: "#2ECC71",
  },
  {
    name: "typescript-4.9.3",
    color: "#F39C12",
  },
  {
    name: "echarts-5.4.1",
    color: "#D35400",
  },
  {
    name: "wangeditor-5.1.23",
    color: "#f759ab",
  },
  {
    name: "i18next-22.4.9",
    color: "#ad8b00",
  },
];
</script>

<style lang="less" scoped>
.divider {
  margin: 60px 0;
}
.chart {
  margin: 20px;
}
.chart-group {
  display: flex;
  flex-wrap: wrap;
}
.tag {
  margin: 10px;
}
.tag-group {
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
