import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import NProgress from "nprogress"; //加载条
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path == "/expert/data") {
      return { top: 0 };
    }
  }
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
