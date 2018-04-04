<template>
  <div class="my-store-view">
    <ul class="store-article-list">
      <template v-for="item in storeList">
        <li @click="showDetail(item)">
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
    <p class="noInfo" v-if="noInfo">暂无收藏</p>
  </div>
</template>
<style lang="scss">
  @import '../../../assets/iconfont/iconfont.css';
.my-store-view{
  width: 100%;min-height: 100vh;background: #fff;
  .store-article-list{
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
        -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 0.6rem;
      }
      .read-info{
        width: 100%; display: flex;justify-content: space-between;
        .article-author{
          font-size: 0.24rem;color: #949494;
        }
        .icon-wrap{
          @extend .article-author
        }
      }
    }
  }
  .noInfo{
    font-size: 0.4rem;color: #ccc;text-align: center;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);
  }
}
</style>
<script>
  export default {
    data() {
      return {
        storeList:[],
        noInfo:true
      }
    },
    mounted() {
      document.title = '我的收藏';
      this.getStoreData();
    },
    methods:{
      getStoreData() {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/user/my_collect.action').then(res => {
          vthis.storeList = res.body.data;
          if (res.body.data.length > 0) {
            vthis.noInfo = false;
          }
        }, res => {

        })

      },
      showDetail(item) {
        window.location.href = zzhJs.config.urlArticleList + '?#/' + item.id;
      }
    }
  }
</script>