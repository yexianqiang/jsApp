<template>
  <div class="success-view">
    <div class="default-tip1"></div>
    <div class="default-tip2"></div>
    <div class="default-tip3"></div>
    <div class="success-page">
      <div class="icon-pay-success"></div>
      <div class="share-context"></div>
      <div class="btn-share" @click="showPop()"></div>
      <div class="icon-bottom"></div>
    </div>

    <div class="pop-wrap" v-if="isShowPop">
      <p class="tip1"></p>
      <p class="tip2"></p>
      <div class="btn-know" @click="hidePop()"></div>
    </div>
  </div>
</template>

<style lang="scss">
.success-view{
  width: 100%;
  .default-tip1{
    width: 0;height: 0;background: url("../asset/images/icon-share1.png") no-repeat center;
  }
  .default-tip2{
    width: 0;height: 0;background: url("../asset/images/icon-share2.png") no-repeat center;
  }
  .default-tip3{
    width: 0;height: 0;background: url("../asset/images/icon-share3.png") no-repeat center;
  }
  .success-page{
    width: 100%;min-height: 100vh;overflow: hidden;background: url("../asset/images/bg.png") no-repeat center;background-size: 100% 100%;
    .icon-pay-success{
      width: 5.12rem;height: 3.04rem;background: url("../asset/images/icon_zhifuchenggong.png") no-repeat center;background-size: 100%;margin: 0.9rem auto 0;
    }
    .share-context{
      width: 100%;height: 7.71rem;background: url("../asset/images/share-context.png") no-repeat center;background-size: 100%;margin-top: -0.5rem;
    }
    .btn-share{
      width: 2.72rem;height: 0.73rem;background: url("../asset/images/icon_share.png") no-repeat center;background-size: 100%;margin:-1.2rem auto 0;
    }
    .icon-bottom{
      width: 100%;height: 2.59rem;background: url("../asset/images/icon_bottom.png") no-repeat center;background-size: 100%;margin-top: 0.1rem;
    }
  }
  .pop-wrap{
    width: 100%;position: fixed;left: 0;top: 0;bottom: 0;right: 0;background: rgba(0,0,0,.6);
    .tip1{
      width: 6.03rem;height: 1.76rem;background: url("../asset/images/icon-share1.png") no-repeat center;background-size: 100%;
      margin: 0.9rem auto 0;
    }
    .tip2{
      width: 6.05rem;height: 1.63rem;background: url("../asset/images/icon-share2.png") no-repeat center;background-size: 100%;
      margin: 0.6rem auto 0;
    }
    .btn-know{
      width: 2.87rem; height:1.16rem;background: url("../asset/images/icon-share3.png") no-repeat center;background-size: 100%;
      margin: 1rem auto 0;
    }
  }
}
</style>

<script>
  export default {
    data() {
      return {
        info: {
          name: 'XXX',
          mobile: '00000000000',
        },
        package: {
          pieces: 0,
        },
        expert: {
          name: ''
        },
        order: {
          amount: 0
        },
        isShowPop:false
      }
    },
    mounted() {
      document.title = '支付完成';
      $(window).scrollTop(0);
    },
    methods: {
      showPop() {
        this.isShowPop = true;
      },
      hidePop() {
        this.isShowPop = false;
      }
    }
  }
</script>