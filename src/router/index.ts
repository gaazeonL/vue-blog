import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Read from "@pages/read/index.vue";
// import Article from "@pages/read/article/index.vue"
// import Edit from "@pages/edit/index.vue";
// import AboutMe from "@pages/aboutMe/index.vue";
// import SettingUser from "@pages/setting/settingUsers/index.vue";
// import SettingRole from "@pages/setting/settingRoles/index.vue";
// import SettingPermissions from "@pages/setting/settingPermissions/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect(to) {
      return "/read";
    },
  },
  { path: "/read", component: Read },

  //404路由跳转请在inithook中编写
  // { path: "/read/:uuid", component: Article },
  // { path: "/write", component: Edit },
  // { path: "/aboutme", component: AboutMe },
  // { path: "/setting/users", component: SettingUser },
  // { path: "/setting/roles", component: SettingRole },
  // { path: "/setting/permissions", component: SettingPermissions },
];
const router = createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
