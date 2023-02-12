<template>
  <div>
    <slot name="header"></slot>
    <el-form
      ref="formRef"
      :rules="getItemsRules(props.config.items(t))"
      :label-position="props.config.labelPosition"
      :model="formValues"
      label-width="120px"
    >
      <el-form-item
        v-for="item in props.config.items(t)"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        :size="props.config.size"
        :style="props.config.formItemStyle"
      >
        <el-input
          v-if="item.type === 'Input'"
          v-model="formValues[item.key]"
          :maxlength="item.inputOption?.maxlength"
          :placeholder="item?.placeholder"
          :size="item.size ? item.size : props.config.size"
          clearable
        >
          <template #prefix v-if="item.prefix">
            <el-icon><component :is="item.prefix"></component></el-icon>
          </template>
          <template #suffix v-if="item.suffix">
            <el-icon><component :is="item.suffix"></component></el-icon>
          </template>
        </el-input>

        <el-input
          v-if="item.type === 'Password'"
          v-model="formValues[item.key]"
          :maxlength="item.inputOption?.maxlength"
          :placeholder="item?.placeholder"
          :size="item.size ? item.size : props.config.size"
          show-password
          clearable
        >
          <template #prefix v-if="item.prefix">
            <el-icon><component :is="item.prefix"></component></el-icon>
          </template>
          <template #suffix v-if="item.suffix">
            <el-icon><component :is="item.suffix"></component></el-icon>
          </template>
        </el-input>

        <el-input
          v-if="item.type === 'TextArea'"
          type="textarea"
          v-model="formValues[item.key]"
          :maxlength="item.inputOption?.maxlength"
          :placeholder="item?.placeholder"
          :rows="item.inputOption?.rows"
          :autosize="item.inputOption?.autosize"
          :show-word-limit="item.inputOption?.showWordLimit"
          :size="item.size ? item.size : props.config.size"
        >
        </el-input>
        <el-select
          v-if="item.type === 'Select'"
          v-model="formValues[item.key]"
          class="select"
          :placeholder="item?.placeholder"
          :multiple="item.selectOption?.multiple"
          :size="item.size ? item.size : props.config.size"
          :loading="selectLoading"
          @visible-change="
            (() => {
              //这里的解释是异步数据只有在点击时候才会加载，并且有定义异步数据
              if (item.selectOption?.asyncValue) {
                return selectVisibleChange(
                  item.selectOption?.asyncValue,
                  item.key
                );
              }
            })()
          "
          clearable
        >
          <template v-if="item.selectOption?.asyncValue">
            <el-option
              v-for="option in options[item.key]"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </template>
          <template v-else>
            <el-option
              v-for="option in item.selectOption?.values"
              :key="option.value"
              :label="option.title"
              :value="option.value"
            />
          </template>
        </el-select>

        <el-date-picker
          v-if="item.type === 'DatePicker'"
          v-model="formValues[item.key]"
          type="date"
          :placeholder="item?.placeholder"
          :size="item.size ? item.size : props.config.size"
        />

        <el-checkbox-group
          v-if="item.type === 'Checkbox' && Array.isArray(item.checkBoxValues)"
          v-model="formValues[item.key]"
        >
          <el-checkbox
            :key="checkBoxValue.title"
            v-for="checkBoxValue in item.checkBoxValues"
            :label="checkBoxValue.title"
            :name="checkBoxValue.value"
          />
        </el-checkbox-group>

        <el-checkbox
          v-if="item.type === 'Checkbox' && !Array.isArray(item.checkBoxValues)"
          v-model="formValues[item.key]"
          :label="item.checkBoxValues"
          name="true"
        />
        <el-radio-group
          v-if="item.type === 'Radio'"
          v-model="formValues[item.key]"
        >
          <el-radio
            v-for="radioValue in item.radioValues"
            :label="radioValue.value"
          >
            {{ radioValue.title }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElCheckboxGroup,
  ElCheckbox,
  ElRadioGroup,
  ElRadio,
} from "element-plus";
import { useStore } from "@store/index";
import { useI18n } from "vue-i18n";
import { FormItemRule } from "element-plus";
import { formConfigType, formConfigItem } from "./type";
const props = defineProps<{
  config: formConfigType;
}>();
const store = useStore();
const { t } = useI18n();
const token = store.state.modelSystem.globalControl.token;

//记录异步select的option
const options = ref<{ [X: string]: { label: any; value: any }[] }>({});
const selectLoading = ref<boolean>(false);
const selectVisibleChange =
  (
    asyncFunction: (token: string) => Promise<{ label: any; value: any }[]>,
    key: string
  ) =>
  (val: boolean) => {
    //如果已经加载过异步数据就不会重复再加载
    if (val && !options.value[key]) {
      selectLoading.value = true;
      asyncFunction(token).then((result) => {
        selectLoading.value = false;
        options.value[key] = result;
      });
    }
  };
//表单的所有信息都会记录在这里
const formValues = ref<{
  [X: string]: any;
}>({});
const setformValues = (value: { [X: string]: any }) => {
  formValues.value = value;
};

props.config.items(t).forEach((item) => {
  if (item.type === "Select" && item.selectOption?.asyncValue) {
    item.selectOption.asyncValue(token).then((result) => {
      options.value[item.key] = result;
    });
  }
});

const formRef = ref<InstanceType<typeof ElForm>>();

function getItemsRules(items: formConfigItem[]) {
  const result: { [X: string]: FormItemRule[] } = {};
  items.forEach((item) => {
    if (item.rules) {
      result[item.key] = item.rules.map((rule) => {
        if (rule.regular) {
          return {
            ...rule,
            validator(rules: any, value: any, callback: any) {
              if (
                typeof value === "string" &&
                rule.regular &&
                value.match(rule.regular)
              ) {
                callback();
              } else {
                callback(rule.message);
              }
            },
          };
        } else {
          return rule;
        }
      });
    }
  });
  return result;
}

defineExpose({
  formValues,
  setformValues,
  formRef,
});
</script>

<style scoped lang="less">
.select {
  width: 100%;
}
</style>
