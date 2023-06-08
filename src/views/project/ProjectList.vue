<template>
  <header class="project-header">
    <div class="header-left">
      <LayoutHeaderLeft />
    </div>
    <div class="header-right">
      <LayoutNav :subMenu="subMenu" />
    </div>
  </header>
  <main class="project-body">
    <div class="project-container">
      <section class="count-sectiion">
        <div class="count-title title">项目统计</div>
        <div class="count-list">
          <div class="count-item">
            <p class="count-text">累计项目</p>
            <p class="count-num">
              <span class="count-num-large">{{
                data.countData.project_count
              }}</span>
              <span class="count-num-text">个</span>
            </p>
          </div>
          <div class="count-item">
            <p class="count-text">累计工时</p>
            <p class="count-num">
              <span class="count-num-large">{{
                data.countData.work_count
              }}</span>
              <span class="count-num-text">周</span>
            </p>
          </div>
          <div class="count-item">
            <p class="count-text">参与专家</p>
            <p class="count-num">
              <span class="count-num-large">{{
                data.countData.expert_count
              }}</span>
              <span class="count-num-text">人</span>
            </p>
          </div>
        </div>
      </section>
      <section class="list-sectiion">
        <div class="list-top">
          <span class="list-title title">项目列表</span>
          <router-link :to="{ path: '/project/enter' }">
            <a-button class="expert-btn" type="primary">
              <template #icon><plus-outlined /></template>
              录入项目
            </a-button>
          </router-link>
        </div>
        <div class="list-container">
          <a-table :ref="exportTableRef" :columns="columns" :row-key="(record) => record.id" :data-source="data.projects"
            :pagination="data.pagination" :loading="loading" @change="handleTableChange">
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
      </section>
    </div>
  </main>
</template>

<script setup>
import LayoutHeaderLeft from "@/components/LayoutHeaderLeft.vue";
import LayoutNav from "@/components/LayoutNav.vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { reactive, ref, onMounted } from "vue";
import fakeData from '@/datas/projects';

const data = reactive({
  countData: {},
  projects: [],
  pagination: {},
});
const exportTableRef = ref(null);
const subMenu = ref("expert-sub-menu");
const loading = ref(false);
const columns = [
  {
    title: "项目id",
    dataIndex: "id",
    width: "8%",
  },
  {
    title: "项目名称",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "参与人数",
    dataIndex: "expert_number",
    width: "8%",
  },
  {
    title: "启动时间",
    dataIndex: "begin_date",
    width: "10%",
  },
  {
    title: "项目状态",
    dataIndex: "status_desc",
    width: "10%",
  },
  {
    title: "行业",
    dataIndex: "industry",
    width: "10%",
  },
  {
    title: "产品领域",
    dataIndex: "domain",
    width: "10%",
  },
  {
    title: "周期/时长",
    dataIndex: "period",
    width: "10%",
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: "8%",
  },
];
const page = ref(1);
const page_size = ref(10);
onMounted(() => {
  getTableData();
});

//#region 查
let allProjects = [];
const getTableData = () => {
  loading.value = true
  Promise.resolve(fakeData).then((res) => {
    allProjects = res.data.list
    data.countData = res.data.extra_info;
    showTable(allProjects)
  })
    .catch((e) => {
      console.log(e)
      data.projects = []
    })
    .finally(() => {
      loading.value = false
    })
}
//#endregion

//#region 展示区内容
const showTable = (table) => {
  data.pagination.total = table.length
  data.pagination.showQuickJumper = true;
  data.pagination.showSizeChanger = true;
  if (page.value == 1) {
    data.projects = table.slice(0, page_size.value)
  } else {
    let tableBegin = (page.value - 1) * (page_size.value)
    let tableEnd = tableBegin + page_size.value
    data.projects = table.slice(tableBegin, tableEnd)
  }
}
//#endregion

const handleTableChange = (params) => {
  page.value = params.current;
  page_size.value = params.pageSize;
  data.pagination.current = params.current;
  data.pagination.pageSize = Number(params.pageSize);
  showTable(allProjects);
};
</script>

<style lang="less" scoped>
.project-header {
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

.project-container {
  min-width: 1200px;
  padding: 24px;

  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
  }

  .count-sectiion {
    background: #fff;
    padding: 24px;
    margin: 0 auto;

    .count-title {
      margin-bottom: 24px;
    }

    .count-list {
      display: flex;

      .count-item {
        width: 40%;
        height: 170px;
        background: #fafafa;
        border-radius: 2px;
        margin-right: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:last-child {
          margin-right: 0;
        }

        .count-num {
          margin-top: 8px;
          margin-bottom: 0;

          .count-num-large {
            height: 48px;
            font-size: 40px;
            font-family: DINCondensed-Bold, DINCondensed;
            font-weight: bold;
            line-height: 48px;
            margin-right: 8px;
          }

          .count-num-text {
            width: 22px;
            height: 24px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 24px;
          }
        }

        .count-text {
          height: 24px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.65);
          line-height: 24px;
          margin-bottom: 0;
        }
      }
    }
  }

  .list-sectiion {
    background: #fff;
    margin-top: 24px;

    .list-top {
      height: 58px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .list-container {
      padding: 24px;

      :deep(.ant-table-cell) {
        white-space: nowrap;
      }

      :deep(.ant-table-pagination.ant-pagination) {
        margin: 24px 0px 0px 0px;
      }
    }
  }
}
</style>
