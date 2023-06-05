<template>
  <div class="project-scetion">
    <div class="project-container">
      <div class="project-header">
        <div class="header-left">
          <div class="project-title">{{ title }}</div>
        </div>
        <div v-if="!backPath" class="header-right">
          <router-link class="header-link" :to="{ path: '/project' }">
            <left-outlined />
            <span class="header-link-text">返回</span>
          </router-link>
          <span class="header-text">项目统计</span>
        </div>
        <div v-else class="header-right">
          <router-link class="header-link" :to="{ path: backPath }">
            <left-outlined />
            <span class="header-link-text">返回</span>
          </router-link>
          <span class="header-text">参与项目</span>
        </div>
      </div>
      <div class="project-body">
        <a-form
          ref="formRef"
          name="basic"
          :model="data.formState"
          :rules="rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 17 }"
          :hideRequiredMark="hideRequiredMark"
          @finish="handleSubmit"
        >
          <a-form-item label="项目名称" name="name">
            <a-input
              v-model:value="data.formState.name"
              :disabled="disabled"
              :title="data.formState.name"
            />
          </a-form-item>
          <a-form-item label="参与人数" name="expert_number">
            <a-input
              v-model:value="data.formState.expert_number"
              :disabled="disabled"
            />
          </a-form-item>
          <a-form-item label="启动日期" name="begin_date">
            <a-input
              v-model:value="data.formState.begin_date"
              :disabled="disabled"
            />
          </a-form-item>
          <a-form-item label="项目状态" name="status_desc">
            <a-input v-if="!id" value="进行中" disabled />
            <a-input
              v-else
              v-model:value="data.formState.status_desc"
              :disabled="disabled"
            />
          </a-form-item>
          <a-form-item label="行业" name="industry">
            <a-input
              v-model:value="data.formState.industry"
              :disabled="disabled"
            />
          </a-form-item>
          <a-form-item label="产品领域" name="domain">
            <a-input
              v-model:value="data.formState.domain"
              :disabled="disabled"
            />
          </a-form-item>
          <a-form-item label="项目周期" name="period">
            <a-input
              v-if="id"
              :value="data.formState.period + '周'"
              :disabled="disabled"
            />
            <a-input v-else v-model:value="data.formState.period" />
          </a-form-item>
          <a-form-item v-if="!id" :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button style="margin-left: 10px" @click="handleResetForm"
              >重置</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LeftOutlined } from "@ant-design/icons-vue";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Projects from "@/global/service/projects.js";
import { message } from "ant-design-vue";

const formRef = ref();
const hideRequiredMark = ref(false);
const disabled = ref(false);
const data = reactive({
  formState: {},
});
const rules = {
  name: { required: true, message: "请输入项目名称", trigger: "change" },
  expert_number: {
    required: true,
    message: "请输入参与人数",
    trigger: "change",
  },
  begin_date: { required: true, message: "请输入启动日期", trigger: "change" },
  industry: { required: true, message: "请输入行业", trigger: "change" },
  domain: { required: true, message: "请输入产品领域", trigger: "change" },
  period: { required: true, message: "请输入项目周期", trigger: "change" },
};
const router = useRouter();
const title = ref("");
const backPath = ref("");
const id = ref(null);
onMounted(() => {
  if (router.options.history.state.back.includes("join")) {
    backPath.value = router.options.history.state.back;
  }
  id.value = router.currentRoute.value.params.id;
  if (id.value) {
    title.value = "项目详情";
    Projects.getProjectDetail(id.value).then((res) => {
      data.formState = res.data;
      hideRequiredMark.value = true;
      disabled.value = true;
    });
  } else {
    title.value = "项目录入";
    data.formState.status_desc = "进行中";
    hideRequiredMark.value = false;
    disabled.value = false;
  }
});
const handleResetForm = () => {
  id.value = null;
  formRef.value.resetFields();
};
const handleSubmit = (values) => {
  Projects.postProject(values).then((res) => {
    message.success("项目录入成功！");
    formRef.value.resetFields();
    router.push({ name: "projectList" });
  });
};
</script>

<style lang="less" scoped>
.project-scetion {
  flex: 1;
  display: flex;
  align-items: center;
  .project-container {
    width: 1200px;
    min-width: 1000px;
    background: #fff;
    margin: 0 auto;
    .project-header {
      height: 60px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-left {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        .ant-menu {
          height: 100%;
          padding-top: 7.5px;
          border: none;
        }
      }
      .header-right {
        display: flex;
        align-items: center;
        .header-link {
          font-size: 8px;
          color: #000;
          display: flex;
          align-items: center;
          .header-link-text {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            margin-left: 4px;
          }
          &:hover {
            color: #1890ff;
          }
        }
        .header-text {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-left: 6px;
        }
      }
    }
  }
  .project-body {
    margin-top: 24px;
  }
}
.ant-input[disabled] {
  color: #000000;
  background-color: #ffffff;
  box-shadow: none;
  cursor: auto;
  opacity: 1;
  border: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.ant-input[disabled]:hover {
  border: none;
}
</style>
