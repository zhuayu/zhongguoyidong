<template>
  <a-breadcrumb class="bread-crumb">
    <a-breadcrumb-item>专家团队</a-breadcrumb-item>
    <a-breadcrumb-item>专家数据</a-breadcrumb-item>
  </a-breadcrumb>
  <a-range-picker class="date-picker" v-model:value="value" separator="至">
  </a-range-picker>
  <section class="expert-data">
    <h2 class="expert-data-title title">数据概览</h2>
    <div class="expert-data-list">
      <div class="expert-data-item" v-for="item in expertData" :key="item.text">
        <p class="item-count">{{ item.count }}</p>
        <p class="item-content">
          <span class="item-text">{{ item.text }}</span>
          <a-tooltip placement="bottom">
            <template #title>{{ item.title }}</template>
            <svg-icon svgClass="item-icon" svgName="InfoFilled"></svg-icon>
          </a-tooltip>
        </p>
      </div>
    </div>
  </section>
  <section class="expert-level">
    <h2 class="expert-level-title title">技能水平</h2>
    <div class="level-list">
      <div class="level-item charts-container">
        <div class="item-title">自评测评对比</div>
        <div ref="levelLeft" style="width: 100%; height: 430px"></div>
      </div>
      <div class="level-item charts-container">
        <div class="item-title">自评水平分布</div>
        <div ref="levelRight" style="width: 100%; height: 430px"></div>
      </div>
    </div>
  </section>
  <section class="skill-distribution charts-container">
    <h2 class="skill-distribution-title title">技能分布</h2>
    <div class="distribution-item charts-item">
      <div class="item-title">技能分布散点图</div>
      <div ref="distribution" style="width: 100%; height: 500px"></div>
    </div>
  </section>
  <section class="evaluation-trends charts-container">
    <h2 class="evaluation-trends-title title">测评动态</h2>
    <div class="distribution-item charts-item">
      <div class="item-title">测评记录</div>
      <div ref="trends" style="width: 100%; height: 500px"></div>
    </div>
  </section>
  <section class="skill-level-distribution">
    <h2 class="level-distribution-title title">技能级别分布</h2>
    <div class="level-distribution-list">
      <div class="level-distribution-item charts-container charts-item">
        <div class="item-title">级别分布概览</div>
        <div ref="levelDistribution" style="width: 100%; height: 750px"></div>
      </div>
      <div class="level-distribution-item charts-container charts-item">
        <div class="item-title">级别分布详情</div>
        <div class="level-distribution-table">
          <a-table
            :ref="levelDistributionTableRef"
            :columns="levelDistributionColumns"
            :row-key="(record) => record.stack_id"
            :data-source="levelDistributionTableData"
            :pagination="data.levelDistributionPagination"
            size="small"
            bordered
            :scroll="{ x: 600 }"
            class="ant-table-striped"
            :row-class-name="
              (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
            "
            @change="handlelevelDistributionTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'name'">
                <a :title="record.name">{{ record.name }}</a>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </section>
  <section class="department-skills">
    <h2 class="department-skills-title title">部门技能分析</h2>
    <div class="department-skills-list">
      <div class="department-skills-item charts-container charts-item">
        <div class="item-title">部门技能概览</div>
        <div ref="departmentSkills" style="width: 100%; height: 430px"></div>
      </div>
      <div class="department-skills-item charts-container charts-item">
        <div class="item-title">部门技能详情</div>
        <div class="department-skills-table">
          <a-table
            :ref="departmentSkillsTableRef"
            :columns="departmentSkillsColumns"
            :row-key="(record) => record.stack_id"
            :data-source="departmentSkillsTableData"
            :pagination="data.departmentSkillsPagination"
            size="small"
            bordered
            :scroll="{ x: 600 }"
            class="ant-table-striped"
            :row-class-name="
              (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
            "
            @change="handledepartmentSkillsTableChange"
          >
          </a-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onUpdated, onMounted } from "vue";
//  按需引入 echarts
import * as echarts from "echarts";
import levelLeftData from "@/global/expertData/skill_contrast.js";
import getBarOption from "@/global/echartData/getBarOption.js";
import levelRightData from "@/global/expertData/skill_contrast_pie.js";
import getPieOption from "@/global/echartData/getPieOption.js";
import distributionData from "@/global/expertData/skill_eva_count.js";
import getScatterOption from "@/global/echartData/getScatterOption.js";
import trendsData from "@/global/expertData/skill_date.js";
import getLineOption from "@/global/echartData/getLineOption.js";
import levelDistributionData from "@/global/expertData/skill_overview.js";
import getHorizontalBarOption from "@/global/echartData/getHorizontalBarOption.js";
import departmentSkillsData from "@/global/expertData/department_overview.js";

import levelDistributionTableData from "@/global/expertData/skill_detail.js";
import departmentSkillsTableData from "@/global/expertData/department_list.js";

const value = ref(null);
const expertData = reactive([
  { count: 201, text: "技能数", title: "管理后台技能列表技能数量" },
  { count: 273, text: "技能测评人数", title: "完成技能测评人数" },
  {
    count: 806,
    text: "测评总次数",
    title:
      "公司下所有技能点被测评次数之和（同一个技能点被同一个人测评多次只算一次）",
  },
  {
    count: "3,826.91",
    text: "总技能力",
    title:
      "总技能力 = 技能掌握程度为专家的个数 * 100 + 技能掌握程度为精通的个数 * 10 + 技能掌握程度为掌握的个数 * 1 + 技能掌握程度为熟悉的个数 * 0.1 + 技能掌握程度为了解的个数 * 0.01",
  },
  { count: 97, text: "被测技能数", title: "被学员测评过的技能数量" },
  { count: "31.87%", text: "技能测评率", title: "技能测评人数/激活用户数" },
  { count: 7.327, text: "人均测评技能数", title: "测评总次数/技能测评人数" },
  { count: 34.79, text: "人均技能力", title: "总技能力/技能测评人数" },
]);
const levelLeft = ref();
const levelRight = ref();
const distribution = ref();
const trends = ref();
const levelDistribution = ref();
const departmentSkills = ref();
let levelLeftChart;
let levelRightChart;
let distributionChart;
let trendsChart;
let levelDistributionChart;
let departmentSkillsChart;
onUpdated(
  (window.onresize = () => {
    levelLeftChart.resize();
    levelRightChart.resize();
    distributionChart.resize();
    trendsChart.resize();
    levelDistributionChart.resize();
    departmentSkillsChart.resize();
  })
);
onMounted(() => {
  levelLeftInit();
  levelRightInit();
  distributionInit();
  trendsInit();
  levelDistributionInit();
  departmentSkillsInit();
  getLevelDistribution();
  getdepartmentSkills();
});
const levelLeftInit = () => {
  levelLeftChart = echarts.init(levelLeft.value);
  const option = getBarOption(levelLeftData.params, levelLeftData.config);
  levelLeftChart.setOption(option);
};
const levelRightInit = () => {
  levelRightChart = echarts.init(levelRight.value);
  const option = getPieOption(levelRightData.params, levelRightData.config);
  levelRightChart.setOption(option);
};
const distributionInit = () => {
  distributionChart = echarts.init(distribution.value);
  const option = getScatterOption(
    distributionData.params,
    distributionData.config
  );
  distributionChart.setOption(option);
};
const trendsInit = () => {
  trendsChart = echarts.init(trends.value);
  const option = getLineOption(trendsData.params, trendsData.config);
  trendsChart.setOption(option);
};
const levelDistributionInit = () => {
  levelDistributionChart = echarts.init(levelDistribution.value);
  const option = getHorizontalBarOption(
    levelDistributionData.params,
    levelDistributionData.config
  );
  levelDistributionChart.setOption(option);
};
const departmentSkillsInit = () => {
  departmentSkillsChart = echarts.init(departmentSkills.value);
  const option = getBarOption(
    departmentSkillsData.params,
    departmentSkillsData.config
  );
  departmentSkillsChart.setOption(option);
};
const data = reactive({
  levelDistributionPagination: {},
  departmentSkillsPagination: {},
});
const levelDistributionTableRef = ref(null);
const departmentSkillsTableRef = ref(null);
const levelDistributionColumns = [
  {
    title: "技能名称",
    dataIndex: "name",
    ellipsis: true,
  },
  {
    title: "测评人数",
    dataIndex: "total",
    width: "15%",
    sorter: {
      compare: (a, b) => a.total - b.total,
    },
  },
  {
    title: "了解",
    dataIndex: "level_1",
  },
  {
    title: "熟悉",
    dataIndex: "level_2",
  },
  {
    title: "掌握",
    dataIndex: "level_3",
  },
  {
    title: "精通",
    dataIndex: "level_4",
  },
  {
    title: "专家",
    dataIndex: "level_5",
  },
  {
    title: "总技能力",
    dataIndex: "total_score",
    width: "15%",
    sorter: {
      compare: (a, b) => a.total_score - b.total_score,
    },
  },
];
const getLevelDistribution = () => {
  const total = levelDistributionTableData.length;
  const current = 1;
  const pageSize = Number(20);
  const showQuickJumper = true;
  const showSizeChanger = false;
  const showTotal = (total) => `共 ${total} 条`;
  data.levelDistributionPagination = {
    total,
    current,
    pageSize,
    showQuickJumper,
    showSizeChanger,
    showTotal,
  };
};
const handlelevelDistributionTableChange = (params) => {
  data.levelDistributionPagination.current = params.current;
  data.levelDistributionPagination.pageSize = Number(params.pageSize);
};
const departmentSkillsColumns = [
  {
    title: "部门名称",
    dataIndex: "departments_name",
    ellipsis: true,
  },
  {
    title: "测评次数",
    dataIndex: "total",
    width: "15%",
    sorter: {
      compare: (a, b) => a.total - b.total,
    },
  },
  {
    title: "了解",
    dataIndex: "level_1",
  },
  {
    title: "熟悉",
    dataIndex: "level_2",
  },
  {
    title: "掌握",
    dataIndex: "level_3",
  },
  {
    title: "精通",
    dataIndex: "level_4",
  },
  {
    title: "专家",
    dataIndex: "level_5",
  },
  {
    title: "总技能力",
    dataIndex: "total_score",
    width: "15%",
    sorter: {
      compare: (a, b) => a.total_score - b.total_score,
    },
  },
];
const getdepartmentSkills = () => {
  const total = departmentSkillsTableData.length;
  const current = 1;
  const pageSize = Number(20);
  const showQuickJumper = true;
  const showSizeChanger = false;
  const showTotal = (total) => `共 ${total} 条`;
  data.departmentSkillsPagination = {
    total,
    current,
    pageSize,
    showQuickJumper,
    showSizeChanger,
    showTotal,
  };
};
const handledepartmentSkillsTableChange = (params) => {
  data.departmentSkillsPagination.current = params.current;
  data.departmentSkillsPagination.pageSize = Number(params.pageSize);
};
</script>

<style lang="less" scoped>
.date-picker {
  margin-top: 20px;
  :deep(input) {
    text-align: center;
  }
}
.title {
  height: 32px;
  font-size: 18px;
  font-weight: 600;
  font-family: PingFangSC-Medium, PingFang SC;
  line-height: 32px;
  margin-bottom: 16px;
}
.item-title {
  margin-bottom: 10px;
}
.expert-data {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  .expert-data-list {
    display: flex;
    flex-wrap: wrap;
    flex: 1;

    .expert-data-item {
      width: calc(100% / 4 - 15px);
      height: 180px;
      background: #fff;
      padding: 20px;
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover {
        z-index: 2;
        box-shadow: 5px 20px 30px rgb(0 0 0 / 10%);
      }
      p {
        margin-left: 20px;
      }
      .item-count {
        height: 56px;
        font-size: 36px;
        font-family: HelveticaNeue-Medium, HelveticaNeue;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 56px;
        margin-bottom: 0;
      }
      .item-content {
        white-space: nowrap;
        .item-text {
          height: 24px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #909399;
          line-height: 24px;
          margin-right: 4px;
        }
        .item-icon {
          color: #909399;
          cursor: pointer;
          &:hover {
            color: #2156d7;
          }
        }
      }
    }
  }
}
.charts-container:hover {
  z-index: 2;
  box-shadow: 5px 20px 30px rgb(0 0 0 / 10%);
}
.charts-item {
  background: #fff;
  padding: 20px;
}
.expert-level {
  .level-list {
    display: flex;
    .level-item {
      width: 50%;
      height: 500px;
      background: #fff;
      padding: 20px;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.skill-distribution,
.skill-level-distribution {
  margin-top: 20px;
  margin-bottom: 20px;
}
.level-distribution-list {
  display: flex;
  .level-distribution-item {
    width: 50%;
    background: #fff;
    padding: 20px;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.department-skills-list {
  display: flex;
  .department-skills-item {
    width: 50%;
    background: #fff;
    padding: 20px;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
:deep(.ant-table-small .ant-table-thead > tr > th) {
  background-color: #fff;
  font-size: 13px;
}
:deep(.ant-table.ant-table-bordered>.ant-table-container>.ant-table-content>table>tbody>tr>td) {
  font-size: 13px;
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
:deep(.ant-table.ant-table-small .ant-table-tbody > tr > td) {
  padding: 6px 8px;
}
:deep(.ant-table-pagination.ant-pagination) {
  margin-bottom: 0;
}
</style>
