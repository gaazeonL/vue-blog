import { menuData } from "@store/system/type";
import { RouteRecordRaw } from "vue-router";
export default function menuToRoutes(menus: menuData[]) {
  const routes: RouteRecordRaw[] = [];
  menus.forEach((menu) => {
    menu.children && routes.push(...menuToRoutes(menu.children));
    if (menu.component && typeof menu.url === "string") {
      const url = menu.url;
      const component = () =>
        import(
          `./${
            url.split("/").slice(1, -1).join("/") +
            (url.split("/").slice(1, -1).length ? "/" : "") +
            menu.component
          }/index.vue`
        );
      routes.push({
        path: url,
        component,
      });
    }
  });
  return routes;
}
