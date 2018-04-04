<template>
  <div class="result-page">
    <div class="result-title" v-if="zzhJs.env.channel != 'third_party'">
      <div class="result-title-name">
        <span class="name">{{ user.nickname }}</span>的测评报告
      </div>
      <div class="result-title-time">
        <i class="btn-left" :class="{'btn-active':prevId}" @click="prevOne()"></i>
        <span class="time">{{ current.created_at[0] }}</span>-
        <span class="time">{{ current.created_at[1] }}</span>-
        <span class="time">{{ current.created_at[2] }}</span>
        &nbsp;
        <span class="time">{{ current.created_at[3] }}</span>:
        <span class="time">{{ current.created_at[4] }}</span>:
        <span class="time">{{ current.created_at[5] }}</span>
        <i class="btn-right" :class="{'btn-active':nextId}" @click="nextOne()"></i>
      </div>
    </div>

    <div v-if="noReport">
      <p class="tip">您还没有测评记录!</p>
      <router-link class="btn-back" :to="{name: 'estimate.detail', params: {id: this.$route.params.id}}" replace>去测试</router-link>
    </div>

    <div v-if="!noReport">
      <template v-for="item in modules">
        <component :is="getModuleName(item.type)" :options="item.data"></component>
      </template>
    </div>

    <!--分享按钮-->
    <!--<div class="btn-share" v-if="!noReport" @click="share()"></div>-->

    <!--分享的弹框-->
    <div class="share-wrap" v-if="show" @click="hideShare()">
      <div class="share-line"></div>
      <div class="share-pannel">
        <p class="share-title">点击右上角分享到：</p>
        <ul class="share-icons">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="QR-code"></div>
        <div class="share-text-wrap">
          <p class="share-word">截屏分享到好友</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .result-page{
    background: #eef7f4; overflow: hidden; min-height: 100vh;position: relative;
    .btn-back{
      display: block;width: 2rem;height: 0.7rem;line-height: 0.7rem;background: #33aaaa;text-align: center;
      font-size: 0.30rem;margin: 0.5rem auto;border-radius: 8px;color: #fff;
    }

    .result-title {
      width: 100%; height: 0.65rem; background: #fff; margin-bottom: 0.25rem; line-height: 0.65rem; display: flex; justify-content: space-around; align-items: center; font-size: 0.24rem; color: #33aaaa;

      .result-title-time{
        display: flex; justify-content: center; align-items: center;

        .btn-left{
          display: inline-block; width: 0.3rem; height: 0.3rem; border: 0.01rem solid #ccc; border-radius: 50%; margin-left: 0.3rem; margin-right: 0.3rem; position: relative;

          &:after{
            content: ''; width: 0.12rem; height: 0.12rem; border-top: 0.02rem solid #ccc; border-left: 0.02rem solid #ccc; position: absolute; left: 50%; top: 50%; margin-left: -0.04rem; margin-top: -0.06rem; transform: rotate(-45deg);
          }
        }
        .btn-right{

          @extend .btn-left;

          &:after{
            left: 50%; top: 50%; margin-left: -0.1rem; margin-top: -0.06rem; transform: rotate(135deg);
          }
        }

        .time{
          font-size: 0.24rem; color: #33aaaa;
        }
      }
      .result-title-name{
        font-size: 0.24rem;display: flex;justify-content: flex-start;align-items: center;flex-wrap: nowrap;
        .name{
         height:0.65rem;line-height:0.65rem;display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp:1;max-width: 1.5rem;
        }
        &>span{
          font-size: 0.26rem;margin-right: 0.1rem;
        }
      }
    }

    .result-img{
      width:100%; height:4rem;
    }

    .board{
      font-size: 0.3rem;
    }
    .tip{
      font-size: 0.3rem; text-align: center; padding-top: 35vh; color: #33aaaa;
    }

    .btn-active{
      border-color: #33aaaa !important;

      &:after{
        border-color: #33aaaa !important;
      }
    }

    .btn-share{
      width: 1.06rem;height: 1.06rem;background: url("../assets/images/report/share/icon_share.png") no-repeat;background-position:0 0;position: fixed;right:0.4rem;bottom: 0.4rem;
      background-size: 100%;
    }
    .share-wrap{
     width: 100%;height: 100vh;position: fixed;left: 0;top: 0;background: rgba(0,0,0,.5);z-index: 999;
      .share-line{
        width: 3.6rem;height: 2rem;background: url("../assets/images/report/share/jiantou.png") no-repeat center;background-size: 100%;
        position: absolute;right: 0.63rem;top: 0.3rem;
      }
      .share-pannel{
        width: 5.96rem;height: 7.81rem;background: #fff;border-radius: 8px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);
        padding: 0.3rem 0.62rem;
        .share-title{
          font-size: 0.26rem;color: #333333;line-height: 0.65rem;
        }
        .share-icons{
          width: 100%;display: flex;height: 0.6rem;justify-content: space-around;
          &>li{
            width: 0.61rem;height: 0.61rem;background: url("../assets/images/report/share/icon_share.png") no-repeat;background-position: 0 -1.22rem;background-size: 180%;
          }
          &>li:nth-child(2){
            background-position: 0 -2.05rem;
          }
          &>li:nth-child(3){
            background-position: 0 -2.86rem;
          }
          &>li:nth-child(4){
            background-position: 0 -3.67rem;
          }
          &>li:nth-child(5){
            background-position: 0 -4.49rem;
          }
          &>li:nth-child(6){
            background-position: 0 -5.31rem;
          }
        }

        .QR-code{
          width: 3.28rem;height: 3.28rem;background: #000;margin: 0.6rem auto;
        }
        .share-text-wrap{
          text-align: center;
          .share-word{
            font-size: 0.26rem;color: #333;position: relative;line-height: 0.56rem;text-indent: 0.5rem;
            &:before{
              content: '';
              position: absolute;
              left: 1.4rem;
              top: 50%;
              width: 0.32rem;
              height: 0.26rem;
              transform: translateY(-50%);
              background: url("../assets/images/report/share/icon_share.png") no-repeat;
              background-position: 0 -5.38rem;background-size: 290%;
            }
          }
        }

      }
    }

    .jp95-btns {
      background: white; border-radius: 3px; position: fixed; bottom: 15vh; right: 30vw; line-height: 30px; font-size: 16px;

      a {
        padding: 0 15px; color: #282828; display: block; float: left;
      }
    }
  }
</style>

<script >

  export default {
    data() {
      return {
        user: {
          nickname: 'XXX'
        },
        noReport: false,
        list: [],
        modules: [],
        current:{
          created_at:['0000','00','00','00','00','00']
        },
        prevId: null,
        nextId: null,
        show:false
      }
    },
    computed: {
      prevLogId() {
        if (!this.list.length) {
          return 0;
        }

        let allPrev = this.list.filter(function (item) {
        });
      }
    },
    mounted() {
      document.title = "测评报告";
      this.loadData();
    },
    beforeRouteUpdate(from, to, next) {
      next();
      this.loadData();
    },
    methods: {
      getModuleName(originName) {
        return _.kebabCase(originName)+ '-rp';
      },
      loadData() {
        let vthis = this,
          // 获取当前测评的id标示
          estimateId = this.$route.params.id,
          // 获取当前测评的数据url http://apiv2.zhizi.app/estimate/5/report?child_id=0&log_id=0&WECHAT_CHANNEL=dev
          apiUrl = zzhJs.helpers.routeParser('api.estimate.report', {
            id: estimateId,
            child_id: this.$route.query.child_id || 0,
            log: this.$route.query.log ? this.$route.query.log : 0
          });

        // 添加一个loading框
        this.weLoadStart();

        // 从数据url处，请求数据
        this.$http.get(apiUrl).then(res => {
          this.weLoadEnd();

          let response = res.body;

          // 未找到就退回主页
          if (response.status == 404) {
            return vthis.$router.replace({name: 'estimate.home'});
          }

          // 无报告
          if (response.status == 501) {
            return vthis.noReport = true;
          }

          // 填充this.data里面的modules数组
          let userData = response.data;

          vthis.modules = userData.current.report;

          // 填充 所有的测评记录 数组 this.data.list[]
          vthis.list = userData.list;

          // 填充 当前结果记录
          vthis.current=userData.current;
          // （稍微改变了created_at的显示方式：由yyyy-mm-dd hh-mm-ss字符串 改成一个 数组）

          vthis.current.created_at = vthis.sliceDataAndTime(userData.logData.used_at);

          vthis.prevId = userData.prevId;
          vthis.nextId = userData.nextId;

          // 填充 用户信息
          let userInfo = userData.user;
          // 用户昵称
          if (userInfo.name) {
            userInfo.nickname = userInfo.name;
          } else if (userInfo.wxUser && userInfo.wxUser.nickname) {
            userInfo.nickname = userInfo.wxUser.nickname;
          } else {
            userInfo.nickname = String.prototype.replace.call(userInfo.tel, /(\d{3})(\d{4})(\d{4})/, '$1****$3');
          }

          vthis.user = userInfo;

        });
      },
      nextOne() {
        if(!this.nextId) {return;}

        this.$router.replace({name:'estimate.report',query:{log: this.nextId},params:{id:this.$route.params.id}});
      },
      prevOne() {
        if(!this.prevId) {return;}

        this.$router.replace({name:'estimate.report',query:{log: this.prevId},params:{id:this.$route.params.id}});
      },
      // 一个分离 日期 时间 的方法。返回一个数组，包含年月日时分秒
      sliceDataAndTime(dataAndTime) {
        let date = dataAndTime.split('-');
        date[2]=date[2].slice(0,2);
        let time = dataAndTime.split(':');
        time[0]=time[0].slice(-2);
        let result = date.concat(time);
        return result;
      },
      // 分享弹框
      share(){
        this.show = true;
      },
      hideShare() {
        this.show = false;
      }
    },
    components: {}
  }
</script>