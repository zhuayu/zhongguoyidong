<template>
  <header class="about-header">
    <LayoutHeaderLeft />
    <div class="header-right">
      <LayoutNav :subMenu="subMenu" />
    </div>
  </header>
  <main class="about-body">
    <section class="intro-section">
      <div class="intro-container">
        <h2 class="title">中移咨询</h2>
        <p class="intro-text">
          中移数智科技有限公司（以下简称中移咨询）由中国移动通信集团授权中国移动通信集团设计院有限公司成立，为落实“数字中国”战略，充分发挥国有经济战略支撑作用，加快推动数字经济和实体经济融合，助力中国移动创世界一流科技企业。
        </p>
        <p class="intro-text">
          中移咨询作为中国移动集团数智化转型咨询的责任主体，承担全集团数智化转型咨询能力建设与市场拓展责任，致力于打造国际一流的数智科技咨询及服务公司。
        </p>
        <p class="intro-text">
          公司立足中国移动数智化转型经验与能力，对标行业一流，组建高水平咨询团队，打造高质量生态，以转型咨询业务为抓手，携手合作伙伴，为用户提供包括全领域数智化转型咨询、场景化数智化解决方案、数智化产品与服务在内的
          “ 咨询＋产品＋服务 ”转型服务，赋能千行百业数智化转型。
        </p>
      </div>
    </section>
    <section class="personnel-section">
      <div class="personnel-contaier">
        <div class="personnel-left">
          <h2 class="title">人才高地</h2>
          <p class="personnel-text">
            中移咨询作为中国移动集团首批“人才高地建设示范区”，结合数智化转型咨询业务特点，坚持“党管人才”原则，遵从新时代知识人才的特点，按照“不求我有，但为我用”的灵活用工思路，围绕“激活内部人力资源、灵活调用外部人才资源”两大主线，打造“高水平、高质量、高活力”的能力倍增型人才高地。
          </p>
        </div>
        <div class="personnel-right">
          <img src="@/assets/images/talent.png" alt="" />
        </div>
      </div>
    </section>
  </main>
  <footer class="about-footer">
    <p class="footer-text">Copyright © 2022 中移咨询 All Rights Reserved.</p>
  </footer>
</template>

<script setup>
import LayoutHeaderLeft from "@/components/LayoutHeaderLeft.vue";
import LayoutNav from "@/components/LayoutNav.vue";
import { ref } from "vue";

const subMenu = ref("expert-sub-menu");
</script>

<style lang="less" scoped>
.about-header {
  min-width: 1200px;
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
.about-body {
  min-width: 1200px;
  background: #fff;
  .title {
    height: 36px;
    font-size: 28px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 36px;
    margin-bottom: 24px;
  }
  p {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    line-height: 32px;
  }
  .intro-section {
    min-width: 1200px;
    height: 364px;
    background: url(@/assets/images/img-about-banner.png) no-repeat center /
      cover;
    .intro-container {
      width: 1184px;
      padding: 48px 0;
      margin: 0 auto;
      .intro-text {
        margin-bottom: 24px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .personnel-section {
    min-width: 1200px;
    .personnel-contaier {
      width: 1184px;
      margin: 64px auto;
      .personnel-left {
        width: 568px;
        margin-right: 72px;
        vertical-align: top;
        display: inline-block;
      }
      .personnel-right {
        display: inline-block;
      }
    }
  }
}
.about-footer {
  min-width: 1200px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: 40px 0;
  background: #fff;
  .footer-text {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    line-height: 20px;
    margin-bottom: 0;
  }
}
</style>
