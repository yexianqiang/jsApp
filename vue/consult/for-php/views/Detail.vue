<template>
  <div class="detail-view">
    <div class="banner">
      <div>
        <div class="head-img"><img :src="'//s2.zhizihua.com/upload/experts/'+ teacher.src+ '.png'"/></div>
        <div class="teacher-dis">
          <p class="teacher-name">{{ teacher.name }}</p>
          <p class="teacher-title">{{ teacher.subtitle }}</p>
        </div>
      </div>
    </div>
    <ul class="teacher-info">
      <li class="item-info" v-for="item in teacher.info">
        <p class="item-title">{{ item.title }}</p>
        <p class="item-icon" :class="{icon_area: item.id == 2, icon_tech: item.id == 3, icon_word: item.id == 4}" ></p>
        <p class="item-discribe">{{ item.discribe }}</p>
      </li>
    </ul>
    <div class="order-wrap">
      <p class="order-title">预约须知：</p>
      <ul class="order-items">
        <li>
          <p class="order-item-title">咨询流程</p>
          <p class="order-item-con">预约，选择套餐</p>
          <p class="order-item-con">付款成功</p>
          <p class="order-item-con">客服确认咨询方式与时间</p>
          <p class="order-item-con">正式咨询</p>
        </li>
        <li>
          <p class="order-item-title">回应时长</p>
          <p class="order-item-con">机构将在收到预约的4小时内由客服与您取得联系，协商咨询的时间和形式。</p>
        </li>
        <li>
          <p class="order-item-title">可预约时段</p>
          <p class="order-item-con">提供工作日及周末全天的咨询，但需要同客服协商后确认，方可进行咨询。</p>
        </li>
        <li>
          <p class="order-item-title">若变更预约</p>
          <p class="order-item-con">若因为不可抗力需要变更/取消已协商好的咨询预约，请务必提前24小时（1个工作日）告知客服人员，否则咨询将如期开始。</p>
        </li>
        <li>
          <p class="order-item-title">爽约/迟到</p>
          <p class="order-item-con">若没有提前24小时告知情况，爽约/迟到30分钟以上，则默认这次咨询已经完成。其他特殊情况，需与客服人员协商处理。</p>
        </li>
        <li>
          <p class="order-item-title">客服信息</p>
          <p class="order-item-con">电话：<a href="tel:18364167587">18364167587</a></p>
          <p class="order-item-con">邮箱：<a href="mailto:zixun@zhizihua.com">zixun@zhizihua.com</a></p>
        </li>
      </ul>
    </div>

    <div class="footer-wrap">
      <div class="consult-btn" @click="appointment()">立即预约</div>
    </div>
    <div class="mask" v-show="isPop" @click="hidePopup()">
      <transition name="slide">
        <div class="pop-wrap" :class="{'text_input':flag}" v-show="isPop" @click.stop>
          <div class="btn-close" @click="hidePopup()"></div>
          <form id="info" @submit.prevent="confirm()" novalidate>
            <div class="form-top">
              <label class="l-title text">
                您的称呼：<input type="text" class="name"  placeholder="请输入1-10个字符" v-model="order.name" :readonly="loading"/>
                <p class="tips" v-if="false">请输入正确的名字（长度为1-10个字符）</p>
              </label>
              <label class="l-title text">
                手机号码：<input type="number" class="mobile" placeholder="请输入您的手机号" v-model="order.mobile" :readonly="loading"/>
                <p class="tips" v-if="false">请输入正确的手机号</p>
              </label>

              <label class="l-title" v-if="channel == 'wechat'">支付方式：<span class="icon-pay"></span></label>
            </div>
            <!--按钮模式-->
            <div class="btns-wrap">
              <div class="btn-call" :class="[order.package == 1 ?'btn-active' :'']" @click="selectConsultWay(1)">电话</div>
              <div class="btn-face" :class="[order.package == 2 ?'btn-active' :'']" @click="selectConsultWay(2)">面询</div>
            </div>
            <div class="price-wrap">
              <p class="time-item">60分钟/次</p>
              <div class="times-wrap">
                <div class="btn-sub" @click="minusPieces">-</div>
                <div class="num-wrap">{{order.pieces}}</div>
                <div class="btn-add" @click="addPieces">+</div>
              </div>
              <p class="price-item">{{amount | currency}}</p>
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
    width: 100%; min-height: 100vh; overflow: hidden; padding-bottom: 1rem; position: relative;
    .text_input{
      position: static !important;
    }
    img{
      width: 100%;
    }
    .banner{
      width: 100%;height: 4.43rem;background-color: #fff;background-image:url(../assets/images/detail/title_bg.png);background-repeat:no-repeat;background-size:100%;margin-bottom: 0.2rem;
      position: relative;overflow: hidden;
      .head-img{
        width: 1.9rem;height: 1.9rem;border: 0.1rem solid rgba(255,255,255,0.5);border-radius: 50%;position: absolute;left: 50%;top: 0.8rem;transform: translateX(-50%);overflow: hidden;
      }
      .teacher-dis{
        margin-top: 2.8rem;
      }
      .teacher-name{
        font-size: 0.42rem;color: #333333;text-align: center;line-height: 0.6rem;
      }
      .teacher-title{
        font-size: 0.24rem;color: #979797;text-align: center;line-height: 0.5rem;
      }
    }

    .teacher-info{
      width: 100%;margin-bottom: 0.2rem;
      &>li{
        width:100%;padding: 0.2rem 0.8rem 0.6rem;border-bottom: 1px solid #f2f2f2;background: #fff;
      }
      .item-title{
        font-size: 0.3rem;color: #333333;text-align: center;
      }
      .item-icon{
        width: 0.7rem;height: 0.18rem;background: url("../assets/images/detail/icon_spirte.png") no-repeat;background-size: 100%;background-position: 0.1rem 0;
        margin: 0.1rem auto 0.2rem;
      }
      .item-discribe{
        font-size: 0.24rem;color: #6c6c6c;line-height: 0.38rem;text-align: justify;
      }
    }
    .icon_area{
      background-position: 0.1rem -0.3rem !important;
    }
    .icon_tech{
      background-position: 0.1rem -0.59rem !important;
    }
    .icon_word{
      background-position: 0.1rem -0.86rem !important;
    }
    .order-wrap{
      width: 100%;background: #fff;padding-bottom: 0.3rem;margin-bottom:0.2rem;
      .order-title{
        width: 100%;line-height: 0.85rem;border-bottom: 1px solid #f2f2f2;font-size: 0.3rem;color: #333;padding: 0 0.7rem;
        font-weight: bold;
      }
      .order-items{
        width: 100%;
        counter-reset: count 0;
        &>li{
          width: 100%; font-size: 0.25rem;padding: 0.1rem 0.67rem 0 1.13rem;position: relative;
          counter-increment: count;
          margin-bottom: 0.2rem;
          &:before{
            position: absolute; left: 0.67rem; top: 0.22rem; width: 0.24rem; height: 0.24rem; border: 1px solid #7ec9e9; border-radius: 50%; font-size: 0.14rem;
            text-align: center; line-height: 0.24rem; color: #7ec9e9 ; content: counter(count);
          }
        }
        .order-item-title{
          color: #484848;line-height: 0.54rem;font-weight: bold;
        }
        .order-item-con{
          color: #6c6c6c;line-height: 0.38rem;
        }

      }

    }

    .footer-wrap{
      width: 100%;height: 1rem;position: fixed;bottom: 0;left: 0;font-size: 0.32rem;line-height: 1rem;-webkit-transform: translateZ(0);
      .consult-btn{
        width: 100%;height: 100%;background: #22b8bb;color: #fff;text-align: center;
      }
    }

    .mask{
      width: 100%;background: rgba(0,0,0,0.6);
      height: 100%;
      position: absolute;left:0;top:0;
      .pop-wrap{
        width: 100%;background: #fff;padding-bottom: 0.7rem; height: 9.3rem; overflow: hidden; position: fixed; left: 0; bottom: 0;
        .btn-close{
          width: 0.41rem;height: 0.41rem;position: absolute;right: 0.32rem;top: 0.27rem;background: url("../assets/images/detail/icon_spirte.png") no-repeat center;
          background-position: 0 -1.2rem; background-size: 150%;
        }
        #info{
          width: 100%;
          .form-top{
            width: 100%;padding: 0.5rem 0.8rem 0.2rem;
          }
          .l-title{
            font-size: 0.28rem;color: #393939;display: block;margin-bottom: 0.2rem;margin-top: 0.2rem;
          }
          .text{
            position: relative;
            .tips{
              position: absolute;left: 2rem;top: 0.8rem;font-size: 0.14rem;color: red;
            }
          }
          .name{
            width: 3.82rem;height: 0.7rem;border: 1px solid #dcdcdc;border-radius: 0.08rem;text-indent: 0.1rem;font-size: 0.24rem;margin-left: 0.3rem;outline:none;
          }
          .mobile{
            @extend .name
          }
          .icon-pay{
            display: inline-block;width: 0.678rem;height: 0.67rem;background: url("../assets/images/detail/wx_pay.png") no-repeat center;
            background-size: 100%;transform: translateY(30%);margin-left: 0.3rem;
          }
          .bth-pay{
            display: block;width: 2.92rem; height: 0.78rem;line-height: 0.78rem;text-align: center;color: #fff;background: #22b8bb;border: none;border-radius: 0.1rem;
            margin: 0 auto; outline: none; font-size: 0.24rem;
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


          .btns-wrap{
            width: 100%;display: flex;justify-content: flex-start;padding-left: 0.8rem;padding-right: 0.8rem;padding-bottom: 0.85rem;border-bottom: 0.01rem solid #c9c9c9;
            margin-top: 0.4rem;
            .btn-call{
              width: 1.74rem;height: 0.73rem;border: 1px solid #c9c9c9;border-radius: 0.1rem;color: #c9c9c9;font-size: 0.3rem;text-align: center;line-height: 0.73rem;
            }
            .btn-face{
              @extend .btn-call;margin-left: 0.36rem;
            }
            .btn-active{
              border-color:#20b8bb;color: #21b6ba;
            }

          }
          .price-wrap{
            width: 100%;display: flex;justify-content: space-around;padding: 0.3rem 1.2rem;align-items: center;margin-bottom: 0.7rem;
            .time-item{
              font-size: 0.24rem;color: #717171;
            }
            .price-item{
              @extend .time-item;color: #000;
            }
            .times-wrap{
              width: 1.85rem;height: 0.6rem;display: flex;justify-content: space-around;align-items: center;
              .btn-sub{
                width: 0.5rem;height: 0.5rem;border: 1px solid #c9c9c9;border-radius: 0.08rem;font-size: 0.3rem;text-align: center;line-height: 0.4rem;
              }
              .btn-add{
                @extend .btn-sub;
              }
              .num-wrap{
                width: 0.58rem;height: 0.58rem;border: 1px solid #c9c9c9;text-align: center;font-size: 0.26rem;line-height: 0.55rem;
              }
              div:active{
                color: #21b6ba;
              }
            }
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
</style>

<script>

  export default {
    data() {
      return {
        teacher: {
          name: '',
          subtitle: '',
          src: '',
          price: 300,
          info: [
            {
              id: 1,
              title: '',
              discribe: '',
            }
          ]
        },
        packages: window.packages,
        order: {
          name: '',
          mobile: '',
          package: 1,
          pieces: 1,
        },
        price: 0,
        amount: 0,
        loading: false,
        isPop: false,
        flag: false,
        isCall: true,
        channel: window.channel,
      }
    },
    mounted() {
      document.title = '咨询';
      let vthis = this;

      this.getData();

      $(window).scrollTop(0);
      $(this.$el).find('.name').on('focus', function () {
        if(vthis.getDeviceInfo() == 'android'){
          vthis.flag = true;
          $(window).scrollTop(0);
          $('.mask').height($(document).height());
        }
      }).on('blur',function () {
        vthis.flag = false;
        if(vthis.getDeviceInfo() == 'android'){
//          console.log(window.screen.height)
//          $('.mask').height(screen.height);
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
        if(vthis.getDeviceInfo() == 'android'){
          $('.mask').height(screen.height);
        }

      });
    },
    methods: {
      getDeviceInfo(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //苹果端
          return 'iphone';
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //安卓端
          return 'android'
        }
      },
      getData() {
       let id =  this.$router.currentRoute.params.id;
       this.teacher = window.experts[id];
       this.price = this.teacher.phone_price;
       this.amount = this.teacher.phone_price;
      },
      appointment() {
        zzhJs.env.isLogined((login) => {
          if (login) {
            this.showPopup();
          } else {
            zzhJs.env.callLogin();
          }
        });
      },
      showPopup() {
        this.isPop = true;
        $('.mask').height('100%')
        $('html').addClass('noscroll');
        this.deal($('.mask'), '.pop-wrap');
//        $(this.$el).find('.name').focus();
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
          createUrl = zzhJs.helpers.routeParser('api.payment.generate_order');

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
          product_id: this.$route.params.id,
          product_type: window.productTypes['consult_service'],
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


          if (zzhJs.env.isInApp()) {
            zzhJs.env.callPayment(response.data.order_info.id);
          } else {
            // 调起支付
            vthis.signAndCall(response.data.order_info.id);
          }
        }, function () {
          vthis.loading = false;
          vthis.weLoadEnd();
        });
      },
      signAndCall(orderId) {
        let vthis = this,
          url = zzhJs.helpers.routeParser('api.payment.wechat.argument_sign');

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
      },
      // 选择电话还是面询
      selectConsultWay(channel) {
        this.order.package = channel;
        this.order.pieces = 1;

        let price = channel == 1? this.teacher.phone_price: this.teacher.face2face_price;

        this.price = price
        this.amount = price;
      },
      addPieces() {
        this.order.pieces++;
        let amount = this.price * this.order.pieces;
        this.amount = Math.round(amount * 100) / 100;
      },
      minusPieces() {
        if (this.order.pieces > 1) {
          this.order.pieces--;
        }

        let amount = this.price * this.order.pieces;
        this.amount = Math.round(amount * 100) / 100;
      }
    }
  }
</script>