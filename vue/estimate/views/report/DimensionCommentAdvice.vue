<template>
  <div class="remark-advice-page-rp">
    <p class="remark-advice-big-title">维度评价与建议</p>
    <p class="remark-sub-tip">点击按钮查看单项具体报告</p>
    <ul class="remark-advice-icon-wrap">
      <template v-for="(item, index) in options">
        <li @click="change(index)" :class="{'active':index == icon_flag}"><img :src="item.icon"/></li>
      </template>
    </ul>
    <div class="remark-advice-wrap" >
      <div class="remark-model">
        <p class="remark-advice-title">评价</p>
        <div class="remark-advice-con" v-html="comment"></div>
      </div>
      <div class="advice-model">
        <p class="remark-advice-title">建议</p>
        <div class="remark-advice-con" v-html="advice"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .remark-advice-page-rp {
    background: #fff; padding: 0 0.5rem 0.45rem; margin-bottom: 0.25rem;

    .remark-advice-big-title {
      color: #35b9c6; font-size: 0.3rem; line-height: 1rem; position: relative;
      text-align: center;font-weight: bold;
    }
    .remark-sub-tip{
      font-size: 0.24rem; color:#a0a0a0 ;text-align: center;
    }
    .remark-advice-icon-wrap{
      width: 100%;display: flex;background: #fff;flex-wrap: wrap;position: relative;margin-bottom: 0.2rem;

      &>li{
        width: 1rem;height: 1rem; margin: 0.35rem 0.3rem;flex-shrink: 0;border-radius: 0.06rem;overflow: hidden;
      }

      &>li.active{
        border: 0.05rem solid #40afc0;
      }

      &>li>img {
        width: 100%;height: 100%;vertical-align: text-top;
      }
    }
    .remark-advice-wrap {
      width: 100%;padding: 0.2rem 0.6rem 0.6rem;border-radius:0.25rem;background: #4dc9c9;color: #fff;
      .remark-advice-title{
        font-size: 0.3rem;text-align: center;line-height: 0.7rem;
      }
      .remark-advice-con{
        font-size: 0.24rem;line-height: 0.36rem;text-align: justify;
      }
      .remark-model{
        border-bottom: 0.01rem solid #f1f1f1;padding-bottom: 0.3rem;
      }
    }


  }
</style>

<script>

  export default {
    data() {
      return {
        comment: '',
        advice: '',
        icon_flag:0
      };
    },
    props:['options'],
    watch: {
      options(val) {
        this.comment = this.options[0].comment;
        this.advice = this.options[0].advice;
      }
    },
    mounted() {
      this.comment = this.options[0].comment;
      this.advice = this.options[0].advice;
    },
    methods: {
      change(index) {
        this.comment = this.options[index].comment;
        this.advice = this.options[index].advice;
        this.icon_flag = index;
      }
    },
  }
</script>