<template>
  <div class="list-view">
    <div class="tag-nav-wrap">
      <ul class="tag-nav">
        <p class="all" :class="{'active':navSelected == -1}" @click="selectTag('',-1)">全部</p>
        <template v-for="(item, index) in tags">
          <li :class="{active:index == navSelected}" @click="selectTag(item.id,index)">{{ item.name }}</li>
        </template>
      </ul>
    </div>

    <!--列表中需要改的-->
    <ul class="list-items">
      <template v-for="(item, key) in listData">
        <li class="item" @click="showDetail(item)">
          <div class="head-img"><img :src="item.avatar"/></div>
          <div class="item-con-wrap">
            <div class="expert-title">
              <p class="teacher-name">{{ item.name }}</p>
              <p class="job-title">{{ item.intro }}</p>
            </div>
            <div class="item-price-wrap">
              <p class="item-server">服务过{{ item.service_num }}次</p>
            </div>
          </div>

          <div class="price-good">
            <p class="item-price">{{item.tel_price}}元起</p>
            <p class="item-good">满意度{{ item.satisfaction }}%</p>
          </div>
        </li>
      </template>
    </ul>
    <a href="https://jinshuju.net/f/c2fbHL"><div class="btn-answer-question">免费答疑</div></a>
    <!--底部导航-->
    <footer-nav v-if="showNav"></footer-nav>
    <!--无内容的时候展示的-->
    <p class="show-no-info" v-if="noInfo">暂无内容</p>
  </div>
</template>

<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
  .list-view{
    width:100%;min-height:100vh;padding: 0 0 0.97rem;background: #fff;
    img{
      width: 100%;
    }
    .tag-nav-wrap{
      width: 100%;height: 0.78rem;background: #fff;::-webkit-scrollbar{width:0;height:0} margin-bottom: 0.2rem;
      padding-left: 0.2rem;padding-right: 0.2rem;
    }
    .tag-nav{
      width:auto; line-height: 0.78rem;overflow-x:auto;display: flex;justify-content: flex-start;align-items: center;
      .all{
        font-size: 0.28rem;flex-shrink: 0;color: #5a5a5a;position: relative;margin-right: 0.12rem;
        &.active{
          color:#39c1c1;
        }
        &.active:after{
          width: 0.56rem;height: 0.04rem;background:#39c1c1;content: '';position: absolute;left: 50%;bottom: 0;transform: translateX(-50%);
        }
      }
      &>li{
        height: 100%; font-size: 0.28rem;color: #535353;margin-left: 0.12rem;margin-right: 0.12rem;flex-shrink: 0;position: relative;
        &:first-child{
          margin-left: 0;
        }
        &.active{
          color:#39c1c1;
        }
        &.active:after{
          width: 0.56rem; height: 0.04rem;background:#39c1c1;content: '';position: absolute;left: 50%;bottom: 0;transform: translateX(-50%);color:#39c1c1;
        }
      ;
      }
    }
    .list-items{
      width: 100%;background: #fff;
      .item{
        width: 100%;height: 1.9rem;padding-left: 0.3rem;padding-right: 0.3rem;
        display: flex;justify-content: flex-start;align-items: center;border-bottom: 0.01rem solid #f1f1f1; position: relative;

        .head-img{
          width: 1.1rem;height:1.1rem;overflow: hidden;margin-right: 0.43rem; flex-shrink: 0;border-radius: 50%;
          &>img{
            height: 100%;width: auto;
          }
        }
        .item-con-wrap{
          height: 1.1rem;
        }

        .expert-title{
          .teacher-name{
            font-size: 0.36rem;color: #3f3f3f;
            /*line-height: 0.5rem;*/
          }
          .job-title{
            font-size: 0.22rem;color: #9d9d9d;
            /*line-height: 0.46rem;*/
            display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 1;margin-top: 0.14rem;width: 2.7rem;
          }

        }
        .item-price-wrap{
          margin-top:0.14rem;display: flex;justify-content: flex-start;align-items: center;
        }
        .item-server{
          font-size: .26rem;color: #555555;
        }
        .price-good{
          width: 1.8rem;
          display: flex;flex-direction: column;padding-left: .36rem;
          height: 1rem;border-left:1px solid #d9d9d9;margin-left: .66rem;align-items: center;
        }
        .item-price{
          color: #46c2c5;font-size: .3rem;margin-top: .08rem;
        }
        .item-good{
          font-size:.24rem;margin-top: 0.2rem;color: #555555;
        }
        .price{
          font-size: 0.22rem;color: #ff9906;text-align: left;position: relative;vertical-align: bottom;
          /*line-height: 0.4rem;*/
         /* &:before{
            content: '';
            position: absolute;
            width: 0.36rem;
            height: 0.36rem;
            background: url("../assets/images/icon/icon_face.png") no-repeat center;
            background-size: 100%;
            border-radius: 50%;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }*/
        }
        .tele-price{
          @extend .price;margin-right: 0.52rem;
          /*&:before{
            content: '';
            position: absolute;
            width: 0.36rem;
            height: 0.36rem;
            background: url("../assets/images/icon/icon_tele.png") no-repeat center;
            background-size: 100%;
            border-radius: 50%;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }*/
        }
        .icon-tele,.icon-person{
          color: #b2b2b2;margin-right: 0.08rem;display: inline-block;
        }
        .icon-person{
          /*font-size: 0.25rem;*/
          margin-top: 0.05rem;
        }
        .time{
          color: #b2b2b2;margin-left: 0.1rem;font-size: 0.22rem;
        }
      }
    }

    .btn-answer-question{
      width: 1.2rem;height: 1.2rem;border-radius: 50%;text-align:center; line-height: 1.2rem;position: fixed;right: 0.35rem;bottom: 1.68rem;
      background: linear-gradient(#38d3e9,#3bbfc4);background: -webkit-linear-gradient(#38d3e9,#3bbfc4); font-size: 0.22rem;color: #fff;opacity: 0.75;
    }

    .show-no-info{
      font-size: 0.4rem;color: #cccccc;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);z-index: 299;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        currentTagId: 0,
        tags: [],
        listData: [],
        noInfo:false,
        showNav:!zzhJs.env.isInApp(),
        navSelected:-1
      }
    },
    mounted() {
      document.title = '咨询辅导';
      $(window).scrollTop(0);

      this.getData(null);
    },
    beforeRouteEnter: function (to, from, next) {
      zzhJs.helpers.transformCodeToToken(next)
    },
    methods:{
      // 获取数据
      getData(tagId) {
        let vthis = this;

        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain+'/zzhedu/app/consult/index.action', {
          tag_id: tagId
        }).then(res => {
          let response = res.body;

          if (!this.tags.length) {
            this.tags = response.data.tag_list;
          }
          vthis.noInfo = response.data.counselor_list.length > 0 ? false : true;
          vthis.listData = response.data.counselor_list;

          // console.log(vthis.listData)
          vthis.weLoadEnd();
          }).catch((res) => {
          zzhJs.console.log(res);
        });
      },
      // 展示老师详情
      showDetail(item) {
        this.$router.push({ name: 'consult.detail', params: { id: item.id }});
      },
      // 选择咨询标签
      selectTag(id,index) {
//        this.currentTagId = item.id;
//        this.getData(item.id);
//        this.nav_selected =  index;
        let vthis = this;
        if (id) {
          this.getData(id);
        } else {
          this.getData(null);
        }
        vthis.navSelected = index;
        vthis.currentTagId = id;
      },
    }
  }
</script>