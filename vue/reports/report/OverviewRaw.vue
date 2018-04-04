<template>
  <div class="words-wrap-rp" v-html="options.content"></div>
</template>

<style lang="scss">
  .words-wrap-rp{
    width: 100%; background: #fff; font-size: 24px; text-align: center; padding-bottom: 20px; margin-bottom: 20px;

    img{ width: 100% }

    h2{
      font-size: 14px; background: #009ea1; color: #fff; padding: 0 20px; line-height: 40px; display: inline-block; text-align: center; margin: 15px 0; border-radius:4px;
    }

    p{
      font-size: 14px; line-height: 24px; color: #2f2f2f; padding-left: 30px; padding-right: 30px; padding-bottom: 15px; text-align: left;
    }

    h3{
      font-size: 14px; text-align: left; color: #33aaaa; margin-left: 30px; text-indent:10px; position: relative; line-height: 30px;
      &:before{
        position: absolute; left: 0; top: 50%; transform: translateY(-50%); content: ''; width: 2px; height: 15px; background: #0f9a93;
      }
    }

    section{
      font-size: 14px; line-height: 30px; border: 2px dotted #33aaaa; text-align: left; margin-left: 30px; margin-right: 30px; padding: 15px; box-sizing: border-box; border-radius: 10px; margin-top: 20px; margin-bottom: 20px;
    }

    ul{
      width: 100%; box-sizing: border-box; padding: 0 30px;
      &>li {
        font-size: 14px; text-align: left; line-height: 30px; box-sizing: border-box; padding-left: 24px; position: relative;
        &:before{
          position: absolute; content: ''; left: 0; top: 10px; width: 10px; height: 10px; background: #33aaaa; border-radius: 50%;
        }
      }
    }

    ol {
      width: 100%; box-sizing: border-box; padding: 0 30px; counter-reset: item;

      &>li {
        counter-increment: item; font-size: 14px; text-align: left; line-height: 30px; box-sizing: border-box; padding-left: 24px; position: relative;
        &:before{
          position: absolute; left: 0; top: 0; font-size: 14px; content: counter(item) '.';
        }
      }
    }
  }
</style>

<script>

  export default {
    props: ['user_options'],
    computed: {
      options() {
        return this.user_options;
      }
    },
  }
</script>