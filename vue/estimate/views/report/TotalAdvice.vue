<template>
  <div class="total-advice-wrap-rp">
    <div class="advice-title">总体建议</div>
    <div class="advice" v-html="options.advice"></div>
  </div>
</template>

<style lang="scss">
  .total-advice-wrap-rp{
    background: #fff; padding-bottom: 0.2rem; margin-bottom: 0.25rem;
    .advice-title{
      width: 6.5rem; margin: 0 auto; box-sizing: border-box;padding:0.2rem 0.36rem 0; font-size: 0.3rem;color: #50c9cb;
      line-height: 0.5rem;text-align: center;font-weight: bold;
    }
    .advice {
      width: 6.5rem; margin: 0.25rem auto; box-sizing: border-box; padding:0.2rem 0.36rem 0.2rem; background: #50c9cb; font-size: 0.26rem;
      color: #fff; line-height: 0.4rem;text-indent: 0.54rem;text-align: justify;
      border-radius: 0.15rem;
    }
  }
</style>

<script>

  export default {
    data() {
      return {}
    },
    props: ['options'],
    mounted() {},
    watch: {},
    methods: {}
  }
</script>