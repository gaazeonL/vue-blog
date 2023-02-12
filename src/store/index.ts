import { useStore as useStoreVuex } from "vuex";
import { createStore } from "vuex";
import modelSystem from "./system";
import modelAboutMe from "./aboutMe";
import { systemModuleState } from "./system/type";
import { aboutMeModuleState } from "./aboutMe/type";
const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  modules: {
    modelSystem,
    modelAboutMe,
  },
});

export const useStore = useStoreVuex<{
  modelSystem: systemModuleState;
  modelAboutMe: aboutMeModuleState;
}>;
// const _store = useStore();
// export type storeType = typeof _store;

export default store;
