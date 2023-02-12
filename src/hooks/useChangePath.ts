import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@store/index";
export default function () {
  const store = useStore();
  const route = useRoute();
  const pathArray = route.path.split("/");
  pathArray.shift();
  onMounted(() => {
    store.commit("modelSystem/changeKeyPath", pathArray);
  });
}
