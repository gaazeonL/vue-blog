import { ref, ShallowRef, watchEffect } from "vue";
import { i18nChangeLanguage, IDomEditor } from "@wangeditor/editor";
import { useStore } from "@store/index";

export default function (editor: ShallowRef<IDomEditor> | null) {
  const store = useStore();
  const language = ref(store.state.modelSystem.globalControl.language);
  let editorLanguage = language.value;
  watchEffect(() => {
    language.value = store.state.modelSystem.globalControl.language;
    if (language.value === "zh_CN") {
      editorLanguage = "zh-CN";
    } else if (language.value === "en_US") {
      editorLanguage = "en";
    } else {
      editorLanguage = language.value;
    }
    if (editor?.value) {
      editor.value.focus();
    }
    editorLanguage ? i18nChangeLanguage(editorLanguage) : "";
  });
}
