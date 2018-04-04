<template>
  <div class="article-detail-view" @touchstart="moveStart($event)"  @touchend="moveEnd($event)" @click="allCommentNotTyping">
    <!--作者的信息-->
    <div class="author-info-wrap">
      <div class="head-img" @click="showTeacherInfo(consult_teacher.id)"><img :src="consult_teacher.avatar"/></div>
      <div class="teacher-info-wrap">
        <p class="teacher-name">{{consult_teacher.name}}</p>
        <p class="teacher-title">{{consult_teacher.grade}}</p>
      </div>
      <div class="btn-concern" @click="concern(consult_teacher.id)" v-text="concern_text = consult_teacher.is_attention == 1 ? '已关注':'关注'"></div>
    </div>
    <!--文章的详情-->
    <div class="article-detail">
      <p class="article-title">{{articleInfo.title}}</p>
      <p class="article-author">作者：{{authorInfo.name}}</p>
      <div class="sub-wrap">
        <p class="uadate-time"><span style="margin-right: 0.1rem;">发表于</span>{{articleInfo.updateTime | formatDate('YYYY-MM-DD')}}</p>
        <span style="margin: 0 0.1rem;">/</span>
        <p class="page-view"><span style="margin-right: 0.1rem;">阅读量</span>{{articleInfo.lookNum}}</p>
      </div>
      <div class="article-img"><img :src="articleInfo.titleImg"></div>
      <div class="article-con" v-html="articleInfo.txt"></div>
    </div>
    <!--热门课程推荐-->
    <div class="hot-course-area">
      <p class="hot-title">热门课程</p>
      <ul class="hot-course-list">
        <template v-for="item in hotCourse">
          <li @click="showCourseDetail(item)">
            <div class="course-img"><img :src="item.img_min"/></div>
            <div class="course-intro">
              <div>
                <p class="course-title">{{item.name}}</p>
                <p class="course-intro-info">{{item.intro}}</p>
              </div>
              <div class="course-intro-bottom">
                <p class="has-update" v-if="item.price_curr == 0">已更新{{item.update_section}}节|{{item.sell_num}}人浏览</p>
                <p class="has-update" v-else>已更新{{item.update_section}}节|{{item.sell_num}}人订阅</p>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>

    <!--评论部分-->
    <div class="article-comment-area">
      <div class="comment-title">全部评论 <span>({{articleInfo.reviewNum}})</span></div>
      <div class="input-wrap">
        <div class="input-box" :class="{ down: typingTopLevelComment }" @click.stop>
          <textarea class="input_comment" @focus="typingTopComment" name="content" v-model="userCommentContent" placeholder="点这里，说两句"></textarea>
          <a href="javascript:;" @click="submitTopLevelComment">完成</a>
        </div>
      </div>
      <div class="comment-items-wrap">
        <template v-for="(item, index) in comments">
          <div class="article-comment" v-if="comments.length != 0 && index < 3">
            <div class="comment-title-bar">
              <div class="comment-user-info">
                <div class="comment-user-head"><img :src="item.avatar"/></div>
                <div>
                  <p class="comment-user-name">{{item.name}}</p>
                  <p class="comment-user-id">{{item.intro}}</p>
                </div>
              </div>
            </div>
            <div class="comment-info">
              <p class="comment-con" @click="typingCommentReply(item,index)">{{item.content}}</p>
              <div class="comment-reply" :class="{down: isShowReply == index}">
                <div class="input-box " :class="{down: typingChildComment}" @click.stop>
                  <textarea class="input_comment reply-input" name="content" v-model="userReplyContent" @focus="typingCommentReply(item, index)" :placeholder="replyTo"></textarea>
                  <a href="javascript:;" @click="replyItem(item, index)">完成</a>
                </div>
                  <div class="reply-items">
                    <template v-for="list in item.answer">
                      <p><span class="reply-name">{{list.name}}:</span>{{list.content}}</p>
                    </template>
                  </div>
                </div>
                <div class="comment-bottom-info">
                  <p class="comment-time">{{ item.create_time | timeAgo}}</p>
                  <div>
                    <span class="like-num" @click="giveThumbsUpToComment(item)" :class="{'like-active':item.is_like == 1}"><i class="iconfont icon-zan" :class="{'like-active':item.is_like == 1}" style="margin-right: 0.1rem"></i>{{item.like_num}}</span>
                    <span class="reply-num" @click="showCommentReply(index)"><i class="iconfont icon-pinglun"  style="margin-right: 0.1rem"></i>{{item.answer_num}}</span>
                  </div>
                </div>
              </div>
            </div>
        </template>
      </div>

      <div class="btn-look-all-comment" @click="showComment" v-if="comments.length != 0">查看全部评论</div>
    </div>

    <!--更多精彩（推荐的文章）-->
    <div class="hot-article-area">
      <p class="hot-title">更多精彩</p>
      <ul class="hot-aritcle-list">
        <template v-for="(item, index) in moreArticle">
          <li @click="showArticleDetail(item)" v-if="index <= 2">
            <div class="article-img"><img :src="item.img"/></div>
            <div class="article-info">
              <p class="article-title">{{item.name}}</p>
              <div class="read-info">
                <p class="article-author">作者：{{item.teacher.name}}</p>
                <div class="icon-wrap">
                  <span style="margin-right: 0.2rem;"><i class="iconfont icon-pinglun" style="vertical-align: middle;margin-right: 0.1rem;"></i>{{item.review_num}}</span>
                  <span><i class="iconfont icon-read-num" style="margin-right: 0.05rem;"></i>{{item.look_num}}</span>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>

    <!--底部的文章点赞、评论、收藏-->
    <transition name="fade">
      <div class="footer-bar" v-if="isShowFooterBar">
        <div @click="giveThumbsUp(articleInfo.id)" :class="{'like-active':articleInfo.isLike == 1}"><i class="iconfont icon-zan"></i><span>{{articleInfo.likeNum}}</span></div>
        <div @click="showComment"><i class="iconfont icon-pinglun"></i><span>{{articleInfo.reviewNum}}</span></div>
        <div @click="storeArticle(articleInfo.id)" :class="{'like-active':articleInfo.isCollect == 1}"><i class="iconfont icon-store2"></i><span>{{articleInfo.collectNum}}</span></div>
      </div>
    </transition>
    <div v-show="false">{{wordNum}}</div>
  </div>
</template>

<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
.article-detail-view{
  width: 100%;min-height:100vh;background: #f6f6f6;
  .author-info-wrap{
    width: 100%;height: 1.8rem;border-bottom: 0.01rem solid #f3f3f3;padding-left: 0.3rem;padding-right: 0.3rem;display: flex;justify-content: space-between;align-items: center;
    background: #fff;
    .head-img{
      width: 0.88rem;height: 0.88rem;border-radius: 50%;background:url("../../assets/image/icon_head.png") no-repeat center;background-size:100%;flex-shrink:0;overflow: hidden;
      img{
        width: 100%;display: block;
      }
    }
    .teacher-info-wrap{
      flex-shrink: 1;font-size: 0.32rem;width: 100%;margin-left: 0.3rem;color:#3f3f3f;
      .teacher-title{
        color: #999;font-size: 0.24rem;margin-top: 0.2rem;
      }
    }
    .btn-concern{
      width: 1.2rem;border-radius: 1rem;text-align: center;line-height: 0.6rem;flex-shrink:0;font-size: 0.28rem;color: #fff;background: #3bc0c3;
    }
  }
  .article-detail{
    width: 100%;padding-top: 0.5rem;padding-bottom: 0.7rem;padding-left: 0.4rem;padding-right: 0.4rem;margin-bottom: 0.2rem;background: #fff;
    .article-title{
      font-size: 0.36rem;color: #3f3f3f;line-height: 0.6rem;text-align: center;
    }
    .article-author{
      font-size: 0.26rem;color: #666;text-align: center;margin-top: 0.36rem;
    }
    .sub-wrap{
      width: 100%; height: 0.66rem;display: flex;justify-content: center;align-items: center;font-size: 0.22rem;color: #999;
    }
    .article-img{
      width: 100%;border-radius: .08rem;margin-top: 0.5rem;margin-bottom: 0.2rem;
      background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;overflow: hidden;
      img{
        width: 100%;border-radius: .08rem;
      }
    }
    .article-con{
      font-size: 0.28rem;line-height: 0.56rem;color: #232323;
      img{
        width: 100%;height:auto;margin: .25rem 0;display: block;
      }
    }
  }

  .hot-title,.comment-title{
    width: 100%;height: 0.74rem;padding-left: 0.3rem;font-size: 0.36rem;color: #333;line-height: 1rem;
  }
  .hot-course-area{
    width: 100%;background: #fff;margin-bottom: 0.2rem;
    .hot-course-list{
      width: 100%;
      &>li{
        width: 100%; height: 2.45rem;padding: 0.4rem 0.3rem;border-bottom: 0.01rem solid #f3f3f3;display: flex;justify-content: flex-start;align-items: center;
        .course-img{
          width: 2.2rem;height: 1.64rem;border-radius:0.08rem;overflow:hidden;flex-shrink: 0;margin-right: 0.3rem;
          background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
          img{
            width: 100%;
          }
        }
        .course-intro{
          width: 100%; height: 100%;display: flex;flex-direction: column;justify-content: space-between;font-size: 0.26rem;color: #717171;
          .course-title{
            line-height: 0.6rem;font-size: 0.30rem; color: #2a2a2a;
            display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 1;
          }
          .course-intro-info{
            font-size: 0.26rem;color: #666;line-height: 0.36rem;
            display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;
          }
        }
        .course-intro-bottom{
          display: flex;justify-content: space-between;font-size: 0.24rem;color: #999;
        }
      }
    }
  }

  .article-comment-area{
    width: 100%;background: #fff;min-height: 2.37rem;border-bottom: 0.01rem solid #f3f3f3;margin-bottom: 0.2rem;
    .input-wrap{
      background: white; padding: .3rem;
    }
    .input-box{
      width: 100%; height: .8rem; transition: all ease .3s; position: relative; overflow: hidden; background: #ececec; border-radius: 0.1rem;

      a {
        opacity: 0; display: inline-block; position: absolute; bottom: .2rem; right: .2rem; color: white; background: #47c0c2;
        font-size: .28rem; width: 1.2rem; border-radius: .1rem; text-align: center; line-height: .6rem; transform: scale(0);
        transition: all ease .3s;
      }

      &.down {
        height: 2rem;
      }

      &.down a{
        opacity: 1; transform: scale(1);
      }

      .input_comment {
        display:block; width: 100%; background: transparent; border: none;
        outline: none; font-size: 0.3rem;color: #999;
        resize: none; padding: 0.2rem;
        height: 1rem;
        /*min-height: 100%;*/
      }
      textarea::-webkit-input-placeholder { /* WebKit browsers */
        color:#999;
      }
      textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
      }
      intextareaput::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
      }
      textarea:-ms-input-placeholder { /* Internet Explorer 10+ */
        color:#999;
      }
    }

    .article-comment{
      width: 100%; padding: .2rem .3rem; border-bottom: 0.01rem solid #f3f3f3;
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
        background: url("../../assets/image/icon_head.png") no-repeat center;background-size: 100%;
        &>img{
          width: 100%;display: block;
        }
      }
      .comment-user-name{color: #666;font-size: 0.24rem;line-height: 0.4rem;}
      .comment-user-id{color: #999;font-size: 0.24rem;}
      .comment-grade{
        height: 100%;flex-shrink: 0;display: flex;justify-content:flex-start;align-items: center;
        &>li{
          font-size: 0.45rem;color: #ffd02b;
        }
      }
      .comment-info{
        padding-left:0.8rem;

        &>p{ margin-top: .1rem; margin-bottom: .3rem; }

        .comment-con {
          color: #333;font-size: 0.26rem; margin-bottom: .2rem;
        }
        .comment-bottom-info {
          display: flex; justify-content: space-between;
          &>div{ display: table-cell; }
          &>div>span{ display: table-cell; overflow: hidden; height: .4rem; vertical-align: middle; border-right: .3rem solid white; }
        }
        .comment-time{
        }
        .like-num,.reply-num,.comment-time,.icon-zan,.icon-pinglun{
          font-size: 0.24rem;color: #999;
        }
        .comment-reply{
          background: #eeeeee;color: #333; margin-top: 0.2rem; border-radius: 0.07rem;word-break:break-all; font-size: 0.26rem;
          transition: all ease .3s; overflow: hidden; height: 0;

          .reply-name{
            color: #3abfc3;margin-right: 0.2rem;
          }

          &.down {
            height: auto; margin-bottom: .2rem;
          }
        }
        .reply-items {
          &>p {
            padding: .2rem .2rem 0 .2rem;
          }

          &>p:last-child {
            padding-bottom: .2rem;
          }

        }
      }
    }

    .btn-look-all-comment{
      width: 100%;height: 1.2rem;font-size: 0.3rem;color: #333;text-align: center;line-height: 1.2rem;
    }
  }

  .hot-article-area{
    width: 100%;background: #fff;padding-bottom: 1.2rem;
    .hot-aritcle-list{
      &>li{
        width: 100%;height: 2.27rem;border-bottom: 0.01rem solid #f4f4f4;padding-right: 0.3rem;padding-left: 0.3rem;display: flex;justify-content: flex-start;align-items: center;
        .article-img{
          width: 2.18rem;height: 1.62rem;background: pink;border-radius: .06rem;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;overflow: hidden;
          display: flex;justify-content: center;margin-right: 0.3rem;
          img{
            height: 100%;min-width: 100%;
          }
        }
        .article-info{
          width: 4.38rem;height: 1.62rem;display: flex;flex-direction: column;justify-content: space-between;
        }
        .article-title{
          font-size: 0.30rem;color: #2a2a2a;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 0.4rem;
        }
        .read-info{
          width: 100%; display: flex;justify-content: space-between;
          .article-author{
            font-size: 0.24rem;color: #999;
          }
          .icon-wrap{
            @extend .article-author
          }
        }
      }
    }

  }

  .footer-bar{
    width: 100%;height: 0.98rem;border-top: 0.01rem solid #f3f3f3;background: #fff;display: flex;justify-content: space-around;align-items: center;position: fixed;bottom: 0;left: 0;
    font-size: 0.24rem;color: #999;
    .icon-zan,.icon-pinglun,.icon-store2{
      font-size: 0.36rem;margin-right: 0.1rem;
    }
    &>div{
      height: 100%;line-height: 0.98rem;
    }
    &>div>span{
      vertical-align: top;
    }
  }
  .like-active,.store-active{
    color: #3abfc3 !important;
  }

  .fade-enter-active,.fade-leave-active{
    transition: opacity 0.3s;
  }
  .fade-enter,.fade-leave-to{
    opacity:0;
  }

  .slide-enter-active,.slide-leave-active{
    transition: all .3s;
  }
  .slide-enter,.slide-leave-to{
    transform: translateY(-10px);
    opacity: 0;
  }

  input[type=button],
  input[type=submit],
  input[type=file],
  input[type=text],
  button,textarea,div{
    cursor: pointer;
    /*去除系统默认样式*/
    -webkit-appearance: none;
    /*点击高亮的颜色*/
    -webkit-tap-highlight-color:rgba(255,255,255,0);
  }

}
</style>

<script>

  export default {
    data() {
      return {
        articleInfo:{
          id:'',
          title:'',
          intro:'',
          titleImg:'',
          updateTime:'',
          txt:'',
          isLike:0,
          isCollect:0,
          lookNum:'',
          likeNum:0,
          collectNum:0,
          reviewNum:0,
        },
        userInfo:null,
        authorInfo:{
          name:'',
          id:''
        },
        consult_teacher:{},
        concern_text:'关注',
        hotCourse:[],// 热门课程
        moreArticle:[],//更多精彩
        comments:[], // 评论的内容
        isShowFooterBar:false,
        isShowReply:-1,
        startX:'',
        startY:'',
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
        config:{},
        userCommentContent: '',
        userReplyContent:'',
        typingTopLevelComment: false,
        typingChildComment: false,
        replyTo:'点这里，说点什么',
        isCommiting:false,
      }
    },
    mounted() {
//      document.title = '载入中…';
      document.title = '文章详情';
      this.getArticleDetail();
      this.getJssign();
//      this.setShare();

    },
    computed:{
      wordNum() { // 时时计算输入的回复字数是否够300了
        if (this.userReplyContent.length >= 300) {
          this.userReplyContent = this.userReplyContent.substr(0,300);
          this.weNotify('字数不可以超过300字哦！');
        }
        return this.userReplyContent.length;
      }
    },
    methods: {
      allCommentNotTyping() {
        this.typingTopLevelComment = false;
        this.typingChildComment = false;
        this.replyTo = '点这里，说点什么';
      },

      // 获取用户信息
      getUserInfo() {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/user/info.action').then(res => {
          vthis.userInfo = res.body.data;
        }, res => {

        })
      },

      //顶部评论框获取焦点
      typingTopComment() {
        let vthis = this;

        this.typingChildComment = false;

        if (zzhJs.env.isLogined()) {
          this.typingTopLevelComment = true;
        } else {
          zzhJs.env.callLogin();
        }
        if (!this.userInfo) {
          this.getUserInfo();
        }

      },

      typingCommentReply(item, index){
        this.userReplyContent = '';
        this.typingTopLevelComment = false;
        this.isShowReply = index;
        this.typingChildComment = true;
        this.replyTo = '回复 '+ item.name+':';
        if ( !this.userInfo) {
          this.getUserInfo();
        }

      },

      getArticleDetail() {
        let articleId = this.$route.params.id,
            vthis = this;
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/article/detail.action',
          {
            article_id:articleId,
          }).then(res => {
            let response = res.body.data;
            vthis.articleInfo.title = response.title;
            vthis.articleInfo.id = response.id;
            vthis.articleInfo.updateTime = response.update_time;
            vthis.articleInfo.txt = response.txt;
            vthis.articleInfo.lookNum = response.look_num;
            vthis.articleInfo.titleImg = response.title_img;
            vthis.authorInfo.name = response.teacher.name;
            vthis.authorInfo.id = response.teacher.id;
            vthis.articleInfo.isLike = response.is_like;
            vthis.articleInfo.isCollect = response.is_collect;
            vthis.articleInfo.likeNum = response.like_num;
            vthis.articleInfo.collectNum= response.collect_num;
            vthis.articleInfo.reviewNum= response.review_num;

            vthis.consult_teacher = response.teacher;

            vthis.config = {
              title:response.title,
              desc:response.intro,
              img_url:response.title_img,
              link:window.location.href
            }

            vthis.hotCourse = response.course;
            vthis.moreArticle = response.article;

            vthis.weLoadEnd();
            vthis.getArticleComment(response.id);
              vthis.setShare();


        },(res) => {
//            weConsole.log(res);
        })

      },
      // 关注某老师
      concern(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/consult/attention.action',
          {
            counselor_id:id,
        }).then(res => {
          vthis.consult_teacher.is_attention = res.body.data.is_attention
          vthis.weNotify(res.body.msg);
        }, res=>{

        })
      },

      moveStart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startY = e.changedTouches[0].clientY;
      },

      moveEnd(e) {
        let endX = e.changedTouches[0].clientX,
            endY = e.changedTouches[0].clientY;
        let disX = endX - this.startX,
            disY = endY - this.startY;

        if (Math.abs(disY) > Math.abs(disX) && disY > 0) {  // 向下滑
          this.isShowFooterBar = true;
        } else if (Math.abs(disY) > Math.abs(disX) && disY < 0) { // 向上滑
          this.isShowFooterBar = false;
        }

      },
      // 点赞文章
      giveThumbsUp(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/article/like.action',
          {
            article_id:id
          }).then(res => {
            let response = res.body.data;
          vthis.articleInfo.likeNum = response.count_like;
          vthis.articleInfo.isLike = response.is_like;
        },res => {

        })
      },
      // 展示文章的所有评论
      showComment() {
        this.$router.push({name:'article.comments',params:{id:this.articleInfo.id}});
      },
      // 展示评论的回复
      showCommentReply(index) {
        this.isShowReply = index;
        this.replyTo = '点这里，说点什么';
        this.userReplyContent = '';
      },
      // 收藏该文章
      storeArticle(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/article/collect.action',
          {
            article_id:id
          }).then(res => {
          let response = res.body.data;
          vthis.articleInfo.collectNum = response.count_collect;
          vthis.articleInfo.isCollect = response.is_collect;
        },res => {

        })
      },

      // 提交文章评论 article_id（评论文章的时候传） 和parent_id（回复某一条评论的时候传）二选一
      submitTopLevelComment() {
        let vthis = this;

        if (this.isCommiting){
          return;
        }

        this.isCommiting = true;
        this.typingTopLevelComment = true;
        // 提交之前先判断是否可以评价
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/article/is_evaluate.action',
          {
            article_id:vthis.articleInfo.id
          }).then(res => {
           if (res.body.data.is_evaluate == 0) {
              vthis.isCommiting = false;
              return vthis.weNotify(res.body.msg);
            }
          this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/article/create.action',
            {
              article_id:vthis.articleInfo.id,
              content:vthis.userCommentContent,
              parent_id:'',
            }).then(res => {

            if (res.body.status == 501) {
              vthis.isCommiting = false;
              return vthis.weNotify(res.body.msg);
            }

            let commentId = res.body.data.article_evaluate_id;
            let commentInfo = {
              answer:[],
              answer_num:0,
              id:commentId,
              avatar:vthis.userInfo.avatar,
              content:vthis.userCommentContent,
              create_time:'刚刚',
              intro:'普通用户',
              is_like:0,
              is_remove:1,
              like_num:0,
              name:vthis.userInfo.name,
            }
            vthis.comments.unshift(commentInfo);
            vthis.typingTopLevelComment = false;
            vthis.userCommentContent = '';
            vthis.weNotify(res.body.msg);
            vthis.isCommiting = false;
          }, error => {
            console.info(error);
          })


        }, res => {

        })


      },

      // 写评论的回复
      replyItem(item, index) {
        let vthis = this;

        if (this.isCommiting) {
          return;
        }

        this.isCommiting = true;

        this.isShowReply = index;
        let $reply = document.querySelectorAll('.reply-input'),
        $newText = document.querySelectorAll('.reply-items');
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/article/create.action',
          {
            article_id:'',
            content:vthis.userReplyContent,
            parent_id:item.id,
          }).then(res => {

            if (res.body.status == 501) {
              vthis.isCommiting = false;
              return vthis.weNotify(res.body.msg);
            }
            let replyNew = {
              content:vthis.userReplyContent,
              name:vthis.userInfo.name,
            }
            vthis.comments[index].answer.unshift(replyNew);
            item.answer_num++;
            vthis.userReplyContent = '';
            vthis.typingChildComment = false;
            vthis.weNotify(res.body.msg);
            vthis.isCommiting = false;
        }, res => {

        })
      },

      // 获取文章的评论
      getArticleComment(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/article/index.action',
          {
            article_id:id,
          }).then(res => {
            vthis.comments = res.body.data;

        },res => {

        })
      },

      //展示文章详情
      showArticleDetail(item) {
        this.$router.replace({name:'article.detail',params:{id:item.id}});
        window.location.reload();
      },
      // 展示课程的详情
      showCourseDetail(item) {

        if (zzhJs.env.isInApp()) {
          if (item.type == 1) { // 音频
            zzhJs.env.callAudioDetail(item.id)
          } else { // 视频
            zzhJs.env.callVideoDetail(item.id)
          }

        } else {
          if (item.type == 1) { // 音频
            window.location.href = zzhJs.config.urlAudioList + '?#/' + item.id;
          } else { // 视频
            window.location.href = zzhJs.config.urlVideoList + '?#/' + item.id;
          }
        }

      },
      // 计算多久之前的时间
//      timeAgo(timeStamp){
//        let nowTime = new Date().getTime(), minute = 1000 * 60, hour = minute * 60, day = hour * 24, month = day * 30,
//          diffTime = nowTime - timeStamp;
//        if (diffTime < 0) {
//          return;
//        }
//        let diffMin = Math.floor(diffTime / minute), diffHour = Math.floor(diffTime / hour), diffDay = Math.floor(diffTime / day), diffMonth = Math.floor(diffTime / month);
//        if (diffMonth > 12) {
//          let year = new Date(timeStamp).getFullYear(), month = new Date(timeStamp).getMonth() + 1, date = new Date(timeStamp).getDate();
//          month = month > 10 ? month : '0'+ month;
//          date = date > 10 ? date : '0'+ date;
//          return year + '年' + month + '月' + date + '日';
//        }
//        if (diffDay >= 7) {
//          return new Date(timeStamp).getMonth() + 1 + '月' + new Date(timeStamp).getDate() + '日';
//        } else if (diffDay < 7 && diffDay >= 1){
//          return diffDay + '天前';
//        } else if (diffHour >= 1 && diffHour < 24){
//          return diffHour + '小时前';
//        } else if (diffMin >= 1 && diffMin < 60) {
//          return diffMin + '分钟前';
//        } else if (diffTime > 0 && diffTime < minute) {
//          return '刚刚';
//        }
//
//      },

      // 对评论进行点赞
      giveThumbsUpToComment(item) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/article/like.action',
          {
            evaluate_id:item.id,
        }).then(res => {
            item.is_like = res.body.data.is_like;
            item.like_num = res.body.data.count_like;
        }, res => {

        })
      },

      // 获取微信签名
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

      // 展示咨询师的详情页
      showTeacherInfo(id) {
        window.location.href = `${zzhJs.config.urlConsultList}?#/${id}`;
      }
    }
  }
</script>