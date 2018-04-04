<template>
  <div class="mine-view">
    <div class="head-bg">
      <div class="bg-left"></div>
      <div class="bg-right"></div>
      <div class="head-img"><img :src="customerInfo.avatar"/></div>
      <p class="customer-name">{{customerInfo.name}}</p>
    </div>
    <ul class="list-wrap">
      <template v-for="(item,index) in nav">
        <li @click="showList(index)">
          <span><i class="iconfont" :class="{'icon-consult':index == 0,'icon-test':index == 1,'icon-my_concern':index == 2,'icon-plane':index == 4,'icon-myStore':index == 3,'icon-pen':index == 5,'icon-myOrder':index== 6}"></i>{{item}}</span>
          <span class="iconfont icon-arrow-right"></span>
        </li>
      </template>
    </ul>
    <div class="bing-phone" @click="goBind">
      <span><i class="iconfont" :class="{'icon-iphone':true}"></i>绑定手机</span>
      <span v-if="!hasBind"><a class="go-bind">去绑定</a><i class="iconfont icon-arrow-right"></i></span>
      <span v-if="hasBind"><a class="go-bind">{{iphoneNum}}</a><i class="iconfont icon-arrow-right"></i></span>
    </div>
    <footer-nav></footer-nav>


    <!--修改绑定手机号的弹框-->
    <div class="change-phone-wrap" v-if="changePhoneNum" @click="changePhoneNum = false">
      <div class="change-phone" @click.stop>
        <p class="change-phone-title">修改手机号</p>
        <div class="change-row">
          <p class="s-title">手机号</p>
          <input type="text" class="tele-num" placeholder="请输入验证码" disabled readonly="readonly" v-model="iphoneNum"/>
          <!--<p class="tele-num">{{iphoneNum}}</p>-->
        </div>
        <div class="change-row">
          <p class="s-title">验证码 </p>
          <input type="text" class="verify-num" v-model="verifyNum" placeholder="请输入验证码"/>
          <div class="btn-send-verify" @click="sendVerifyNum">{{time ? time+ 's后重新发送': '发送验证码'}}</div>
          <!--<p class="btn-send-verify" v-if="!hasSend" @click="sendVerifyNum">发送验证码</p>-->
          <!--<p class="btn-send-verify disabled" v-if="hasSend">{{time}}s后重新发送</p>-->
        </div>
        <div class="btn-next" @click="goNext">下一步</div>
      </div>
    </div>

    <!--绑定手机号成功的提示框-->
    <div class="tip-change-success" v-if="bandSuccess">
      <div class="tip-success">绑定成功</div>
    </div>
  </div>
</template>

<style lang="scss">
  .mine-view{
    width: 100%;min-height:100vh;
    .head-bg{
      width: 100%;height: 1.6rem;background: #fff;position: relative;
      &:after{
        content: '';width: 100%;height: 1rem;background: #3bc1c4;position:absolute;left: 0;top: 0;
      }
      .bg-left{
        width: 1.2rem;height: 100%;border-bottom-right-radius: .5rem;background: #3bc1c4;position: absolute;left: 0;top: 0;
      }
      .bg-right{
        width: 5.4rem;height: 100%;border-bottom-left-radius: .5rem;background: #3bc1c4;position: absolute;right: 0;top: 0;
      }
      .head-img{
        width: 1.45rem;height: 1.45rem;border-radius: 50%;border:0.03rem solid #fff;position: absolute;left: 0.93rem;bottom:-0.2rem;background:url("../assets/image/icon_head.png") no-repeat center;background-size:100%;z-index: 99;overflow: hidden;
        img{
          width: 100%;
        }
      }
      .customer-name{
        position: absolute;left: 2.6rem;bottom: 0.3rem;font-size: 0.4rem;color: #fff;z-index: 100;
      }
    }
    .list-wrap{
      width: 100%;background: #fff;
      &>li{
        width: 100%;height: 1.15rem;border-bottom: 1px solid #f1f1f1;display: flex;justify-content: space-between;align-items: center;
        padding: 0 0.25rem;

          &>span{
            font-size: 0.3rem;
          }
      }
    }
    .icon-plane{
      font-size: 0.4rem;color: #6bd1c4;margin-right: 0.3rem;
    }
    .icon-arrow-right{
      font-size: 0.3rem;
    }
    .icon-pen,.icon-consult,.icon-test,.icon-myStore,.icon-myOrder,.icon-my_concern{
      @extend .icon-plane
    }
    .icon-my_concern{
      font-size: 0.34rem;
    }
    .bing-phone{
      width: 100%;height: 1.15rem;background: #fff;margin-top: 0.22rem;display: flex;justify-content: space-between;align-items: center;
      padding: 0 0.25rem;
      &>span{
        font-size: 0.3rem;
      }
      .go-bind{
        color: #6bd1c4;font-size: 0.26rem;margin-right: 0.2rem;
      }
    }
    .icon-iphone{
      @extend .icon-plane;
    }

    .footer-bar{
      /*width: 100%;height: 0.9rem;background: #fff;position: fixed;bottom: 0;left: 0;display: flex;justify-content:center;border-top: 0.01rem solid #ccc;*/
      /*&>a{
        display: block;width: 50%;
        .btn-course{
          width: 100%;height: 0.9rem;text-align: center;line-height: 0.9rem;font-size: 0.28rem;color: #3cc0c4;
          &.active{
            background: #33aaaa;color: #fff;
          }
        }
        .btn-mine{
          @extend .btn-course;border-left: 0.01rem solid #ccc;
        }
      }*/
    }

    .change-phone-wrap{
      width: 100%;height: 100%;position: fixed;left: 0;top: 0;bottom: 0;right: 0;background: rgba(0,0,0,.6);z-index: 999;

      .change-phone{
        width: 6.8rem;background: #fff;border-radius: 0.08rem;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);
        padding: 0.3rem 0.4rem 0.5rem;
        .change-phone-title{
          font-size: 0.3rem;text-align: center;line-height: 0.5rem;color: #737171;margin-bottom: 0.3rem;
        }
        .s-title{
         width: 1rem; font-size: 0.3rem;line-height: 0.8rem;vertical-align: middle;flex-shrink: 0;
        }
        .tele-num{
         @extend .s-title;border: 0;outline: none;margin-left: 0.4rem;flex-shrink: 1;width: 2rem;background: #fff;
          border-radius: 0;-webkit-appearance: none;
        }
        .change-row{
          width: 100%;display: flex;justify-content: flex-start;align-items: center;
        }
        .verify-num{
          border: 0;border-bottom: 1px solid #b0bbcf;display: block;width: 2.8rem;height: 0.75rem;line-height: 0.75rem;outline: none;margin-left: 0.4rem;
          flex-shrink: 1;font-size: 0.26rem;
        }
        .btn-send-verify{
         height: 0.54rem;display: inline-block;background: #31c0c4;text-align: center;line-height: 0.54rem;padding: 0 0.08rem;
          border-radius: 0.08rem;color: #fff;font-size: 0.22rem;flex-shrink: 0;
        }
        .disabled{
          background: #91a1bd;
        }
        .btn-next{
          width: 2.97rem;height: 0.77rem;background: #31c0c4;border-radius: 0.08rem;text-align: center;
          line-height: 0.77rem;color: #fff;margin: 0.3rem auto 0;font-size: 0.3rem;
        }
      }
    }

    .tip-change-success {
      width: 100%;height: 100%;position: fixed;left: 0;top: 0;bottom: 0;background: rgba(0,0,0,.6);
      .tip-success{
        width: 3.94rem;height: 1.47rem;background: #3bc1c4;border-radius: 0.08rem;text-align: center;line-height: 1.47rem;
        color: #fff;font-size: 0.3rem;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);
      }
    }



    /* 兼容苹果手机上，input按钮的默认的背景颜色，以及默认的input框获取焦点时的边框 */
    input[type=button],
    input[type=submit],
    input[type=file],
    input[type=text],
    button,textarea {
      cursor: pointer;
      /*去除系统默认样式*/
      -webkit-appearance: none;
      /*点击高亮的颜色*/
      -webkit-tap-highlight-color:rgba(255,255,255,0);
    }

    /* 自定义input中的placeholder的字体颜色 */
    input::-webkit-input-placeholder { /* WebKit browsers */
      color:#91a1bd;
      font-size: 0.26rem;

    }
    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #91a1bd;
      font-size: 0.26rem;
    }
    input::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #91a1bd;
      font-size: 0.26rem;
    }
    input:-ms-input-placeholder { /* Internet Explorer 10+ */
      color:#91a1bd;
      font-size: 0.26rem;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        nav:['我的咨询','我的测评','我的关注','我的收藏','我的已购','赠送记录','我的订单'],
        hasBind:false,
        time: 0,
        timer: null,
        hasSend: false,
        sending:false,

        changePhoneNum:false,
        bandSuccess:false,
        iphoneNum:'', // 已绑定的手机号（带*号）
        verifyNum:'', // 验证码
        goodTeleNum:'', // 完整的手机号
        customerInfo:{
          name:'',
          avatar:''
        }
      }
    },
    mounted() {
      document.title = '个人中心'
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        let vthis = this;

        this.$http.post(zzhJs.config.apiDomain+'/zzhedu/wx/user/info.action',{})
          .then(res => {
            if(res.body.data.tel){
              vthis.iphoneNum = vthis.dealIphoneNum(res.body.data.tel);
              vthis.goodTeleNum = res.body.data.tel;

              vthis.hasBind = true;
            }
            vthis.customerInfo.name = res.body.data.name;
            vthis.customerInfo.avatar = res.body.data.avatar;
          },res => {
            zzhJs.console.log(res);
          })
      },
      showList (index){
        if (index == 4) { // 我的已购
          this.$router.push({name:'subject.mine.list',params:{channel:'audio'}})
        } else if (index == 5) { // 我的赠送
          this.$router.push({name:'subject.mine.give'})
        } else if (index == 0) { // 咨询
          window.location.href = zzhJs.config.urlConsultList+'#/mine';
        } else if (index == 1) { // 测评
          window.location.href = zzhJs.config.urlEstimate + '?#/mine';
        } else if (index == 3) { // 我的收藏
          window.location.href = zzhJs.config.urlMine + '?#/mine/store';
        } else if(index == 6) { // 我的订单
          window.location.href = zzhJs.config.urlMine + '?#/mine/order';
        } else if (index == 2) {
          window.location.href = zzhJs.config.urlMine + '?#/mine/concern';
        }
      },

      goBind (){
               // 第一次绑定手机
        if (!this.hasBind) {
          this.$router.push({name:'subject.mine.bindphone'});
          return;
        }

        // 修改绑定的手机号
        this.changePhoneNum = true;
      },
      // 发送验证码
      sendVerifyNum(){
        let vthis = this;

        if (this.timer || this.sending) {
          return;
        }

        this.weLoadStart();
        this.sending = true;
        this.$http.post(zzhJs.config.apiDomain +'/zzhedu/wx/user/sms.action',
          {
            tel:vthis.goodTeleNum
          }).then(res => {

            this.weLoadEnd();
            this.sending = false;
            vthis.weNotify(res.body.msg);

          vthis.countSendTime();
        },res => {
          zzhJs.console.log(res);
        })

      },
      // 计时
      countSendTime() {
        let vthis = this;
        this.time = 60;
        this.timer = setInterval(function () {
          if (vthis.time > 0 && vthis.time <= 60) {
            vthis.time--;
          } else {
            clearInterval(vthis.timer)
            vthis.timer = null;
          }
        }, 1000);
      },

      // 修改绑定手机号，走的下一步
      goNext() {
        let vthis = this;
        // 验证 填写的验证码是否正确(验证码6位,数字)
        if(this.verifyNum.length == 0){
          return this.weNotify('请输入验证码！');
        }
        if(!/\d{6}$/.test(this.verifyNum)){
          return this.weNotify('验证码错误！');
        }

        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/user/bind_tel.action',
          {
            tel:vthis.goodTeleNum,
            captcha:vthis.verifyNum
          }).then(res => {

          if(res.body.status == 511){
            return vthis.weNotify(res.body.msg);
          }

          this.$router.push({name:'subject.mine.bindphone'});
        },res => {
            zzhJs.console.log(res)
        })
      },

      dealIphoneNum (num) {
        return num.substr(0,3)+'****'+num.substr(7,11);
      },


    }
  }
</script>
