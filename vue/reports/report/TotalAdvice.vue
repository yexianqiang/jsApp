<template>
  <div class="total-advice-wrap-rp">
    <div class="advice-title">总体建议</div>
    <div class="advice suggest" v-html="options.advice"></div>
  </div>
</template>

<style lang="scss">
  .total-advice-wrap-rp{
    background: #fff; overflow: hidden; margin-bottom: 20px;
    .advice-title{
      width: 320px; margin: 0 auto; box-sizing: border-box;padding:10px 20px 0; font-size: 14px;color: #50c9cb;
      line-height: 30px;text-align: center;font-weight: bold;
    }
    .advice {
      width: 320px; margin: 10px auto 20px; box-sizing: border-box; padding:10px 20px; background: #50c9cb; font-size: 12px;
      color: #fff; line-height: 24px;text-indent: 24px;text-align: justify;
      border-radius: 10px;
    }
  }
</style>

<script>

  export default {
    data() {
      return {}
    },
    props: ['user_options'],
    computed: {
      options() {
        return this.user_options;
      }
    },
    mounted() {},
    watch: {},
    methods: {}
  }
</script>