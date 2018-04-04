<template>
  <div class="article-views">
    <div class="nav-wrap">
      <ul class="nav-tag-wrap">
        <p class="all" :class="{'active':navSelected== -1}" @click="selectTags('',-1)">全部</p>
        <template v-for="(item,index) in tagList">
          <li :class="{'active':index == navSelected}" @click="selectTags(item.id,index)">{{item.name}}</li>
        </template>
      </ul>
    </div>
    <scroller style="padding-top: 1.2rem;" :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
    <ul class="read-list">
      <template v-for="item in articleList">
        <li @click="showArticleDetail(item)">
          <div class="article-img"><img :src="item.img"/></div>
          <div class="article-info">
            <p class="article-title">{{item.name}}</p>
            <div class="read-info">
              <p class="article-author">作者：{{item.teacher.name}}</p>
              <div class="icon-wrap">
                <span style="margin-right: 0.2rem"><i class="iconfont icon-pinglun" style="vertical-align: middle;margin-right: 0.1rem;"></i>{{item.review_num}}</span>
                <span><i class="iconfont icon-read-num" style="margin-right: .05rem;"></i>{{item.look_num}}</span>
              </div>
            </div>
          </div>
        </li>
      </template>
    </ul>
    </scroller>
  </div>
</template>
<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
.article-views{
  width: 100%;
  .nav-wrap{
    width: 100%;height: 1rem;background: #fff;margin-bottom: 0.2rem;::-webkit-scrollbar{width:0;height:0}
    display: flex;justify-content: flex-start;align-items: center;font-size: 0.24rem;padding-left: 0.2rem;padding-right: 0.2rem;
    position: relative;z-index: 10;
    .nav-tag-wrap{
      width: auto;overflow-x:auto;display: flex;justify-content: flex-start;align-items: center;
      .all{
        flex-shrink: 0;line-height: 1rem;font-size: 0.28rem;position: relative;
        &.active:after{
          content:'';position: absolute;width: 0.56rem;height: 0.04rem;background: #3bc1c4;left: 50%;bottom: 0;transform: translateX(-50%);
        }
      }
      &>li{
        font-size: 0.28rem;color: #232323;flex-shrink: 0;line-height:1rem;margin: 0 0.2rem;position: relative;
        &.active:after{
          content:'';position: absolute;width: 0.56rem;height: 0.04rem;background: #3bc1c4;left: 50%;bottom: 0;transform: translateX(-50%);
        }
      }
      /*.active{*/
        /*border-bottom: 0.04rem solid #3bc1c4;line-height: 0.9rem;*/
      /*}*/

    }
  }
  .read-list{
    width: 100%;background: #fff;
    &>li{
      width: 100%;height: 2.27rem;border-bottom: 0.01rem solid #f4f4f4;padding-right: 0.2rem;padding-left: 0.2rem;display: flex;justify-content: space-between;align-items: center;
      .article-img{
        width: 2.18rem;height: 1.62rem;background: pink;border-radius: .06rem;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;overflow: hidden;
        display: flex;justify-content: center;
        img{
         height: 100%;min-width: 100%;
        }
      }
      .article-info{
        width: 4.38rem;height: 1.62rem;display: flex;flex-direction: column;justify-content: space-between;
      }
      .article-title{
        font-size: 0.32rem;color: #2a2a2a;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
        -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 0.4rem;
      }
      .read-info{
        width: 100%; display: flex;justify-content: space-between;
        .article-author{
          font-size: 0.24rem;color: #949494;
        }
        .icon-wrap{
          @extend .article-author;min-width: 2rem; display: flex; justify-content: space-between;
        }
      }
    }
  }
}
</style>

<script>
  export default {
    data() {
      return {
        tagList:[],
        navSelected:-1,
        articleList:[],
        currentPageNum:1,
        pageSize:5,
        totalPage:1,
        currentTagId:'',
        isGettingData:false,
      }
    },
    mounted() {
      document.title = '推荐阅读';
      this.getArticleList();
    },
    methods:{
      getArticleList(params, callback) {
        let vthis = this;
        if (this.isGettingData) {
          return;
        }
        this.isGettingData = true;

        let defaultParams = {
          tag_id:'',
          page_no:1,
          page_size:vthis.pageSize
        }
        params = _.assign(defaultParams, params);
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/article/index.action',params).then(res => {
            let response = res.body.data;
            if (response.tag_list){
              vthis.tagList = response.tag_list;
            }

            response.article_list.forEach(function (e) {
              vthis.articleList.push(e);
            })
            vthis.totalPage = Math.ceil(response.total / vthis.pageSize);
            vthis.currentPageNum = response.page_no;
            vthis.weLoadEnd();
            vthis.isGettingData = false;
            if (callback) {
              callback();
            }

        },(res) => {
//            weConsole.log(res);
        })
      },
      showArticleDetail(item) {
        this.$router.push({name:'article.detail',params:{id:item.id}})
      },
      refresh(done) {
        let vthis = this;
        this.currentPageNum = 1;
        this.articleList = [];
        this.getArticleList({tag_id:vthis.currentTagId,page_no:1, page_size:vthis.pageSize}, done);

      },
      infinite(done) {
        let vthis = this;
        if (this.isGettingData) {
          setTimeout(function () {
            done();
          },500);
          return;
        }
        this.currentPageNum++;

        if (this.currentPageNum > this.totalPage) {
          setTimeout(function () {
            done(true);
          },500)
          return false;
        }
        this.getArticleList({tag_id:vthis.currentTagId, page_no:vthis.currentPageNum, page_size:vthis.pageSize}, done);

      },
      // 选择文章的标签
      selectTags(id,index) {
        let vthis = this;
        this.currentPageNum = 1;
        this.pageSize = 5;

        vthis.articleList = [];
        if (id) {
          this.getArticleList({tag_id:id, page_no:this.currentPageNum, page_size:this.pageSize});
        } else {
          this.getArticleList({tag_id:'', page_no:this.currentPageNum, page_size:this.pageSize});
        }
        vthis.navSelected = index;
        vthis.currentTagId = id;
      }
    }
  }
</script>