<template>
  <div class="detail-container">
    <div class="detail-skill-top">
      <div class="skill-expert-container">
        <div class="expert-left">
          <span class="first-letter">{{ firstLetter }}</span>
        </div>
        <div class="expert-right">
          <p class="expert-name">{{ data.detailData.name }}</p>
          <p class="expert-skill">
            总技能力：{{ data.detailData.stack_value }}
          </p>
        </div>
      </div>
    </div>
    <div class="detail-skill-bottom">
      <img v-if="id == 1" src="@/assets/images/personal-1.png" alt="" />
      <img v-else-if="id == 2" src="@/assets/images/personal-2.png" alt="" />
      <img v-else-if="id == 3" src="@/assets/images/personal-3.png" alt="" />
      <img v-else-if="id == 4" src="@/assets/images/personal-4.png" alt="" />
      <img v-else src="@/assets/images/personal-1.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { pinyin } from "pinyin-pro";
import fakeData from '@/datas/experts';

const data = reactive({
  detailData: {},
});
const firstLetter = ref("");
const id = ref(null);
const router = useRouter();
onMounted(() => {
  id.value = router.currentRoute.value.params.id;
  Promise.resolve(fakeData).then((res) => {
    data.detailData = res.data.list.filter(item => item.id == id.value)[0];
    const firstLetterArr = pinyin(data.detailData.name, { pattern: "first", toneType: "none", type: "array" });
    firstLetter.value = firstLetterArr[0].toLocaleUpperCase();
  });
});
</script>

<style lang="less" scoped>
.detail-container {
  padding: 24px;

  .detail-skill-top {
    width: 820px;
    height: 150px;
    background: url(@/assets/images/tbg.png) no-repeat center / cover;
    padding: 40px;

    .skill-expert-container {
      display: flex;
      align-items: center;

      .expert-left {
        width: 70px;
        height: 70px;
        text-align: center;
        line-height: 70px;
        border-radius: 50%;
        background: #0484D4;
        margin-right: 16px;

        .first-letter {
          font-size: 40px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
      }

      .expert-name {
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 6px;

      }

      .expert-skill {
        height: 20px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #0484d4;
        line-height: 20px;
        margin-bottom: 0px;
      }
    }
  }

  ;

  .detail-skill-bottom {
    width: 820px;

    img {
      width: 100%;
    }
  }
}
</style>
