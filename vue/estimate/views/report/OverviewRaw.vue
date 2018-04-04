<template>
  <div class="words-wrap-rp" v-html="options.content"></div>
</template>

<style lang="scss">
  .words-wrap-rp {
    width: 100%;margin-top: 0.25rem;background: #fff;font-size: 0.24rem;text-align: center;padding-bottom: 0.5rem;padding: .4rem .2rem; margin-bottom: .25rem;

    img{ width: 100%; display: block; }

    h2 {
      font-size: 0.3rem; background: #009ea1; color: #fff; padding: 0 0.2rem; line-height: 0.75rem; display: inline-block; text-align: center; margin: 0.36rem 0; border-radius:8px;
    }
    p {
      text-indent: .6rem; font-size: 0.26rem; line-height: 0.57rem; color: #2f2f2f; padding-left: 0.3rem; padding-right: 0.3rem; padding-bottom: 0.2rem; text-align: left;
    }
    h3 {
      font-size: 0.3rem; text-align: left; color: #33aaaa; margin-left: 0.3rem; text-indent: 0.25rem; position: relative; line-height: 0.8rem;

      &:before {
        position: absolute; left: 0; top: 50%; transform: translateY(-50%); content: ''; width: 0.05rem; height: 0.32rem; background: #0f9a93;
      }
    }
    section {
      font-size: 0.27rem; line-height: 0.58rem; border: 0.02rem dotted #33aaaa; text-align: left; margin-left: 0.3rem; margin-right: 0.3rem; padding: 0.2rem; box-sizing: border-box; border-radius: 10px; margin-top: 0.2rem; margin-bottom: 0.3rem;
    }

    ul {
      width: 100%; box-sizing: border-box; padding: 0 0.3rem;

      >li {
        font-size: 0.27rem; text-align: left; line-height: 0.6rem; box-sizing: border-box; padding-left: 0.6rem; position: relative;

        &:before {
          position: absolute; content: ''; left: 0; top: 0.2rem; width: 0.15rem; height: 0.15rem; background: #33aaaa; border-radius: 50%;
        }
      }
    }


    ol {
      width: 100%; box-sizing: border-box; padding: 0 0.3rem; counter-reset: item;

      >li {
        counter-increment: item; font-size: 0.27rem; text-align: left; line-height: 0.6rem; box-sizing: border-box; padding-left: 0.6rem; position: relative;

        &:before {
          position: absolute; left: 0; top: 0; font-size: 0.27rem; content: counter(item) '.';
        }
      }
    }
  }
</style>

<script>
  export default {
    props: ['options'],
  }
</script>