<template>
  <div class="description-rp">
    <div class="title">测评简介</div>
    <div class="content">{{ options.text }}</div>
  </div>
</template>

<style lang="scss">
  .description-rp{
    background: #fff; padding-bottom: 13px; margin-bottom: 20px;
    .title{
      width: 100%; margin: 0 auto; box-sizing: border-box;padding: 20px 0 15px; font-size: 14px;color: #50c9cb;
      text-align: center;font-weight: bold;
    }
    .content {
      margin: 0 auto; box-sizing: border-box; padding: 0 20px 20px; font-size: 14px;
      line-height: 20px;text-indent: 28px;text-align: justify; color: #50c9cb;
    }
  }
</style>

<script>

  export default {
    data() {
      return {};
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
  };
</script>