<template>
  <div class="comment-page-view">
    <div class="comment-title-wrap">
      <p class="comment-title ft28">课程评价</p>
      <ul class="stars-wrap">
        <template v-for="item in 5">
          <li class="iconfont" :class="{'icon-unselect-star':selectedStarsIndex < item,'icon-selected-star':selectedStarsIndex >= item}" @click="selectStar(item)"></li>
        </template>
      </ul>
      <p class="discribe-text ft28">{{text}}</p>
    </div>
    <form id="form-info" @submit.prevent="submitComment()">
      <div class="write-comment-wrap">

          <p class="wirte-comment-title ft26">写点评价</p>
          <textarea class="write-wrap"  placeholder="期待您的评价，会对其他人帮助很大哦，至少8个字~" name="comment-con" v-model="commentContent"> </textarea>
          <p class="comment-text-num ft24"><span>{{wordNum}}</span>/<span>300</span></p>
      </div>
      <button class="btn-submit ft32" type="submit">提交</button>
    </form>
  </div>
</template>
<style lang="scss">
  @import "../style/app";
  @import "../../../assets/iconfont/iconfont.css";
  .ft20{font-size: 0.2rem} .ft24{ font-size: 0.24rem;} .ft26{font-size: 0.26rem;} .ft28{font-size: 0.28rem;} .ft30{font-size: 0.3rem;} .ft32{font-size: 0.32rem;}
  .color-zhizilv{color: #3abfc3;}
  .comment-page-view{
    width: 100%;
    .comment-title-wrap{
      width: 100%;height: 2.4rem;background: #fff;margin-bottom: 0.2rem;padding: 0.3rem;
      .stars-wrap{
        width: 2.15rem;height: 0.3rem;margin: 0 auto;display: flex;justify-content: space-around;align-items: center;
        &>li{
          font-size: 0.4rem;color: #ffcf25;
        }
      }
      .discribe-text{
        color: #999;margin-top: 0.36rem;text-align: center;
      }
    }
    .write-comment-wrap{
      width: 100%;min-height:4rem;padding: 0.3rem;background: #fff;position: relative;
    }
    .comment-title,.wirte-comment-title{
      color: #333;
    }
    .write-wrap{
      display: block;width: 100%;min-height:3.7rem;background: #fff;border: 0;margin-top: 0.3rem;color: #999;font-size: 0.26rem;
    }
    .comment-text-num{
      position: absolute;right: 0.4rem;bottom: 0.3rem;color: #999;
    }
    .btn-submit{
      width: 3.4rem;height: 0.8rem;background: #3abfc3;border-radius: 0.08rem;text-align: center;line-height: 0.8rem;color: #fff;margin: 1.9rem auto 0;outline: none;border: none;display: block;
    }
    textarea::-webkit-input-placeholder { /* WebKit browsers */
      color:#999;
      font-size:0.24rem;

    }
    textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #999;
      font-size:0.24rem;
    }
    textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #999;
      font-size:0.24rem;
    }
    textarea:-ms-input-placeholder { /* Internet Explorer 10+ */
      color:#999;
      font-size:0.24rem;
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
      outline:none;
    }


  }
</style>
<script>
  export default{
    data() {
      return {
        productId:'',
        selectedStarsIndex:5, // 默认是五星好评
//        selectedStarsIndex:-1,
        commentContent:'',
        text:'您觉得课程还不错的话就打五星哦~',
        channel:null,
      }
    },
    mounted() {
      document.title = '评价';
      this.productId = this.$route.params.id;
      this.channel = this.$route.params.channel;
      if (this.channel == 'audio' || this.channel == 'video') {
        this.text = '您觉得课程还不错的话就打五星哦~';
      } else if(this.channel == 'consult'){
        this.text = '您觉得咨询还不错的话就打五星哦~';
      }
    },
    computed:{
      wordNum(){
        if ((this.commentContent.trim()).length >= 300){
          this.commentContent = this.commentContent.substr(0,300);
          this.weNotify('评价最多300字哦！');
        }
        return (this.commentContent.trim()).length;
      }
    },
    methods:{
      selectStar(item) {
        this.selectedStarsIndex = item;
      },
      submitComment() {
        let vthis = this;
        if (this.selectedStarsIndex <= -1) {
          return this.weNotify('您还没打星哦！');
        }
        if ((this.commentContent.trim()).length < 8) {
          return this.weNotify('写点评价吧，至少8个字！');
        }

        let content = vthis.commentContent.trim();

        if (this.channel == 'audio' || this.channel == 'video') {
          this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/create.action',
            {
              product_id:vthis.productId,
              content:content,
              grade:vthis.selectedStarsIndex
            }).then(res => {
            vthis.weNotify(res.body.msg);
            window.history.go(-1);

          },res => {
            zzhJs.console.log(res);
          })
        } else if(this.channel == 'consult') {
          this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/consult/create.action',
            {
              counselor_id:vthis.productId,
              content:content,
              grade:vthis.selectedStarsIndex
            }).then(res => {
            vthis.weNotify(res.body.msg);
            window.history.go(-1);
          },res => {
            zzhJs.console.log(res);
          })
        }


      }
    }
  }
</script>