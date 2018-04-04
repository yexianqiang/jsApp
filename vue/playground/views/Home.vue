<template>
  <div class="playground-home-wrap">
    <!--<a href="javascript:;" @click="testMessageAndroid">调用Android</a>-->
    <!--<a href="javascript:;" @click="testMessageIos">调用IOS</a>-->
    <!--<p>{{ appRe }}</p>-->
  </div>
</template>

<style lang="scss">
  .playground-home-wrap{
    width: 100%; text-align: center;

    a{ display: inline-block; width: 2rem; line-height: .8rem; text-align: center; border-radius: .1rem; background: cadetblue; color: white; font-size: .24rem; text-decoration: none; }
    .part-1{
      background-size: 7.5rem 4rem; width:7.5rem; height:4rem;
    }
    .part-2{
      margin:0 0 0.2rem; height:2rem; background-color: white;
    }
    .audio-bar-box{
      position: relative; height:0.68rem; padding:0 0.2rem; display:flex; justify-content: space-between; align-items: center;
    }
    .current-time{
      margin-right:0.2rem; font-size: 0.22rem;
    }
    .total-played-time{
      margin-left:0.2rem; font-size: 0.22rem;
    }
    .process-bar{
      position: relative; flex-grow: 1; display:flex; align-items: center; background-color: lightgray;
    }
    .process-bar .process-bg{
      width:0%; height:0.1rem; background-color: #33c2c6;
    }
    .process-bar .process-dot{
      position: absolute; margin-left: -0.1rem; width:0.2rem; height:0.2rem; background-color: #37c4d5; border-radius: 0.1rem; top: 50%;
      transform: translateY(-50%);
    }
    .controller-box{
      height:0.96rem; display: flex; justify-content: center; align-items: center; position: relative;
    }
    .controller-area{
      width:3rem; height:1rem; display:flex; align-items: center; justify-content: space-between;
    }

    .prev,.next{
      font-size: 0.45rem; color: #36c0cb;

      &.terminate-now{
        color: #ccc;
      }
    }

    .play{
      border-radius: 50%; width:0.86rem; height:0.86rem; display:flex; justify-content: center; align-items: center; font-size: 1rem; color: #36c0cb;  position: relative;
      .icon-loading2{
        width:60%;height:60%;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background-color: #fff;
      }
    }
    .icon-bofangqizanting{
      margin-top: -0.1rem;
    }
    .loop{
      width:0.54rem; height:0.4rem; position: absolute; right:0.2rem;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        appRe: null,
      }
    },
    mounted() {
      document.title = 'PlayGround';
//      window.messageQueue = {
//        queue: [],
//      };
//
//      Object.defineProperties(window.messageQueue, 'queue', {
//        get() {
//        },
//        set() {
//        },
//      });
    },
    methods: {
//      testMessageAndroid() {
//        let re = window.appCaller.testMessage();
//        this.appRe = re;
//        alert('callAndroicSuccess');
//      },
//      testMessageIos() {
//        let re = window.webkit.messageHandlers.testMessage.postMessage({});
//        this.appRe = re;
//        alert('callIOSSuccess');
//      }

    }
  }
</script>
