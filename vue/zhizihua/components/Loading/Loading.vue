<template>
  <transition name="slide">
    <div class="we-loading-wrap" v-show="queue">
      <div class="notice">
        {{ loading ? '数据加载中': '数据提交中' }}
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
  .we-loading-wrap {
    position: fixed; left: 50%; top: 0.6rem; margin-left: -1.15rem; z-index: 5000;

    .notice{
      width: 2.3rem; height: 0.6rem; background: white; margin: 0 auto; font-size: 0.25rem; color: black; text-align: center; background-size: contain;
      line-height: 0.6rem; border-radius: 0.6rem; box-shadow: 1px 0 12px #969696; position: relative;padding-left: 0.4rem;

      &:before{
        display: inline-block; width: 0.6rem; height: 0.6rem; content: ""; position: absolute;
        background: url("../assets/loading.gif") no-repeat center;
        background-size: 0.4rem 0.4rem; margin-right: 0.2rem;left: 0.1rem;
      }
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0,-100%,0);
      -ms-transform: translate3d(0,-100%,0);
      transform: translate3d(0,-100%,0)
    }

    100% {
      opacity: 1;
      -webkit-transform: none;
      -ms-transform: none;
      transform: none
    }
  }

  @keyframes fadeOutUp {
    0% {
      opacity: 1
    }

    100% {
      opacity: 0;
      -webkit-transform: translate3d(0,-100%,0);
      -ms-transform: translate3d(0,-100%,0);
      transform: translate3d(0,-100%,0)
    }
  }

  /*.slide-enter-active {
    animation-name: fadeInDown;
    animation-duration: .4s;
  }
  .slide-leave-active {
    animation-name: fadeOutUp;
    animation-duration: .4s;
  }*/

  .slide-leave-active, .slide-enter-active{
    transition: all .3s ease;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(-1.2rem);
    opacity: 0;
  }

</style>

<script>
  export default {
    data() {
      return {
        queue: 0,
        loading: true,
      };
    },
    created() {
      this.registerModule();
    },
    methods: {
      registerModule() {
        if(this.$store){
          let vthis = this;
          this.$store.registerModule('weLoading', {
            namespaced: true,
            mutations: {
              start(state, loading) {
                vthis.loading = loading === false? false: true;
                vthis.queue++;
              },
              end() {
                if(vthis.queue > 0) vthis.queue--;
              }
            }
          });
        }
      },
    }
  }
</script>