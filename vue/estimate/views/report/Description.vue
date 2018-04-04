<template>
  <div class="description-rp">
    <div class="title">测评简介</div>
    <div class="content">{{ options.text }}</div>
  </div>
</template>

<style lang="scss">
  .description-rp{
    background: #fff; margin-bottom: 0.25rem;padding: 0 .2rem .2rem;
    .title{
      width: 6.5rem;margin: 0 auto;box-sizing: border-box;padding: 0.2rem 0.36rem 0;font-size: 0.3rem;
      color: #50c9cb;line-height: 0.5rem;text-align: center;font-weight: bold;
    }
    .content {
      margin: 0.1rem auto;box-sizing: border-box;padding: .2rem 0.36rem 0.2rem;font-size: 0.26rem;color: #50c9cb;
      line-height: 0.4rem;text-indent: 0.54rem;text-align: justify;border-radius: 0.15rem;
    }
  }
</style>

<script>

  export default {
    data() {
      return {};
    },
    props: ['options'],
    mounted() {},
    watch: {},
    methods: {}
  };
</script>