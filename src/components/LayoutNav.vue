<template>
  <a-menu v-model:selectedKeys="filterPath" mode="horizontal">
    <template v-for="route in data.filterRoutes">
      <a-sub-menu
        :key="route.path"
        v-if="hasNavChildren(route)"
        :popupClassName="subMenu"
      >
        <template #title>
          {{ route.meta.nav.title }}
        </template>
        <a-menu-item
          v-for="router in route.children"
          :key="`${route.path}/${router.path}`"
        >
          <router-link :to="{ path: `${route.path}/${router.path}` }">
            <svg-icon
              v-if="router.meta.nav.svg"
              :svgClass="router.meta.nav.svg.class"
              :svgName="router.meta.nav.svg.name"
            ></svg-icon>
            {{ router.meta.nav.title }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="route.path">
        <router-link :to="{ path: route.path }">
          {{ route.meta.nav.title }}
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup>
import { toRefs, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import routes from "@/router/routes.js";

const props = defineProps({
  subMenu: { type: String },
});
const refProps = toRefs(props);
const subMenu = refProps.subMenu;
const data = reactive({ filterRoutes: [] });
const router = useRouter();
const filterPath = computed(() => {
  if (
    router.currentRoute.value.href.includes("expert/detail") ||
    router.currentRoute.value.href.includes("expert/enter")
  ) {
    return ["/expert/list"];
  }
  if (router.currentRoute.value.href.includes("project")) {
    return ["/project"];
  }
  return [router.currentRoute.value.path];
});
onMounted(() => (data.filterRoutes = filterNavigator(routes)));
const filterNavigator = (node) => {
  let result = [];
  node.forEach((data) => {
    if (data.meta && data.meta.nav) {
      let item = {
        path: data.path,
        meta: data.meta,
      };
      if (data.children) {
        item.children = filterNavigator(data.children);
      }
      result.push(item);
    } else if (data.children) {
      filterNavigator(data.children).forEach((item) => {
        result.push(item);
      });
    }
  });
  return result;
};
const hasNavChildren = (route) => {
  const children = route.children || [];
  return children.some((data) => data.meta && data.meta.nav);
};
</script>

<style less="lang" scoped>
.ant-menu-horizontal > .ant-menu-item-selected a {
  font-weight: 500;
}
</style>
