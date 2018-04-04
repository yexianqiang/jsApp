<template>
  <div class="total-comment-wrap-rp">
    <div class="remark-title">总体评价</div>
    <div class="remark" v-html="options.comment">12312</div>
  </div>
</template>

<style lang="scss">
  .total-comment-wrap-rp{
    background: #fff; overflow: hidden; margin-bottom: 20px;
    .remark-title{
      width: 320px; margin: 0 auto; box-sizing: border-box;padding:10px 20px 0; font-size: 14px;color: #50c9cb;
      line-height: 30px;text-align: center;font-weight: bold;
    }
    .remark {
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
    watch: {
      user_options(val) {
        this.init();
      }
    },
    mounted() {},
    watch: {},
    methods: {}
  }
</script>