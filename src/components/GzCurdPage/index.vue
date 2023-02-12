<template>
  <div>
    <div class="form">
      <gz-form ref="formRef" :config="props.config.formConfig"></gz-form>
      <div class="form-select">
        <el-button type="primary" @click="onServiceSelect">{{
          props.config.formConfig.selectBtn?.title
            ? t(props.config.formConfig.selectBtn?.title)
            : ""
        }}</el-button>
      </div>
    </div>
    <template v-for="modalConfigKey in modalConfigKeys">
      <gz-model-form
        v-if="props.config.tableConfig[modalConfigKey.key]"
        :key="modalConfigKey.key"
        :ref="modalConfigKey.ref"
        :dialog-confg="props.config.tableConfig[modalConfigKey.key].dialogConfg"
        :form-header="props.config.tableConfig[modalConfigKey.key].formHeader"
        :form-config="props.config.tableConfig[modalConfigKey.key].formConfig"
        :service="props.config.tableConfig[modalConfigKey.key].service"
        :on-service-fullfilled="
          props.config.tableConfig[modalConfigKey.key].onServiceFullfilled
        "
      >
      </gz-model-form>
    </template>
    <el-divider />
    <div class="table">
      <div
        class="table-header"
        v-if="props.config.tableConfig.tableHeadControl"
      >
        <span class="table-title">{{ t(props.config.tableConfig.name) }}</span>
        <el-space>
          <el-button
            v-if="props.config.tableConfig.tableHeadControl.create"
            type="primary"
            @click="
              (() => {
                if (
                  props.config.tableConfig.tableHeadControl &&
                  props.config.tableConfig.tableHeadControl.create
                ) {
                  return props.config.tableConfig.tableHeadControl.create
                    .onClick;
                }
              })()
            "
            >{{
              props.config.tableConfig.tableHeadControl.create.title
                ? t(props.config.tableConfig.tableHeadControl.create.title)
                : t("components.curdPage.tableHeadControl.createBtn")
            }}</el-button
          >
          <el-button
            v-if="props.config.tableConfig.tableHeadControl.batchDeletion"
            type="danger"
            :disabled="multipleSelection.length === 0"
            @click="
              (() => {
                if (
                  props.config.tableConfig.tableHeadControl &&
                  props.config.tableConfig.tableHeadControl.batchDeletion
                ) {
                  return props.config.tableConfig.tableHeadControl.batchDeletion
                    .onClick;
                }
              })()
            "
            >{{
              props.config.tableConfig.tableHeadControl.batchDeletion.title
                ? t(
                    props.config.tableConfig.tableHeadControl.batchDeletion
                      .title
                  )
                : t("components.curdPage.tableHeadControl.batchDeletionBtn")
            }}</el-button
          >
        </el-space>
      </div>
      <div>
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="expand"
            v-if="props.config.tableConfig.expandable"
          >
            <template #default="column">
              <component
                :is="
                  props.config.tableConfig.expandable.expandedRowRender(
                    column.row,
                    t
                  )
                "
              ></component>
            </template>
          </el-table-column>
          <el-table-column
            v-if="props.config?.tableConfig?.tableHeadControl?.batchDeletion"
            type="selection"
            width="55"
          />
          <el-table-column
            v-for="column in props.config.tableConfig.columns(t)"
            :key="column.key"
            :prop="column.dataIndex"
            :label="column.title"
          >
            <template #default="scope" v-if="column.render">
              <component
                v-if="column.render"
                :is="column.render(scope.column, scope.row, scope.$index)"
              ></component>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next,jumper"
          :total="count"
          :current-page="pageNumber"
          @current-change="onCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "@store/index";
import { useI18n } from "vue-i18n";
import {
  ElTable,
  ElTableColumn,
  ElSpace,
  ElButton,
  ElDivider,
  ElPagination,
  vLoading,
} from "element-plus";
import { v4 } from "uuid";
import GzForm from "@components/GzForm/index.vue";
import GzModelForm from "@components/GzModelForm/index.vue";
import { curdConfigType } from "./type";
import useChangePath from "@hooks/useChangePath";
useChangePath();
const props = defineProps<{
  config: curdConfigType;
}>();

const { t } = useI18n();
const store = useStore();
const token = ref(store.state.modelSystem.globalControl.token);
watchEffect(() => {
  token.value = store.state.modelSystem.globalControl.token;
});
const multipleSelection = ref<any[]>([]);
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};

const formRef = ref<InstanceType<typeof GzForm>>();
const onServiceSelect = () => {
  onCurrentChange(1);
  // pageNumber.value = 1;
  // flushTable({ ...formRef.value?.formValues, pageNumber: 1});
};
const flushTable = (parms?: { [X: string]: any }) => {
  props.config.tableConfig
    .selectService({ ...parms, token: token.value, loading: tableLoading })
    .then((result: any) => {
      const newData = result.message.map((data: any) => {
        return data.key
          ? data
          : {
              key: v4(),
              ...data,
            };
      });
      if (newData.length < 10) {
        //如果这一页结果没有10个，那么后面的页数自然也是空的
        count.value = pageNumber.value * 10 - 1;
      } else {
        count.value = staticCount;
      }
      tableData.value = newData;
    });
};
//创建项目的弹窗表单
const createFormModalRef = ref<InstanceType<typeof GzModelForm>>();
//批量删除项目的弹窗表单
const batchDeletionFormModalRef = ref<InstanceType<typeof GzModelForm>>();
//删除项目的弹窗表单
const deleteFormModalRef = ref<InstanceType<typeof GzModelForm>>();
//编辑项目的弹窗表单
const editFormModalRef = ref<InstanceType<typeof GzModelForm>>();
const modalConfigKeys = [
  {
    key: "createModelConfig",
    ref: createFormModalRef,
  },
  {
    key: "deleteModelConfig",
    ref: deleteFormModalRef,
  },
  {
    key: "batchDeletionModelConfig",
    ref: batchDeletionFormModalRef,
  },
  {
    key: "editModelConfig",
    ref: editFormModalRef,
  },
];
const tableData = ref<any[]>([]);
const tableLoading = ref(false);
//这个是可变总页面数
const count = ref(0);
const pageNumber = ref(1);
//这个总页面数不变
let staticCount = 0;

const onCurrentChange = (val: number) => {
  pageNumber.value = val;
  flushTable({ ...formRef.value?.formValues, pageNumber: val });
};

onMounted(() => {
  //首次加载table数据
  props.config.tableConfig
    .selectService({
      token: token.value,
      pageNumber: 1,
      loading: tableLoading,
    })
    .then((result: any) => {
      if (Array.isArray(result.message)) {
        tableData.value = result.message;
      }
    });

  props.config.tableConfig
    .countService({ token: token.value })
    .then((result) => {
      if (result.message.count !== -1) {
        count.value = result.message.count;
        staticCount = result.message.count;
      }
    });
});

defineExpose({
  createFormModalRef,
  batchDeletionFormModalRef,
  deleteFormModalRef,
  editFormModalRef,
  flushTable,
  multipleSelection,
});
</script>

<style scoped lang="less">
.table {
  margin: 20px;
}
.form {
  margin: 40px 20px;
}
.form-select {
  display: flex;
  flex-direction: row-reverse;
}
.table-header {
  display: flex;
  height: 32px;
  padding: 16px;
  .table-title {
    flex: 1;
    line-height: 32px;
    font-weight: 600;
  }
}
.pagination {
  margin: 40px 0 0 0;
}
</style>
