<template>
  <a-breadcrumb class="bread-crumb">
    <a-breadcrumb-item>专家团队</a-breadcrumb-item>
    <a-breadcrumb-item>专家人才库</a-breadcrumb-item>
  </a-breadcrumb>
  <section class="expert-sectiion">
    <div class="expert-top">
      <span class="expert-title">专家人才库</span>
      <router-link :to="{ path: '/expert/enter' }">
        <a-button class="expert-btn" type="primary">
          <template #icon><plus-outlined /></template>
          录入专家
        </a-button>
      </router-link>
    </div>
    <div class="expert-bottom">
      <div class="search-container">
        <a-form layout="inline">
          <a-form-item>
            <a-input class="expert-input" v-model:value="modelRef.id" placeholder="工号" />
          </a-form-item>
          <a-form-item>
            <a-input class="expert-input" v-model:value="modelRef.name" placeholder="姓名" />
          </a-form-item>
          <a-form-item>
            <a-input class="expert-select" v-model:value="modelRef.company" placeholder="请输入公司" />
          </a-form-item>
          <a-form-item>
            <a-input class="expert-select" v-model:value="modelRef.industry" placeholder="请输入行业" />
          </a-form-item>
          <a-form-item>
            <a-input class="expert-select" v-model:value="modelRef.station" placeholder="请输入岗位" />
          </a-form-item>
          <a-form-item>
            <a-input class="expert-select" v-model:value="modelRef.major" placeholder="请输入产品领域" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click.prevent="handleSubmit">查询</a-button>
            <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
          </a-form-item>
        </a-form>
        <a-button @click="handleExport">导出</a-button>
      </div>
      <div class="table-container">
        <a-table :ref="exportTableRef" :columns="columns" :row-key="(record) => record.id" :data-source="data.experts"
          :pagination="data.pagination" :loading="loading" @change="handleTableChange">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'operate'">
              <router-link :to="{ path: `/expert/detail/index/${record.id}` }">详情</router-link>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { reactive, ref, onMounted } from "vue";
import * as XLSX from "xlsx/xlsx.mjs";
import fakeData from '@/datas/experts';

const modelRef = reactive({
  id: null,
  name: '',
  company: '',
  industry: '',
  station: '',
  major: '',
  page: 1,
  page_size: 10,
});

const data = reactive({
  experts: [],
  pagination: {},
});

const exportTableRef = ref(null);
const loading = ref(false);
const columns = [
  {
    title: "工号",
    dataIndex: "id",
    width: "5%",
  },
  {
    title: "姓名",
    dataIndex: "name",
    width: "8%",
  },
  {
    title: "公司",
    dataIndex: "company",
    width: "10%",
  },
  {
    title: "行业",
    dataIndex: "industry",
    ellipsis: true,
  },
  {
    title: "岗位",
    dataIndex: "station",
    width: "10%",
  },
  {
    title: "产品领域",
    dataIndex: "major",
    ellipsis: true,
  },
  {
    title: "岗位技能等级",
    dataIndex: "stack_level",
    width: "10%",
  },
  {
    title: "总技能力",
    dataIndex: "stack_value",
    width: "8%",
  },
  {
    title: "测评技能数",
    dataIndex: "stacks_count",
    width: "8%",
  },
  {
    title: "操作",
    dataIndex: "operate",
    width: "5%",
  },
];


onMounted(() => {
  getTableData();
});

//#region 查
let allExperts = [];
const getTableData = () => {
  loading.value = true
  Promise.resolve(fakeData).then((res) => {
    allExperts = res.data.list
    showTable(allExperts)
  })
    .catch((e) => {
      console.log(e)
      data.experts = []
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
  if (modelRef.page == 1) {
    data.experts = table.slice(0, modelRef.page_size)
  } else {
    let tableBegin = (modelRef.page - 1) * (modelRef.page_size)
    let tableEnd = tableBegin + modelRef.page_size
    data.experts = table.slice(tableBegin, tableEnd)
  }
}
//#endregion

let filterExperts = []
const handleSubmit = () => {
  modelRef.page = 1;
  modelRef.page_size = 10;
  data.pagination.current = 1;
  filterExperts = allExperts.filter(item => {
    if (modelRef.id) {
      return item.id == modelRef.id && item.name.includes(modelRef.name) && item.company.includes(modelRef.company) && item.industry.includes(modelRef.industry) && item.station.includes(modelRef.station) && item.major.includes(modelRef.major)
    } else {
      return item.name.includes(modelRef.name) && item.company.includes(modelRef.company) && item.industry.includes(modelRef.industry) && item.station.includes(modelRef.station) && item.major.includes(modelRef.major)
    }
  })
  showTable(filterExperts);
};

const handleReset = () => {
  modelRef.id = null;
  modelRef.name = '';
  modelRef.company = '';
  modelRef.industry = '';
  modelRef.station = '';
  modelRef.major = '';
};

const handleTableChange = (params) => {
  modelRef.page = params.current;
  modelRef.page_size = params.pageSize;
  data.pagination.current = params.current;
  data.pagination.pageSize = Number(params.pageSize);
  showTable(filterExperts.length ? filterExperts : allExperts);
};

//#region 导出表格
const handleExport = () => {
  Promise.resolve(filterExperts ?? allExperts).then((res) => {
    const experts = res;
    const columnsList = columns.filter((data) => data.dataIndex != "operate");
    const tableData = transData(columnsList, experts);
    // 将一组 JS 数据数组转换为工作表
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    // 创建 workbook
    const wb = XLSX.utils.book_new();
    // 将 工作表 添加到 workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // 将 workbook 写入文件
    XLSX.writeFile(wb, "experts.xlsx");
  });
};
const transData = (columns, tableList) => {
  const obj = columns.reduce((acc, cur) => {
    if (!acc.titles && !acc.keys) {
      acc.titles = [];
      acc.keys = [];
    }
    acc.titles.push(cur.title);
    acc.keys.push(cur.dataIndex);
    return acc;
  }, {});
  const tableBody = tableList.map((item) => {
    return obj.keys.map((key) => item[key]);
  });
  return [obj.titles, ...tableBody];
};
//#endregion

</script>

<style lang="less" scoped>
.expert-sectiion {
  margin-top: 24px;
  background: #fff;

  .expert-top {
    height: 58px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .expert-title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
    }
  }

  .expert-bottom {
    padding: 24px;

    :deep(.ant-form-item) {
      margin-right: 8px;

      .expert-input {
        width: 122px;
      }

      .expert-select {
        width: 160px;
      }
    }
  }

  .search-container {
    display: flex;
    justify-content: space-between;
  }

  .table-container {
    margin-top: 16px;

    :deep(.ant-table-cell) {
      white-space: nowrap;
    }

    :deep(.ant-table-pagination.ant-pagination) {
      margin: 24px 0px 0px 0px;
    }
  }
}

:global(.ant-table-content .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before) {
  width: 0;
}
</style>
