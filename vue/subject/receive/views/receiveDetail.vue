<template>
  <div class="give-wrap-view">
    <div class="banner"><img :src="give_info.product.img_min"/></div>
    <div class="ungive">
      <div class="your-friend">
        <div class="head-img">
          <img :src="give_info.user.avatar"/>
        </div>
        <p class="send-info">{{give_info.user.name}}赠送给您</p>
      </div>
      <div class="con">
        <p class="title">{{give_info.product.name}}</p>
        <p class="intro">{{give_info.product.intro}}</p>
        <p class="price">{{give_info.product.price | currency}}</p>
        <div v-if="!otherReceived">
          <div class="btn-send" v-if="!hasRecive" :class="{'disabled':has_token}" @click="receive(give_info.give_id)">领取赠送</div>
          <div class="btn-send" v-else   @click="goDetail(give_info.product.id,give_info.product.type)">您已开通，点击进入</div>
        </div>
      </div>
      <!--回到首页的按钮-->
      <subject-home></subject-home>
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
      width: 100%;height: 1rem;display: flex;justify-content: flex-start;align-items: center;padding: 0 0.3rem;
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
        text-align: center;
      }
      .title{
        font-size: 0.34rem;line-height: 0.8rem;
      }
      .intro{
        font-size: 0.24rem;color: #7e7e7e;line-height: 0.4rem;padding: 0 0.3rem;
        display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp:2;
      }
      .price{
        font-size: 0.24rem;color: red;line-height: 0.8rem;
      }
      .btn-send{
        width: 4.55rem;height: 0.9rem;background: #3bc1c4;border-radius: 1rem;margin: 0.5rem auto 0;
        font-size: 0.24rem;color: #fff;text-align: center;line-height: 0.9rem;
      }
      .disabled{
        background:#c7c7c7;
      }
    }

    .btn-back-to-firstpage {
      width: 1.97rem;height: 0.67rem;position: fixed;right: 0;bottom: 0.75rem;text-align: center;line-height: 0.67rem;color: #fff;font-size: 0.28rem;
      border-top-left-radius: 0.8rem; border-bottom-left-radius: 0.8rem; opacity: 0.8; background-color: rgba(108, 202, 202, .6);
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
          user:{
            id:'',
            name:'',
            avatar:''
          },
          state:'',
        },
        give_id:'',
        hasRecive:false,
        has_token:false,
        otherReceived:false,
      }
    },
    mounted() {
      document.title = "领取赠送";
      this.getData();
    },
    beforeRouteEnter: function (to, from, next) {
      zzhJs.helpers.transformCodeToToken(next)
    },
    methods:{
      // 获取数据
      getData() {
        let vthis = this,
          give_key = window.location.query['give_key'];
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/user_give_index.action',
          {
            give_key:give_key
          }).then(res=>{

          vthis.otherReceived = false;
          let response = JSON.parse(res.bodyText);
          vthis.give_info = response.data;
          vthis.give_info.state = response.data.state;
          vthis.give_info.give_id = response.data.give_id;

          vthis.give_info.product.id = response.data.product.id;
          vthis.give_info.product.name  = response.data.product.name;
          vthis.give_info.product.img_max = response.data.product.img_min;
          vthis.give_info.product.intro = response.data.product.intro;
          vthis.give_info.product.type = response.data.product.type;
          vthis.give_info.product.price = (response.data.product.price).toFixed(2);

          vthis.give_info.user.name = response.data.user.name;
          vthis.give_info.user.avatar = response.data.user.avatar;
          vthis.give_info.user.id = response.data.user.id;

          if(res.body.status == 501){
            vthis.otherReceived = true
            vthis.weNotify(res.body.msg);
          }else if(res.body.status == 502) {
            vthis.otherReceived = false;
            vthis.hasRecive = true;
          }else {
            vthis.otherReceived = false
            vthis.hasRecive = false;
          }
          vthis.weLoadEnd();
        },res=>{
          zzhJs.console.log(res);
        })
      },
//      领取赠送
      receive(id){
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/user_get.action',
          {
            give_id:id
          }).then(res=>{
          if(res.status == 200){
            let response = JSON.parse(res.bodyText);
            if(response.status == 200){
              vthis.weNotify(response.msg);
              vthis.hasRecive = true;
            }else {
              vthis.weNotify(response.msg);
            }

          }

        },res=>{
          zzhJs.console.log(res);
        })
      },

//        点击进入详情

      goDetail(id,type){
        if(type == 1){ // 音频
          window.location.href = zzhJs.config.urlAudioList+'?#/'+id;
        }else if(type == 2){ // 视频
          window.location.href = zzhJs.config.urlVideoList+'?#/'+id;
        }


      },
//      回到首页
      goBackFirst() {
        window.location.replace(zzhJs.config.urlIndexPage)
      },

//        格式化日期
      formatDate(time) {
        let date = new Date(time);
        return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');

      },

    }
  }
</script>
