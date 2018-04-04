<template>
  <div class="detail-wrap">
    <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText" ref="my_scroller">
      <!--banner 部分-->
      <div class="detail-banner">
        <img :src="info.img_max"/>
      </div>
      <!--视频信息简介-->
      <div class="video-meal-info">
        <div class="video-info-left">
          <div>
            <p class="video-title">{{info.name}}</p>
            <p class="video-intro">{{info.intro + info.count_section}}</p>
          </div>
          <!--<p class="has-update-num"> 已更新{{info.update_section}}节|{{info.sell_num}}人订阅|播放量{{info.play_num}}</p>-->
          <p class="has-update-num">
            <span style="margin-right: 0.28rem;"><span class="iconfont icon-update-num"></span>更新{{info.update_section}}</span>
            <span style="margin-right: 0.28rem;margin-left: 0.28rem;" v-if="info.price_curr == 0"><span class="iconfont icon-subscribe-num"></span>浏览{{info.sell_num}}</span>
            <span style="margin-right: 0.28rem;margin-left: 0.28rem;" v-else><span class="iconfont icon-subscribe-num"></span>订阅{{info.sell_num}}</span>
            <span style="margin-left: 0.28rem"><span class="iconfont icon-play-num"></span>播放{{info.play_num}}</span>
          </p>
        </div>
        <div class="btn-give-wrap" @click="showPay(info.id,0)">
          <div class="btn-give"></div>
          <p class="ft24">送好友</p>
        </div>
      </div>

      <!--视频列表和详情-->
      <div class="video-play-list-wrap" >
        <div class="video-play-list-title">
          <!--未修改的start-->
          <!--<p :class="{'active-bottom':!showList}" @click="changeTab()">详情</p>-->
          <!--<p :class="{'active-bottom':showList}" @click="changeTab()">目录</p>-->
          <!--未修改的end-->

          <!--修改的start-->
          <p :class="{'color-zhizilv':showList == 0}" @click="changeTab(0)">详情</p>
          <p :class="{'color-zhizilv':showList == 1}"  @click="changeTab(1)">目录</p>
          <p :class="{'color-zhizilv':showList == 2}"  @click="changeTab(2)">评价</p>
          <!--修改的end-->
        </div>
        <!--播放列表-->
        <ul class="video-play-list" v-if="showList == 1">
          <template v-for="(item,index) in sections">
            <li @click="play(info.id,index,item)">
              <div>
                <p class="title" :class="{'active':index == video_index}">{{item.name}}</p>
                <div class="bottom-wrap">
                  <p class="time">{{item.update_time | formatDate('YYYY-MM-DD')}}</p>
                  <span class="icon-small-play" v-if="(info.price_curr != 0 && info.is_buy == 0 && item.is_play == 1 )">试看</span>
                </div>
              </div>
              <span class="btn-video-play iconfont" :class="{'icon-stop2':true,'icon-play2':false}"></span>

            </li>
          </template>
        </ul>
        <!--详情展示部分-->
        <div class="detail-pic" v-if="showList == 0">
          <template v-for="item in info.imgs">
            <img :src="item.url"/>
          </template>
        </div>

        <!--详情的评论-->
        <div class="detail-comment" v-if="showList == 2">
          <div class="comment-nav-title">
            <p class="all-comments-num">全部评论<span class="ft28">({{totalComments}}条)</span></p>
            <div v-if="showEvalute">
              <p class="take-comment" v-if="(!canEvaluate && info.is_buy == 1) || (!canEvaluate && info.price_curr == 0)" @click="goComment(info.id)">我已评价</p>
              <p class="take-comment" v-else @click="goComment(info.id)">我要评价</p>
            </div>
          </div>
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

          <div class="no-comments-area" v-if="!commentInfo.length">
            <p class="ft32">该课程暂无评论</p>
          </div>
        </div>
      </div>

      <!--试听章节 删除-->
      <!--<div class="video-example-wrap" v-if="showTrySee">-->
        <!--<template v-for="item in sections">-->
          <!--<div class="example-title-wrap" @click="play(info.id)">-->
            <!--<p class="example-title">{{item.name}}</p>-->
            <!--<span class="icon-play iconfont" :class="{'icon-stop2':true,'icon-play2':false}"></span>-->
          <!--</div>-->
          <!--<div class="example-info" @click="play(info.id)">-->
            <!--<div class="example-info-left">-->
              <!--<p class="ft24">{{item.update_time}}</p>-->
              <!--<span class="try-see">试看</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</template>-->
      <!--</div>-->
      <!--试听章节 删除-->

    </scroller>
    <div class="footer-bar" v-if="hasOrder">
      <div class="btn-try-see ft28" v-if="showTrySee" :class="{active:false}" @click="tryPlay(info)"><i class="iconfont icon-btn-try-listen"></i>试看</div>
      <div class="btn-subscribe ft28" :class="{active:true}" @click="showPay(info.id,1)">订阅专栏{{info.price_curr | currency}}</div>
    </div>

    <subject-home v-if="showList != 2"></subject-home>

    <!--上滑出现回到顶部-->
    <div class="backToTop" v-if="showList == 2 && showBackToTop" @click="backToTop"></div>
  </div>
</template>
<style lang="scss">
  .detail-wrap{
    width: 100%;padding-bottom: 1.2rem;
    .ft20{font-size: 0.2rem} .ft24{ font-size: 0.24rem;} .ft26{font-size: 0.26rem;} .ft28{font-size: 0.28rem;} .ft30{font-size: 0.3rem;} .ft32{font-size: 0.32rem;}
    .color-zhizilv{color: #3abfc3;}
    img{
      width: 100%;
    }
    .detail-banner{
      width: 100%;height: 4.2rem;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
    }
    .video-meal-info{
      width: 100%; height: 2.28rem;background:#fff;padding:0.4rem 0.3rem;margin-bottom: 0.2rem;font-size: 0.22rem;
      display: flex;justify-content: space-between;align-items: center;
      .video-info-left{
       height:100%; display: flex;flex-direction: column;justify-content: space-between;
      }
      .has-update-num{
        /*font-size: 0.22rem;color: #999;line-height: 0.5rem;*/
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
      .video-title{
        font-size: 0.32rem;color: #333;line-height: 0.45rem;display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 1;
      }
      .video-intro{
        font-size: 0.26rem;color: #666;line-height: 0.45rem;display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;
      }
      &>p{
        line-height: 0.4rem;
      }
      .btn-give-wrap{
        font-size: 0.22rem;color: #3abfc3;flex-shrink: 0;margin-left: 0.3rem;
        .btn-give{
          width: 0.65rem;height: 0.75rem;margin-bottom: 0.15rem;font-size: 0.6rem;color: #ffb94d;background: url("../assets/icon_give.png") no-repeat center;background-size: 100%;
        }
      }
    }

    .detail-pic{
      width: 100%;
      &>img{
        display: block;
      }
    }

    .video-play-list-wrap{
      width: 100%;background: #fff;
      .video-play-list-title{
        width: 100%;height: 0.8rem;border-bottom: 1px solid #f4f4f4;display: flex;justify-content: space-around;align-items: center;
        font-size: 0.3rem;color:#232323;
        &>p{width:0.75rem;text-align:center;height:100%;line-height:0.8rem;position: relative;}
        /*&>p.active-bottom:after{*/
          /*position: absolute;content: '';width: 100%;height:2px;background: #4abebd;left: 0;bottom: 0;*/
        /*}*/
      }

      .video-play-list{
        width: 100%;
        &>li{
          width: 100%;height: 1.41rem;border-bottom: 1px solid #f4f4f4;padding: 0.3rem 0.33rem;display: flex;justify-content: space-between;
          align-items: center;line-height: 0.45rem;
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
            color: #ccc;margin-bottom: 0.3rem;
          }
          .comment-reply{
            background: #eeeeee;color: #333;padding: 0.15rem;margin-top: 0.2rem;margin-bottom: 0.3rem;border-radius: 0.07rem;
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



    .video-example-wrap{
      width: 100%;min-height: 1.9rem;background: #fff;padding:0.4rem 0.4rem 0 0.25rem;font-size: 0.24rem;color: #3e3e3e;
      /*position: fixed;left: 0;bottom: 1.17rem;*/
      .example-title-wrap{
        width: 100%;display: flex;justify-content: space-between;align-items: center;
        .icon-play{
          font-size: 0.4rem;color: #39c3c5;
        }
      }
      .example-title{
        font-size: 0.26rem;color: #3f3f3f;line-height: 0.4rem;
      }
      .example-info{
       width: 100%; display: flex;justify-content: space-between;align-items: center;line-height: 0.8rem;
      }
      .example-info-left{
        display: flex;justify-content: space-around;align-items: center;font-size: 0.24rem;
        .try-see{
          display: block;width: 0.84rem;border: 1px solid #49c5c7;border-radius: 0.06rem;text-align: center;
          line-height: 0.36rem;color: #49c5c7;margin-left: 0.3rem;font-size: 0.24rem;
        }
      }
    }

    .footer-bar{
      width: 100%;height: 0.9rem;background: #33aaaa;position: fixed;bottom: 0;left: 0;display: flex;justify-content:center;border-top: 0.01rem solid #ccc;
      .btn-try-see{
        min-width: 2.15rem;height: 0.9rem;text-align: center;line-height: 0.9rem;background: #fff;
        &.active{
          background: #33aaaa;color: #fff;
        }
      }
      .btn-subscribe{
        @extend .btn-try-see;width: 5.35rem;
      }
    }

    .backToTop{
      width: 0.8rem;height: 0.8rem;background: url("../assets/btn-backToTop.png") no-repeat center;background-size:100%;border-radius: 50%;overflow: hidden;position: fixed;right: 0.3rem;bottom: 0.5rem;
    }
  }
</style>
<script>
  export default{
    data (){
      return {
        info:{},
        is_buy:'',
        sections:[
          {
            id:'',
            name:'',
            url:'',
            update_time:'',
          }
        ],
//        showList:true,
        showList:-1,

        showTrySee:false,
        hasOrder:false,
        video_index:0,

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
          vthis.mountShareAction()
        });
      }

      vthis.timer = setInterval(() => {
        vthis.watchScrollTop();
      },200);
    },
    destroyed() {
      let vthis = this;
      clearInterval(vthis.timer);
    },
    methods: {
      getData() {
        let vthis = this,
        videoId = this.$router.currentRoute.params.id;
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/details.action',
          {
            product_id:videoId
          }).then(res => {
            if(res.status == 200){
              let response = JSON.parse(res.bodyText).data;

              if(response.price_curr == 0){ // 表明价格为0的时候，直接不用试看了，价格
                vthis.showTrySee = false;
                vthis.showList = true;
              }else{ // 价格不为0 ,表明为非免费
//                vthis.showTrySee = true;
//                vthis.showList = false;
                if(response.is_buy == 0){ // is_buy为0表示未购买过
                  vthis.showList = false;
                  vthis.hasOrder = true;
                  if(response.sections.length == 0){ // 表明没有试听章节
                    vthis.showTrySee = false;
                  }else {
                    vthis.showTrySee = true;
                  }
                }else { // is_buy = 1表示购买过了
                  vthis.showList = true;
                  vthis.showTrySee = false;
                  vthis.hasOrder =false
                }
              }
              vthis.info = response;

              for(let i = 0; i < response.sections.length; i++){
//                response.sections[i].update_time = vthis.formatTime(response.sections[i].update_time);
                response.sections[i].update_time = response.sections[i].update_time;
              }
              vthis.sections = response.sections;
              document.title = response.name;
              vthis.recordWatchNum(videoId);
              vthis.weLoadEnd();
              vthis.showCommentBtn(videoId);

            }
        },res => {
            zzhJs.console.log(res);
        })
      },
      // 记录用户的浏览量
      recordWatchNum(id){
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/look.action',
          {
            product_id:id
          }).then(res => {

        },res => {
          zzhJs.console.log(res);
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

      // 修改前 start
//      changeTab() {
//        this.showList = !this.showList;
//      },
      // 修改前end

      // 修改后start
      changeTab(num){
        let vthis =  this;
        this.showList = num;
        if (num == 2) {
          vthis.commentInfo = [];
          this.getComment();
        }
      },
      // 修改后end

      play(id,index,item) {
        let vthis = this;
        this.video_index = index;
        if (this.info.is_buy == 1) { // 表示购买过
          if (zzhJs.env.isInApp()) {
            zzhJs.env.callVideoPlay(id);
          } else {
            this.$router.push({name:'subject.video.play',params:{id:id, sectionIndex:index}})
          }
        } else { // 表示未购买过
           if (this.info.price_curr ==  0) { // 如果当前价格为0 ，则直接视为免费的
             if (zzhJs.env.isInApp()) {
               zzhJs.env.callVideoPlay(id);
             } else {
               this.$router.push({name:'subject.video.play',params:{id:id, sectionIndex:index}})
             }

             return;
           }
          if (item.is_play == 1) {
            // 检测页面是否嵌在app中，若是，则调起原生的播放，若不是，则调起H5的播放
            if (zzhJs.env.isInApp()) {
              zzhJs.env.callVideoPlay(id);
            } else {
              this.$router.push({name:'subject.video.play',params:{id:id, sectionIndex:index}})
            }
          } else {
            this.weNotify('您暂时还没有权限播放，请先订阅！');
          }
        }
      },
//      调到支付页
      showPay(id,is_give){
        // 判断是否内嵌在app中，若是，则调用app的支付页
        if (zzhJs.env.isInApp()) {
          zzhJs.env.callPayment(id,is_give);
        } else {
          window.location.href = `${zzhJs.config.urlPayment}?#/?id=${id}&is_give=${is_give}&channel=video`;
        }

      },

      // 获取评价数据
      getComment(params,callback) {
        let vthis = this,
          paramsDeafult = {
            page_no:1,
            page_size:vthis.num,
            product_id:vthis.info.id
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
            window.location.href = zzhJs.config.urlSubjectCommentPage + '?#/' + id + '/video';
//            vthis.canEvaluate = true;
          } else { // 不可以评价
//            vthis.canEvaluate = false;
            vthis.weNotify(res.body.data.msg);
          }
        },res => {
          zzhJs.console.log(res);
        })
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

      // 试看
      tryPlay(info) {
        console.log(info);
        info.sections.forEach((item, index) => {
          if (item.is_play == 1) {
            this.$router.push({name:'subject.video.play', params:{id:info.id, sectionIndex:index}})
          }
        })
      },


      refresh(done) {
        let vthis = this;
        this.counter = 1;
        if (this.showList == 2) { // 只有当显示的页面为评论的时候，才会去请求评论的数据
          vthis.commentInfo = [];
          this.getComment({page_no:this.counter},done);
        }
        done();
      },

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

      // 监听scrollTop的值
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