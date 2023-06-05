<template>
  <div class="detail-container">
    <div class="count-section">
      <div class="count-item">
        <p class="count-num">
          <span class="count-num-large">{{ data.detailData.month_work }}</span>
          <span class="count-num-text">周</span>
        </p>
        <p class="count-text">本月工作</p>
      </div>
      <div class="count-item">
        <p class="count-num">
          <span class="count-num-large">{{ data.detailData.total_work }}</span>
          <span class="count-num-text">周</span>
        </p>
        <p class="count-text">累计工作</p>
      </div>
      <div class="count-item">
        <p class="count-num">
          <span class="count-num-large">{{
            data.detailData.project_count
          }}</span>
          <span class="count-num-text">个</span>
        </p>
        <p class="count-text">参与项目</p>
      </div>
    </div>
    <div class="detail-section">
      <div calss="base-info">
        <h3 class="base-title">基本信息</h3>
        <div class="base-content">
          <a-row :gutter="70">
            <a-col :span="7">
              <div class="base-left">
                <div class="firstLetter-container">
                  <span class="first-letter">{{ firstLetter }}</span>
                </div>
                <div class="base-info">
                  <p class="base-name info-name">
                    专家姓名：<span class="base-text info-text">{{
                      data.detailData.name
                    }}</span>
                  </p>
                  <p class="base-phone info-name">
                    联系方式：<span class="base-text info-text"
                      >电话-{{ data.detailData.telephone }}</span
                    >
                  </p>
                </div>
              </div>
            </a-col>
            <a-col :span="7">
              <div class="base-right">
                <p class="base-num info-name">
                  总技能力：<span class="base-text-blue">{{
                    data.detailData.stack_value
                  }}</span>
                </p>
                <p class="base-email info-name">
                  <span class="base-text info-text"
                    >邮箱-{{ data.detailData.email }}</span
                  >
                </p>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div calss="education-info">
        <h3 class="base-title">教育信息</h3>
        <div class="education-content">
          <a-row :gutter="70">
            <a-col :span="7">
              <div class="education-school info-name">
                毕业院校：<span class="education-text info-text">{{
                  data.detailData.graduated_school
                }}</span>
              </div>
            </a-col>
            <a-col :span="7">
              <div class="work-year info-name">
                工作年限：<span class="education-text info-text">{{
                  data.detailData.work_year
                }}</span>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div calss="career-info">
        <h3 class="base-title">职业信息</h3>
        <div class="career-content">
          <div class="career-top">
            <a-row :gutter="70">
              <a-col :span="7">
                <div class="career-industry info-name">
                  所在行业：<span
                    class="career-text info-text"
                    :title="data.detailData.industry"
                    >{{ data.detailData.industry }}</span
                  >
                </div>
              </a-col>
              <a-col :span="7">
                <div class="career-company info-name">
                  所在公司：<span class="career-text info-text">{{
                    data.detailData.company
                  }}</span>
                </div>
              </a-col>
              <a-col :span="7">
                <div class="career-station info-name">
                  所在岗位：<span class="career-text info-text">{{
                    data.detailData.station
                  }}</span>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="career-bottom">
            <a-row :gutter="70">
              <a-col :span="7">
                <div class="career-major info-name">
                  产品领域：<span
                    class="career-text info-text"
                    :title="data.detailData.major"
                    >{{ data.detailData.major }}</span
                  >
                </div>
              </a-col>
              <a-col :span="7">
                <div class="career-stack_level info-name">
                  岗位等级：<span class="career-text info-text">{{
                    data.detailData.stack_level
                  }}</span>
                </div>
              </a-col>
              <a-col :span="7">
                <div class="career-stacks_count info-name">
                  测评数量：<span class="career-text info-text"
                    >{{ data.detailData.stacks_count }}个</span
                  >
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </div>
    <div class="apply-section">
      <a-button
        class="apply-btn"
        size="large"
        type="primary"
        @click="handleClick"
        >申请专家调用</a-button
      >
    </div>
    <a-modal
      v-model:visible="modalVisible"
      title="系统建设中"
      centered
      :footer="null"
    >
      <p>如需调用专家请联系中移咨询协同拓展部</p>
      <p>联系电话：13611020779</p>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Experts from "@/global/service/experts.js";
import { pinyin } from "pinyin-pro";

const data = reactive({
  detailData: {},
});
const firstLetter = ref("");
const modalVisible = ref(false);
const router = useRouter();
onMounted(() => {
  const id = router.currentRoute.value.params.id;
  Experts.getExpertDetail(id).then((res) => {
    data.detailData = res.data;
    const firstLetterArr = pinyin(data.detailData.name, { pattern: "first", toneType: "none", type: "array" });
    firstLetter.value = firstLetterArr[0].toLocaleUpperCase();
  });
});
const handleClick = () => {
  modalVisible.value = true;
};
</script>

<style lang="less" scoped>
.detail-container {
  padding: 24px;
  padding-bottom: 96px;
  position: relative;

  .count-section {
    display: flex;

    .count-item {
      width: 40%;
      height: 128px;
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
        margin-bottom: 8px;

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

  .detail-section {
    margin-top: 32px;

    .info-name {
      height: 22px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .info-text {
      color: rgba(0, 0, 0, 0.65);
    }

    .base-title {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #979797;
      line-height: 20px;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    .base-content {
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      .base-left {
        min-width: 300px;
        display: flex;
        align-items: center;
        .firstLetter-container {
          width: 56px;
          height: 56px;
          text-align: center;
          line-height: 56px;
          border-radius: 50%;
          background: #0484D4;
          margin-right: 16px;
          .first-letter {
            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
          }
        }
        .base-name {
          margin-bottom: 10px;
        }
        .base-phone {
          margin-bottom: 0px;
        }
      }
      .base-right {
        min-width: 350px;
        .base-text-blue {
          color: #0484d4;
        }
        .base-num {
          margin-bottom: 10px;
        }
      }

      .base-right-bottom {
        white-space: nowrap;
      }
    }

    .education-content {
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
  }
}

.apply-section {
  width: 100%;
  height: 72px;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.04);
  background: #fff;
  position: absolute;
  bottom: 0;
  left: 0;

  .apply-btn {
    float: right;
    margin-top: 16px;
    margin-right: 24px;
  }
}
</style>
