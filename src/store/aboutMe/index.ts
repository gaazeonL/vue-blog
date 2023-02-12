import { Module } from "vuex";
import { aboutMeModuleState } from "./type";
import { getAboutMeService } from "@service/aboutMe";
const modelAboutMe: Module<aboutMeModuleState, any> = {
  namespaced: true,
  state: () => {
    return {
      data: {
        technologyStack: {
          name: "",
        },
      },
    };
  },
  mutations: {
    changeData(state, payload) {
      state.data.technologyStack = payload;
    },
  },
  actions: {
    getAboutMedata: async ({ commit }) => {
      const aboutMeData = (await getAboutMeService()).message;
      commit("changeData", aboutMeData);
    },
  },
};
export default modelAboutMe;
