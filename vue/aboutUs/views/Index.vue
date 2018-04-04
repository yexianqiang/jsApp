<template>
  <div class="about-us-view">
    <div class="logo"></div>
    <h3 class="name">知子花教育</h3>
    <p class="version">v{{version}}</p>
    <ul class="item-wrap">
      <li>真懂--19578个孩子，22730个家庭，15年的执手相伴，只因我懂你的心。</li>
      <li>会爱--了解、共情、接纳、陪伴，遇见的都收获了幸福，只因我予你正确的爱。</li>
      <li>成就--测评和行为记录，视频和电话咨询。简洁高效的方法，专业定制的服务，成就幸福而卓越的孩子。</li>
    </ul>
  </div>
</template>
<style lang="scss">
.about-us-view{
  width: 100%;min-height: 100vh;background: #fff;overflow: hidden;padding-left: 0.2rem;padding-right: 0.2rem;
  .logo{
    width: 2rem;height: 2rem;background: url("../assets/image/icon-about_logo.png") no-repeat center;background-size:100%;margin: 1rem auto 0.3rem;border-radius: .3rem;
  }
  .name{
    font-size: 0.34rem;color: #313133;text-align: center;line-height: 0.6rem;
  }
  .version{
    font-size: 0.26rem;color: #313133;text-align: center;line-height: 0.6rem;
  }
  .item-wrap{
    width: 100%;
    &>li{
      width: 100%;line-height: 0.67rem;color: #505052;font-size: 0.3rem;margin-bottom: 0.4rem;padding: 0 0.7rem;position: relative;
      &:before{
        content: '';width: 0.44rem;height: 0.44rem;background: url("../assets/image/icon-about_zhizihua.png") no-repeat center;background-size:100%;
        position: absolute;left: 0;top: 0.1rem;
      }
    }
  }
}
</style>
<script>
  export default {
    data() {
      return {
        version:'5.1.0'
      }
    },
    mounted() {
      document.title = '关于我们';
      this.getVersion();
    },
    methods:{
      getVersion() {
        if (this.$route.query['app_version']){
          this.version = this.$route.query['app_version'];
        }
      }
    }
  }
</script>