<template>
  <gz-divider class="divider" title="pages.edit.title"></gz-divider>
  <div class="title">
    <gz-form ref="titleFormRef" :config="titleFormConfig"></gz-form>
  </div>
  <div :class="{ 'editor-light': theme, 'editor-dark': !theme }">
    <Toolbar
      class="toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 70vh"
      class="editor"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
  <div class="button-bar">
    <el-space size="large">
      <el-button type="primary" @click="onReset">{{
        t("pages.edit.resetBtn")
      }}</el-button>
      <el-button type="primary" @click="onSubmit">{{
        t("pages.edit.submitBtn")
      }}</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted, watchEffect } from "vue";
import { ElButton, ElSpace } from "element-plus";
import { useStore } from "@store/index";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { editorAddLanguage } from "@register/wangEditor";
import changeEditorLanguage from "@hooks/changeEditorLanguage";
import GzDivider from "@components/GzDivider/index.vue";
import GzForm from "@components/GzForm/index.vue";
import { formConfigType } from "@components/GzForm/type";
import { v4 } from "uuid";
import {
  createArticleService,
  editArticleService,
  getArticleService,
} from "@service/article";
import useChangePath from "@hooks/useChangePath";
useChangePath();
const store = useStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const theme = ref(store.state.modelSystem.globalControl.theme);
watchEffect(() => {
  theme.value = store.state.modelSystem.globalControl.theme;
});
//给编辑器添加语言
editorAddLanguage();

const titleFormRef = ref<typeof GzForm>();
const titleFormConfig: formConfigType = {
  labelPosition: "top",
  items(t) {
    return [
      {
        type: "Input",
        key: "title",
        placeholder: t("pages.edit.titleBar.placeholder"),
        rules: [
          {
            required: true,
            message: t("pages.edit.titleBar.rules.0.message"),
          },
        ],
      },
    ];
  },
};

const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref("");

changeEditorLanguage(editorRef);

// 模拟 ajax 异步获取内容
onMounted(() => {
  //如果是编辑模式就自动补全内容
  if (typeof route.query.uuid === "string") {
    getArticleService(route.query.uuid).then((result) => {
      if (typeof result.message !== "string" && result.message.aticle) {
        const titleForm: any = titleFormRef.value;
        titleForm.setformValues({
          title: result.message.aticle.title,
        });
        valueHtml.value = result.message.aticle.content;
      }
    });
  }
  // setTimeout(() => {
  //   valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  // }, 1500);
});
const toolbarConfig = {};
const editorConfig = ref({ placeholder: t("pages.edit.editor.placeholder") });
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const uuid = v4();
const submitLoading = ref(false);
const token = ref(store.state.modelSystem.globalControl.token);
watchEffect(() => {
  token.value = store.state.modelSystem.globalControl.token;
});
//重置函数
const onReset = () => {
  if (titleFormRef.value) {
    titleFormRef.value.formRef.resetFields();
    valueHtml.value = "";
  }
};
//提交函数
const onSubmit = () => {
  if (titleFormRef.value) {
    titleFormRef.value.formRef.validate().then(() => {
      if (titleFormRef.value) {
        const title = titleFormRef.value.formValues.title;
        const text = editorRef.value.getText();
        if (
          route.query.operate === "edit" &&
          typeof route.query.uuid === "string"
        ) {
          editArticleService({
            uuid: route.query.uuid,
            title,
            text,
            content: valueHtml.value,
            token: token.value,
            loading: submitLoading,
          }).then(() => {
            router.push({
              path: "/read",
            });
          });
        } else {
          createArticleService({
            uuid,
            title,
            text,
            content: valueHtml.value,
            token: token.value,
            loading: submitLoading,
          }).then(() => {
            if (titleFormRef.value) {
              titleFormRef.value.formRef.resetFields();
              valueHtml.value = "";
            }
          });
        }
      }
    });
  }
};

const mode = "default";
</script>

<style lang="less" scoped>
.divider {
  margin: 60px 0;
}
.title {
  margin: 0 10px 10px;
}
.toolbar {
  margin: 0 10px 10px;
}
.editor {
  margin: 0 10px 10px;
  overflow-y: hidden;
}

.editor-light {
  --w-e-textarea-bg-color: #fff;
  --w-e-textarea-color: #333;
  --w-e-textarea-border-color: #ccc;
  --w-e-textarea-slight-border-color: #e8e8e8;
  --w-e-textarea-slight-color: #d4d4d4;
  --w-e-textarea-slight-bg-color: #f5f2f0;
  --w-e-textarea-selected-border-color: #b4d5ff;
  --w-e-textarea-handler-bg-color: #4290f7;
  --w-e-toolbar-color: #595959;
  --w-e-toolbar-bg-color: #fff;
  --w-e-toolbar-active-color: #333;
  --w-e-toolbar-active-bg-color: #bae0ff;
  --w-e-toolbar-disabled-color: #999;
  --w-e-toolbar-border-color: #e8e8e8;
  --w-e-modal-button-bg-color: #fafafa;
  --w-e-modal-button-border-color: #d9d9d9;
}
.editor-dark {
  --w-e-textarea-bg-color: #35363a;
  --w-e-textarea-color: #ffffff;
  --w-e-textarea-border-color: #ccc;
  --w-e-textarea-slight-border-color: #e8e8e8;
  --w-e-textarea-slight-color: #d4d4d4;
  --w-e-textarea-slight-bg-color: #292a2d;
  --w-e-textarea-selected-border-color: #213d5b;
  --w-e-textarea-handler-bg-color: #4290f7;
  --w-e-toolbar-color: #ffffff;
  --w-e-toolbar-bg-color: #35363a;
  --w-e-toolbar-active-color: #fff;
  --w-e-toolbar-active-bg-color: #213d5b;
  --w-e-toolbar-disabled-color: #999;
  --w-e-toolbar-border-color: #e8e8e8;
  --w-e-modal-button-bg-color: #292a2d;
  --w-e-modal-button-border-color: #d9d9d9;
  text-shadow: none;
}
.button-bar {
  margin: 20px 0 0 10px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
