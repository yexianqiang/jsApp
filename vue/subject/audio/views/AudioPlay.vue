<template>
  <div class="audio-main-wrapper">
    <!--banner部分-->
    <div class="banner">
      <img :src="info.img_max"/>
    </div>
    <!--播放器-->
    <div class="part-2">
      <audio :src="current_src" @timeupdate="audioTimeUpdate" @canplay="canPlay" @play="showEvent" @playing="showEvent" @ended="playEnd()" preload="auto" autoplay controls style="display: none;">
      </audio>
      <div class="audio-bar-box">
        <span class="current-time">00:00</span>
        <div class="process-bar" @touchstart="processBarDragEvent($event)" @touchmove="m($event)" @touchend="continueToPlay($event)">
          <span class="process-dot"></span>
          <div class="process-bg"></div>
        </div>
        <span class="total-played-time">{{ default_audio_time }}</span>
      </div>
      <div class="controller-box">
        <div class="controller-area">
          <div class="prev iconfont icon-prev" :class="{'terminate-now': now_playing == 0}" @click="playPrevOne()"></div>
          <div class="play iconfont " :class="{'icon-stop':!playing, 'icon-play':playing}" @click="playButtonSwitch()">
            <div class="icon-loading" v-if="is_loading"></div>
          </div>
          <div class="next iconfont icon-next" :class="{'terminate-now': now_playing == this.sections.length - 1}" @click="playNextOne()"></div>
        </div>
        <div class="loop"></div>
      </div>
    </div>

    <!--音频介绍-->
    <div class="audio-item">
      <div class="item-left">
        <div class="title-update-time">
          <p>{{info.name}}</p>
        </div>
        <p class="sections-info">
          <span style="margin-right: 0.28rem;"><span class="iconfont icon-update-num" style="margin-right: 0.1rem;"></span>更新{{info.update_num}}</span>
          <span style="margin-right: 0.28rem;margin-left: 0.28rem;"><span class="iconfont icon-subscribe-num" style="margin-right: 0.1rem;"></span>订阅{{info.sell_num}}</span>
          <span style="margin-left: 0.28rem;"><span class="iconfont icon-play-num" style="margin-right: 0.1rem;"></span>播放{{info.play_num}}</span>
        </p>
      </div>
      <div class="btn-order" v-if="info.price_curr != 0 && showOrderBtn" @click="showPay(info.id,1)">订阅专栏</div>
    </div>

    <ul class="audio-play-list">
      <template v-for="(item, index) in sections">
        <li @click="playAudio(item, index)">
          <div>
            <p class="title" :class="{'active':playingId == item.id || index == now_playing}">{{item.name}}</p>
            <div class="bottom-wrap">
              <p class="time">{{item.update_time | formatDate('YYYY-MM-DD')}}</p>
              <span class="icon-small-play" v-if="info.price_curr != 0 && is_buy == 0 && item.is_play == 1">试听</span>
            </div>

          </div>
          <span class="btn-audio-play iconfont" :class="{'icon-stop2':playingId != item.id || !playing ,'icon-play2':playingId == item.id && playing}"></span>
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
  @import "../../../assets/iconfont/iconfont.css";
  *{ margin:0; padding:0; font-size: 0.14rem; background-repeat: no-repeat; }

  .audio-main-wrapper{
    background-color: #edf1f2;

    /*播放器css样式 start*/
    .part-1{
      background-size: 7.5rem 4rem; width:7.5rem; height:4rem;
    }
    .part-2{
      margin:0 0 0.2rem; height:2rem; background-color: white;
    }
    .audio-bar-box{
      position: relative; height:0.68rem; padding:0 0.2rem; display:flex; justify-content: space-between; align-items: center;
    }
    .current-time{
      margin-right:0.2rem; font-size: 0.22rem;
    }
    .total-played-time{
      margin-left:0.2rem; font-size: 0.22rem;
    }
    .process-bar{
      position: relative; flex-grow: 1; display:flex; align-items: center; background-color: lightgray;
    }
    .process-bar .process-bg{
      width:0%; height:0.1rem; background-color: #33c2c6;
    }
    .process-bar .process-dot{
      position: absolute; margin-left: -0.1rem; width:0.2rem; height:0.2rem; background-color: #37c4d5; border-radius: 0.1rem; top: 50%;
      transform: translateY(-50%);
    }
    .controller-box{
      height:0.96rem; display: flex; justify-content: center; align-items: center; position: relative;
    }
    .controller-area{
      width:3rem; height:1rem; display:flex; align-items: center; justify-content: space-between;
    }

    .prev,.next{
      font-size: 0.45rem; color: #36c0cb;

      &.terminate-now{
        color: #ccc;
      }
    }

    .play{
      border-radius: 50%; width:0.86rem; height:0.86rem; display:flex; justify-content: center; align-items: center; font-size: 1rem; color: #36c0cb;  position: relative;
      .icon-loading{
        width:60%;height:60%;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);background-image: url("../assets/icon_loading.gif");background-size: 80%;background-repeat: no-repeat;background-position: center;background-color: #3abfc3;
      }
    }
    .icon-bofangqizanting{
      margin-top: -0.1rem;
    }
    .loop{
      width:0.54rem; height:0.4rem; position: absolute; right:0.2rem;
    }
    /*播放器css样式 end*/
    .banner{
      width: 100%;height: 5.6rem;overflow:hidden;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
      img{
        width: 100%;
      }
    }

    .audio-item{
      width: 100%;height: 1.5rem;background: #fff;border-bottom: 0.02rem solid #edf1f2;padding: 0.25rem 0.22rem;
      display: flex;justify-content: space-between;align-items: center;

      .audio-pic{
        width: 1.25rem;height: 0.93rem;background: red;border-radius: 0.08rem;overflow: hidden;margin-right: 0.14rem;
      }
      .item-left{
        height: 100%;  display: flex;justify-content: space-between;flex-direction: column;font-size: 0.22rem;color: #989898;
      }
      .title-update-time{
        font-size: 0.22rem;display: flex;justify-content: space-between;flex-direction: column;color: #a7abab;
        &>p:nth-child(1){
          font-size: 0.32rem;color: #333;
        }
      }
      .sections-info{
        &>span{color: #333;font-size: 0.26rem;}
        .icon-subscribe-num{font-weight: bold;}
        .icon-update-num,.icon-play-num,.icon-subscribe-num{
          font-size: 0.3rem;margin-right: 0.1rem;
        }
      }
      .btn-order{
        width: 1.63rem;height: 0.6rem;border:0.02rem solid #4ac9cb;color: #4ac9cb;font-size: 0.26rem;line-height: 0.6rem;text-align: center;border-radius: 0.08rem;
      }
    }


    .audio-play-list{
      width: 100%;background: #fff;
      &>li{
        width: 100%;height: 1.41rem;border-bottom: 1px solid #f4f4f4;padding: 0 0.4rem;display: flex;justify-content: space-between;
        align-items: center;line-height: 0.45rem;
        .title{
          font-size: 0.28rem;color: #363636;
          &.active{
            color: #3dc0c8;
          }
        }
        .time{
          font-size: 0.22rem;color: #909090;
        }
        .btn-audio-play{
          font-size: 0.4rem;color: #33c9d0;
        }
        .bottom-wrap{
          display: flex;justify-content: flex-start;align-items: center;
        }
        .icon-small-play{
          display:inline-block;width: 0.85rem;line-height: 0.34rem;border: 0.01rem solid #3abfc3;border-radius: 0.08rem;text-align: center;margin-left: 0.3rem;font-size: 0.22rem;color: #909090;
        }
      }
    }

    .audio-example-wrap{
      width: 100%;height: 1.9rem;background: #fff;padding:0.4rem 0.4rem 0 0.25rem;font-size: 0.24rem;color: #3e3e3e;
      .example-title-wrap{
        width: 100%;display: flex;justify-content: space-between;align-items: center;
      }
      .example-title{
        font-size: 0.26rem;color: #3f3f3f;line-height: 0.5rem;
      }
      .example-info{
        width: 100%;
        .example-time{
          font-size: 0.24rem;line-height: 0.8rem;
        }
      }
      .icon-play-btn{
        font-size: 0.4rem;color: #3bc0c5;
      }
    }

  }
</style>

<script>
  export default{
    data(){
      return {
        audio: null,
        audio_source: window.document.querySelector('source'),
        current_src:'',
        is_terminate: false,
        default_audio_time:'00:00',

        now_playing: 0,
        info:{
          id:'',
          name:'',
          img_max:'',
          update_num:'',
          play_num:'',
          sell_num:'',
          price_curr:'',
        },
        is_buy:'',
        sections:[
          {
            id: '',
            name: '',
            update_time: '',
            url: ''
          }
        ],
        default_section_index:0,
        showOrderBtn:false,
        playing:false, // 记录是否在播放
        playingId: 0,// 记录播放的是那条
        wechatSigned: false,
        wechatSignConfig: {},

        // 测试音频加载完之前的loading图标
        is_loading:true,
        loadingTimer:null,
      }
    },
    mounted() {
      this.audio = document.querySelector('audio');
      this.audio_source = document.querySelector('source');
      // 进到播放页，默认的是第几条

      this.default_section_index = this.$route.params.sectionIndex ? this.$route.params.sectionIndex : 0;
      this.wechatPreSign();
      this.getData();

    },
    destroyed() {
      let vthis = this;
      clearInterval(vthis.loadingTimer);
    },
    methods: {
      showEvent(e) {},
      wechatPreSign() {
        let vthis = this,
          apiUrl = zzhJs.config.apiDomain+'/zzhedu/wx/web/jssign.action';

        this.$http.post(apiUrl, {
          url:window.location.href.split('#')[0]
        }).then(res => {
          let response = res.data;

          let signConfig = {
            debug: false,
            appId: response.data['appid'],
            timestamp: response.data['timestamp'],
            nonceStr: response.data['nonce_str'],
            signature: response.data['signature'],
            url: window.location.href,
            jsApiList:['playVoice']
          };

          vthis.wechatSignConfig = signConfig;

        });
      },
      // = -----------------------= 播放器控制 =-------------------------
      // 播放/暂停 切换开关
      playButtonSwitch () {
        let current_playing_index;

        if (!this.playingId) {
          return this.playAudio(this.sections[0], 0);
        }

        if (this.playing) {
          this.playing = false;
          this.audio.pause();
        } else {
          this.playing = true;
          this.audio.play();
        }
      },
      canPlay(e) {
        let audio = e.target;
        document.querySelector('.total-played-time').innerHTML = this.transTime(audio.duration);
        this.playingId && audio.play();
      },
      // 监听音频播放时间并且更新进度条
      audioTimeUpdate (e) {

        let audio = e.target;

        let value = audio.currentTime / audio.duration,
          vthis = this;
        document.querySelector('.process-bg').style.width = value * 100 + '%';
        document.querySelector('.process-dot').style.left = value * 100 + '%';
        document.querySelector('.current-time').innerHTML = (vthis.transTime(audio.currentTime));

        if(audio.paused){
          this.playing = false;
        }else {
          this.playing = true;
        }


      },
      // 一个时间换算的方法
      transTime (value) {
        let time = '';
        // 时
        let h = parseInt(value / 3600);
        // 取余，得到分
        value %= 3600;
        let m = parseInt(value / 60);
        let s = parseInt(value % 60);
        if (h > 0) {
          time = this.formatTime(h + ':' + m + ':' + s);
        } else {
          time = this.formatTime(m + ':' + s);
        }
        return time;
      },
      // 一个格式化时间的方法
      formatTime (value){
        let time = '';
        let s = value.split(':');
        let i = 0;
        for (; i < s.length - 1; i++) {
          time += s[i].length == 1 ? ('0' + s[i]) : s[i];
          time += ':';
        }
        time += s[i].length == 1 ? ('0' + s[i]) : s[i];

        return time;
      },
      // 计算视频的时长
      setTime(audio){},
      // 进度条拖动
      processBarDragEvent (e) {
        // 拖动时候先暂停
        this.audio.pause();
        this.playing = true;

        let bar = document.querySelector('.process-bar');
        let dot = document.querySelector('.process-dot');
        let leftSpan = document.querySelector('.current-time');
        let dpr = parseInt(document.querySelector('html').getAttribute('data-dpr'));

        let leftSpanMarginRight = parseInt(window.getComputedStyle(leftSpan).marginRight.slice(0, -2));
//          let barWidth = window.getComputedStyle(bar, null).width.slice(0, -2);
//          let dotWidth = window.getComputedStyle(dot, null).width.slice(0, -2);

        let startX = e.touches[0].clientX - (leftSpan.offsetWidth + leftSpanMarginRight * dpr);
        dot.style.left = startX + 'px';
        let rate = startX / (bar.offsetWidth);
        let elapsedTime = rate * this.audio.duration;
        this.audio.currentTime = elapsedTime;
      },

      m (e) {

        if (!this.current_src) {// 为了解决当用户在没有点击播放的时候直接拖动进度条，src在未加载进来的时候容易出错。
          return false;
        }
        let bar = document.querySelector('.process-bar');
        let dot = document.querySelector('.process-dot');
        let leftSpan = document.querySelector('.current-time');
        let dpr = parseInt(document.querySelector('html').getAttribute('data-dpr'));

        let leftSpanMarginRight = parseInt(window.getComputedStyle(leftSpan).marginRight.slice(0, -2));
//          let barWidth = window.getComputedStyle(bar, null).width.slice(0, -2);
//          let dotWidth = window.getComputedStyle(dot, null).width.slice(0, -2);
        let barWidth = bar.offsetWidth,
          dotWidth = dot.offsetWidth;

        let moveX = e.touches[0].clientX - (leftSpan.offsetWidth + leftSpanMarginRight * dpr);
        dot.style.left = moveX + 'px';
        let rate = moveX / barWidth;
        let elapsedTime = rate * this.audio.duration;
        this.audio.currentTime = elapsedTime;

        if (moveX <= 0) {
          dot.style.left = 0;
        } else if (moveX >= barWidth - dotWidth) {
          dot.style.left = barWidth - dotWidth
        } else {
          dot.style.left = moveX + 'px';
          let rate = moveX / barWidth;
          let elapsedTime = rate * this.audio.duration;
          this.audio.currentTime = elapsedTime;
        }

      },
      // 进度条拖动完成后松开
      continueToPlay(e) {
        this.audio.play();
        this.playing = false;
      },
      // 上一曲
      playPrevOne () {
        if (this.now_playing == 0) {
          return;
        }

        let index = this.now_playing - 1;

        this.playAudio(this.sections[index], index);
      },
      // 下一曲
      playNextOne () {
        if (this.now_playing == this.sections.length - 1) {
          return;
        }

        let index = this.now_playing + 1;

        this.playAudio(this.sections[index], index);
      },
      // = -----------------------= 播放器控制 End =-------------------------

      // 获取数据
      getData() {
        let vthis = this,
          product_id = this.$router.currentRoute.params.id;
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/details.action',
          {
            product_id:product_id
          }).then(res => {
          if(res.status = 200){
            let response = JSON.parse(res.bodyText).data;
            vthis.is_buy = response.is_buy;
            vthis.showOrderBtn = response.is_buy == 0?true:false;

            for (let i = 0; i < response.sections.length; i++) {
              response.sections[i].update_time = response.sections[i].update_time;
            }

            vthis.sections = response.sections;
//            vthis.current_src = response.sections[0].url;
            vthis.current_src = response.sections[vthis.default_section_index].url;
            vthis.info.id = response.id;
            vthis.info.name = response.name;
            vthis.info.img_max = response.img_max;
            vthis.info.update_num = response.update_section;
            vthis.info.play_num = response.play_num;
            vthis.info.sell_num = response.sell_num;
            vthis.info.price_curr = response.price_curr;
            document.title = response.name;

//            if (window.wx) {
//              wx.config(vthis.wechatSignConfig)
//              wx.ready(function () { // wx.ready可以解决在ios的微信中不能自动播放的问题
            vthis.playAudio(response.sections[vthis.default_section_index], vthis.default_section_index);

//              })
//            }
            vthis.weLoadEnd();
          }
        },res => {
          zzhJs.console.log(res)
        })
      },
      // 点击播放曲目
      playAudio(item, index) {
        let vthis = this;
        // 先判断是否为免费的，如果为免费，则直接可以播放，若非免费，则再看是否购买过，是否能试听
        if (vthis.info.price_curr != 0 && vthis.is_buy == 0 && item.is_play == 0) {
          return this.weNotify('您暂时无权播放，请先订阅！');
        }

        clearInterval(this.loadingTimer);
        // 为了解决在ios的微信上，音频加载过慢，添加了loading图标
//        vthis.loadingTimer = setInterval(function () {
//          if (vthis.audio.readyState < 2 ) {
//            vthis.is_loading = true;
//            console.log('loading')
////            return ;
//          }else {
//            clearInterval(vthis.loadingTimer);
//            console.log('end')
//            vthis.is_loading = false;
//          }
//        },1000)
        // 判断传入的id和当前正在播放的音频的id是否一致
        if (vthis.playingId != item.id) {
          vthis.playingId = item.id;
          vthis.playing = true;
          vthis.current_src = item.url;
          vthis.now_playing = index;
          vthis.audio.currentTime = 0;
          // 判断若是在微信里，则进行签名，可稍稍加快播放的速度，（效果很微弱）
          if (window.wx) {
//            setTimeout(function () {
              wx.error(function(res) {
                vthis.weNotify("JSSDK配置错误:"+ res.errMsg);
              });
              wx.config(_.clone(vthis.wechatSignConfig));
              wx.ready(function () {
                vthis.audio.load();
                vthis.loadingTimer = setInterval(function () {
                  if (vthis.audio.readyState < 2 ) {
                    vthis.is_loading = true;
                  }else {
                    clearInterval(vthis.loadingTimer);
                    vthis.is_loading = false;
                    vthis.audio.play();
                  }
                },1000)
//                vthis.audio.play();

              });
//            }, 200);
          } else { // 否则就进行load，会接着执行canplay事件
//            setTimeout(function () {
              vthis.audio.load();
            vthis.loadingTimer = setInterval(function () {
              if (vthis.audio.readyState <= 3 ) {
                vthis.is_loading = true;
//            return ;
              }else {
                clearInterval(vthis.loadingTimer);
                vthis.is_loading = false;
                vthis.audio.play();
                vthis.playingId = item.id;

              }
            },1000)
//              vthis.audio.play();
//              console.log('33')
//              vthis.playingId = item.id;
//            }, 0);
          }

          vthis.recordPlayNum(vthis.info.id);
        } else if (vthis.playing) {  // 表示音频处于正在播放的状态，此时再次点击的时候应该停止播放
          vthis.playing = false
          vthis.audio.pause();

          vthis.is_loading = false;
          clearInterval(vthis.loadingTimer)
        } else {  // 表示当前音频处于停止的状态，此时点击，应该开始播放
          vthis.playingId = item.id;
          vthis.playing = true;
          clearInterval(vthis.loadingTimer);
          vthis.audio.load();
          vthis.audio.play();

        }


      },

      // 监听音频播放完毕之后的动作
      playEnd() {
        let vthis = this;
        if (window.wx) {
          wx.ready(function () {
            if (vthis.now_playing >= vthis.sections.length - 1) {
              return vthis.weNotify('已经是最后一节课了！')
            }
            vthis.playAudio(vthis.sections[vthis.now_playing + 1], (vthis.now_playing + 1));
          })
        }
      },

      // 记录用户的播放记录
      recordPlayNum(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/paly_history.action',
          {
            product_id:id
          }).then(res => {

        },res => {

        })
      },
      // 调到支付页
      showPay(id,is_give) {
        window.location.href = `${zzhJs.config.urlPayment}?#/?id=${id}&is_give=${is_give}&channel=audio`;
      }
    }
  }
</script>
