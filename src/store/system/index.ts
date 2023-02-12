import { Module } from "vuex";
import { menuData, systemModuleState } from "./type";
import {
  getAnonymousMenuService,
  getMenuService,
  changeLanguageService,
} from "@service/main/system";

import { Language } from "element-plus/es/locale";
import { deleteCache, setCache } from "@utils/cache";

const modelSystem: Module<systemModuleState, any> = {
  namespaced: true,
  state: () => {
    return {
      globalControl: {
        token: "",
        theme: true,
        isMoveMode: false,
        isShort: false,
        language: null,
        languagePack: null,
        keyPath: [],
      },
      siderBarControl: {
        isCollapse: true,
      },
      menuControl: {
        width: 260,
        height: 500,
        data: [],
      },
    };
  },
  mutations: {
    changeToken: (state, payload: string) => {
      state.globalControl.token = payload;
      if (state.globalControl.token) {
        setCache("token", payload);
      } else {
        deleteCache("token");
      }
    },
    changeTheme: (state, payload: boolean) => {
      if (payload !== null) {
        state.globalControl.theme = payload;
        if (payload) {
          document.documentElement.className = "";
        } else {
          document.documentElement.className = "dark";
        }

        setCache("theme", payload);
      } else {
        //获取不到就用store设定的默认设置
        setCache("theme", state.globalControl.theme);
        document.documentElement.className = "";
      }
    },
    changeMoveMode: (state, payload: boolean) => {
      state.globalControl.isMoveMode = payload;
    },
    changeIsShort: (state, payload: boolean) => {
      state.globalControl.isShort = payload;
      if (payload) {
        state.siderBarControl.isCollapse = true;
      }
    },
    changeKeyPath: (state, payload: string[]) => {
      state.globalControl.keyPath = payload;
    },
    changeCollapse: (state, payload: boolean) => {
      if (state.globalControl.isShort) {
        state.siderBarControl.isCollapse = true;
      } else {
        state.siderBarControl.isCollapse = payload;
      }
    },
    changeMenuControlData: (state, payload: menuData[]) => {
      state.menuControl.data = payload;
    },
    changeLanguage: (state, payload: string) => {
      state.globalControl.language = payload;
      const html = document.documentElement;
      if (payload === "zh_CN") {
        html.lang = "zh-Hans";
      } else if (payload === "zh_HK") {
        html.lang = "zh-Hant";
      } else if (payload === "en_US") {
        html.lang = "en";
      } else if (payload === "ja_JP") {
        html.lang = "ja";
      }
      setCache("language", payload);
    },
    changLanguagePack: (state, payload: Language) => {
      state.globalControl.languagePack = payload;
    },
  },
  actions: {
    getMenu: async ({ commit, dispatch }, payload) => {
      const menuData = await getMenuService({
        token: payload,
        dispatch,
        commit,
      });
      commit("changeMenuControlData", menuData);
    },
    getAnonymousMenu: async ({ commit }) => {
      const menuData = (await getAnonymousMenuService()).message;
      commit("changeMenuControlData", menuData);
    },
    changeLanguage: async ({ commit }, payload: string) => {
      const result = await changeLanguageService(payload);
      if (result.status === "success") {
        commit("changeLanguage", result.language);
        commit("changLanguagePack", result.languagePack);
      }
    },
  },
};

export default modelSystem;
