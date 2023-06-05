<template>
  <a-config-provider :locale="locale">
    <div class="page">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script setup>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { ref } from "vue";
dayjs.locale("zh-cn");

const locale = ref(zhCN);
</script>

<style less>
@import "./styles/reset.css";
</style>
