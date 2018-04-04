<template>
  <div class="pay-page">
    <div class="floor1">
      <!--<p class="order-number ft28 ftColor3">订单号:{{ orderId }}</p>-->
      <div class="test-name-wrap">
        <p class="test-name ft28 ftColor3">{{ info.title }}</p>
        <p class="test-price ft28 ftGoldColor"><span class="ft28 ftColor3 ftGoldColor">￥{{ info.price }}</span></p>
      </div>
      <!--当是用户自己订阅的时候，不展示数量，只能购买一个，当用户是送朋友的时候，可以买多份-->
      <div class="shop-num-wrap" v-if="is_buy == 0 && info.price_curr != 0">
        <p class="test-name ft28 ftColor3" v-if="is_buy == 0">赠送数量：</p>
        <p class="test-name ft28 ftColor3" v-else>购买数量：</p>
        <div class="shop-num-right">
          <p class="sub iconfont icon-sub" @click="sub()"></p>
          <div class="shop-num">{{default_num}}</div>
          <p class="add iconfont icon-add" @click="add()"></p>
        </div>
      </div>
    </div>
    <div class="floor2">
      <p class="floor2-title ft28 ftColor3">使用优惠码订购：</p>
      <div class="test-code-wrap">
        <div class="input-code-wrap">
          <input type="text" class="input-code" v-model="coupon" placeholder="请输入优惠码"/>
          <div class="validate-btn" @click="verifyCoupon">验证</div>
        </div>
      </div>
      <div class="account-price"><span class="account ft28 ftColor3">总金额:</span><span class="account1 ft28">￥{{ allPay }}</span></div>
      <div class="account-price"><span class="account ft28 ftColor3">优惠金额:</span><span class="account1 ft28">￥{{ favourable_price }}</span></div>
      <div class="account-price"><span class="account ft28 ftColor3">结算金额:</span><span class="account1 ft28">￥{{ needPay }}</span></div>
    </div>
    <div class="floor3 pay-way">
      <p class="pay-way-title ft28 ftColor3">支付方式</p>
      <ul class="pay-way-items">
        <li v-show="false">
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
        <li>
          <div class="pay-item-left">
            <div class="pay-way-img img-wx iconfont icon-weixin">
              <!--<img src="../../assets/images/pay/wechat.png"/>-->
            </div>
            <div class="pay-name-wrap">
              <p class="pay-name ftColor3">微信支付</p>
              <p class="pay-sub-name">推荐安装微信客户端的用户使用</p>
            </div>
          </div>
          <div class="pay-item-right">
            <input class="pay-btn" type="radio" id="pay-btn3" name="pay-way" value="wechat"/>
            <label for="pay-btn3" class="pay-way-btn iconfont" :class="{'icon-unselected':false,'icon-selected':false}"></label>
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
      <button class="submit-pay" :class="{ disabled: confirming }" @click="readyToPay">
        立即支付
      </button>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
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
      @extend .order-number;padding-top: 0;padding-bottom: 0;
    }

    .test-name-wrap{
      padding-left:0.2rem;padding-right: 0.2rem;display: flex; justify-content: space-between;line-height: 1.1rem;border-bottom: 1px solid #e4e4e4;
    }
    .shop-num-wrap{
      width: 100%;height: 100%;padding-left:0.2rem;padding-right: 0.2rem;display: flex;justify-content: space-between;align-items: center;
      .shop-num-right{
        width: 1.3rem; height: 0.9rem;display: flex;justify-content: space-around;align-items: center;line-height: 0.9rem;
      }
      .sub{
        font-size: 0.3rem;
      }
      .add{
        font-size: 0.3rem;
      }
      .shop-num{
        width: 0.4rem;height: 0.4rem; font-size: 0.26rem;border: 1px solid #6c6c6c;color: #6c6c6c;line-height: 0.4rem;text-align: center;
      }
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
      width: 100%; padding: 0 0.2rem; height: 0.9rem; line-height: 0.9rem; display: flex; justify-content: space-between;border-bottom: 1px solid #e4e4e4;

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
        font-size: 0.26rem; height: 1rem; line-height: 0.91rem; border-bottom: 0.01rem solid #e4e4e4; padding: 0 0.2rem; display: flex;

        .pay-item-left{
          width: 4.6rem; height: 100%; display: flex;
        }

        .pay-item-right{
          width: 2.52rem; height: 100%;


          .pay-way-btn{
            display: inline-block; width: 0.3rem; height: 0.3rem; border-radius: 50%; margin-left: 2.1rem;
            /*<!--background: url("../../assets/images/pay/pay_icon.png") no-repeat center;background-position: 0 -3.76rem;-->*/
            background-size: 199%;font-size: 0.4rem;
            /*border: 0.01rem solid #b5b5b5;*/
          }
          .pay-btn{
            display: none;
          }

          .pay-btn:checked ~ .pay-way-btn{
            /*background: url("../../assets/images/pay/checked-on.png") no-repeat center;*/
            /*background-size: cover;*/
            /*<!--background-position: -0.01rem -2.12rem;-->*/
            border: 0;
          }

          .icon-selected{
            color: #3bc1c4;
          }
        }

        .pay-way-img{
          width: 0.56rem; height: 0.56rem; border-radius: 0.08rem; margin-top: 0.17rem; margin-right: 0.22rem;
          /*background: url("../../assets/images/pay/pay_icon.png") no-repeat center;background-size: 100%;*/

          img{ width: 100%; height: 100% }
        }
        .img-balance{
          background-position: 0 -0.65rem;
        }
        .img-wx{
          /*<!--background-position: 0 -1.3rem;-->*/
          font-size: 0.6rem;line-height: 0.56rem;color: #76d148;
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
        coupon_id:'',
//        prev_coupon:'',
        info: {
          id:'',
          title: '产品名称',
          price: 0,
          price_curr:0,
        },
        needPay: 0, // 需要支付的金额
        allPay:0, // 优惠前的总金额
        favourable_price:0,// 优惠金额
        payable: 0,
        userBalance: 0,
        confirming: true,
        couponVerifing: false,
        default_num:1,
        config:{},
        is_buy:'', // 表示是购买给自己用的还是买来送朋友的
        baseUrl: zzhJs.config.apiDomain,
      };
    },
    computed: {
//      notReady() {
//        return !this.channel;
//      }
    },
    props() {},
    mounted() {
      document.title = '支付';
//      let query = this.$route.query;
//      if (query.order_id) {
//        this.getOrderInfo();
//      } else {
//        this.generateOrder();
//      }

      this.getData();
    },
    methods: {
//    商品数量减少
      sub() {
        if(this.default_num>1){
          this.default_num--;
        }
        this.coupon = '';
        this.coupon_id = '';
//        this.prev_coupon = '';
        this.favourable_price = 0.00;
        let amount = this.info.price * this.default_num;
        this.needPay = Math.round(amount * 100) / 100;
        this.allPay =  Math.round(amount * 100) / 100;
      },
//     商品数量增加
      add() {
        this.default_num++;
        this.coupon = '';
        this.coupon_id = '';
//        this.prev_coupon = '';
        this.favourable_price = 0.00;
        let amount = this.info.price * this.default_num;
        this.needPay =  Math.round(amount * 100) / 100;
        this.allPay =  Math.round(amount * 100) / 100;
      },
//    获取商品信息
      getData() {
        let vthis = this,
          product_id = this.$router.currentRoute.query.id;
        this.is_buy = this.$router.currentRoute.query.is_give;



        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain+ '/zzhedu/wx/product/details.action',
          {
            product_id:product_id
          }).then(res => {
          if(res.status == 200){
            let response = JSON.parse(res.bodyText).data;

            vthis.info = response;
            vthis.info.id = response.id;
            vthis.info.price = response.price_curr;
            vthis.info.title = response.name;
            vthis.info.price_curr = response.price_curr;
            vthis.needPay = response.price_curr;
            vthis.allPay = response.price_curr;

            vthis.confirming = false;
            vthis.weLoadEnd();
          }
        },res => {
          zzhJs.console.log(res);
        })

      },
//     验证优惠码
      verifyCoupon(callback) {


        if (!this.coupon) {
          return this.weNotify('请输入优惠码!');
        }

        if (this.couponVerifing) {
          return ;
        }

        this.prev_coupon = this.coupon + '';

        let vthis = this;

        // 验证优惠码
        this.weLoadStart(false);
        this.couponVerifing = true;
        this.$http.post(zzhJs.config.apiDomain+'/zzhedu/wx/coupon/verify.action', {
          coupon_no: vthis.coupon,
          products:[
            {
              product_id:vthis.info.id,
              amount:vthis.default_num
            }
          ],
          is_buy:vthis.is_buy // 用于区分该优惠券是用于购买的，还是用于赠送好友的
        }).then(res => {
          this.weLoadEnd();
          let response = res.body.data;

          if (res.status != 200) {
            this.couponVerifing = false;
            return vthis.weNotify(res.body.message);
          }

          this.couponVerifing = false;

          if (response.state != 1) {
            this.confirming = false;
            return vthis.weNotify(response.msg);
          }

          vthis.allPay = response.total_price;
          vthis.favourable_price = response.price;
//           此赋值方法有问题。。。
//          vthis.needPay = Math.round(_.subtract(response.total_price, response.price)).toFixed(2);
          vthis.needPay = (response.total_price - response.price).toFixed(2)
          vthis.coupon_id = response.id;

          if(callback){
            callback();
          }

        }).catch(function () {
          this.weLoadEnd();
          this.couponVerifing = false;
        });
      },

      readyToPay() {
        if(this.confirming){
          return;
        }

        this.payByWechat();


      },
      // 微信支付
      payByWechat() {

        this.confirming = true;
        if(this.confirming){ }

        if (this.coupon) {
//          if (!(this.coupon == this.prev_coupon)) {
            this.verifyCoupon(this.createOrder);
//          }
        }else {
            this.createOrder();
        }
      },

      //   创建订单
      createOrder() {
        let vthis = this;

        this.$http.post(zzhJs.config.apiDomain+'/zzhedu/wx/order/create.action', {
          coupon_id:vthis.coupon_id,
          products:[
            {
              product_id:vthis.info.id,
              amount:vthis.default_num
            }
          ],
          price: vthis.needPay,
          attach:'wx',
          title:'支付',
          is_buy:vthis.is_buy
        }).then(res => {
          vthis.confirming = false;

          if(res.body.status != 200){
            return vthis.weNotify(res.body.msg);
          }

          let response = JSON.parse(res.bodyText).data;

          vthis.config = response;

          // 当支付的价格为0的时候，直接跳转，不调微信支付 ,支付不为0的时候，才调起微信支付
          if (vthis.needPay == 0) {

            if (vthis.is_buy == 0) {
              window.location.replace(zzhJs.config.urlMine+'?#/mine/give');
            } else if (vthis.$route.query && vthis.$route.query['channel'] == 'audio') {
              window.location.replace(zzhJs.config.urlMine+'?#/mine/list/audio');
            } else {
              window.location.replace(zzhJs.config.urlMine+'?#/mine/list/video');
            }

            return;
          }

          vthis.callWechat();

        }, res => {
          vthis.confirming = false;
          vthis.weNotify('服务端繁忙请稍后再试!');
        });
      },


      callWechat() {
        let vthis = this,
          config = _.clone(this.config);

        wx.chooseWXPay({
          timestamp: config['timestamp'],
          nonceStr: config['nonce_str'],
          package: config['package'],
          signType: config['sign_type'],
          paySign: config['pay_sign'],
          success: function (res) {
            if (res.errMsg != "chooseWXPay:ok") {
              return vthis.weNotify('支付失败,请重试!'+ res.errMsg);
            }

            if (vthis.is_buy == 0) {
              window.location.replace(zzhJs.config.urlMine+'?#/mine/give');
            } else {
              if (vthis.$route.query && vthis.$route.query['channel'] == 'audio') {
                window.location.replace(zzhJs.config.urlMine + '?#/mine/list/audio');
              } else {
                window.location.replace(zzhJs.config.urlMine + '?#/mine/list/video');
              }
//              window.location.replace(zzhJs.config.urlMine+'?#/mine/list');
            }
          },
          cancel: function (res) {
          },
          fail: function (res) {
            alert(res.errMsg);
            return vthis.weNotify('支付失败,请重试!');
          }
        });
      },

    },
    watch: {},
    components: {}
  }
</script>