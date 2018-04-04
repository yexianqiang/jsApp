<template>
  <div class="pay-call-page">
    <p class="reminder">正在调起微信支付,请注意在 15 分钟内支付, <br/><span class="time">{{minute}}</span><span class="time">:</span><span class="time">{{second}}</span> 分钟后订单失效。</p>
    <div class="wrap">
      <a href="javascript:;" class="back-btn" @click="goBack">返回</a>
      <a href="javascript:;" class="retry-btn" @click="callWechat" v-if="canRetry">重试</a>
    </div>
  </div>
</template>

<style lang="scss">
  .pay-call-page {
    .reminder {
      width: 90%; margin: 1rem auto 0.5rem; padding: 0.3rem 0.3rem; text-align: center; line-height: 0.6rem; font-size: 0.28rem; background: #fff; border-radius: 0.14rem; height: 1.8rem;

      .time {
        font-size: 0.38rem; color: red;
      }
    }
    .wrap{
      width: 100%; padding: 0.3rem; display: flex; justify-content: space-between;
    }
    .back-btn,.retry-btn {
      width: 3.3rem; height: 0.8rem; font-size: 0.28rem; display: inline-block; border-radius: 0.5rem; text-align: center; line-height: 0.8rem; color: #fff; margin: 0 auto;
    }
    .back-btn {
      background: #47c0c2;
    }
    .retry-btn {
      background: #f08619;
    }
  }
</style>

<script>

  export default {
    data() {
      return {
        called: false,
        calling: false,
        needRetry: false,
        config: null,
        minute:'15',
        second:'00',
        orderId: 0,
      }
    },
    computed: {
      canRetry() {
        return this.called && this.needRetry && !this.calling;
      }
    },
    props() {},
    created() {
      this.countTime();
    },
    mounted() {
      document.title = '调起微信支付';
      var vthis = this;
      setTimeout(function () { vthis.call(); }, 0);
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      retry() {
        this.callWechat();
      },
      call() {
        let vthis = this,
          orderId = this.orderId = this.$router.currentRoute.query.order_id,
          url = zzhJs.helpers.routeParser('api.payment.wechat.argument_sign');

        this.$http.post(url, {
          order_id: orderId
        }).then(res => {
          var response = res.body;

          if (response.status == 503 || response.status == 504) {
            this.$router.replace('/');
            return vthis.weNotify(response.message);
          }

          if (response.status != 200) {
            return vthis.weNotify(response.message);
          }

          vthis.config = response.data.config;
          vthis.orderId = response.data.order.id;

          vthis.callWechat();
        }, res => {
          this.called = false;
          vthis.weNotify('服务器繁忙请稍后!');
        });
      },
      callWechat() {
        let vthis = this,
          config = _.clone(this.config);

        this.called = this.calling = true;

        wx.chooseWXPay({
          timestamp: config['timestamp'],
          nonceStr: config['nonceStr'],
          package: config['package'],
          signType: config['signType'],
          paySign: config['paySign'],
          success: function (res) {
            vthis.calling = false;

            if (res.errMsg != "chooseWXPay:ok") {
              vthis.needRetry = true;
              return vthis.weNotify('支付失败,请重试!'+ res.errMsg);
            }

            vthis.$router.replace({
              name: 'pay.success',
              query: { order_id: vthis.orderId }
            });
          },
          cancel: function (res) {
            vthis.calling = false;
            vthis.needRetry = true;
          },
          fail: function (res) {
            vthis.calling = false;
            vthis.needRetry = true;
            return vthis.weNotify('支付失败,请重试!');
          }
        });
      },
      // 倒计时
      countTime() {
        var totalTime = 900; // 900s,即为15min
        var that = this;
        var timer = setInterval(function () {
          if(totalTime <= 0){
            clearInterval(timer);
            return;
          }

          totalTime--;
          var minute = parseInt(totalTime / 60);
          var second = parseInt(totalTime % 60);

          that.minute = minute < 10 ? ('0' + minute) : minute;
          that.second = second < 10 ? ('0' + second) : second;

        },1000)

      }
    }
  };
</script>