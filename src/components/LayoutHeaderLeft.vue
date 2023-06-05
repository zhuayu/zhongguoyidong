<template>
  <div class="header-left">
    <router-link :to="{ path: '/' }" class="index-link">
      <svg-icon svgClass="index-logo" svgName="logoLight"></svg-icon>
    </router-link>
  </div>
</template>

<style lang="less" scoped>
.header-left {
  margin-left: 24px;

  .index-logo {
    width: 272px;
    height: 38px;
  }
}
</style>
