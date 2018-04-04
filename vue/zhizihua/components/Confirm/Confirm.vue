<template>
  <div class="alert-wrap" @touchmove.prevent v-if="show">
    <div class="box">
      <div class="text">
        <div class="title">{{ title }} </div>
        <div class="desc">{{ message }}</div>
      </div>
      <div class="buttons">
        <a href="javascript:;" @click="clickCancel">取消</a>
        <a href="javascript:;" @click="clickConfirm">确定</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .alert-wrap{
    position: fixed; left:0; top:0; bottom: 0; right: 0; background-color: rgba(22,22,22, 0.3); display:flex; align-items: center;
    justify-content: center; z-index: 99; margin-top: -1rem;
    .box{
      width:80%; background-color: white; border-radius: 0.1rem; box-shadow: 2px 2px 5px rgba(22,22,22,0.3); overflow: hidden;
      .text{
        font-size: 0.4rem;

        .title{
          padding: 0 0.2rem;
          line-height: .9rem;
          font-size: 0.36rem;
          border-bottom: 1px solid #DDDDDD;
          text-align: center;
        }

        .desc{
          padding: 0.3rem; line-height: 0.6rem; font-size: 0.36rem;color: #444444;
        }
      }
      .buttons{
        display:flex; justify-content: center; align-items: center; border-top: 1px solid #DDDDDD;

        a {
          display:flex; align-items: center; justify-content: center; width: 50%; text-decoration: none; font-size: 0.3rem; color: #222222;
          border-right: 1px solid #DDDDDD; line-height: .8rem;

          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }
</style>

<script>
  export default{
    data(){
      return {
        title: null,
        message: null,
        userConfirm: null,
        userCancel: null,
        show: false,
      }
    },
    created() {
      this.registerModule();
    },
    methods: {
      registerModule() {
        if(this.$store){
          let vthis = this;

          this.$store.registerModule('weConfirm', {
            namespaced: true,
            mutations: {
              show(state, payload) {
                vthis.title = payload.title;
                vthis.message = payload.message;
                vthis.userConfirm = payload.userConfirm;
                vthis.userCancel = payload.userCancel;
                vthis.show = true;
              }
            }
          });
        }
      },
      clickConfirm() {
        this.show = false;
        if(this.userConfirm) this.userConfirm();
      },
      clickCancel() {
        this.show = false;
        if(this.userCancel) this.userCancel();
      }
    }
  }
</script>