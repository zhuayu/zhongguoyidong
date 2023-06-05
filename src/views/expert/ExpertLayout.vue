<template>
  <header :class="['expert-header', headerMinWidth]">
    <LayoutHeaderLeft />
    <div class="header-right">
      <LayoutNav :subMenu="subMenu" />
    </div>
  </header>
  <main class="expert-body">
    <div class="expert-aside">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        style="width: 208px"
        mode="vertical"
        class="aside-nav"
      >
        <a-menu-item class="nav-item" key="/expert/data">
          <router-link class="nav-link" :to="{ path: '/expert/data' }">
            <svg-icon svgClass="nav-svg" svgName="iconInfo"></svg-icon>
            <span class="nav-text">专家数据</span>
          </router-link>
        </a-menu-item>
        <a-menu-item class="nav-item" key="/expert/list">
          <router-link class="nav-link" :to="{ path: '/expert/list' }">
            <svg-icon svgClass="nav-svg" svgName="iconMap"></svg-icon>
            <span class="nav-text">专家人才库</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div :class="['expert-right', dataMinWidth]">
      <router-view />
    </div>
  </main>
</template>

<script setup>
import LayoutHeaderLeft from "@/components/LayoutHeaderLeft.vue";
import LayoutNav from "@/components/LayoutNav.vue";
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";

const headerMinWidth = ref("");
const dataMinWidth = ref("");
const subMenu = ref("expert-sub-menu");
const router = useRouter();
const selectedKeys = computed(() => {
  if (router.currentRoute.value.href.includes("expert/data")) {
    return ["/expert/data"];
  }
  if (router.currentRoute.value.href.includes("expert")) {
    return ["/expert/list"];
  }
  return [router.currentRoute.value.path];
});
onMounted(() => getMinWidth());
watch(
  () => router.currentRoute.value.href,
  () => getMinWidth()
);
const getMinWidth = () => {
  if (router.currentRoute.value.href.includes("expert/data")) {
    headerMinWidth.value = "data-min-width";
    dataMinWidth.value = "data-right-min-width";
  } else if (router.currentRoute.value.href.includes("list")) {
    headerMinWidth.value = "list-min-width";
    dataMinWidth.value = "list-right-min-width";
  } else if (router.currentRoute.value.href.includes("detail")) {
    headerMinWidth.value = "detail-min-width";
    dataMinWidth.value = "detail-right-min-width";
  } else if (router.currentRoute.value.href.includes("enter")) {
    headerMinWidth.value = "enter-min-width";
    dataMinWidth.value = "enter-right-min-width";
  }
};
</script>

<style lang="less" scoped>
:global(.page) {
  display: flex;
  flex-direction: column;
}
.data-min-width {
  min-width: 1086px;
}
.list-min-width {
  min-width: 1456px;
}
.detail-min-width {
  min-width: 1126px;
}
.enter-min-width {
  min-width: 1256px;
}
.data-right-min-width {
  min-width: 878px;
}
.list-right-min-width {
  min-width: 1248px;
}
.detail-right-min-width {
  min-width: 918px;
}
.enter-right-min-width {
  min-width: 1048px;
}
.expert-header {
  height: 72px;
  background: #fff;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  .header-right {
    margin-left: 56px;
    .ant-menu-horizontal {
      border: none;
    }
    :deep(.ant-menu-item),
    :deep(.ant-menu-submenu) {
      height: 71px;
      line-height: 71px;
    }
  }
}
.expert-body {
  flex: 1;
  display: flex;
  .expert-aside {
    background: #fff;
    :deep(.ant-menu-vertical) {
      margin-top: 32px;
      border: none;
    }
    .nav-link {
      margin-left: 10px;
      .svg-icon {
        margin-left: 0px;
        margin-right: 13px;
      }
    }
  }
  .expert-right {
    flex: 1;
    padding: 24px;
    background: #f0f2f5;
    overflow: hidden;
  }
}
:global(.expert-sub-menu .ant-menu.ant-menu-sub.ant-menu-vertical) {
  min-width: 128px;
  padding: 0 4px;
}
:global(.expert-sub-menu
    .ant-menu.ant-menu-sub.ant-menu-vertical
    .ant-menu-item-selected) {
  border-radius: 2px;
}
:deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
  border-left: 2px solid;
}
:global(#app),
:global(.page) {
  height: 100%;
  background: #f0f3f5;
}
</style>
