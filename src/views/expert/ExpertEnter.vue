<template>
  <a-breadcrumb class="bread-crumb">
    <a-breadcrumb-item>专家团队</a-breadcrumb-item>
    <a-breadcrumb-item>
      <router-link :to="{ path: '/expert/list' }">专家人才库</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item>专家录入</a-breadcrumb-item>
  </a-breadcrumb>
  <div class="enter-container">
    <div class="enter-top">
      <div class="enter-top-left">
        <div class="enter-title">专家录入</div>
      </div>
      <div class="enter-top-right">
        <router-link class="enter-link" :to="{ path: '/expert/list' }">
          <left-outlined />
          <span class="enter-link-text">返回</span>
        </router-link>
        <span class="enter-text">专家人才库</span>
      </div>
    </div>
    <div class="enter-bottom">
      <div class="bottom-container">
        <a-form ref="formRef" name="basic" :model="data.formState" :rules="rules" :label-col="{ span: 7 }"
          :wrapper-col="{ span: 17 }" @finish="handleSubmit">
          <div calss="base-info">
            <h3 class="base-title">基本信息</h3>
            <div class="base-content">
              <a-row :gutter="50">
                <a-col :span="12">
                  <a-form-item label="专家姓名" name="name">
                    <a-input v-model:value="data.formState.name" />
                  </a-form-item>
                  <a-form-item label="手机号码" name="telephone">
                    <a-input v-model:value="data.formState.telephone" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="总技能力" name="stack_value">
                    <a-input value="0.00" disabled />
                  </a-form-item>
                  <a-form-item label="邮箱" name="email">
                    <a-input v-model:value="data.formState.email" />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </div>
          <div calss="education-info">
            <h3 class="base-title">教育信息</h3>
            <div class="education-content">
              <a-row :gutter="50">
                <a-col :span="12">
                  <div class="education-school info-name">
                    <a-form-item label="毕业院校" name="graduated_school">
                      <a-input v-model:value="data.formState.graduated_school" />
                    </a-form-item>
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="work-year info-name">
                    <a-form-item label="工作年限" name="work_year">
                      <a-input v-model:value="data.formState.work_year" />
                    </a-form-item>
                  </div>
                </a-col>
              </a-row>
            </div>
          </div>
          <div calss="career-info">
            <h3 class="base-title">职业信息</h3>
            <div class="career-content">
              <div class="career-top">
                <a-row :gutter="50">
                  <a-col :span="12">
                    <div class="career-industry info-name">
                      <a-form-item label="所在行业" name="industry">
                        <a-input v-model:value="data.formState.industry" />
                      </a-form-item>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="career-company info-name">
                      <a-form-item label="所在公司" name="company">
                        <a-input v-model:value="data.formState.company" />
                      </a-form-item>
                    </div>
                  </a-col>
                </a-row>
              </div>
              <div class="career-bottom">
                <a-row :gutter="50">
                  <a-col :span="12">
                    <div class="career-station info-name">
                      <a-form-item label="所在岗位" name="station">
                        <a-input v-model:value="data.formState.station" />
                      </a-form-item>
                    </div>
                  </a-col>
                  <a-col :span="12">
                    <div class="career-major info-name">
                      <a-form-item label="产品领域" name="major">
                        <a-input v-model:value="data.formState.major" />
                      </a-form-item>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
          <a-form-item class="btn-container" :wrapper-col="{ span: 10, offset: 20 }">
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button style="margin-left: 10px" @click="handleResetForm">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LeftOutlined } from "@ant-design/icons-vue";
import { ref, reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const formRef = ref();
const data = reactive({
  formState: {},
});
const telephoneValidate = async (_rule, value) => {
  const reg_tel =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (!value) {
    return Promise.reject("请输入手机号码");
  } else if (!reg_tel.test(value)) {
    return Promise.reject("请正确填写您的手机号码");
  }
};
const emailValidate = async (_rule, value) => {
  const reg_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (!value) {
    return Promise.reject("请输入邮箱");
  } else if (!reg_email.test(value)) {
    return Promise.reject("请正确填写您的邮箱");
  }
};
const rules = {
  name: { required: true, message: "请输入姓名", trigger: "change" },
  telephone: { required: true, validator: telephoneValidate, trigger: "blur" },
  email: { required: true, validator: emailValidate, trigger: "blur" },
  graduated_school: {
    required: true,
    message: "请输入毕业院校",
    trigger: "change",
  },
  work_year: { required: true, message: "请输入工作年限", trigger: "change" },
  industry: { required: true, message: "请输入所在行业", trigger: "change" },
  company: { required: true, message: "请输入所在公司", trigger: "change" },
  station: { required: true, message: "请输入所在岗位", trigger: "change" },
  major: { required: true, message: "请输入产品领域", trigger: "change" },
};
const handleResetForm = () => {
  formRef.value.resetFields();
};
const router = useRouter();
const handleSubmit = (values) => {
  message.success("专家录入成功！");
  formRef.value.resetFields();
  router.push({ name: "ExpertList" });
};
</script>

<style lang="less" scoped>
.enter-container {
  background: #fff;
  margin-top: 24px;

  .enter-top {
    height: 60px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .enter-top-left {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;

      .ant-menu {
        height: 100%;
        padding-top: 7.5px;
        border: none;
      }
    }

    .enter-top-right {
      display: flex;
      align-items: center;

      .enter-link {
        font-size: 8px;
        color: #000;
        display: flex;
        align-items: center;

        .enter-link-text {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          margin-left: 4px;
        }

        &:hover {
          color: #1890ff;
        }
      }

      .enter-text {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-left: 6px;
      }
    }
  }
}

.enter-bottom {

  .base-content,
  .education-content,
  .career-content {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    margin-bottom: 24px;
  }

  .bottom-container {
    width: 1000px;
    padding: 24px;
    margin: 0 auto;

    .base-title {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #979797;
      line-height: 20px;
      margin-bottom: 12px;
    }
  }

  .btn-container {
    margin-bottom: 0;
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
