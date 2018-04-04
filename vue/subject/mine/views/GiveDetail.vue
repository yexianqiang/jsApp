<template>
  <div class="give-wrap-view">
    <div class="banner"><img :src="give_info.product.img_min"/></div>

    <div class="ungive" v-if="give_info.state == 0">
      <div class="con">
        <p class="title">{{give_info.product.name}}</p>
        <p class="intro">{{give_info.product.intro}}</p>
        <p class="price">{{give_info.product.price | currency}}</p>
        <div class="btn-send" @click="giveFriend(give_id)">赠送好友</div>
      </div>
    </div>


    <div class="has-give" v-else>
      <div class="class-info">
        <p class="class-name">{{give_info.product.name}}</p>
        <p class="class-price">{{give_info.product.price | currency}}</p>
      </div>
      <div class="your-friend">
        <div class="head-wrap">
          <div class="head-img">
            <img :src="give_info.receive_user.avatar"/>
          </div>
          <p class="send-info" v-if="give_info.state == 2">{{give_info.receive_user.name}}&nbsp;未领取您的赠送</p>
          <p class="send-info" v-if="give_info.state == 3">{{give_info.receive_user.name}}&nbsp;领取了您的赠送</p>
        </div>
        <p class="recive-time">{{give_info.update_time | formatDate('YYYY-MM-DD')}}</p>
      </div>
    </div>


    <!--分享的通知弹层-->
    <div class="pop-wrap" v-if="show_pop" @click="show_pop = false">
      <div class="tip-wrap"></div>
    </div>
  </div>
</template>
<style lang="scss">
  .give-wrap-view{
    width:100%;
    img{
      width: 100%;
    }
    .banner{
      width: 100%;height: 5.6rem;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
    }
    .ungive{
      width: 100%;
    }
    .your-friend{
      width: 100%;height: 1.4rem;display: flex;justify-content: flex-start;align-items: center;padding: 0 0.3rem;
      .head-img{
        width: 0.7rem;height: 0.7rem;background: #3bc1c4;border-radius: 50%;overflow: hidden;
        &>img{
          display: block;
        }
      }
      .send-info{
        font-size: 0.28rem;margin-left: 0.35rem;
      }
    }
    .con{
      width: 100%;padding: 0 0.5rem;
      &>p{
        text-align: center;line-height: 1rem;
      }
      .title{
        font-size: 0.34rem;
      }
      .intro{
        font-size: 0.24rem;color: #7e7e7e;line-height: 0.5rem;
        display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp:2;
      }
      .price{
        font-size: 0.24rem;color: red;
      }
      .btn-send{
        width: 4.55rem;height: 0.9rem;background: #3bc1c4;border-radius: 1rem;margin: 0.5rem auto 0;
        font-size: 0.24rem;color: #fff;text-align: center;line-height: 0.9rem;
      }
    }
    .has-give{
      .class-info{
        width: 100%;height: 1.45rem;background: #fff;margin-bottom: 0.25rem;display: flex;justify-content: space-between;align-items: center;
        padding: 0 0.35rem;
        .class-name{
          font-size: 0.3rem;
        }
        .class-price{
          font-size: 0.24rem;color: red;
        }
      }
      .your-friend{
        display: flex;justify-content: space-between;background: #fff;
      }
      .head-wrap{
        display: flex;justify-content: space-between;align-items: center;
      }
      .recive-time{
        font-size: 0.24rem;color: #acacac;
      }
    }

    .pop-wrap{
      width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0,0,0,.7);
      .tip-wrap{
        width: 100%;height: 2.88rem;background: url("../assets/image/icon-tip.png") no-repeat center;background-size: 100%;
        position: absolute;left: 0;top: 0.15rem;
      }
    }

  }
</style>
<script>
    export default{
      data() {
        return {
          give_info:{
            product:{
              id:'',
              name:'',
              intro:'',
              img_min:'',
              price:'',
              type:''
            },
            receive_user:{
              id:'',
              name:'',
              avatar:''
            },
            update_time:'',
            state:'',
          },
          give_id:'',
          hasRecive:false,
          config:{},
          signConfig:{
            debug:false,
            appId:'',
            timestamp:'',
            nonceStr:'',
            signature:'',
            url: '',
            jsApiList:[
              'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'hideMenuItems' ,'showMenuItems' ,'hideAllNonBaseMenuItem'
            ]
          },
          show_pop:false,
        }
      },
      mounted() {
        document.title = '我的赠送';

        this.getData();
        this.getJssign();

        let vthis = this;

        window.jsCallShareMediaSuccess = function (message) {
          vthis.weNotify(message);
          vthis.shareSuccessCallback();
//          vthis.$router.replace({name:'subject.mine.give'})
          vthis.$router.go(-1);
        }

      },

      destroyed(){
        wx.onMenuShareAppMessage({
          title:'',
          desc:'',
          link:'',
          imgUrl:'',
          type:'',
          dataUrl:'',
          success:function () {},
          cancel:function () {}
        })
      },
      methods:{
//        获取数据
        getData(){
          let vthis = this,
          give_id = this.$router.currentRoute.params.id,
          state = this.$router.currentRoute.params.state;

          vthis.give_id = give_id;
          this.weLoadStart();
          this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/order/give_details.action',
            {
              give_id:give_id,
              state:state
            }).then(res=> {
              if(res.status == 200){
                let response = JSON.parse(res.bodyText).data;
                vthis.give_info = response;
                vthis.give_info.state = response.state;

                vthis.give_info.product.id = response.product.id;
                vthis.give_info.product.name  = response.product.name;
                vthis.give_info.product.img_min = response.product.img_min;
                vthis.give_info.product.intro = response.product.intro;
                vthis.give_info.product.price = response.product.price.toFixed(2);
                vthis.give_info.product.type = response.product.type;
//                vthis.give_info.update_time = vthis.formatDate(response.update_time);
                vthis.give_info.update_time = response.update_time;

                vthis.config = response.give_info;

                vthis.give_info.receive_user.name = response.receive_user.name;
                vthis.give_info.receive_user.avatar = response.receive_user.avatar;
                vthis.give_info.receive_user.id = response.receive_user.id;


                vthis.weLoadEnd();
              }
          }, res=> {
              zzhJs.console.log(res);
          })
        },
//        格式化日期
//        formatDate(time) {
//          let date = new Date(time);
//          return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
//
//        },

        giveFriend() {
          let vthis = this;
          // 判断页面是否嵌在app中，若是，则调用原生的分享，若不是，则调用H5分享
          if (zzhJs.env.isInApp()) {
            zzhJs.env.callShareMedia({
              url:vthis.config['link'],
              img:vthis.config['img_url'],
              title:vthis.config['title'],
              desc:vthis.config['desc']
            });

//            // js与app新的交互
//            zzhJs.messageBridge.listenOnce('tellUserShareSuccess',function (content) {
//              vthis.weNotify(content.message);
//              vthis.shareSuccessCallback();
//              vthis.$router.go(-1);
//            })
//            zzhJs.messageBridge.sendToApp({type:'provideShareInfo',data:{
//              url:vthis.config['link'],
//              img:vthis.config['img_url'],
//              title:vthis.config['title'],
//              desc:vthis.config['desc']
//            }})

          } else {
            this.show_pop = true;
            this.setShare();
          }
        },

//      获取签名
        getJssign(){
          let vthis = this;
          let apiUrl = zzhJs.config.apiDomain+'/zzhedu/wx/web/jssign.action',
            currentUrl = window.location.href;

          this.$http.post(apiUrl,{
            url:window.location.href.split('#')[0]
          }).then(res => {
            let response = res.data;

            wx.error(function(res) {
              vthis.weNotify("JSSDK配置错误:"+ res.errMsg);
            });

            wx.ready(function () {

              let shareData = {
                title:'知子课堂',
                desc:'',
                link: zzhJs.config.urlIndexPage,
                imgUrl:'',
                success:function (res) { },
                fail:function (res) {
                },
                cancel:function () { }
              }

              wx.onMenuShareTimeline(shareData);
              wx.onMenuShareAppMessage(shareData);
            });

            let signConfig = {
              debug:false,
              appId:response.data['appid'],
              timestamp:response.data['timestamp'],
              nonceStr:response.data['nonce_str'],
              signature:response.data['signature'],
              url: currentUrl,
              jsApiList:[
                'onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay', 'hideMenuItems' ,'showMenuItems' ,'hideAllNonBaseMenuItem'
              ]
            }
            vthis.signConfig = _.clone(signConfig);
            wx.config(signConfig);
          })
        },

        setShare() {
          let vthis = this,
            shareConfig = _.clone(this.config);
            wx.ready(function () {
              wx.hideAllNonBaseMenuItem();
              wx.showMenuItems({
                menuList: [
                  'menuItem:share:appMessage',
                  'menuItem:share:timeline',
                ]
              });

              let shareData = {
                title: shareConfig['title'],
                desc: shareConfig['desc'],
                link: shareConfig['link'],
                imgUrl: shareConfig['img_url'],
                type: shareConfig['type'],
                dataUrl: shareConfig['data_url'],
                success: function (res) {
                  vthis.shareSuccessCallback();
                },
                fail:function (res) {
                },
                cancel:function () { }
              }

              wx.onMenuShareTimeline(shareData);
              wx.onMenuShareAppMessage(shareData);
            });
            wx.config(vthis.signConfig);

        },

//      分享成功之后的回调
        shareSuccessCallback() {
          let vthis = this;
          vthis.$http.post(zzhJs.config.apiDomain+'/zzhedu/wx/product/user_give.action',
            {
              give_id:vthis.give_id
            }).then(res=>{
            vthis.show_pop = false;
            vthis.weNotify(res.body.msg);
//            vthis.$router.replace({name:'subject.mine.give'});
            vthis.$router.go(-1);

            wx.ready(function () {
              let reShareData = {
                title:'知子课堂',
                desc:'',
                link: zzhJs.config.urlIndexPage,
                imgUrl:'',
                success:function (res) { },
                fail:function (res) {
                },
                cancel:function () { }
              }
            })
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareAppMessage(shareData);
            wx.config(vthis.signConfig);


          })
        }
      }
    }
</script>
