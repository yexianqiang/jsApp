<template>
  <div class="detail-view">
    <div class="default-pop"></div>
    <!--logo-->
    <div class="logo"></div>
    <!--收集姓名，电话页面-->
    <div class="first-page">
      <div class="title"></div>
      <div class="discribe-wrap">
        <div class="intro_system"></div>
        <div class="intro_smart"></div>
        <div class="intro-info"></div>
      </div>
      <div class="ticket"></div>
      <div class="play-info">
        <p class="paly-info-title">活动详情</p>
        <p class="item">1. 此次活动主要针对北京地区用户。外省市用户如需参加此次活动，需自行解决旅费问题；</p>
        <p class="item">2. 支付成功后，工作人员将会在30分钟内与您电话确认，请保持您的手机信号畅通；</p>
        <p class="item">3. 本次测评活动为线下活动，须到店参加。客服人员与您电话联系时，会确认具体活动时间，请您提前安排并规划好活动时间；</p>
        <p class="item">4. 本次测评活动赠送的心理咨询代金券，需到店领取；</p>
        <p class="item">5. 本次活动最终解释权归知子花教育科技（北京）有限公司所有。</p>
        <p class="item">6. 咨询电话：010-57029536</p>
        <div class="icon-border"></div>
      </div>
      <div class="btn-appoint" @click="appointment()"><span>原价:900元</span>（特价¥ 600立即预约）</div>
    </div>


    <!--支付确认弹框-->
    <div class="mask" v-show="isPop" @click="hidePopup()">
      <transition name="slide">
        <div class="pop-wrap" :class="{'text_input':flag}" v-show="isPop" @click.stop>
          <span class="icon-left"></span>
          <span class="icon-close" @click="hidePopup()"></span>
          <form id="info" @submit.prevent="confirm()" novalidate>
            <div class="form-top">
              <label class="l-title text text-wrap">
                <span>您的称呼：</span><input type="text" class="name"  placeholder="请输入1-10个字符" v-model="order.name" :readonly="loading"/>
                <p class="tips" v-if="false">请输入正确的名字（长度为1-10个字符）</p>
              </label>
              <label class="l-title text text-wrap">
                <span>手机号码：</span><input type="number" class="mobile" placeholder="请输入您的手机号" v-model="order.mobile" :readonly="loading"/>
                <p class="tips" v-if="false">请输入正确的手机号</p>
              </label>
              <label class="l-title price-wrap"><span>支付价格：</span><span class="pay-price">{{600 | currency}}</span></label>
              <label class="l-title" v-if="channel == 'wechat'">支付方式：<span class="icon-pay"></span></label>

            </div>
            <button class="bth-pay" type="submit">确认支付</button>
          </form>
        </div>
      </transition>

    </div>

  </div>
</template>

<style lang="scss">
  .noscroll,
  .noscroll body {
    overflow: hidden;
  }
  .noscroll body {
    position: relative;
  }
  .detail-view{
    width: 100%;position: relative;min-height: 100vh; overflow: hidden;
    .default-pop{
      width: 0;height: 0;background: url('../asset/images/pop-wrap-bg.png') no-repeat center;background-size: 100%;
    }
    .text_input{
      position: static !important;transform:translateX(0) !important;margin: 0.2rem auto 0 !important;
    }
    .logo{
      position: absolute;left: 0.2rem;top: 0.15rem; width: 1.55rem;height: 0.76rem;background: url("../asset/images/logo.png") no-repeat center;background-size: 100%;
    }
    .first-page{
      width: 100%;min-height: 100vh;background: url("../asset/images/bg.png") no-repeat center;background-size: 100% 100%;padding-bottom: 1rem;
      .title{
        width:100%;height: 7.8rem;background: url("../asset/images/title.png") no-repeat center;background-size: 100%;
      }
      .discribe-wrap{
        width: 100%;height: 11.22rem;position: relative;
        .intro_system{
          width: 2.1rem;height: 5.25rem;background: url("../asset/images/xitong.png") no-repeat center;background-size: 100%;position: absolute;right: 0;top: -2.3rem;
        }
        .intro_smart{
          width: 5.2rem;height: 6.05rem; background: url("../asset/images/tianfu.png") no-repeat center;background-size: 100%;position: absolute;left: 0;top: -1rem;
        }
        .intro-info{
          width: 100%;height: 8.39rem;background: url("../asset/images/piwei.png") no-repeat center;background-size: 100%;position: absolute;left: 0;top:2.23rem;
        }
      }

      .ticket{
        width: 5.83rem;height: 2.48rem;background: url("../asset/images/quan.png") no-repeat center;background-size: 100%;margin: 0 auto;
      }

      .play-info{
        width: 6.95rem;height: 8rem;background: #2b8fdd;border-radius: 0.08rem;position: relative;padding: 0 0.4rem;margin: 1.24rem auto 0;
        .paly-info-title{
          font-size: 0.48rem;color: #fff;line-height: 1.48rem;position: relative;text-align: center;
          &:before{
            content: '';position: absolute;left: 0;top: 50%;transform: translateY(-50%);width: 2rem;border-top:0.02rem dashed #fff ;
          }
          &:after{
            content: '';position: absolute;right: 0;top: 50%;transform: translateY(-50%);width: 2rem;border-top:0.02rem dashed #fff ;
          }
        }
        .item{
          font-size: 0.26rem;line-height: 0.48rem;color: #fff;text-indent: 0.4rem;
        }
        .icon-border{
          height: 0.87rem;position: absolute;left: -0.4rem;right:-0.4rem;bottom: 0;background: url('../asset/images/icon_bottom1.png') no-repeat center;background-size: 100%;
        }
      }
      .btn-appoint{
        width: 100%;height: 1rem;font-size:0.35rem;line-height:1rem;color:#fff;text-align:center;margin-top:0.3rem;
        background: url("../asset/images/icon-btn.png") no-repeat center;background-size: 100%;
        position: fixed;bottom: 0;left: 0;

        span{
          font-size: .25rem; text-decoration: line-through;
        }
      }
    }

    .mask{
      width: 100%; height: 100%; background: rgba(0,0,0,0.6);position: absolute;left:0;top:0;
      .pop-wrap{
        width: 6.96rem;height: 5.93rem;background: url("../asset/images/pop-wrap-bg.png") no-repeat center;background-size:100%;
        position: fixed;left: 50%;bottom: 0.5rem;transform: translateX(-50%);border-radius: 0.05rem;
        .icon-left{
          display: block;width: 1.28rem;height: 2.18rem;background: url("../asset/images/icon-left.png") no-repeat center;background-size: 100%;
          position: absolute;left: -0.18rem;top: -0.6rem;
        }
        .icon-close{
          display: block;width: 0.41rem;height: 0.41rem;background: url("../asset/images/btn-close.png") no-repeat center;background-size: 100%;
          position: absolute;right: 0.24rem;top: 0.24rem;
        }

        #info{
          width: 100%;
          .form-top{
            width: 100%;padding: 0.5rem 0.5rem 0.2rem;
          }
          .l-title{
            font-size: 0.28rem;color: #fff;display: block;margin-bottom: 0.2rem;margin-top: 0.2rem;
          }
          .text-wrap{
            display: flex;justify-content: space-between;align-items: center;
          }
          .price-wrap{
           width: 98%; display: flex;justify-content: space-between;align-items: center;
            .pay-price{
              color: #ffff00;
            }
          }
          .text{
            position: relative;
            .tips{
              position: absolute;left: 2rem;top: 0.8rem;font-size: 0.14rem;color: red;
            }
          }
          .name{
            width: 3.8rem;height: 0.7rem;border: 1px solid #fff;border-radius: 0.08rem;text-indent: 0.1rem;font-size: 0.24rem;
            margin-left: 0.3rem;outline:none; background: transparent;
            color: #fff;
          }
          input::-webkit-input-placeholder{
            color: rgba(255,255,255,.5);
          }
          input::-moz-placeholder{
            color: rgba(255,255,255,.5);
          }
          input:-moz-placeholder{
            color: rgba(255,255,255,.5);
          }
          input:-ms-input-placeholder{
            color: rgba(255,255,255,.5);
          }
          .mobile{
            @extend .name
          }
          .icon-pay{
            display: inline-block;width: 0.678rem;height: 0.67rem;background: url("../asset/images/wx_pay.png") no-repeat center;
            background-size: 100%;transform: translateY(30%);margin-left: 0.3rem;
          }
          .bth-pay{
            display: block;width: 4.54rem; height: 0.88rem;line-height: 0.88rem;text-align: center;color: #fff;background: #ff5abf;border: none;border-radius: 0.1rem;
            margin: 0.3rem auto 0; outline: none; font-size: 0.3rem;
          }
          .select-wrap{
            width: 100%;border-top: 0.01rem solid #e5e5e5;padding: 0 0.3rem;margin-bottom:0.7rem;
            &>li{
              width: 100%;font-size: 0.28rem;border-bottom: 0.01rem solid #e5e5e5;display: flex;justify-content: space-around;line-height: 0.8rem;
              .meal-A{
                font-size: 0.28rem;color: #393939;min-width: 1.4rem;text-align: center;
              }
              .meal-time{
                font-size: 0.24rem;color: #5e5e5e;min-width: 2.1rem;text-align: left;
              }
              .meal-price{
                font-size: 0.24rem;color: #ffaa30;min-width: 1.35rem ;text-align: left;
              }
              .select-btn{
                display:none;
              }
              .select-circle{
                display: inline-block;width: 0.36rem;height: 0.36rem;border: 0.03rem solid #bceaea;border-radius: 50%;vertical-align: middle;
              }
              .select-btn:checked ~ .select-circle{
                /*background: url("../assets/images/detail/icon_circle.png") no-repeat center;background-size: 100%;*/
                background: #bceaea;position: relative;
                &:after{
                  content: ''; width: 0.22rem; height: 0.22rem; border-radius: 50%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
                  background: #22b8bb;
                }
              }
            }
          }

          .slide-leave-active, .slide-enter-active{
            transition: all .3s ease;
          }

          .slide-enter, .slide-leave-to {
            transform: translateY(1.2rem);
            opacity: 0;
          }

          input[type=button],
          input[type=submit],
          input[type=file],
          input[type=text],
          button,textarea,div{
            cursor: pointer;
            /*去除系统默认样式*/
            -webkit-appearance: none;
            /*点击高亮的颜色*/
            -webkit-tap-highlight-color:rgba(255,255,255,0);
          }

        }
      }
    }

  }

</style>

<script>
  export default {
    data() {
      return {
        order: {
          name: '',
          mobile: ''
        },
        price: 600,
        amount: 0,
        loading: false,
        channel: 'wechat',
        isPop: false,
        flag: false,
      }
    },
    mounted() {
      document.title = '双11限时购 今年剁手为孩子！';
      let vthis = this;

      this.fixAndriodIos();
    },
    methods: {
      fixAndriodIos() {
        $(window).scrollTop(0);
        $(this.$el).find('.name').on('focus', function () {
          if(vthis.getDeviceInfo() == 'android'){
            vthis.flag = true;
            $(window).scrollTop(0);
            $('.mask').height($(document).height());
          }
        }).on('blur',function () {
          vthis.flag = false;
          if (vthis.getDeviceInfo() == 'android') {
            $('.mask').height(screen.height);
          }

        });

        $(this.$el).find('.mobile').on('focus', function () {
          if (vthis.getDeviceInfo() == 'android') {
            vthis.flag = true;
            $(window).scrollTop(0);
            $('.mask').height($(document).height());
          }
        }).on('blur',function () {
          vthis.flag = false;
          if (vthis.getDeviceInfo() == 'android') {
            $('.mask').height(screen.height);
          }
        });
      },
      getDeviceInfo(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //苹果端
          return 'iphone';
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //安卓端
          return 'android'
        }
      },
      appointment() {
        if (zzhJs.env.isInApp() && !zzhJs.env.isLogined()) {
          zzhJs.env.callLogin();
        } else {
          this.showPopup();
        }
      },
      showPopup() {
        this.isPop = true;
        $('.mask').height('100%')
        $('html').addClass('noscroll');
        this.deal($('.mask'), '.pop-wrap');
      },
      hidePopup() {
        this.isPop = false;
        $('html').removeClass('noscroll');
      },
      // 尝试解决弹框底部会滑动问题
      deal(container, selectorScrollable) {
        // 如果没有滚动容器选择器，或者已经绑定了滚动事件，忽略
        if (!selectorScrollable || container.data('isBindScroll')) {
          return;
        }

        // 是否是搓浏览器
        // 自己在这里添加判断和筛选
        var isSBBrowser;

        var data = {
          posY: 0,
          maxscroll: 0
        };

        // 事件处理
        container.on({
          touchstart: function (event) {
            var events = event.touches[0] || event;

            // 先求得是不是滚动元素或者滚动元素的子元素
            var elTarget = $(event.target);

            if (!elTarget.length) {
              return;
            }

            var elScroll;

            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
              elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
              elScroll = null;
            }

            if (!elScroll) {
              return;
            }

            // 当前滚动元素标记
            data.elScroll = elScroll;

            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
          },
          touchmove: function () {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
              // 禁止滚动
              event.preventDefault();
            }
            // 滚动元素
            var elScroll = data.elScroll;
            // 当前的滚动高度
            var scrollTop = elScroll.scrollTop();

            // 现在移动的垂直位置，用来判断是往上移动还是往下
            var events = event.touches[0] || event;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            if (isSBBrowser) {
              elScroll.scrollTop(data.scrollY - distanceY);
              elScroll.trigger('scroll');
              return;
            }

            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
              // 往上滑，并且到头
              // 禁止滚动的默认行为
              event.preventDefault();
              return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
              // 往下滑，并且到头
              // 禁止滚动的默认行为
              event.preventDefault();
              return;
            }
          },
          touchend: function () {
            data.maxscroll = 0;
          }
        });

        // 防止多次重复绑定
        container.data('isBindScroll', true);
      },
      confirm() {
        let vthis = this,
          createUrl = zzhJs.helpers.zzhJs.helpers.routeParser('api.payment.generate_order');

        // 验证
        if (this.order.name.length == 0) {
          return this.weNotify('请输入您的称呼 !');
        }

        if (!/^[\u4e00-\u9fa5]+$/.test(this.order.name)) {
          return this.weNotify('请输入正确的称呼 !');
        }

        if (!/^[\u4e00-\u9fa5]{1,10}$/.test(this.order.name)) {
          return this.weNotify('称呼应在 10 个字符以内 !');
        }

        if (this.order.mobile.length == 0) {
          return this.weNotify('请输入您的手机号 !');
        }

        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.order.mobile)) {
          return this.weNotify('手机号格式错误 !');
        }

        // 判断用户是否点击过提交按钮，如果点击过，在还没有提交完成的时候禁止再次提交
        if (this.loading) {
          return false;
        }

        // 创建同时确认订单
        this.weLoadStart();
        this.loading = true;
        this.$http.post(createUrl, {
          product_id: 0,
          product_type: window.productTypes['double11'],
          confirm: true,
          attach: _.clone(this.order)
        }).then(res => {
          let response = res.body;

          vthis.weLoadEnd();

          if (response.status != 200) {
            return vthis.weNotify(response.message);
          }

          vthis.orderId = response.data.order_info;
          vthis.info = response.data.product_info;

          if (window.appCaller) {
            zzhJs.env.callPayment(response.data.order_info.id);
          } else {
            // 调起支付
            vthis.signAndCall(response.data.order_info.id);
          }
        }, function () {
          vthis.loading = false;
          vthis.weLoadEnd();

          vthis.isClick = false;
        });
      },
      signAndCall(orderId) {
        let vthis = this,
          url = zzhJs.helpers.zzhJs.helpers.routeParser('api.payment.wechat.argument_sign');

        // 签名预创建微信订单
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
          vthis.callWechat(orderId);

        }, res => {
          vthis.loading = false;
          vthis.weLoadEnd();
          vthis.weNotify('服务器繁忙请稍后!');
        });
      },
      callWechat(orderId) {
        let vthis = this,
          config = _.clone(this.config);

        this.called = this.calling = true;

        // 调起支付
        wx.chooseWXPay({
          timestamp: config['timestamp'],
          nonceStr: config['nonceStr'],
          package: config['package'],
          signType: config['signType'],
          paySign: config['paySign'],
          success: function (res) {
            vthis.calling = false;
            vthis.loading = false;

            if (res.errMsg != "chooseWXPay:ok") {
              vthis.needRetry = true;
              return vthis.weNotify('支付失败,请重试!'+ res.errMsg);
            }

            vthis.$router.replace({
              name: 'success',
              params: { id: orderId }
            });
          },
          cancel: function (res) {
            vthis.calling = false;
            vthis.needRetry = true;
            vthis.loading = false;
          },
          fail: function (res) {
            vthis.calling = false;
            vthis.needRetry = true;
            vthis.loading = false;
            return vthis.weNotify('支付失败,请重试!');
          }
        });
      },
      selectMeal(key) {
        this.order.package = key;
      }
    }
  }
</script>