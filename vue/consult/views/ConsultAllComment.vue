<template>
  <div class="detail-wrap">
    <div class="video-play-list-wrap" >
      <!--详情的评论-->
      <div class="detail-comment">
        <div class="comment-nav-title">
          <p class="all-comments-num">全部评论<span class="ft28">({{commentInfo.length}}条)</span></p>
          <p class="ft28 take-comment" @click="goComment(consult_id)">我要评价</p>
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
            <!--<p class="comment-reply ft26" v-if="item.answer_info.content"><span class="reply-name ft26">{{item.answer_info.name}}:</span>{{item.answer_info.content}}</p>-->
            <p class="comment-time ft24">{{item.create_time | timeAgo}}</p>
          </div>
        </div>

        <div class="no-comments-area" v-if="!commentInfo.length">
          <p class="ft32">暂无评论</p>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
  .detail-wrap{
    width: 100%;min-height:100vh;background: #fff;
    .ft20{font-size: 0.2rem} .ft24{ font-size: 0.24rem;} .ft26{font-size: 0.26rem;} .ft28{font-size: 0.28rem;} .ft30{font-size: 0.3rem;} .ft32{font-size: 0.32rem;}
    .color-zhizilv{color: #3abfc3;}
    img{
      width: 100%;
    }

    .video-play-list-wrap{
      width: 100%;

      .detail-comment{
        width: 100%;
        .comment-nav-title{
          width: 100%; height:1rem;display: flex;justify-content: space-between;align-items: center;padding-left: 0.3rem;padding-right: 0.3rem;
          .all-comments-num,.take-comment{
            font-size: 0.28rem;
          }
          .all-comments-me{
            font-size: 0.28rem;
            color: #3abfc3;
            line-height: .56rem;
            border: 1px solid #3abfc3;
            padding: 0 20px;
            border-radius: 19px;
          }
          .take-comment{
            color: #3abfc3;line-height: 1rem;
          }
        }
        .comment-title-bar{
          width:100%;height: 1rem;display: flex;justify-content: space-between;align-items: center;
        }
        .comment-area{
          margin-bottom: 0.2rem;padding-left: 0.3rem;padding-right: 0.3rem;
        }
        .comment-user-info{
          height: 100%;display: flex;justify-content: flex-start;align-items: center;
        }
        .comment-user-head{
          width: 0.6rem;height: 0.6rem;border-radius: 50%;overflow: hidden;background: url(../../assets/image/icon_head.png) no-repeat center;margin-right: 0.2rem;flex-shrink: 0;
          background-size: 100%;
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
          width: 100%;background: #fff;color: #cacaca;position: absolute;left: 50%;top:50%;transform: translate(-50%, -50%);
          &>p{
            text-align: center;line-height: 5rem;
          }
        }
      }
    }

  }
</style>
<script>
  export default{
    data (){
      return {
        totalComments:0,
        commentInfo:[],
        consult_id:'',
      }
    },
    created() {
    },
    mounted() {
      let vthis = this;
      this.consult_id = this.$route.params.id;
      this.getData();

    },
    methods: {
      getData() {
        let vthis = this;
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/consult/index.action',
          {
            counselor_id:vthis.consult_id
          }).then(res => {
            vthis.commentInfo = res.body.data;
            vthis.weLoadEnd();

        },res => {
          zzhJs.console.log(res);
        })
      },

      goComment(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/consult/is_evaluate.action',
          {
            counselor_id:vthis.consult_id
          }).then(res => {
            if (res.body.data.is_evaluate == 0) {
              return this.weNotify(res.body.data.msg);
            }
          window.location.href = zzhJs.config.urlSubjectCommentPage + '?#/'+ id + '/consult';
        },res => {

        })
      }

    }
  }
</script>