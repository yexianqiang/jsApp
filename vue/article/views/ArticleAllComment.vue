<template>
  <div class="article-comment-views" @click="allCommentNotTyping">
    <p class="comment-title">全部评论({{comments.length}})</p>
    <!--<div class="article-comment">
      <div class="comment-title-bar">
        <div class="comment-user-info">
          <div class="comment-user-head"><img src=""/></div>
          <div>
            <p class="comment-user-name">利益利益利益</p>
            <p class="comment-user-id">普通用户</p>
          </div>
        </div>
      </div>
      <div class="comment-info">
        <p class="comment-con">沙发沙发沙发发放</p>
        <transition name="slide">
          <div class="comment-reply"  v-show="isShowReply">
            <input type="text" placeholder="写点什么吧!" class="reply-input">
            <div class="reply-items">
              <p class=""><span class="reply-name">sdf:</span>阿斯顿发生发沙发沙发上算法啥时发沙发沙发垫萨达是法师法师法</p>
              <p class=""><span class="reply-name">阿斯蒂芬:</span>按时发达时发生发生大发发生大发发斯蒂芬撒旦法四方达是发送发生的发生大发发</p>
              <p class=""><span class="reply-name">沙发:</span>阿斯顿发生发沙发沙发上大法师法师法是发送发发发发大水发顺丰撒旦法</p>
              <p class=""><span class="reply-name">沙发:</span>阿什顿发发沙发沙发沙发沙发沙发沙发沙发沙发沙发上飞洒大法师法师法沙发沙发斯蒂芬</p>
            </div>
          </div>
        </transition>
        <div class="comment-bottom-info">
          <p class="comment-time">asdfasf</p>
          <div>
            <span class="like-num"><i class="iconfont icon-zan" style="margin-right: 0.1rem"></i>1</span>
            <span class="reply-num"><i class="iconfont icon-pinglun"  style="margin-right: 0.1rem"></i>222</span>
          </div>
        </div>
      </div>
    </div>-->


    <template v-for="(item, index) in comments">
      <div class="article-comment" v-if="comments.length != 0">
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
          <p class="comment-con" @click="typingCommentReply(item, index)">{{item.content}}</p>
          <transition name="slide">
            <div class="comment-reply"  :class="{down: isShowReply == index}">
              <div class="input-box " :class="{down:typingChildComment}" @click.stop>
                <textarea class="input_comment reply-input" name="content" v-model="userReplyContent" @focus="typingCommentReply(item, index)" :placeholder="replyTo"></textarea>
                <a href="javascript:;" @click="reply(item, index)">完成</a>
              </div>
              <div class="reply-items">
                <template v-for="list in item.answer">
                  <p class=""><span class="reply-name">{{list.name}}:</span>{{list.content}}</p>
                </template>
              </div>
            </div>
          </transition>
          <div class="comment-bottom-info">
            <p class="comment-time">{{item.create_time | timeAgo}}</p>
            <div>
              <span class="like-num" @click="giveThumbsUpToComment(item)" :class="{'like-active':item.is_like == 1}"><i class="iconfont icon-zan" :class="{'like-active':item.is_like == 1}" style="margin-right: 0.1rem"></i>{{item.like_num}}</span>
              <span class="reply-num" @click="showCommentReply(index)"><i class="iconfont icon-pinglun"  style="margin-right: 0.1rem"></i>{{item.answer_num}}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="false">{{wordNum}}</div>
    </template>
  </div>
</template>
<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
  .article-comment-views{
    width: 100%;background: #fff;
    .comment-title{
      width: 100%;height: 1.36rem;font-size: 0.3rem;color: #333;padding: 0 0.3rem;line-height: 1.36rem;border-bottom: 0.01rem solid #f3f3f3;
    }

    .input-wrap{
      background: white; padding: .3rem;
    }
    .input-box{
      width: 100%; height: .8rem; transition: all ease .3s; position: relative; overflow: hidden; background: #ececec; border-radius: 0.1rem;

      a {
        opacity: 0; display: inline-block; position: absolute; bottom: .2rem; right: .2rem; color: white; background: #47c0c2;
        font-size: .28rem; width: 1.2rem; border-radius: .1rem; text-align: center; line-height: .6rem; transform: scale(0);
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
      width: 100%;padding: 0 0.3rem;border-bottom: 0.01rem solid #f3f3f3;
      .comment-title-bar{
        width:100%;height: 1rem;display: flex;justify-content: space-between;align-items: center;margin-top: 0.2rem;
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
        padding-left:0.8rem;line-height: 0.4rem;
        .comment-con{
          color: #333;font-size: 0.26rem;
        }
        .comment-bottom-info{
          display: flex;justify-content: space-between;
        }
        .comment-time{
          margin-bottom: 0.3rem;margin-top: 0.3rem;
        }
        .like-num,.reply-num,.comment-time,.icon-zan,.icon-pinglun{
          font-size: 0.24rem;color: #999;
        }
        .like-active{
          color: #3abfc3;
        }
        .comment-reply{
          background: #eeeeee;color: #333;margin-top: 0.2rem;border-radius: 0.07rem;word-break:break-all;font-size: 0.26rem;
          transition: all ease .3s; overflow: hidden; height: 0;
          .reply-name{
            color: #3abfc3;margin-right: 0.2rem;
          }
          &.down {
            height: auto; margin-bottom: .2rem;
          }
        }

        .reply-items{
          padding: 0 0.2rem 0.2rem;
        }
        .slide-enter-active,.slide-leave-active{
          transition: all .3s;
        }
        .slide-enter,.slide-leave-to{
          transform: translateY(-10px);
          opacity: 0;
        }
      }
    }
  }
</style>
<script>
  export default {
    data(){
      return {
//        isShowReply:true,
        userInfo:{
          name:'',
          avatar:''
        },
        comments:[], // 评论的内容
        userCommentContent: '',
        userReplyContent:'',
        replyContent:false,
        isShowReply:-1,
        replyTo:'点这里，说点什么',
        typingChildComment: false,
        isCommiting:false,
      }
    },
    mounted() {
      document.title = '全部评论';
      let articleId = this.$route.params.id;
      this.getAllComment(articleId);
      this.getUserInfo();
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
    methods:{
      allCommentNotTyping() {
        this.typingChildComment = false;
        this.replyTo = '点这里，说点什么';
      },
      // 获取用户信息
      getUserInfo() {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/user/info.action').then(res => {
          vthis.userInfo.name = res.body.data.name;
          vthis.userInfo.avatar = res.body.data.avatar;
        }, res => {

        })
      },
      // 获取文章的评论
      getAllComment(id) {
        let vthis = this;

        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/article/index.action',
          {
            article_id:id,
          }).then(res => {
          vthis.comments = res.body.data;

        },res => {

        })
      },
      typingCommentReply(item, index){
        this.userReplyContent = '';
        this.replyTo = '回复 '+ item.name+':';
        this.typingChildComment = true;
        this.isShowReply = index;
      },
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
      // 展示评论的回复
      showCommentReply(index) {
        this.isShowReply = index;
        this.replyTo = '点这里，说点什么';
        this.userReplyContent = '';
      },
      // 写评论的回复
      reply(item, index) {
        let vthis = this;
        if (this.isCommiting){
          return;
        }
        this.isCommiting = true;
        this.isShowReply = index;
        let $reply = document.querySelectorAll('.reply-input'),
          $newText = document.querySelectorAll('.reply-items');
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/article/create.action',
          {
            article_id:'',
            content:vthis.userReplyContent.trim(),
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
          vthis.weNotify(res.body.msg);
          vthis.userReplyContent = '';
          vthis.typingChildComment = false;
          vthis.isCommiting = false;
        }, res => {

        })
      },
    }
  }
</script>