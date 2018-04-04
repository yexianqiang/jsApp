<template>
  <div class="mine-list-view">
    <ul class="mine-list-nav-wrap">
      <template v-for="(item,index) in nav">
        <li><a :class="{'active':list_type == index}" @click="changeList(index)">{{item}}</a></li>
      </template>
    </ul>
    <ul class="mine-buy-list-wrap" v-if="!noInfo">
      <template v-for="item in order_list">
        <li @click="showDetail(item)">
          <div class="class-img"><img :src="item.img_min"/></div>
          <div class="class-info">
            <div>
              <p class="class-name">曹廷珲：杰出教子密码</p>
              <p class="class-intro">成为“知子”的父母，培育杰出的</p>
              <p class="class-total">(共51节)</p>
            </div>
            <p style="font-size: 0.22rem;color:#999999">
              <span>已更新{{item.update_section}}节</span><span class="class-split">|</span><span>{{item.sell_num}}人订阅</span>
              <span class="class-price">
                {{price | currency }}
              </span>
            </p>
          </div>
        </li>
        <div class="class-border"></div>
      </template>
    </ul>

    <!--底部导航-->
    <footer-nav v-if="showNav"></footer-nav>

    <!--无内容的时候展示的-->
    <p class="show-no-info" v-if="noInfo">暂无内容</p>
  </div>
</template>

<style lang="scss">
  .mine-list-view{
    width: 100%;padding-bottom: 0.98rem;
    img{
      width: 100%;
    }
    .mine-list-nav-wrap{
      height: 0.8rem; width: 100%;display: flex;justify-content: space-around;align-items: center;background: white;
      &>li{
        width: 50%;text-align: center; font-size: 0.3rem;line-height: 0.8rem;
        a{
          position: relative;display: inline-block;padding-left: 3px;padding-right: 3px;
          &.active{
            color:#39c1c1;
          }
          &.active:after{
            content: ''; position: absolute;left: 0;bottom: 0;width: 100%;height: 2px;background:#2ebebf;
          }
        }

      }
    }
    .mine-buy-list-wrap{
      margin-top: -3px;
      width: 100%;background: #fff;padding: 0 .2rem;
      .class-border{
        height: 1px;background:#39c1c1;opacity: .1;
      }
      &>li{

        width: 100%; height: 2.4rem; display: flex;justify-content: flex-start;align-items: center;padding: 0.5rem 0.2rem;margin-top:10px;
        .class-img{
          width: 2.36rem;height: 1.75rem;margin-right: 0.3rem;flex-shrink: 0;border-radius: 0.08rem;overflow: hidden;
          background: url("../assets/images/placeholder.png") no-repeat center;background-size: 100%;
        }
        .class-info{
          height: 1.75rem;display: flex;justify-content: space-between;flex-flow: column;
          .class-name{
            font-size: 0.3rem;color: #2a2a2a;line-height: 0.4rem;display: -webkit-box;overflow: hidden;text-overflow:ellipsis;-webkit-box-orient: vertical;-webkit-line-clamp:1;
          }
          .class-intro{
            font-size: 0.24rem;color: #999999;display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;margin-top: .2rem;
          }
          .class-total{
            color: #999999;font-size: 0.26rem;
          }
          .class-split{
            margin: 0 3px;
          }
          .class-price{
            float: right;color:#f82840;font-size:.26rem;
          }
        }
      }
    }
    .show-no-info{
      font-size: 0.4rem;color: #cccccc;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);
    }

  }
</style>

<script>

  export default {
    data() {
      return {
        nav:['音频','视频'],
        order_list:[],
//        is_buy:1,// 表示都是已购买的
        page_no:'',
        total:'',
        list_type:0,
        noInfo:false,
        showNav:!zzhJs.env.isInApp(),
        price: 129,
      }
    },
    mounted() {
      // document.title = zzhJs.env.isInApp()? '我的已购': '学习';
      document.title = 'xxx的课程';

      if (this.$route.params && this.$route.params['channel'] == 'audio') {
        this.changeList(0);
      } else {
        this.changeList(1);
      }
    },
    methods: {
//      获取列表数据
      getList(url,params){
        let vthis = this;
        this.weLoadStart();
        this.$http.post(url,params).then(res => {
          if(res.status == 200){
            let response = JSON.parse(res.bodyText).data;

            vthis.noInfo = response.total <= 0 ? true:false;
            vthis.order_list = response.order_list;

            vthis.weLoadEnd();

          }
        },res=>{
          zzhJs.console.log(res)
        })

      },
//      切换导航
      changeList(index){
        this.list_type = index;
        if (index == 0) {
          this.getList(zzhJs.config.apiDomain + '/zzhedu/wx/order/user.action',
            {
              page_no:1,
              page_size:1000,
              type:1
            })
        } else if (index == 1) {
          this.getList(zzhJs.config.apiDomain + '/zzhedu/wx/order/user.action',
            {
              page_no:1,
              page_size:1000,
              type:2
            })
        }
      },
//      跳转详情页
      showDetail(item) {
        if (zzhJs.env.isInApp()) {
          item.type == 1 ? zzhJs.env.callAudioDetail(item.id): zzhJs.env.callVideoDetail(item.id);

//          item.type == 1 ? zzhJs.messageBridge.sendToApp({type:'showAudioDetail',data:{id:item.id}}) : zzhJs.messageBridge.sendToApp({type:'showVideoDetail',data:{id:item.id}});


        } else {
          window.location.href =
            (item.type == 1 ? zzhJs.config.urlAudioList: zzhJs.config.urlVideoList)
            +'?#/' + item.id;
        }
      }
    },

  }
</script>