import { Dispatch, Commit } from "vuex";
import { Language } from "element-plus/es/locale";

import { ElNotification } from "element-plus";
// import { singeMenu } from "@store/system/type";
// import { changeToken, getAnonymousMenu } from "@store/system";
import { menuData } from "@store/system/type";
/**获取菜单
 */
export const getMenuService = async (options: {
  token: string;
  dispatch: Dispatch;
  commit: Commit;
}) => {
  const menuJson: {
    code: number;
    message: menuData[];
  } = await (
    await fetch(import.meta.env.VITE_SERVER + "/getmenu", {
      method: "POST",
      headers: {
        Authorization: options.token,
      },
    })
  ).json();
  if (typeof menuJson.message === "string") {
    options.dispatch("getAnonymousMenu");
    options.commit("changeToken", "");
    // notification.error({
    //   message: menuJson.message + "，请重新登录",
    // });
    ElNotification({
      message: menuJson.message + "，请重新登录",
      type: "error",
    });
    return [];
  } else {
    return menuJson.message;
  }
};
/**获取匿名菜单
 */
export const getAnonymousMenuService = async () => {
  const menuJson: {
    code: number;
    message: menuData[];
  } = await (
    await fetch(import.meta.env.VITE_SERVER + "/getmenu/anonymous", {
      method: "POST",
    })
  ).json();
  return menuJson;
};

// /**改变语言
//  * @param language 语言字符串
//  */
export const changeLanguageService = async (language: string) => {
  const respone = {
    status: "",
    language: "",
    languagePack: null as unknown as Language,
  };
  switch (language) {
    case "zh_CN":
      try {
        respone.languagePack = (
          await import("element-plus/dist/locale/zh-cn.mjs")
        ).default;
        respone.language = "zh_CN";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    case "zh_HK":
      try {
        respone.languagePack = (
          await import("element-plus/dist/locale/zh-tw.mjs")
        ).default;
        respone.language = "zh_HK";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    case "en_US":
      try {
        respone.languagePack = (
          await import("element-plus/dist/locale/en.mjs")
        ).default;
        respone.language = "en_US";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    case "ja_JP":
      try {
        respone.languagePack = (
          await import("element-plus/dist/locale/ja.mjs")
        ).default;
        respone.language = "ja_JP";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
    default:
      try {
        respone.languagePack = (
          await import("element-plus/dist/locale/zh-cn.mjs")
        ).default;
        respone.language = "zh_CN";
        respone.status = "success";
      } catch {
        respone.status = "fail";
      }
      return respone;
  }
};
