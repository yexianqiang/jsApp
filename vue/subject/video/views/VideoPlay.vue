<template>
  <div class="video-main-wrapper">
    <!--banner部分-->
    <div class="banner">
      <video id="my-video" class="video-js vjs-big-play-centered vjs-fluid" x-webkit-airplay="allow" playsinline webkit-playsinline controls preload="auto" :poster="info.img_max">
        <source :src="current_src" type="video/mp4">
      </video>
    </div>

    <!--视频介绍-->
    <div class="video-item">
      <div class="item-left">
        <div class="title-update-time">
          <p>{{info.name}}</p>
          <p class="video-intro">{{info.intro}}</p>
        </div>
        <p class="update-intro">
          <span style="margin-right: 0.28rem;"><span class="iconfont icon-update-num" style="margin-right: 0.1rem;"></span>更新{{info.update_num}}</span>
          <span style="margin-left: 0.28rem;margin-right: 0.28rem;"><span class="iconfont icon-subscribe-num" style="margin-right: 0.1rem;"></span>订阅{{info.sell_num}}</span>
          <span style="margin-left: 0.28rem;"><span class="iconfont icon-play-num" style="margin-right: 0.1rem;"></span>播放{{info.play_num}}</span>
        </p>
      </div>
      <div class="btn-order" v-if="info.price_curr != 0 && showOrderBtn " @click="showPay(info.id,1)">订阅专栏</div>
    </div>

    <!--视频播放列表-->
    <ul class="video-play-list">
      <template v-for="(item,index) in sections">
        <li @click="play(item,is_buy,index)">
          <div>
            <p class="title" :class="{'active':index == video_index}">{{item.name}}</p>
            <div class="bottom-wrap">
              <p class="time">{{item.update_time | formatDate('YYYY-MM-DD')}}</p>
              <span class="icon-small-play" v-if="(info.price_curr != 0 && is_buy == 0 && item.is_play == 1 )">试看</span>
            </div>
          </div>
          <span class="btn-video-play iconfont" :class="{'icon-stop2':true,'icon-play2':false}"></span>

        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
  .video-main-wrapper{
    background-color: #edf1f2;
    /*修改已有的按钮的样式*/
    .video-js .vjs-big-play-button{
      display: none;
      font-size: 0.6rem;
      line-height: 0.75rem;
      height: 0.8rem;
      width: 0.8rem;
      border-radius: 50%;
      /*display: block;*/
      position: absolute;
      left: 50%;
      top: 50%;
      /*transform: translate(-50%,-50%);*/
      padding: 0;
      cursor: pointer;
      opacity: 1;
      border: .06666em solid #fff;
      background-color: #2B333F;
      background-color: rgba(43,51,63,.7);
      -webkit-transition: all .4s;
      -moz-transition: all .4s;
      -o-transition: all .4s;
      transition: all .4s;
    }
    .vjs-big-play-centered .vjs-big-play-button{
      transform: translate(-50%,-50%);
      margin-left: 0;
      margin-top: 0;
    }
    .banner{
      width: 100%;height: 4.2rem;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
      #my-video{
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0,0,0);
      }
    }
    img{
      width: 100%;height: 100%;
    }
    .video-item{
      width: 100%;height: 2.6rem;background: #fff;border-bottom: 0.02rem solid #edf1f2;padding: 0.4rem 0.2rem;
      display: flex;justify-content: space-between;align-items: center;
      .item-left{
        height: 100%;  display: flex;justify-content: space-between;flex-direction: column;font-size: 0.22rem;color: #989898;
        .update-intro{
          font-size: 0.26rem;color: #333;
        }
        .icon-subscribe-num{
          font-weight: bold;
        }
      }
      .title-update-time{
        font-size: 0.26rem;color: #666;line-height: 0.44rem;
        &>p:nth-child(1){
          font-size: 0.32rem;color: #333;
        }
        .video-intro{
          font-size: 0.26rem;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
          -webkit-line-clamp: 1; -webkit-box-orient: vertical;color: #666;
        }
      }
      .btn-order{
        width: 1.63rem;height: 0.6rem;border:0.02rem solid #4ac9cb;color: #4ac9cb;font-size: 0.26rem;
        line-height: 0.6rem;text-align: center;border-radius: 0.08rem;flex-shrink: 0;
      }
    }

    .video-play-list{
      width: 100%;background: #fff;
      &>li{
        width: 100%;height: 1.41rem;border-bottom: 1px solid #f4f4f4;padding: 0.3rem 0.33rem;
        display: flex;justify-content: space-between; align-items: center;line-height: 0.45rem;
        .title{
          font-size: 0.28rem;color: #3f3f3f;
          &.active{
            color: #3dc0c8;
          }
        }
        .btn-video-play{
          display: block;font-size: 0.4rem;color: #3dc0c8;
        }
        .time{
          font-size: 0.22rem;color: #989898;line-height: 0.4rem;
        }
        .bottom-wrap{
          display: flex;justify-content: flex-start;align-items: center;
        }
        .icon-small-play{
          display:inline-block;width: 0.85rem;line-height: 0.34rem;border: 0.01rem solid #3abfc3;border-radius: 0.08rem;text-align: center;margin-left: 0.3rem;font-size: 0.22rem;color: #909090;
        }

      }
    }

    .video-example-wrap{
      width: 100%;height: 1.9rem;background: #fff;padding:0.4rem 0.4rem 0 0.25rem;font-size: 0.24rem;color: #3e3e3e;
      .example-info{
        width: 100%; display: flex;justify-content: space-between;align-items: center;
      }
      .example-title{
        font-size: 0.26rem;color: #3f3f3f;line-height: 0.5rem;
      }
      .icon-play{
        display: block;font-size: 0.4rem;color: #3dc0c8;
      }
      .example-info-left{
        font-size: 0.24rem;line-height: 0.6rem;color: #989898;
      }

    }

  }
</style>

<script>
  export default{
    data(){
      return {
        play_list: [],
        current_src:'',
        to_play: true,
        is_terminate: false,
        default_video_time:'00:00',
        default_section_index:0,

        now_playing: 0,

        info:{
          id:'',
          name:'',
          intro:'',
          img_max:'',
          update_num:'',
          play_num:'',
          sell_num:'',
          count_section:'',
          price_curr:''
        },
        is_buy:'',
        sections:[
          {
            id:'',
            name:'',
            update_time:'',
            url:''
          }
        ],
        showOrderBtn:false,
        playState:2,
        video_index:'',
      }
    },
    mounted() {

      this.getData();
      // 进到播放页，默认的是第几条
      this.default_section_index = this.$route.params.sectionIndex ? this.$route.params.sectionIndex : 0;

    },
    updated() {
      this.$nextTick(function () {
        this.initPlay();
      })
    },
    destroyed() {
      this.myPlayer.release();
    },
    methods: {
      getData() {
        let vthis = this,
          product_id = this.$route.params.id;

        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/details.action',
          {
            product_id:product_id
          }).then(res => {
          if(res.status = 200){
            let response = JSON.parse(res.bodyText).data;
            vthis.is_buy = response.is_buy;
            vthis.showOrderBtn = response.is_buy == 0?true:false;

            for(let i = 0; i < response.sections.length; i++){
              vthis.play_list.push(response.sections[i].url);
//              response.sections[i].update_time = vthis.formatDate(response.sections[i].update_time);
              response.sections[i].update_time = response.sections[i].update_time;
            }
            vthis.current_src = response.sections[0].url
            vthis.sections = response.sections;

            vthis.info.id = response.id;
            vthis.info.name = response.name;
            vthis.info.intro = response.intro;
            vthis.info.img_max = response.img_max;
            vthis.info.update_num = response.update_section;
            vthis.info.play_num = response.play_num;
            vthis.info.sell_num = response.sell_num;
            vthis.info.count_section = response.count_section;
            vthis.info.price_curr = response.price_curr;

            document.title = response.name;

          }
          vthis.weLoadEnd();
        },res => {
          zzhJs.console.log(res);
        })
      },

      initPlay() {
        let vthis = this;
        this.myPlayer = neplayer("my-video", {
          'preload':'auto',
          controlBar:{
            'fullscreenToggle':true
          }
        },function () {
        });
        this.myPlayer.onPlayState(1,function(){
          if (vthis.myPlayer.getCurrentPosition() == 0) {
            vthis.recordPlayNum(vthis.info.id)
          }
        });
        this.myPlayer.onPlayState(2,function(){
        });
        this.myPlayer.onPlayState(3,function(){
        });

//        this.play(this.sections[this.default_section_index], this.is_buy, this.default_section_index);

      },
      play(item, flag, index) {
        console.log(this.myPlayer)
        this.myPlayer.pause();
        this.video_index = index;
        console.log('index' + index);
        let vthis = this;
        if (this.info.price_curr == 0) { // 当前价格为0的话，视为免费,可以播放
          this.current_src = item.url;
          this.myPlayer.setDataSource(item.url);
          this.myPlayer.play();
//          this.video_index = index;
          return;
        }

        if (this.is_buy == 0 && item.is_play == 0) {
          return this.weNotify('您暂时还没有权限播放，请先订阅！');
        }


        this.current_src = item.url;
        this.myPlayer.setDataSource(item.url);
        this.myPlayer.play();
//        this.video_index = index;
      },
      // 日期格式化
//      formatDate(time) {
//        let date = new Date(time);
//        return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
//
//      },
      //  记录用户的播放记录
      recordPlayNum(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/paly_history.action',
          {
            product_id:id
          }).then(res => {
        },res => {
          zzhJs.console.log(res);
        })
      },
      // 调到支付页
      showPay(id, is_give) {
        window.location.href = `${zzhJs.config.urlPayment}?#/?id=${id}&is_give=${is_give}&channel=video`;
      }
    },
    watch: {}
  }


</script>