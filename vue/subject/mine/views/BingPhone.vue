<template>
  <div class="bind-phone-view">
    <!--<div class="bing-page-nav">绑定手机号</div>-->
    <form class="form-table">
      <div class="form-row-wrap">
        <span>手机号</span>
        <div class="phone-num-wrap">
          <input name="tele-num" class="input-num input-text" type="text" v-model="form.teleNum"  placeholder="请输入手机号"/>
        </div>
        </div>
      <div class="form-row-wrap">
        <span>验证码</span>
        <div class="verify-wrap">
          <input name="verify-num" class="input-text verify-num" type="text" v-model="form.verifyNum" placeholder="请输入验证码"/>
          <div class="btn-send-verify" @click="sendVerfyNum">{{time ? time+ 's后重新发送': '发送验证码'}}</div>
        </div>
      </div>
      <button type="button" class="btn-verify" @click="Verify">验证</button>
    </form>
  </div>
</template>

<style lang="scss">
  .bind-phone-view{
    width: 100%;
    .bing-page-nav {
      width: 100%;height: 0.75rem;background: #31c0c4;text-align: center;line-height: 0.75rem;
      color: #fff;font-size: 0.28rem;
    }
    .form-table{
      height: 4rem;padding: 0.3rem 0.4rem 0;
      .form-row-wrap{
        width:100%; height: 1rem;line-height: 1rem; font-size: 0.28rem;display: flex;justify-content: flex-start;align-items: center;margin-bottom: 0.05rem;
        .input-text{
          outline: none;border: 0;background: #f6f6f6;
        }
        .phone-num-wrap{
          width:75%; height: 1rem; border-bottom: 1px solid #e0e4ec;margin-left: 0.4rem;
        }
        .input-num{
         width:100%; height: 0.75rem; display: block;font-size: 0.26rem;
        }
        .verify-num{
          width: 60%;flex-shrink: 1;height: 0.75rem;font-size: 0.26rem;
        }
        .verify-wrap{
          width:75%; height: 1rem;display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #e0e4ec;margin-left: 0.4rem;
        }
        .btn-send-verify{
          height: 0.54rem;background: #31c0c4;border-radius: 0.08rem;text-align: center;line-height: 0.54rem;color: #fff;flex-shrink: 0;padding: 0 0.08rem;
          font-size: 0.22rem;
        }
      }
      .btn-verify{
        outline: none;border: none;border-radius: 0.08rem; width: 100%;height: 0.78rem;
        line-height: 0.78rem;text-align: center;color: #fff;font-size: 0.28rem;background: #31c0c4;margin: 0.8rem auto 0;
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
        form: {
          teleNum: '',
          verifyNum: ''
        },
        time: 0,
        timer: null,
        hasSend: false,
        sending:false
      }
    },
    mounted() {
      document.title = '绑定手机号'
    },
    methods: {
      // 发送验证码
      sendVerfyNum(){
        let vthis = this;

        if (this.timer || this.sending) {
          return;
        }

        if(this.form.teleNum.length == 0){
          return this.weNotify('请输入手机号！');
        }

        if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.teleNum)){
          return this.weNotify('请输入正确的手机号！')
        }

        this.weLoadStart();
        this.sending = true;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/user/sms.action', {
            tel:vthis.form.teleNum
          }).then(res => {
            this.weLoadEnd();
            this.sending = false;
            vthis.weNotify(res.body.msg);

//            if (res.body.status == 501) {
//              vthis.$router.replace('/');
//            }

            if(res.body.status == 510){
              return vthis.weNotify(res.body.msg);
            }
            vthis.countSendTime();
          }, res => {
            zzhJs.console.log(res);
        })
      },
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
      Verify() {
        let vthis = this;

        // 未填写手机号
        if (this.form.teleNum.length == 0) {
          return this.weNotify('请填写正确的手机号！')
        }

        // 填写手机号格式不对
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.teleNum)) {
          return this.weNotify('请填写正确的手机号!')
        }

        // 未填写验证码
        if (this.form.verifyNum.length == 0) {
          return this.weNotify('请输入验证码！');
        }

        // 验证码不对
        if (!/\d{6}$/.test(this.form.verifyNum)) {
          return this.weNotify('验证码错误！');
        }

        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/user/bind_tel.action', {
            tel:vthis.form.teleNum,
            captcha:vthis.form.verifyNum
          }).then(res =>{
              if(res.body.status == 511){
                return vthis.weNotify(res.body.msg);
              }

              vthis.weNotify(res.body.msg);
//              vthis.$router.push({name:'mine'});
              vthis.$router.replace('/')
          },res => {
            zzhJs.console.log(res)
        });
      }
    }
  }
</script>
