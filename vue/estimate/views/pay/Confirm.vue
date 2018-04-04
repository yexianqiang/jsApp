<template>
  <div class="pay-page">
    <div class="floor1">
      <!--<p class="order-number ft28 ftColor3">订单号:{{ orderId }}</p>-->
      <div class="test-name-wrap">
        <p class="test-name ft28 ftColor3">{{ info.title }}</p>
        <p class="test-price ft28 ftGoldColor"><span class="ft28 ftColor3 ftGoldColor">￥{{ info.price }}</span></p>
      </div>
    </div>
    <div class="floor2">
      <p class="floor2-title ft28 ftColor3">使用优惠码订购：</p>
      <div class="test-code-wrap">
        <div class="input-code-wrap">
          <input type="text" class="input-code" v-model="coupon" placeholder="请输入测评码"/>
          <div class="validate-btn" @click="verifyCoupon">验证</div>
        </div>
      </div>
      <div class="account-price"><span class="account ft28 ftColor3">结算金额:</span><span class="account1 ft28">￥{{ needPay }}</span></div>
    </div>
    <div class="floor3 pay-way">
      <p class="pay-way-title ft28 ftColor3">选择支付方式</p>
      <ul class="pay-way-items">
        <li @click="selectPayWay('balance')" v-show="false">
          <div class="pay-item-left">
            <div class="pay-way-img img-balance">
              <!--<img src="../../assets/images/pay/balance.png"/>-->
            </div>
            <div class="pay-name-wrap">
              <p class="pay-name ftColor3">余额支付</p>
              <p class="pay-sub-name">当前余额 (￥{{ userBalance }})</p>
            </div>
          </div>
          <div class="pay-item-right">
            <input class="pay-btn" type="radio" id="pay-btn1" name="pay-way" value="balance" v-model="channel"/>
            <label for="pay-btn1" class="pay-way-btn"></label>
          </div>
        </li>
        <li @click="selectPayWay('wechat')">
          <div class="pay-item-left">
            <div class="pay-way-img img-wx">
              <!--<img src="../../assets/images/pay/wechat.png"/>-->
            </div>
            <div class="pay-name-wrap">
              <p class="pay-name ftColor3">微信支付</p>
              <p class="pay-sub-name">推荐安装微信客户端的用户使用</p>
            </div>
          </div>
          <div class="pay-item-right">
            <input class="pay-btn" type="radio" id="pay-btn3" name="pay-way" value="wechat" v-model="channel"/>
            <label for="pay-btn3" class="pay-way-btn"></label>
          </div>
        </li>
        <li v-if="false">
          <div class="pay-item-left">
            <div class="pay-way-img img-alipay">
              <!--<img src="../../assets/images/pay/alipay.png"/>-->
            </div>
            <div class="pay-name-wrap">
              <p class="pay-name ftColor3">支付宝支付</p>
              <p class="pay-sub-name">推荐安装支付宝客户端的用户使用</p>
            </div>
          </div>
          <div class="pay-item-right">
            <input class="pay-btn" type="radio" id="pay-btn2" name="pay-way" value="zhifubao" v-model="channel"/>
            <label for="pay-btn2" class="pay-way-btn"></label>
          </div>
        </li>
      </ul>
    </div>
    <div class="submit-btn-wrap">
      <button class="submit-pay" :class="{ disabled: signing || notReady }" @click="readyToPay">
        立即支付
      </button>
    </div>
  </div>
</template>

<style lang="scss">
  .ft28{
    font-size: 0.28rem;
  }
  .ftColor3{
    color: #333;
  }
  .ftGoldColor{
    color: #fe9d2a;
  }

  .pay-page{
    background: #edf1f0; padding-top: 0.2rem;

    .floor1,.floor2,.floor3{
      width: 100%; background: #fff; margin-bottom: 0.2rem;
    }

    .order-number{
      line-height: 0.8rem; padding: 0.2rem; border-bottom: 0.01rem solid #e4e4e4;
    }

    .floor2-title{
      @extend .order-number
    }

    .pay-way-title{
      @extend .order-number
    }

    .test-name-wrap{
      padding-left:0.2rem;padding-right: 0.2rem;display: flex; justify-content: space-between;line-height: 1.1rem;
    }

    .test-code-wrap {
      width: 100%; height: 1.13rem; padding:0.2rem; border-bottom: 0.01rem solid #e4e4e4;

      .input-code-wrap{
        width: 100%; height: 0.72rem; background: #f7f7f7; border-radius: 1rem; display: flex;justify-content: space-between;

        .input-code{
          width: 5.7rem; display: block; text-indent: 0.42rem; border: none; font-size: 0.26rem; color: #a9a9a9;
          outline: none; background: #f7f7f7; border-radius: 1rem;
        }
        .validate-btn{
          width: 1.1rem; height: 0.4rem; background: #3bc1c4; font-size: 0.24rem; line-height: 0.4rem; color: #fff; border-radius: 1rem;
          text-align: center; margin-top: 0.16rem;margin-right: 0.16rem;
        }
      }
    }
    .account-price {
      width: 100%; padding: 0 0.2rem; height: 0.9rem; line-height: 0.9rem; display: flex; justify-content: space-between;

      .account{
        vertical-align: bottom;
      }
      .account1{
        vertical-align: bottom; font-size: 0.28rem; color: #fe9d2a;
      }

    }

    .pay-way-items {
      width: 100%;

      >li{
        font-size: 0.26rem; height: 0.91rem; line-height: 0.91rem; border-bottom: 0.01rem solid #e4e4e4; padding: 0 0.2rem; display: flex;

        .pay-item-left{
          width: 4.6rem; height: 100%; display: flex;
        }

        .pay-item-right{
          width: 2.52rem; height: 100%;


          .pay-way-btn{
            display: inline-block; width: 0.3rem; height: 0.3rem; border-radius: 50%; margin-left: 2.1rem;
            background: url("../../assets/images/pay/pay_icon.png") no-repeat center;background-position: 0 -3.76rem;
            background-size: 199%; border: 0.01rem solid #b5b5b5;
          }
          .pay-btn{
            display: none;
          }

          .pay-btn:checked ~ .pay-way-btn{
            /*background: url("../../assets/images/pay/checked-on.png") no-repeat center;*/
            /*background-size: cover;*/
            background-position: -0.01rem -2.12rem;
            border: 0;
          }
        }

        .pay-way-img{
          width: 0.56rem; height: 0.56rem; border-radius: 0.08rem; margin-top: 0.17rem; margin-right: 0.22rem;
          background: url("../../assets/images/pay/pay_icon.png") no-repeat center;background-size: 100%;

          img{ width: 100%; height: 100% }
        }
        .img-balance{
          background-position: 0 -0.65rem;
        }
        .img-wx{
          background-position: 0 -1.3rem;
        }
        .img-alipay{
          background-position: 0 0;
        }

        .pay-name-wrap{
          padding-top: 0.17rem;
          .pay-name{
            font-size: 0.26rem; line-height: 0.3rem;
          }
          .pay-name1{
            line-height: 0.6rem;
          }
          .pay-sub-name{
            font-size: 0.22rem; line-height: 0.38rem; color: #666;
          }
        }

      }
    }

    .submit-btn-wrap{
      width: 100%; height: 2.68rem; padding: 0 0.2rem;

      .submit-pay{
        display: block; width: 7.1rem; height: 0.8rem; background: #fe9d2a; border-radius: 1rem; outline: none; border: none; margin-top: 0.6rem; font-size: 0.34rem;
        line-height: 0.8rem; color: #fff;

        &:active{
          position: relative; top: 0.01rem;
        }

        &.disabled {
          background: #CCC;
        }
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        channel: '',
        orderId: '00000000000000000000',
        coupon: '',
        info: {
          title: '产品名称',
          price: 0,
        },
        needPay: 0,
        payable: 0,
        userBalance: 0,
        signing: false,
        couponVerifing: false,
      };
    },
    computed: {
      notReady() {
        return !this.channel;
      }
    },
    props() {},
    mounted() {
      if (this.$route.query.order_id) {
        this.getOrderInfo();
      } else {
        this.generateOrder();
      }
    },
    methods: {
      // 加载订单信息
      getOrderInfo() {
        let vthis = this,
          url = zzhJs.helpers.routeParser('api.payment.order_detail', {
            id: this.$router.currentRoute.query.order_id,
          });

        // 创建或者读取订单 同时返回用户余额
        this.weLoadStart();
        this.$http.get(url)
          .then(res => {
            let response = res.body;

            if (response.status != 200) {
              return vthis.weNotify(response.message);
            }

            vthis.orderId = response.data.order_info.id;
            vthis.userBalance = response.data.user_balance;
            vthis.info = response.data.product_info;
            vthis.needPay = response.data.product_info.price;

            vthis.weLoadEnd();
          });
      },
      // 获取新的 OrderID
      generateOrder() {
        let vthis = this,
          url = zzhJs.helpers.routeParser('api.payment.generate_order');

        // 创建或者读取订单 同时返回用户余额
        this.weLoadStart();
        this.$http.post(url, this.$router.currentRoute.query)
          .then(res => {
            let response = res.body;

            vthis.weLoadEnd();

            if (response.status != 200) {
              return vthis.weNotify(response.message);
            }

            vthis.orderId = response.data.order_info.id;
            vthis.userBalance = response.data.user_balance;
            vthis.info = response.data.product_info;
            vthis.needPay = response.data.product_info.price;
          });
      },
      verifyCoupon() {
        if (!this.coupon) {
          return this.weNotify('请输入优惠码!');
        }

        if (this.couponVerifing) {
          return ;
        }

        let vthis = this,
          apiUrl = zzhJs.helpers.routeParser('api.payment.valid_coupon');


        // 验证优惠码
        this.weLoadStart(false);

        this.couponVerifing = true;
        this.$http.post(apiUrl, {
          order_id: this.orderId,
          coupon_secret: this.coupon,
        }).then(res => {
          this.weLoadEnd();

          if (res.body.status != 200) {
            this.couponVerifing = false;
            return vthis.weNotify(res.body.message);
          }
          
          this.couponVerifing = false;

          this.$router.replace({
            name: 'pay.success',
            query: {order_id: this.orderId}
          });

        }).catch(function () {
          this.weLoadEnd();
          this.couponVerifing = false;
        });
      },
      readyToPay() {
        if(this.signing || this.notReady){
          return;
        }

        if (this.channel == 'balance') {
          this.payByBalance();
        } else if(this.channel == 'wechat') {
          this.payByWechat();
        }
      },
      // 余额支付
      payByBalance() {

        this.signing = true;

        let vthis = this,
          url = zzhJs.helpers.routeParser('api.payment.by_balance');

        this.$http.post(url, {
          order_id: this.orderId,
        }).then(res => {

          if (res.body.status != 200) {
            return vthis.weNotify(res.body.message);
          }

          vthis.$router.replace({
            name: 'pay.success',
            query: {
              order_id: this.orderId
            }
          });

        }, res => {
          this.signing = false;

          vthis.weNotify('服务端繁忙请稍后再试!');
        });
      },
      // 微信支付
      payByWechat() {
        this.signing = true;

        let vthis = this,
          url = zzhJs.helpers.routeParser('api.payment.wechat.argument_sign');

        this.weLoadStart();
        this.$http.post(url, {
          order_id: this.orderId,
          coupon_secret: this.coupon,
        }).then(res => {
          vthis.weLoadEnd();

          vthis.signing = false;

          var response = res.body;

          if (response.status == 503 || response.status == 504) {
            this.$router.replace('/');
            return vthis.weNotify(response.message);
          }

          if (response.status > 300) {
            return vthis.weNotify(response.message);
          }

          if (response.status == 201) {
            return vthis.$router.replace({
              name: 'pay.success',
              query: { order_id: vthis.orderId }
            });
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
            return vthis.weNotify('支付失败,请重试!' + res.errMsg);
          }
        });
      },
      // 选择支付的方法
      selectPayWay(value) {
        if (value === 'balance' && this.userBalance < this.needPay) {
          return this.weNotify('余额不足!');
        }

        this.channel = value;
      }
    },
    watch: {},
    components: {}
  }
</script>