<template lang="html">
  <a class="subject-home-wrap" :href="zzhJs.config.urlIndexPage">
    <i class="iconfont icon-home"></i> 首页
  </a>
</template>

<style lang="scss">
  .subject-home-wrap {
    height: 0.67rem;position: fixed;right: 0;bottom: 0.9rem;text-align: center;line-height: 0.67rem;color: #fff;font-size: 0.28rem;
    border-top-left-radius: 0.8rem; border-bottom-left-radius: 0.8rem; background-color: rgba(91, 168, 168, 0.6); padding: 0 .2rem 0 .3rem;

    .iconfont{ font-size: .26rem; }
  }
</style>

<script>
	export default {
		data() {
			return {}
		},
		methods: {}
	}
</script>