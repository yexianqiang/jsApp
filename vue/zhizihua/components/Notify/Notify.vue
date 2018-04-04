<template>
  <transition name="we-notify-fade">
    <div class="we-notify-wrap" v-show="show">
     {{ message }}
    </div>
  </transition>
</template>

<style lang="scss">

  .we-notify-wrap {
    min-width: 2.9rem;min-height: .9rem;position: fixed; bottom: 50vh; left: 50%;transform: translateX(-50%); display:flex; align-items: center; justify-content: center; z-index: 5000; margin-top: -1rem; padding: 0 .25rem; text-align: center; line-height: 0.6rem; font-size: 0.26rem; color:white;border-radius: .1rem; background: rgba(0, 0, 0, .5);
    animation: fade 3s;


    &.we-notify-fade-leave-active, &.we-notify-fade-enter-active {
      transition: opacity .9s ease;
    }

    &.we-notify-fade-enter, &.we-notify-fade-leave-to {
      opacity: 0;
    }

  }
</style>

<script>
  export default{
    data(){
      return {
        message: '😁 发送完成!',
        show: false,
      }
    },
    created() {
      this.registerModule();
    },
    mounted(){
    },
    methods: {
      registerModule() {
        if(this.$store){
          let vthis = this;

          this.$store.registerModule('weNotify', {
            namespaced: true,
            mutations: {
              show(state, payload) {
                vthis.message = payload.message;
                vthis.show = true;

                window.setTimeout(function () {
                  vthis.show = false;
                }, payload.time? payload.time: 3000);
              }
            }
          });
        }
      }
    }
  }
</script>
