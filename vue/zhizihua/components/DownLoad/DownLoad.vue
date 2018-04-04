<template>
  <transition name="slide-out">
    <div class="down-load-wrap" v-if="!zzhJs.env.isInApp() && show">
      <i class="iconfont icon-btn_close" style="width: 0.45rem;height: 0.45rem;text-align: center;line-height: 0.45rem;" @click="hide"></i>
      <p class="down-text">更多内容请下载知子花教育APP</p>
      <a class="btn-down-load" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.boy.wisdom&channel=0002160650432d595942&fromcase=60001">打开</a>
    </div>
  </transition>
</template>
<style lang="scss">
  .down-load-wrap{
    width: 100%;height: 0.8rem;background: #fff;display: flex;justify-content: space-around;align-items: center;font-size: 0.26rem;color: #3a3737;position: relative;z-index: 100;
    .down-text{
      position: relative;font-size: 0.26rem;
      &:after{
        content:'';position: absolute;width: 0.45rem;height: 0.45rem;border-radius:-0.08rem;background:url("../../../assets/image/zhizihua_logo.png") no-repeat center;background-size:100%;left: -0.7rem;top: 50%;transform: translateY(-50%);
      }
    }
    .btn-down-load{
      width:1rem;height:0.4rem;line-height: 0.4rem;border: 0.01rem solid #3cbfc1;border-radius: 0.3rem;text-align: center;color: #3cbfc1;display: block;font-size: 0.26rem;
    }
  }

  .slide-out-enter-active,.slide-out-leave-active{
    transition: all .3s linear;
  }
  .slide-out-leave-to{
    transform: translateX(-1.2rem);
    opacity: 0;
  }
</style>
<script>
  export default {
    data() {
      return {
        show:true
      }
    },
    mounted() {},
    methods:{
      hide() {
        this.show = false;
      }
    }
  }
</script>