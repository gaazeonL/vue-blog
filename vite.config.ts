import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@directive": path.resolve(__dirname, "src/directive/"),
      "@global": path.resolve(__dirname, "src/global/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@router": path.resolve(__dirname, "src/router/"),
      "@register": path.resolve(__dirname, "src/register/"),
      "@service": path.resolve(__dirname, "src/service/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  plugins: [vue(), ElementPlus() as any],
});
