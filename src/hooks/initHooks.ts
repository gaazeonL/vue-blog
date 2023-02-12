import { ref, watchEffect, watch, computed } from "vue";
import { useStore } from "@store/index";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { getCache } from "@utils/cache";
import debounce from "@utils/debounce";
import menuToRoutes from "@pages/index";

export default function () {
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const { locale } = useI18n();
  const menuHeight = store.state.modelSystem.menuControl.height;
  store.commit("modelSystem/changeToken", getCache("token").value);
  store.commit("modelSystem/changeTheme", getCache("theme").value);
  store.dispatch("modelSystem/changeLanguage", getCache("language").value);
  
  locale.value = getCache("language").value
    ? getCache("language").value
    : "zh_CN";
  const storeToken = computed(() => {
    return store.state.modelSystem.globalControl.token;
  });
  //初始化时自动登录

  function initRouter() {
    const path = route.path.split("/");
    path.shift();
    if (path) {
      store.commit("modelSystem/changeKeyPath", path);
    }
    const routes = menuToRoutes(store.state.modelSystem.menuControl.data);
    routes.forEach((r) => {
      router.addRoute(r);
    });
    const pathIsFount = routes.find((_route) => {
      const _path = _route.path.split("/");
      _path.shift();
      if (path.length === _path.length) {
        let isEqual = true;
        _path.forEach((p, index) => {
          if (p[0] !== ":" && path[index] !== p) {
            isEqual = false;
          }
        });
        if (isEqual) {
          return _route;
        }
      }
    });
    if (pathIsFount) {
      router.push(route.path);
    } else {
      router.push("/read");
    }
  }
  function login() {
    const localToken = getCache("token").value as string;
    if (localToken) {
      store.dispatch("modelSystem/getMenu", localToken).then(() => {
        initRouter();
      });
    } else {
      store.dispatch("modelSystem/getAnonymousMenu").then(() => {
        initRouter();
      });
    }
  }
  login();
  //当token改变时就再次登录一次
  watch(storeToken, () => {
    login();
  });
  function isShortAndIsMoveMode() {
    store.commit("modelSystem/changeIsShort", menuHeight > window.innerHeight);
    store.commit("modelSystem/changeMoveMode", !(window.screen.width > 726));
    // store.commit("modelSystem/changeCollapse", !(window.screen.width > 726));
  }
  isShortAndIsMoveMode();
  window.onresize = debounce(isShortAndIsMoveMode, 200);
}
