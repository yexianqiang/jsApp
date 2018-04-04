<template>
  <div class="gift-explain">
      <div class="howLearn" style="font-size: .3rem;color: #3d3d3d;color: #434343;line-height:
      .42rem;font-weight: 600">怎样学习课程？</div>
      <div class="no-dowm">
        <div style="font-size: .3rem;color: #3d3d3d;color: #434343;font-weight: 600;line-height:
        .42rem;">1.未下载【知子花教育】APP</div>
        <p>点击订阅号菜单“知子课堂”，进入【学习】即可查看已购买课程。</p>
      </div>
      <div class="yes-down">
        <div style="font-size: .3rem;color: #3d3d3d;color: #434343;font-weight: 600;line-height:
        .42rem;">2.已下载【知子花教育】APP</div>
        <div>
          <p>微信注册用户：</p>
          <p>直接打开【知子花教育】APP进入【学习】即可</p>
        </div>

        <div style="margin-top: .26rem">
          <p>手机注册用户：</p>
          <p>在【知子花教育】APP，【我】-【设置】绑定微信号，查看【学习】即可。</p>
        </div>
      </div>
      <!--联系我们-->
      <div style="margin-top: 1.70rem;font-size: .3rem;color: #3d3d3d;color: #434343;font-weight: 600;line-height: .46rem;">联系我们</div>
      <p style="font-size: .3rem;line-height: .42rem;color:#6d6d6d">微信公众号搜索：知子花家庭教育</p>
      <div class="scan">
        <div><img src="../assets/code.png" alt="知子花"></div>
        <p>长按识别右侧二维码</p>
        <p>下载【知子花教育】APP</p>
      </div>
  </div>
</template>
<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
  .gift-explain{padding: 0 .30rem 0.5rem;background: #fff;min-height: 100vh;}
  /*h6{font-size: .3rem;color: #3d3d3d;color: #434343;font-weight: 600;line-height: .46rem;}*/

  .howLearn{margin-top: .3rem;}


  .no-dowm{margin-top: .46rem;
    >p {font-size: .24rem;line-height: .42rem;color:#929292}
  }
  .yes-down{margin-top: .53rem;
    >div>p {font-size: .24rem;line-height: .42rem;color:#929292}
  }
  .scan{text-align: center;margin-top: .66rem;
    >p{font-size: .24rem;line-height: .42rem;color:#929292}
  }
</style>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
      document.title = '使用须知';

    },
    methods:{

    }
  }
</script>