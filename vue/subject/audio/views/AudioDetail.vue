<template>
  <div class="detail-wrap">
    <!--banner部分-->
    <scroller :on-refresh="refresh" :on-infinite="infinite"  :noDataText="noDataText" ref="my_scroller">
      <div class="detail-banner">
        <img :src="info.img_max"/>
      </div>
      <!--音频的简介信息-->
      <div class="audio-meal-info">
        <div class="audio-info-left">
          <div>
            <p class="audio-title">{{info.name}}</p>
            <p class="audio-intro">{{info.intro}}</p>
          </div>
          <p class="has-update-num">
            <span style="margin-right: 0.28rem;"><span class="iconfont icon-update-num"></span>更新{{info.update_section}}</span>
            <span style="margin-right: 0.28rem;margin-left: 0.28rem;" v-if="info.price_curr == 0"><span class="iconfont icon-subscribe-num"></span>浏览{{info.sell_num}}</span>
            <span style="margin-right: 0.28rem;margin-left: 0.28rem;" v-else><span class="iconfont icon-subscribe-num"></span>订阅{{info.sell_num}}</span>
            <span style="margin-left: 0.28rem"><span class="iconfont icon-play-num"></span>播放{{info.play_num}}</span>
          </p>
        </div>
        <div class="btn-give-wrap" @click="showPay(info.id,0)">
          <div class="btn-give"></div>
          <p class="ft24 color-zhizilv">送好友</p>
        </div>
      </div>
      <!--播放列表和详情-->
      <div class="audio-play-list-wrap">
        <div class="audio-play-list-title">
          <!--未修改的start-->
          <!--<p :class="{'active-bottom':!showList}" @click="changeTab()">详情</p>-->
          <!--<p :class="{'active-bottom':showList}"  @click="changeTab()">目录</p>-->
          <!--未修改的end-->

          <!--修改的start-->
          <p :class="{'color-zhizilv':showList == 0}" @click="changeTab(0)">详情</p>
          <p :class="{'color-zhizilv':showList == 1}"  @click="changeTab(1)">目录</p>
          <p :class="{'color-zhizilv':showList == 2}"  @click="changeTab(2)">评价</p>
          <!--修改的end-->
        </div>
        <!--播放列表-->
        <ul class="audio-play-list" v-if="showList == 1">
          <template v-for="(item,index) in sections">
            <li @click="goListen(info.id,index,item)">
              <div>
                <p class="title" :class="{'active':index == audio_index }">{{item.name}}</p>
                <div class="bottom-wrap">
                  <p class="time">{{item.update_time | formatDate('YYYY-MM-DD')}}</p>
                  <span class="icon-small-play" v-if="(info.price_curr != 0 && info.is_buy == 0 && item.is_play == 1 )">试听</span>
                </div>

              </div>
              <span class="btn-audio-play iconfont" :class="{'icon-stop2':true,'icon-play2':false}"></span>
            </li>
          </template>
        </ul>

        <!--音频的详情展示-->
        <div class="detail-pic" v-if="showList == 0">
          <template v-for="item in info.imgs">
            <img :src="item.url"/>
          </template>
        </div>

        <!--详情的评论-->

        <div class="detail-comment" v-if="showList == 2">
          <!--<scroller :on-refresh="refresh" :on-infinite="infinite"  :noDataText="noDataText" ref="my_scroller">-->
          <div class="comment-nav-title">
            <p class="all-comments-num">全部评论<span class="ft28">({{totalComments}}条)</span></p>
            <div v-if="showEvalute">
              <p class="take-comment" v-if="(!canEvaluate && info.is_buy == 1) || (!canEvaluate && info.price_curr == 0)" @click="goComment(info.id)">我已评价</p>
              <p class="take-comment" v-else @click="goComment(info.id)">我要评价</p>

            </div>
          </div>
          <!--<scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">-->
            <div class="comment-area" v-for="(item, index) in commentInfo">
              <div class="comment-title-bar">
                <div class="comment-user-info">
                  <div class="comment-user-head">
                    <img :src="item.avatar"/>
                  </div>
                  <span class="comment-user-name ft26">{{item.name}}</span>
                </div>
                <ul class="comment-grade">
                  <template v-for="num in 5">
                    <li class="iconfont" :class="{'icon-selected-star':item.grade >= num,'icon-unselect-star':item.grade < num}"></li>
                  </template>
                </ul>
              </div>
              <div class="comment-info">
                <p class="comment-con ft26">{{item.content}}</p>
                <p class="comment-reply ft26" v-if="item.answer_info.content"><span class="reply-name ft26">{{item.answer_info.name}}:</span>{{item.answer_info.content}}</p>
                <p class="comment-time ft24">{{item.create_time | timeAgo}}</p>
              </div>
            </div>
          <!--</scroller>-->
          <div class="no-comments-area" v-if="!commentInfo.length">
            <p class="ft32">该课程暂无评论</p>
          </div>
          <!--</scroller>-->
        </div>

      </div>

      <!--试听章节 删除-->
      <!--<div class="audio-example-wrap" v-if="showTryListen">-->
        <!--<template v-for="item in sections">-->
          <!--<div class="example-title" @click="tryListen(info.id)">-->
            <!--<p class="example-name">{{item.name}}</p>-->
            <!--<span class="icon-play iconfont" :class="{'icon-stop2':true,'icon-play2':false}"></span>-->
          <!--</div>-->
          <!--<div class="example-info" @click="tryListen(info.id)">-->
            <!--<div class="example-info-left">-->
              <!--<p class="example-time">{{item.update_time}}</p>-->
              <!--<span class="try-see">试听</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</template>-->
      <!--</div>-->
      <!--试听章节 删除-->

    </scroller>
    <div class="footer-bar" v-if="hasOrder">
      <div class="btn-try-see ft28" v-if="showTryListen"  @click="tryListen(info)" :class="{active:false}"><i class="iconfont icon-btn-try-listen"></i>试听</div>
      <div class="btn-subscribe ft28" :class="{active:true}" @click="showPay(info.id,1)">订阅专栏{{info.price_curr| currency}}</div>
    </div>
    <subject-home v-if="showList != 2"></subject-home>

    <!--上滑出现回到顶部-->
    <div class="backToTop" v-if="showList == 2 && showBackToTop" @click="backToTop"></div>
  </div>
</template>

<style lang="scss">
  @import "../style/app";
  @import "../../../assets/iconfont/iconfont.css";
  .detail-wrap{
    width: 100%; padding-bottom: 1.2rem;
    .ft20{font-size: 0.2rem} .ft24{ font-size: 0.24rem;} .ft26{font-size: 0.26rem;} .ft28{font-size: 0.28rem;} .ft30{font-size: 0.3rem;} .ft32{font-size: 0.32rem;}
    .color-zhizilv{color: #3abfc3;}
    img{
      width:100%;height: 100%;
    }
    .detail-banner{
      width: 100%;height: 5.6rem;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
    }
    .audio-meal-info{
      width: 100%; height: 2.28rem;background:#fff;padding:0.4rem 0.3rem;margin-bottom: 0.2rem;font-size: 0.22rem;
      display: flex;justify-content: space-between;align-items: center;
      .audio-info-left{
       height:100%; display: flex;flex-direction: column;justify-content: space-between;
      }
      .has-update-num{
        &>span{
          font-size: 0.26rem;color: #333;line-height: 0.5rem;
        }
        .icon-update-num,.icon-play-num,.icon-subscribe-num{
          font-size: 0.3rem;margin-right: 0.1rem;
        }
        .icon-subscribe-num{font-weight: bold;}

      }
      .audio-title{
        font-size: 0.32rem;color: #333;line-height: 0.45rem;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
        -webkit-line-clamp: 1; -webkit-box-orient: vertical;
      }
      .audio-intro{
        flex-shrink:1;font-size: 0.26rem;color: #666;line-height: 0.45rem;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
        -webkit-line-clamp: 2; -webkit-box-orient: vertical;
      }
      &>p{
        line-height: 0.4rem;
      }
      .btn-give-wrap{
        font-size: 0.22rem;color: #3abfc3;flex-shrink: 0;margin-left: 0.3rem;
        .btn-give{
          width: 0.65rem;height: 0.75rem;font-size:0.6rem;color:#f7bf48;margin-bottom: 0.15rem;background: url("../assets/icon_give.png") no-repeat center;background-size: 100%;
        }

      }
    }

    .detail-pic{
      width: 100%;
      &>img{
        display: block;
      }
    }

    .audio-play-list-wrap{
      width: 100%;background: #fff;
      .audio-play-list-title{
        width: 100%;height: 0.8rem;border-bottom: 1px solid #f4f4f4;display: flex;justify-content: space-around;align-items: center;
        font-size: 0.3rem;color:#666;
        &>p{width:0.75rem;text-align:center;height:100%;line-height:0.8rem;position: relative;font-size: 0.3rem;}
        /*&>p.active-bottom:after{*/
          /*position: absolute;content: '';width: 100%;height:2px;background: #4abebd;left: 0;bottom: 0;*/
        /*}*/
      }

      .audio-play-list{
        width: 100%;
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

      .detail-comment{
        width: 100%;background: #fff;min-height: 3rem;
        .comment-nav-title{
          width: 100%; height:1rem;display: flex;justify-content: space-between;align-items: center;padding-left: 0.3rem;padding-right: 0.3rem;
          .all-comments-num,.take-comment{
            font-size: 0.28rem;
          }
          .take-comment{
            color: #3abfc3;line-height: 1rem;
          }
        }
        .comment-title-bar{
          width:100%;height: 1rem;display: flex;justify-content: space-between;align-items: center;
        }
        .comment-area{
          margin-bottom: 0.2rem;padding-left: 0.3rem;padding-right: 0.3rem;border-bottom: 0.01rem solid #ececec;
        }
        .comment-user-info{
          height: 100%;display: flex;justify-content: flex-start;align-items: center;
        }
        .comment-user-head{
          width: 0.6rem;height: 0.6rem;border-radius: 50%;overflow: hidden;background: pink;margin-right: 0.2rem;flex-shrink: 0;
          background: url("../../../assets/image/icon_head.png") no-repeat center;background-size: 100%;
          &>img{
            width: 100%;display: block;
          }
        }
        .comment-user-name{color: #666;}
        .comment-grade{
          height: 100%;flex-shrink: 0;display: flex;justify-content:flex-start;align-items: center;
          &>li{
            font-size: 0.45rem;color: #ffd02b;
          }
        }
        .comment-info{
          padding-left:0.8rem;line-height: 0.4rem;
          .comment-con{
            color: #232323;
          }
          .comment-time{
            color: #ccc;margin-bottom: 0.3rem;margin-top: 0.3rem;
          }
          .comment-reply{
            background: #eeeeee;color: #333;padding: 0.15rem;margin-top: 0.2rem;border-radius: 0.07rem;word-break:break-all;
            .reply-name{
              color: #3abfc3;margin-right: 0.2rem;
            }
          }
        }

        .no-comments-area{
          width: 100%;min-height: 5rem;background: #fff;color: #cacaca;
          &>p{
            text-align: center;line-height: 5rem;
          }
        }
      }

    }



    .audio-example-wrap{
      width: 100%;min-height: 1.9rem;background: #fff;padding:0.4rem 0.4rem 0 0.25rem;font-size: 0.24rem;color: #3e3e3e;
      /*position: fixed;left: 0;bottom: 1.2rem;*/
      .example-title{
        font-size: 0.26rem;color: #3f3f3f;line-height: 0.4rem;display: flex;justify-content: space-between;align-items: center;
        .example-name{
          font-size: 0.26rem;
        }
      }
      .example-info{
       width: 100%; display: flex;justify-content: space-between;align-items: center;line-height: 0.8rem;
      }
      .icon-play{
        display: block;font-size: 0.4rem;color: #3dc0c8;
      }
      .example-info-left{
        display: flex;justify-content: space-around;align-items: center;font-size: 0.24rem;
        .try-see{
          display: block;width: 0.84rem;border: 1px solid #49c5c7;border-radius: 0.06rem;text-align: center;line-height: 0.36rem;color: #49c5c7;
          margin-left: 0.3rem;font-size: 0.24rem;
        }
        .example-time{
          font-size: 0.24rem;
        }
      }
    }

    .footer-bar{
      width: 100%;height: 0.9rem;background: #33aaaa;position: fixed;bottom: 0;left: 0;display: flex;justify-content:center;border-top: 0.01rem solid #ccc;
      .btn-try-see{
       min-width: 2.15rem; height: 0.9rem;text-align: center;line-height: 0.9rem;flex-shrink: 1;background: #fff;
        &.active{
          background: #33aaaa;color: #fff;
        }

      }
      .btn-subscribe{
        @extend .btn-try-see;width: 5.35rem;
      }
    }

    .backToTop{
      width: 0.8rem;height: 0.8rem;background: url("../assets/btn-backToTop.png") no-repeat center;background-size:100%;border-radius: 50%;overflow: hidden;position: fixed;right: 0.3rem;bottom: 1rem;z-index: 10;
    }
  }
</style>
<script>

  export default{
    data (){
      return {
        info:{},
        sections:[
          {
            id:'',
            name:'',
            long_time:'',
            order_by:'',
            free:'',
            url:'',
            update_time:''
          }
        ],
        is_buy:'',

//        showList:true,
        showList:-1,

        showTryListen:false,    // 原来的此值是为了决定是否展示底部的试听章节。
        audio_index:0,
        hasOrder: false,

        noDataText:'',
        // 评论的信息
        showEvalute:false,
        canEvaluate:true,
        totalComments:0,
        commentInfo:[],

        counter:1,// 当前页
        num:5, // 一页显示多少条
        pageStart:1, // 开始页数
        pageEnd:1, // 结束页数

        showBackToTop:false,
        timer:null,
      }
    },
    mounted() {
      let vthis = this;
      this.getData();

      if (!zzhJs.env.isInApp()) {
        this.wechatPreSign(() => {
          vthis.mountShareAction();
        });
      }

      vthis.timer = setInterval(() => {
        vthis.watchScrollTop();
      },200)

    },
    destroyed() {
      let vthis = this;
      clearInterval(vthis.timer);
    },
    methods:{
      getData() {
        let vthis = this,
        audioId = this.$router.currentRoute.params.id;
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/details.action',
          {
            product_id:audioId
          }).then(res => {
            if(res.status == 200){
              let response = JSON.parse(res.bodyText).data;

                if(response.price_curr == 0){ // 价格为0 ，说明为免费，则不用展示订阅和试听按钮
                  vthis.showTryListen = false;
                  vthis.hasOrder = false;

//                vthis.showList = true;
                  vthis.showList = 1;

                }else { // 价格不为0 ，说明不是免费的
                  if (response.is_buy == 0) { // 等于0表示未购买

//                  vthis.showList = false;
                    vthis.showList = 0;

                    vthis.hasOrder = true;

                    for( let i = 0; i < response.sections.length; i++) {  // 判断是否有试听章节，如果没有试听章节，则只显示订阅专栏按钮
                      if (response.sections[i].is_play == 1) {
                        vthis.showTryListen = true;
                        break;
                      }
                    }



                }else { // 等于1表示购买了
                  vthis.hasOrder = false;
                  vthis.showTryListen = false;

//                  vthis.showList = true;
                  vthis.showList = 1;
                }
              }

              vthis.info = response;

              for(let i = 0; i < response.sections.length; i++){
//                response.sections[i].update_time = vthis.formatTime(response.sections[i].update_time);
                response.sections[i].update_time = response.sections[i].update_time;
              }
              vthis.sections = response.sections;

              vthis.recordWatchNum(audioId);

              document.title = response.name;

              vthis.weLoadEnd();

              vthis.showCommentBtn(audioId);
            }
        },res => {
//            vthis.$router.replace({name:'audio.list'})
        })

      },
//    记录用户的浏览量
      recordWatchNum(id){
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/look.action',
          {
            product_id:id
          }).then(res => {

        },res => {
        })
      },
      mountShareAction() {
        let vthis = this;

        wx.ready(function () {
          wx.hideAllNonBaseMenuItem();

          wx.showMenuItems({
            menuList: [
              'menuItem:share:appMessage',
              'menuItem:share:timeline',
            ]
          });

          let shareData = {
            title: vthis.info.name,
            desc: vthis.info.intro,
            link: zzhJs.helpers.getAuthRedirectUri(),
            imgUrl: vthis.info.img_max,
            type: 'link',
            dataUrl: '',
            success() {},
            fail() {},
            cancel() {}
          }

          wx.onMenuShareTimeline(shareData);
          wx.onMenuShareAppMessage(shareData);
        });
        wx.config(vthis.wechatSignConfig);
      },

      // 修改后start
//      changeTab(){
//        this.showList = !this.showList;
//      },
      // 修改后end
      changeTab(num){
        let vthis = this;
        this.showList = num;
        this.showBackToTop = false;
        if (num == 2) {
          vthis.commentInfo = [];
          this.getComment();
        }

      },
      goListen(id,index,item) {
        this.audio_index = index;
        if (this.info.is_buy == 1) { // 表示购买过了
          if(zzhJs.env.isInApp()){
            zzhJs.env.callAudioPlay(id);
          }else {
            this.$router.push({name:'subject.audio.play',params:{id:id,sectionIndex:index}});
          }
        } else { // 没订阅过
          if (this.info.price_curr ==  0) { // 如果当前价格为0 ，则直接视为免费的
            if (zzhJs.env.isInApp()) {
              zzhJs.env.callAudioPlay(id);
            } else {
              this.$router.push({name:'subject.audio.play',params:{id:id,sectionIndex:index}})
            }

            return;
          }
          if (item.is_play == 1){ // 可以播放
            // 判断页面是否内嵌在app中，如果是，则调原生的播放页，如果不是，调用H5播放页
            if(zzhJs.env.isInApp()){
              zzhJs.env.callAudioPlay(id);
            }else {
              this.$router.push({name:'subject.audio.play',params:{id:id,sectionIndex:index}});
            }
          } else { // 不可以播放
            this.weNotify('您暂时还没有权限播放，请先订阅！');
          }
        }


      },
//      formatTime(time) {
////        let timeStamp = new Date(time).toLocaleString();
////        let result_time = timeStamp.replace(/\//g,'-');
//        let date = new Date(time);
//        return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-');
//
//      },
      // 试听
      tryListen(info) {
        info.sections.forEach((item, index) => {
           if (item.is_play == 1) {
             console.log(index);
             this.$router.push({name:'subject.audio.play',  params:{id:info.id, sectionIndex: index}})
           }
        })
      },
      showPay(id,is_give){
        // 判断是否内嵌在app中，若是，则调用app的支付页
        if (zzhJs.env.isInApp()) {
          zzhJs.env.callPayment(id,is_give);
        } else {
          window.location.href = `${zzhJs.config.urlPayment}?#/?id=${id}&is_give=${is_give}&channel=audio`;
        }

      },



      // 获取评价数据
      getComment(params, callback) {
        let vthis = this,
        paramsDeafult = {
          page_no:1,
          page_size:vthis.num,
          product_id:this.info.id
        };
        params = _.assign(paramsDeafult,params);

        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/index.action',params).then(res => {
//            console.log(res);
            let response = res.body.data;
            vthis.totalComments = response.total;
            response.list.forEach(item => {
              vthis.commentInfo.push(item);
            });
            vthis.counter = response.page_no;
            vthis.pageEnd = Math.ceil(response.total / vthis.num);

            if (callback) {
              callback();
            }

        },res => {
            zzhJs.console.log(res);
        })
      },
      // 去评价
      goComment(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/is_evaluate.action',
          {
            product_id: vthis.info.id,
          }).then(res => {
            let canComment =  res.body.data.is_evaluate;
            if (canComment == 1) { // 可以评价
              window.location.href = zzhJs.config.urlSubjectCommentPage + '?#/' + id + '/audio';
            } else { // 不可以评价
              vthis.weNotify(res.body.data.msg);
            }
        },res => {
            zzhJs.console.log(res);
        })
      },

      // 评论的刷新
      refresh(done) {
        let vthis = this;
        this.counter = 1;
        if (this.showList == 2) { // 只有当显示的页面为评论的时候，才会去请求评论的数据
          vthis.commentInfo = [];
          this.getComment({page_no:this.counter},done);
        }
        done();
      },
      // 评论的加载
      infinite(done) {
        let vthis = this;
        this.counter++;
        if (this.counter > this.pageEnd) {
          setTimeout(function () {
            done(true);
          },500)
          return false;
        }
        if (this.showList == 2) {
          this.getComment({page_no:vthis.counter},done);
        }
        done();


      },

      // 决定是否展示“我要评价”几个字
      showCommentBtn(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/is_evaluate.action',
          {
            product_id: vthis.info.id,
          }).then(res => {
          vthis.showEvalute = true;
          vthis.canEvaluate = res.body.data.is_evaluate == 1 ? true : false;
        },res => {
          zzhJs.console.log(res);
        })
      },

      // 处理页面滚动的滚动条距离顶部的距离
      watchScrollTop() {
        let topY = this.$refs.my_scroller.getPosition().top;
        this.showBackToTop = Math.abs(topY) > 350 ? true : false;
      },

      backToTop() {
        this.$refs.my_scroller.scrollTo(0, 0, true);
      }
    }
  }
</script>