import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import SvgIcon from "./components/SvgIcon.vue";
import "virtual:svg-icons-register";

import "default-passive-events";

createApp(App)
  .use(router)
  .use(Antd)
  .component("svg-icon", SvgIcon)
  .mount("#app");
