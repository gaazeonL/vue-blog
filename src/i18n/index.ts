import { createI18n } from "vue-i18n";
import messages from "./messages";
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: "zh_CN",
  fallbackLocale: "zh_CN",
  messages,
});

export default i18n;
