<template>
  <el-dialog v-model="dialogVisible" style="min-width: 375px;">
    <template #header>
      {{ props.dialogConfg?.title && t(props.dialogConfg?.title) }}
    </template>
    <gz-form :config="props.formConfig" ref="formRef">
      <template #header v-if="props.formHeader">
        <component
          v-if="props.formHeader"
          :is="props.formHeader(t)"
        ></component>
      </template>
    </gz-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          props.dialogConfg?.cancelBtnText
            ? t(props.dialogConfg?.cancelBtnText)
            : t("components.modelForm.cancel")
        }}</el-button>
        <el-button :loading="confirmLoading" type="primary" @click="onConfirm">
          {{
            props.dialogConfg?.okBtnText
              ? t(props.dialogConfg?.okBtnText)
              : t("components.modelForm.ok")
          }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, VNode } from "vue";
import { useStore } from "@store/index";
import { useI18n } from "vue-i18n";
import { ElButton, ElDialog } from "element-plus";
import GzForm from "@components/GzForm/index.vue";
// import modelFormConfig from "@components/GzModelForm/type";
import { formConfigType } from "@components/GzForm/type";
import { i18n_t } from "@utils/type";
const props = defineProps<{
  formConfig: formConfigType;
  formHeader?: (t: i18n_t) => VNode;
  dialogConfg?: {
    title?: string;
    okBtnText?: string;
    cancelBtnText?: string;
  };
  service: (...args: any) => Promise<any>;
  onServiceFullfilled?: (result: any, t: i18n_t) => any;
  onServiceRejected?: (result: any, t: i18n_t) => any;
}>();
const store = useStore();
const { t } = useI18n();
const formRef = ref<InstanceType<typeof GzForm>>();
const dialogVisible = ref(false);
const confirmLoading = ref(false);
const servicePayloadData = ref<{ [x: string]: any }>({});
const token = store.state.modelSystem.globalControl.token;
const handleOpen = (
  servicePayload?: { [x: string]: any },
  formInitialValues?: { [x: string]: any }
) => {
  if (!servicePayload) {
    servicePayload = {};
  }
  //打开时传入额外的参数
  servicePayloadData.value = servicePayload;
  //给表单传入初始值
  let formValues = formRef.value?.formValues;
  formValues = {
    ...formValues,
    ...formInitialValues,
  };
  formRef.value?.setformValues(formValues);
  //对话框可见
  dialogVisible.value = true;
};

const onConfirm = () => {
  if (formRef.value?.formRef) {
    formRef.value?.formRef.validate().then(
      () => {
        const options: any = {
          token,
          ...servicePayloadData.value,
          ...formRef.value?.formValues,
          loading: confirmLoading,
        };
        props.service(options).then(
          (result) => {
            if (result.code === 0) {
              props.onServiceFullfilled && props.onServiceFullfilled(result, t);
              formRef.value?.formRef?.resetFields();
              dialogVisible.value = false;
            } else {
              props.onServiceRejected && props.onServiceRejected(result, t);
            }
          },
          (reject) => {
            props.onServiceRejected && props.onServiceRejected(reject, t);
          }
        );
      },
      () => {}
    );
  }
};
defineExpose({
  handleOpen,
});
</script>

<style scoped></style>
