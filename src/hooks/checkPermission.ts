import { computed } from "vue";
import { menuData } from "@store/system/type";
import { useStore } from "@store/index";
export default function (permissionKey: string) {
  const store = useStore();
  return computed(() =>
    findPermission(store.state.modelSystem.menuControl.data, permissionKey)
  );
}
function findPermission(menuData: menuData[], permissionKey: string) {
  const isFind = menuData.find((menu) => {
    if (menu.key === permissionKey) {
      //直接看当层是否符合
      return true;
    } else if (menu.children) {
      //如果又子节点就递归
      return findPermission(menu.children, permissionKey);
    } else {
      return false;
    }
  });
  if (isFind) {
    return true;
  } else {
    return false;
  }
}
