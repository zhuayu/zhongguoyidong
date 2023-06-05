<template>
  <a-breadcrumb class="bread-crumb">
    <a-breadcrumb-item>专家团队</a-breadcrumb-item>
    <a-breadcrumb-item>
      <router-link :to="{ path: '/expert/list' }">专家人才库</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>详情</a-breadcrumb-item>
  </a-breadcrumb>
  <section class="detail-section">
    <div class="detail-nav">
      <div class="nav-left">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="index">
            <router-link :to="{ path: `/expert/detail/index/${id}` }"
              >基础信息</router-link
            >
          </a-menu-item>
          <a-menu-item key="skill">
            <router-link :to="{ path: `/expert/detail/skill/${id}` }"
              >标签信息</router-link
            >
          </a-menu-item>
          <a-menu-item key="join">
            <router-link :to="{ path: `/expert/detail/join/${id}` }"
              >参与项目</router-link
            >
          </a-menu-item>
        </a-menu>
      </div>
      <div class="nav-right">
        <router-link class="nav-link" :to="{ path: '/expert/list' }">
          <left-outlined />
          <span class="nav-link-text">返回</span>
        </router-link>
        <span class="nav-text">专家人才库</span>
      </div>
    </div>
    <article class="detail-content">
      <router-view />
    </article>
  </section>
</template>

<script setup>
import { LeftOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";

const router = useRouter();
const id = ref(null);
const current = computed(() => {
  if (router.currentRoute.value.path.includes("/expert/detail/index")) {
    return ["index"];
  }
  if (router.currentRoute.value.path.includes("/expert/detail/skill")) {
    return ["skill"];
  }
  if (router.currentRoute.value.path.includes("/expert/detail/join")) {
    return ["join"];
  }
});
onMounted(() => {
  id.value = router.currentRoute.value.params.id;
});
</script>

<style lang="less" scoped>
.detail-section {
  margin-top: 20px;
  background: #fff;
  .detail-nav {
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 24px 0 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-left {
      height: 100%;
      .ant-menu {
        height: 100%;
        padding-top: 7.5px;
        border: none;
      }
    }
    .nav-right {
      padding-top: 2px;
      display: flex;
      .nav-link {
        font-size: 8px;
        color: #000;
        display: flex;
        align-items: center;
        .nav-link-text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          margin-left: 4px;
        }
        &:hover {
          color: #1890ff;
        }
      }
      .nav-text {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-left: 6px;
      }
    }
  }
  .detail-content {
    min-width: 870px;
  }
}
</style>
