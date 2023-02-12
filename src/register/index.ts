import { App } from "@vue/runtime-core";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@assets/less/dark/css-vars.less";
import "normalize.css";
import i18n from "../i18n/index";
import { changeThemeDirective } from "@directive/index";

export default function (app: App) {
  app.use(i18n);
  app.directive(changeThemeDirective.name, changeThemeDirective.getOption());
}
