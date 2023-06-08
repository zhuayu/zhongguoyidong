<template>
  <div class="detail-container">
    <div class="detail-join-tabel">
      <a-table :ref="projectTableRef" :columns="columns" :row-key="(record) => record.id" :data-source="data.projects"
        :loading="loading" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operate'">
            <router-link :to="{ path: `/project/detail/${record.id}` }">详情</router-link>
          </template>
          <template v-if="column.dataIndex === 'period'">
            <span>{{ record.period }}周</span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import fakeData from '@/datas/detail_join';

const data = reactive({
  projects: [],
});
const projectTableRef = ref(null);
const loading = ref(false);
const columns = [
  {
    title: "项目名称",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "工作状态",
    dataIndex: "status_desc",
  },
  {
    title: "已确认工作时长（周）",
    dataIndex: "work_hours",
  },
  {
    title: "操作",
    dataIndex: "operate",
  },
];
onMounted(() => {
  getProjects();
});
const getProjects = () => {
  loading.value = true;
  Promise.resolve(fakeData[Math.floor(Math.random() * 2)]).then((res) => {
    data.projects = res.data;
    loading.value = false;
  });
};
</script>

<style lang="less" scoped>
.detail-join-tabel {
  padding: 24px;
}
</style>
