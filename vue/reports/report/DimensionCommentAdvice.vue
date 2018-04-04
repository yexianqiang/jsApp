<template>
  <div class="remark-advice-page-rp">
    <p class="remark-advice-big-title">维度评价</p>
    <ul class="remark-advice-icon-wrap">
      <li><img/></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="remark-advice-wrap" >
      <div class="remark-model">
        <p class="remark-advice-title">评价</p>
        <div class="remark-advice-con">你的创造力超过了一部分同龄人，还可以做的更好。你喜欢活学活用，与时俱进， 不喜欢被已有的思维框架束缚着。如果别人给你反复强调“规则·规则”，你肯定觉得这个人 已经无聊到晚期了吧。你喜欢那种被人看以来独特的感觉。你会很喜欢去大自然 里进行探索发现。做决定之前，你都会进行全面的思考。</div>
      </div>
      <div class="advice-model">
        <p class="remark-advice-title">建议</p>
        <div class="remark-advice-con">你的创造力超过了一部分同龄人，还可以做的更好。你喜欢活学活用，与时俱进， 不喜欢被已有的思维框架束缚着。如果别人给你反复强调“规则·规则”，你肯定觉得这个人 已经无聊到晚期了吧。你喜欢那种被人看以来独特的感觉。你会很喜欢去大自然 里进行探索发现。做决定之前，你都会进行全面的思考。</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .remark-advice-page-rp {
    background: #fff;padding: 15px 26px 30px; margin-bottom: 20px;

    .remark-advice-big-title {
      color: #35b9c6; font-size: 14px; line-height: 24px; position: relative;
      text-align: center;font-weight: bold;
    }

    .remark-advice-icon-wrap{
      width: 100%;display: flex;background: #fff;flex-wrap: wrap;position: relative;margin-bottom: 20px;
      &>li{
        width: 50px;height: 50px;background: #33aaaa;margin: 10px 11px;flex-shrink: 0;border-radius: 0.08rem;overflow: hidden;
      }
      &:after{
        content: '';
        position: absolute;
        left: 72px;
        bottom: 24px;
        font-size: 12px;
        color:#a0a0a0 ;
      }
    }

    .remark-advice-wrap {
      width: 100%; padding: 2px 15px 6px; background: #fefefe; border-radius: 7px;box-shadow: 0 0 15px 2px rgba(184, 179, 179, 0.3);

      .remark-advice-title{
        font-size: 14px;color: #4ecaca;text-align: center;line-height: 30px;
      }
      .remark-advice-con{
        font-size: 14px;color: #6b6b6b;line-height: 24px;
      }
      .remark-model{
        border-bottom: 1px solid #f1f1f1;padding-bottom: 15px;
      }
      .remark-advice-con{
        padding-bottom: 15px;
      }

    }
  }
</style>

<script>

  export default {
    data() {
      return {
        slide: -1,
      };
    },
    props:['options'],
    watch: {
      options(val) {}
    },
    methods: {
      getRemark(){

      }
    },
  }
</script>