<template>
  <div class="index-top">
    <div class="index-header">
      <div class="header-container">
        <div class="header-left">
          <router-link :to="{ path: '/' }" class="index-link">
            <svg-icon svgClass="index-logo" svgName="indexLogo"></svg-icon>
          </router-link>
        </div>
        <div class="header-right">
          <LayoutNav :subMenu="subMenu" />
        </div>
      </div>
    </div>
    <div class="index-banner">
      <div class="banner-content">
        <h1 class="banner-title">鸿儒系统</h1>
        <p class="banner-text">激发人才动能，赋能千行百业数智化转型</p>
        <router-link :to="{ path: '/about' }" class="banner-btn"
          >关于我们</router-link
        >
      </div>
    </div>
  </div>
  <div class="index-bottom">
    <section class="intro-section">
      <h2 class="intro-title h2-title">平台简介</h2>
      <article class="intro-content">
        <p class="intro-text">功以才成，业由才广。</p>
        <p class="intro-text">
          为成为数智化转型咨询服务的引领者，打造国内一流的数智化转型咨询机构及协作平台，
        </p>
        <p class="intro-text">
          中移咨询建立了涵盖中国移动及行业合作伙伴的数字化转型专家库，实现需求与人才的高效匹配及调用。
        </p>
      </article>
    </section>
    <section class="overview-section">
      <div class="overview-title h2-title">业务总览</div>
      <div class="overview-nav">
        <router-link :to="{ path: '/expert/data' }" class="nav-item">
          <p class="nav-item-num">{{ data.indexData.expert_count }}</p>
          <p class="nav-item-text">专家团队</p>
        </router-link>
        <router-link :to="{ path: '/project' }" class="nav-item">
          <p class="nav-item-num">{{ data.indexData.project_count }}</p>
          <p class="nav-item-text">项目统计</p>
        </router-link>
      </div>
    </section>
    <section class="index-footer">
      Copyright © 2022 中移咨询 All Rights Reserved.
    </section>
  </div>
</template>

<script setup>
import LayoutNav from "@/components/LayoutNav.vue";
import { ref, reactive, onMounted } from "vue";
import Index from "@/global/service/index.js";

const subMenu = ref("layout-sub-menu");
const data = reactive({
  indexData: {},
});
onMounted(() => {
  Index.getIndex().then((res) => {
    data.indexData = res.data;
  });
});
</script>

<style lang="less" scoped>
.index-top {
  min-width: 1440px;
  background: #000078;
  position: relative;
  .index-header {
    width: 100%;
    background: rgba(0, 0, 0, 0.45);
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08);
    position: absolute;
    top: 0;
    left: 0;
    .header-container {
      width: 1184px;
      height: 72px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      .header-left {
        .index-logo {
          width: 272px;
          height: 38px;
        }
      }
      .header-right {
        margin-left: 36px;
        .ant-menu {
          background: none;
          border: 0;
          :deep(.ant-menu-item),
          :deep(.ant-menu-submenu) {
            height: 71px;
            line-height: 71px;
            color: rgba(255, 255, 255, 0.85);
            a {
              color: rgba(255, 255, 255, 0.85);
            }
            &.ant-menu-item-selected,
            &.ant-menu-item-active,
            &.ant-menu-submenu-active,
            &.ant-menu-submenu-open {
              a,
              .ant-menu-submenu-title {
                color: #fff;
              }
              &::after {
                border-bottom: 2px solid #fff;
              }
            }
          }
        }
      }
    }
  }
  .index-banner {
    width: 1440px;
    height: 576px;
    padding-left: 128px;
    background: url(@/assets/images/banner.png) no-repeat center / cover;
    margin: 0 auto;
    .banner-content {
      padding-top: 216px;
      padding-left: 50px;
      .banner-title {
        height: 48px;
        font-size: 40px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #ffffff;
        line-height: 48px;
        margin-bottom: 24px;
      }
      .banner-text {
        height: 24px;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(255, 255, 255, 0.85);
        line-height: 24px;
        margin-bottom: 40px;
      }
      .banner-btn {
        width: 160px;
        height: 56px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #552e00;
        text-align: center;
        line-height: 56px;
        background: linear-gradient(90deg, #ebcbac 0%, #d2b08a 100%);
        border-radius: 38px;
        display: block;
        transition: opacity 0.3s;
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}
.index-bottom {
  width: 1440px;
  padding: 0 128px;
  margin: 40px auto;
  padding-bottom: 32px;
  .intro-section {
    .intro-content {
      padding: 48px;
      background: url(@/assets/images/img-qy-banner.png) no-repeat center /
        cover;
      .intro-text {
        height: 32px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        line-height: 32px;
        margin-bottom: 0;
      }
    }
  }
  .overview-section {
    margin-top: 40px;
    .overview-nav {
      display: flex;
      justify-content: space-between;
      .nav-item {
        width: 580px;
        height: 168px;
        background: url(@/assets/images/img-1.png) no-repeat center / cover;
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s;
        &:last-child {
          background: url(@/assets/images/img-2.png) no-repeat center / cover;
        }
        &:hover {
          opacity: 0.5;
        }
        .nav-item-num {
          height: 56px;
          font-size: 48px;
          font-family: HelveticaNeue-Medium, HelveticaNeue;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          line-height: 56px;
          margin-bottom: 8px;
        }
        .nav-item-text {
          height: 24px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
        }
      }
    }
  }
  .index-footer {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    line-height: 20px;
    margin-top: 80px;
  }
}
:global(.layout-sub-menu .ant-menu.ant-menu-sub.ant-menu-vertical) {
  min-width: 128px;
  padding: 0 4px;
}
// :global(.layout-sub-menu .ant-menu .ant-menu-item a) {
//   color: #0484d4;
// }
:global(.ant-menu .ant-menu-item:hover) {
  color: #1890ff;
  background: #e6f7ff;
  border-radius: 2px;
}
// :global(.layout-sub-menu .ant-menu .ant-menu-item a:hover) {
//   color: #666666;
// }
:global(.layout-sub-menu .ant-menu .ant-menu-item .nav-svg) {
  margin-right: 2px;
  margin-left: -8px;
}
</style>
