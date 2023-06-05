import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

import { fileURLToPath, URL } from "node:url";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["vue"],
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
      symbolId: "[name]",
    }),
  ],
  css: {
    sourceMap: false,
    modules: false,
  },
});
