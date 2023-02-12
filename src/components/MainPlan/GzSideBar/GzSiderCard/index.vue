<template>
  <gz-model-form
    ref="modelFormRef"
    :dialog-confg="loginFMC.dialogConfg"
    :form-config="loginFMC.formConfig"
    :service="loginFMC.service"
    :on-service-fullfilled="loginFMC.onServiceFullfilled"
  ></gz-model-form>
  <el-card shadow="never" class="card" :class="{ 'card-dark': !theme }">
    <div class="card-body">
      <div class="avatar" @click="openDialog">
        <el-avatar
          :size="65"
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        />
      </div>
      <div>
        <div class="title">Gaazeon</div>
        <div
          class="description"
          :class="{ 'description-light': theme, 'description-dark': !theme }"
        >
          这个人很懒，什么也没有留下
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { ElCard, ElAvatar } from "element-plus";
import GzModelForm from "@components/GzModelForm/index.vue";
import { useStore } from "@store/index";
import { useI18n } from "vue-i18n";
import getConfig from "./loginFMC";

const store = useStore();
const { t } = useI18n();
const modelFormRef = ref<InstanceType<typeof GzModelForm>>();
const theme = ref(store.state.modelSystem.globalControl.theme);
const loginFMC = ref(getConfig(store, t));
watchEffect(() => {
  theme.value = store.state.modelSystem.globalControl.theme;
  store.state.modelSystem.globalControl.language;
  loginFMC.value = getConfig(store, t);
});
const openDialog = () => {
  modelFormRef.value?.handleOpen();
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 50px;
  border: none;
  .card-body {
    display: flex;
    .avatar {
      padding-inline-end: 16px;
    }
    .title {
      font-weight: 600;
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 8px;
    }
    .description {
      font-size: 14px;
    }
    .description-light {
      color: rgba(0, 0, 0, 0.45);
    }
    .description-dark {
      color: rgba(255, 255, 255, 0.45);
    }
  }
}

.card-dark {
  background-color: #292a2d;
}
</style>
