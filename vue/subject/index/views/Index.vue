<template>
  <div class="index-view">
    <div class="recommend">
      <v-swiper class="banner" :options="swiperOption" ref="mySwiper">
        <template v-for="(item ,key) in recommend">
          <v-swiper-slide>
           <a class="item" :data-id="key"><img :src="item.img" /></a>
          </v-swiper-slide>
        </template>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
        <!--<div class="swiper-button-next" slot="button-next"></div>-->
        <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
      </v-swiper>
    </div>

    <ul class="page-entry-wrap">
      <template v-for="item in pageEntry">
        <li @click="showPage(item)">
          <div class="icon-img"></div>
          <p class="icon-title">{{item.name}}</p>
        </li>
      </template>
    </ul>
    <!--推荐阅读-->
    <div class="recommend-read-top">
      <p>推荐阅读</p>
      <a :href="zzhJs.config.urlArticleList"><p class="btn-more">更多<span class="iconfont icon-arrow-right"></span></p></a>
    </div>
    <div class="read-list-wrap">
      <ul class="read-list">
        <template v-for="item in articleList">
          <li @click="showArticleDetail(item.id)">
            <div class="article-img"><img :src="item.img"/></div>
            <div class="article-info">
              <p class="article-title">{{item.name}}</p>
              <div class="read-info">
                <p class="article-author">作者：{{item.teacher.name}}</p>
                <div class="icon-wrap">
                  <span style="margin-right: 0.2rem"><i class="iconfont icon-pinglun" style="vertical-align: middle;margin-right: 0.1rem;"></i>{{item.review_num}}</span>
                  <span><i class="iconfont icon-read-num" style="margin-right: 0.1rem"></i>{{item.look_num}}</span>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
      <p class="btn-change" @click="changeOther()"><span class="iconfont icon-Home-change"></span>换一批</p>

    </div>
    <div class="audio-top">
      <p>音频课程</p>
      <router-link :to="{name: 'subject.audio.list'}">
        <p class="btn-more">更多<span class="iconfont icon-arrow-right"></span></p>
      </router-link>
    </div>
    <div class="audio-list-wrap">
      <ul class="audio-list">
        <template v-for="item in audio_list">
          <li @click="showDetail(item.id,1)" :data-id="item.id">
            <div class="audio-img"><img :src="item.img_min"/></div>
            <div class="audio-info">
              <div>
                <p class="audio-title">{{item.name}}</p>
                <p class="audio-intro">{{item.intro}}</p>
              </div>
              <div class="audio-intro-bottom">
                <p v-if="item.price_curr == 0">更新{{item.update_section}}节|{{item.sell_num}}人浏览</p>
                <p v-else>更新{{item.update_section}}节|{{item.sell_num}}人订阅</p>

                <!--<p class="price" v-if="item.price_curr == 0 && item.price_orig == 0">免费</p>-->
                <div class="price" v-if="item.price_curr == 0">
                  <span class="old-price" v-if="item.price_orig && item.price_orig != item.price_curr">{{item.price_orig|currency}}</span>
                  <span class="current-price">免费</span>
                </div>
                <div class="price" v-else>
                  <span class="old-price" v-if="item.price_orig && item.price_orig != item.price_curr">{{item.price_orig|currency}}</span>
                  <span class="current-price">{{item.price_curr | currency}}</span>
                </div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="video-top">
      <p>视频课程</p>
      <router-link :to="{name: 'subject.video.list'}">
        <p class="btn-more">更多<span class="iconfont icon-arrow-right"></span></p>
      </router-link>
    </div>
    <div class="video-col-list-wrap">
      <ul class="video-col-list">
        <template v-for="item in video_list">
          <li @click="showDetail(item.id,2)" :data-id="item.id">
            <div class="video-img"><img :src="item.img_min"/></div>
            <div class="video-info">
              <div>
                <p class="video-title">{{item.name}}</p>
                <p class="video-intro">{{item.intro}}</p>
              </div>
              <div class="video-bottom-intro">
                <p class="subscribe-num" v-if="item.price_curr==0">更新{{item.update_section}}节|{{item.sell_num}}人浏览</p>
                <p class="subscribe-num" v-else>更新{{item.update_section}}节|{{item.sell_num}}人订阅</p>
                <!--<p class="price" v-if="item.price_curr==0">免费</p>-->
                <div class="price" v-if="item.price_curr == 0">
                  <span class="old-price" v-if="item.price_orig && item.price_orig != item.price_curr">{{item.price_orig | currency}}</span>
                  <span class="current-price">免费</span>
                </div>
                <div class="price" v-else>
                  <span class="old-price" v-if="item.price_orig && item.price_orig != item.price_curr">{{item.price_orig | currency}}</span>
                  <span class="current-price">{{item.price_curr | currency}}</span>
                </div>
              </div>
            </div>

          </li>
        </template>
      </ul>
    </div>
    <!--咨询辅导-->
    <div class="consult-top">
      <p>咨询辅导</p>
      <a :href="zzhJs.config.urlConsultList">
        <p class="btn-more">更多<span class="iconfont icon-arrow-right"></span></p>
      </a>
    </div>
    <div class="consult-info">
      <v-swiper class="consults" :options="consultSwiper" ref="mySwiper">
        <template v-for="(item,index) in consultList">
          <v-swiper-slide class="consult-item" :data-id="index" >
            <div class="consult-item-person">
              <div class="head-img">
                <img :src="item.avatar"/>
              </div>
              <p class="teacher-name">{{item.name}}</p>
              <p class="teacher-title">{{item.intro}}</p>
              <div class="mask-bottom"></div>
            </div>
          </v-swiper-slide>
        </template>
        <!-- Optional controls -->
        <!--<div class="swiper-pagination"  slot="pagination"></div>-->
      </v-swiper>
    </div>

    <!--心智测评-->
    <div class="estimate-top">
      <p>心智测评</p>
      <a :href="zzhJs.config.urlEstimate">
        <p class="btn-more">更多<span class="iconfont icon-arrow-right"></span></p>
      </a>
    </div>

    <!--修改之前start-->
    <!--<div class="estimate">-->
      <!--<v-swiper class="item-wrap" :options="estimateSwiper" ref="mySwiper">-->
        <!--<template v-for="(item, index) in estimateList">-->
          <!--<v-swiper-slide class="item" :data-id="index">-->
            <!--<div>-->
              <!--<img :src="item.cover"/>-->
              <!--<p class="pannel">-->
                <!--<span class="title">{{ item.title }}</span>-->
              <!--</p>-->
            <!--</div>-->
          <!--</v-swiper-slide>-->
        <!--</template>-->
      <!--</v-swiper>-->
    <!--</div>-->
    <!--修改之前end-->

    <!--修改之后start-->
      <ul class="estimate-wrap">
        <template v-for="(item, index) in estimateList">
          <li v-if="index <= 2" @click="showEstimate(item)">
            <div class="estimate-pic">
              <img :src="item.cover"/>
            </div>
            <div class="estimate-discribe-wrap">
              <p class="estimate-title">{{item.title}}</p>
              <div class="estimate-text">
                <p class="estimate-tag" v-if="item.type == 1">趣味</p>
                <p class="estimate-tag" v-if="item.type == 0">专业</p>
                <p class="estimate-intro">{{item.subtitle}}</p>
              </div>
            </div>
            <div class="btn-go-estimate">去测</div>
          </li>
        </template>
      </ul>

      <div class="footer-up">知子莫若知子花</div>
    <!--修改之后end-->


    <!--底部导航-->
    <footer-nav></footer-nav>

    <!--白象用户的欢迎提示-->
    <div class="baixiang-tip-wrap" v-if="showPop" @click="hideUserPop">
      <img :src="src">
    </div>

  </div>
</template>

<style lang="scss">
  @import "../../../assets/iconfont/iconfont.css";
  .index-view {
    width: 100%;padding-bottom: 0.9rem;
    .wc-dot{ width: .15rem !important; height: .15rem !important; border-radius: 50% !important; }
    .wc-pagination{ bottom: .2rem; }
    .swiper-container-horizontal > .swiper-pagination-bullets{
      height: 0.4rem;line-height: 0.05rem;
    }
    img{
      width: 100%;
    }
    .recommend {
      width: 100%; height:3rem;

      .banner{
        width: 100%;height: 100%;background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
      }
    }

    .page-entry-wrap{
      width: 100%;height: 2rem;background: #fff;display: flex;justify-content: space-around;align-items: center;margin-bottom: 0.2rem;
      &>li{
        display: flex;flex-direction: column;align-items: center;
        .icon-img{
          width: 0.62rem;height: 0.56rem;overflow: hidden;margin-bottom: 0.2rem;background: url("../assets/img/icon-spirte-page-entry.png") no-repeat center;background-size: 100%;background-position: 0 0;
        }
        .icon-title{
          font-size: 0.26rem;color: #323232;text-align: center;line-height: 0.6rem;
        }
        &:nth-child(1){
          .icon-img{
            background-position:0 0 ;
          }
        }
        &:nth-child(2){
          .icon-img{
            background-position:0 -0.7rem;
          }
        }
        &:nth-child(3){
          .icon-img{
            background-position:0 -1.4rem;
          }
        }
        &:nth-child(4){
          .icon-img{
            background-position:0 -2.1rem ;
          }
        }
        &:nth-child(5){
          .icon-img{
            background-position:0 -2.8rem ;
          }
        }
      }
    }

    .video-top{
      width: 100%;height: 0.85rem; border-bottom: 0.01rem solid #f3f3f3;background:#fff;display: flex;justify-content: space-between;
      padding: 0 0.22rem;align-items: center;font-size: 0.3rem;color: #242424;
      .btn-more{
        font-size: 0.24rem;color: #999;height: 100%;line-height: 0.85rem;
      }
    }


    .video-col-list-wrap{
      width: 100%;background: #fff;margin-bottom: 0.2rem;

      /*height: 3.9rem;padding: 0.27rem 0.22rem 0.3rem; ::-webkit-scrollbar{width:0;height:0}*/

    }
    .video-col-list{
      width: 100%;background: #fff;
      /*width: auto; overflow-x: auto;display: flex;justify-content: flex-start;align-items: center;*/
      &>li{
        width: 100%; height:2.41rem;border-bottom: 0.01rem solid #f3f3f3;padding: 0.24rem 0.22rem 0.47rem 0.22rem;display: flex;justify-content: flex-start;align-items: center;
        /*width: 2.32rem;height:100%;flex-shrink:0;margin: 0 0.1rem;*/
        /*&:first-child{*/
          /*margin-left: 0;*/
        /*}*/
        /*&:last-child{*/
          /*margin-right: 0;*/
        /*}*/

        &:nth-child(3){
          border-bottom: none;
        }
      }
      .video-img{
        width: 2.16rem;height:1.62rem;flex-shrink: 0;margin-right: 0.2rem;border-radius: 0.1rem;overflow: hidden;
        /*width: 100%;height: 1.73rem;margin-bottom: 0.15rem;border-radius: 0.1rem;overflow: hidden;*/
      }
      .video-info{
        width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between;
        .video-title{
          line-height: 0.5rem;font-size: .32rem;width: 100%;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
          -webkit-line-clamp: 1; -webkit-box-orient: vertical;color: #2a2a2a;
        }
        .video-intro{
          @extend .video-title;font-size: 0.26rem;line-height: 0.45rem;color: #727272;
          display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;
        }
        .video-bottom-intro{
          font-size: 0.22rem;display: flex;justify-content: space-between;align-items: center;margin-top: 0.2rem;
          .subscribe-num{
            color: #cacaca;
          }
        }
      }



    }

    .audio-top{
      @extend .video-top;
    }
    .audio-list-wrap{
      width: 100%;margin-bottom: 0.2rem;
      .audio-list{
        width: 100%;background: #fff;
        &>li{
          width: 100%; height:2.41rem;border-bottom: 0.01rem solid #f3f3f3;padding: 0.24rem 0.22rem 0.47rem 0.22rem;display: flex;justify-content: flex-start;align-items: center;
          .audio-img{
            width: 2.16rem;height: 1.62rem;flex-shrink: 0;margin-right: 0.2rem;border-radius: 0.1rem;overflow: hidden;
          }
          .audio-info{
            width: 100%; height: 100%;display: flex;flex-direction: column;justify-content: space-between;
            .audio-title{
              line-height: 0.5rem;font-size: 0.32rem;color: #2a2a2a;
              display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 1;
            }
          }
          .audio-intro-bottom{
            display: flex;justify-content: space-between;font-size: 0.22rem;color: #cacaca;
          }
          .audio-intro{
            font-size: 0.26rem;color: #727272;line-height: 0.36rem;
            display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;
          }
          &:nth-child(3){
            border-bottom: none;
          }
        }

      }
    }

    .price{
      color: #fd0000;font-size: 0.26rem;display: flex;
      &>span{
        font-size: 0.26rem;
      }
      .old-price{
        font-size: 0.18rem;text-decoration: line-through;margin-left: 0.1rem;color: #cacaca;
      }
    }

    .estimate-top{
      @extend .video-top;
    }
    .consult-top{
      @extend .video-top;
    }
    .recommend-read-top{
      @extend .audio-top;
    }

    .consult-info{
      width: 100%;height: 4.32rem;background: #fff;margin-bottom: 0.2rem;padding-left: 0.2rem;padding-right: 0.2rem;padding-top: 0.3rem;
      .consults{
        width: 100%;height: 100%;
      }
      .consult-item{
        width: 2.16rem;height: 3.55rem;border-radius: .08rem;box-shadow: 0 0 0.08rem 0.04rem rgba(0, 0, 0, 0.06);margin-top: 0.08rem;margin-bottom: 0.08rem;
        .consult-item-person{
          width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;padding-top:0.2rem;padding-left: 0.3rem;padding-right: 0.3rem;

          position: relative;
          .head-img{
            width: 1.49rem;height: 1.49rem;border-radius: 50%;overflow: hidden;margin-bottom: 0.25rem;flex-shrink: 0;background: url("../assets/placeholder.png") no-repeat center;
            background-size: 100%;
            img{
              width: 100%;
            }
          }
          .teacher-name{
            font-size: 0.28rem;color: #323232;line-height: 0.5rem;
          }
          .teacher-title{
            font-size: 0.24rem;color: #797979;line-height: 0.37rem;text-align: center;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
            -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          }
          .mask-bottom{
            position: absolute;width: 100%;height: 0.1rem;background: #37c3c4;left:0;bottom: 0;border-bottom-left-radius: .08rem;border-bottom-right-radius: .08rem;
          }
        }
      }
      .swiper-container-horizontal{
        .swiper-pagination-bullets {
          .swiper-pagination-bullet{
            width: 0.65rem; height: 0.04rem;border-radius:0;margin-right: 0;margin-left: 0;
          }
          .swiper-pagination-bullet-active{
            background: #3dbfbf;
          }
        }
      }
    }

    /*测评样式修改前start*/
    /*.estimate{
      background: white; overflow: hidden; margin-bottom: .2rem;
      .block-title{
        font-size: .3rem; line-height: 0.9rem; background: #fff; color: #393939; padding: 0 .3rem; border-bottom: 1px solid #f3f3f3;
      }
      .item-wrap{
        width: 19.3rem; height: 4.25rem; margin-top: .28rem; margin-left: -5.9rem;
      }

      .item{
        height: 3.9rem; width: 6.2rem !important; margin: .28px .17px; border: 1px solid #D3D4D1; overflow: hidden;
        border-radius: .1rem;

        img{ height: 3.9rem; width: 6.2rem; }

        .pannel{
          height: .8rem; width: 6.2rem;  font-size: .32rem; padding: 0 .32rem 0 .28rem; line-height: .8rem; position: absolute;
          !*background: linear-gradient(to top, rgba(0, 0, 0, .4), rgba(0, 0, 0, 0));margin-top: -.9rem;*!
          background: rgba(0, 0, 0, .1);left: 0;bottom: 0;

          .title{ font-size: .32rem; color: white; }
          .type{ font-size: .28rem; color: #47c0c2; display: block; float: right; }
        }
      }
    }*/
    /*测评样式修改前end*/

    /*测评样式修改后start*/
    .estimate-wrap{
      width: 100%;background: #fff;
      &>li{
        width: 100%;height: 1.62rem;border-bottom: 0.01rem solid #f3f3f3;padding-left: 0.22rem;padding-right: 0.4rem;padding-top:0.38rem;
        padding-bottom: 0.38rem;display: flex;align-items: center;
        .estimate-pic{
          width: 0.95rem;height: 0.85rem;flex-shrink: 0;margin-right: 0.35rem;
          &>img{
            width: 100%;display: block;
          }
        }
        .estimate-discribe-wrap{
          width:100%;height:100%;flex-shrink: 1;display: flex;flex-direction: column;justify-content: space-between;
          .estimate-title{
            font-size: 0.3rem;color: #333;width: 100%;overflow: hidden;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 1;
          }
          .estimate-text{
            display: flex;justify-content:flex-start;font-size: 0.24rem;color: #afafaf;
            .estimate-tag{
              width: 0.76rem;border: 0.01rem solid #afafaf;border-radius: 0.08rem;text-align: center;line-height: 0.39rem;margin-right: 0.2rem;
            }
            .estimate-intro{
              line-height: 0.39rem;width: 100%;overflow: hidden;text-overflow:ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 1;
            }
          }
        }

        .btn-go-estimate{
          width: 1.1rem;flex-shrink: 0; border: 0.02rem solid #3ec1c3;text-align: center;line-height: 0.58rem;color: #3ec1c3;border-radius: 0.08rem;font-size: 0.28rem;
          margin-left: 0.24rem;
        }

      }
      &>li:nth-child(3){
        border-bottom: none;
      }
    }
    /*测评样式修改后end*/

    .footer-up{
      width: 100%;line-height: 1rem;font-size: 0.22rem;color: #eaeaea;text-align: center;
    }

    .read-list-wrap{
      width: 100%;background: #fff;
      .read-list{
        width: 100%;min-height: 6.7rem;
        &>li{
          width: 100%;height: 2.27rem;border-bottom: 0.01rem solid #f4f4f4;padding-right: 0.22rem;padding-left: 0.22rem;display: flex;justify-content: space-between;align-items: center;
          .article-img{
            width: 2.18rem;height: 1.62rem;background: url("../assets/placeholder.png") no-repeat center;background-size:100%;border-radius: .06rem;
            overflow: hidden;display: flex;justify-content: center;
            img{
              height: 100%;min-width: 100%;
            }
          }
          .article-info{
            width: 4.38rem;height: 1.62rem;display: flex;flex-direction: column;justify-content: space-between;
          }
          .article-title{
            font-size: 0.32rem;color: #2b2b2b;display:-webkit-box;overflow: hidden;text-overflow: ellipsis;
            -webkit-line-clamp: 2; -webkit-box-orient: vertical; line-height: 0.4rem;
          }
          .read-info{
            width: 100%; display: flex;justify-content: space-between;
            .article-author{
              font-size: 0.24rem;color: #9a9a9a;
            }
            .icon-wrap{
              @extend .article-author;min-width: 2rem; display: flex; justify-content: space-around;
            }
          }
        }
      }

      .btn-change{
        width: 100%;line-height: 0.8rem;text-align: center;font-size: 0.24rem;color: #7b7b7b;margin-bottom: 0.2rem;
        .icon-Home-change{
          font-size: 0.36rem;
        }
      }
    }


    .footer-bar{
      width: 100%;height: 0.98rem;background: #fff;position: fixed;bottom: 0;left: 0;display: flex;justify-content:center;border-top: 0.01rem solid #f1f1f1;
      padding-bottom: 0.02rem;
      /*&>a{
        width: 50%;display: block;
        .btn-course{
          width:100%;height: 0.9rem;text-align: center;line-height: 0.9rem;font-size: 0.28rem;
          &.active{
            background: #33aaaa;color: #fff;
          }
        }
        .btn-mine{
          @extend .btn-course;border-left: 0.01rem solid #ccc;color: #3cc0c4;
        }
      }*/
    }

    button,textarea,div{
      cursor: pointer;
      /*去除系统默认样式*/
      -webkit-appearance: none;
      /*点击高亮的颜色*/
      -webkit-tap-highlight-color:rgba(255,255,255,0);
    }
    .baixiang-tip-wrap{
      width: 100%; min-height: 100%; position: fixed; left: 0; bottom: 0; right: 0; background: rgba(0, 0, 0, .7); z-index: 999; display: flex; align-items: flex-end;

      img{ width: 100%; }

    }
  }
</style>

<script>
  // VueAwesomeSwiper
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  require('swiper/dist/css/swiper.css')

  export default {
    data() {
      return {
        recommend: [
          {
            img: '',
            product_type: '',
            product_id: '',
          }
        ],
        swiperOption: {
          autoplay:3000,
          loop:true,
          setWrapperSize :true,
          pagination:'.swiper-pagination',
          paginationClickable:true,
          autoHeight:true,
          mousewheelControl: true,
          autoplayDisableOnInteraction:false
        },
        audio_list:[],
        video_list:[],
        showPop: false,
        src:'',
        pageEntry:[
          {
            id:5,
            name:'推荐阅读'
          },
          {
            id:1,
            name:'音频课程',
          },
          {
            id:2,
            name:'视频课程',
          },
          {
            id:4,
            name:'咨询辅导'
          },
          {
            id:3,
            name:'心智测评',
          }

        ],
        consultList:[],
        articleList:[],
        estimateList:[],
        articleTotalPage:'',
        currentPageNum:1,
        clickChange:false,

        estimateSwiper: {
          loop: true,
          pagination: '.swiper-pagination',
          slidesPerView: 3,
          paginationClickable: true,
          mousewheelControl: true,
          spaceBetween: zzhJs.rem.convert(0.35),
          autoplayDisableOnInteraction: false,
          initialSlide: 2,
        },
        consultSwiper:{
          autoplay:5000,
          loop:true,
          pagination:'.swiper-pagination',
          slidesPerView:3,
          slidesPerGroup:3,
          paginationClickable:true,
          mousewheelControl: true,
          spaceBetween: zzhJs.rem.convert(0.2),
          autoplayDisableOnInteraction: false,
        }
      }
    },
    mounted() {
      document.title = '知子课堂';
      this.show();
      let vthis = this;
      // this.getInterestTests();

      let $recommendWrap = $(vthis.$el).find('.banner');
      $recommendWrap.off('click.item').on('click.item', '.item', function () {
        let $this = $(this);
        vthis.showDetail(vthis.recommend[parseInt($this.data('id'))].product_info_id, vthis.recommend[parseInt($this.data('id'))].type, vthis.recommend[parseInt($this.data('id'))].url);
      });

      let $estimateWrap = $(vthis.$el).find('.estimate .item-wrap');
      $estimateWrap.off('click.item').on('click.item', '.item', function () {
        let $this = $(this);
        vthis.showEstimate(vthis.estimateList[parseInt($this.data('id'))])
      });

      let $consultWrap = $(vthis.$el).find('.consult-info .consults');
      $consultWrap.off('click.consult-item').on('click.consult-item', '.consult-item', function () {
        let $this = $(this);
        vthis.showConsult(vthis.consultList[parseInt($this.data('id'))])
      });


      // 解决 -> 当用户在列表页点出标签的选择弹框时，没点击确定直接返回首页，会出现首页无法滑动的问题
      $('html,body').css({
        'height': 'auto',
        'overflow-y': 'auto'
      });

    },
    beforeRouteEnter: function (to, from, next) {
      zzhJs.helpers.transformCodeToToken(function () {
        if (window.location.query && window.location.query['redirect_uri']) {
          window.location.href = Base64.decode(window.location.query['redirect_uri']);
        } else if (Vue.cookie.get('auth_backto')) {
          let backto = Vue.cookie.get('auth_backto')
          Vue.cookie.clear('auth_backto');
          window.location.href = backto;
        } else {
          next();
        }
      });
    },
    methods: {
      show() {
        let vthis = this;
        this.weLoadStart();
        this.$http.post(
          zzhJs.config.apiDomain+'/zzhedu/wx/product/index.action').then(res => {
            let response = res.body;
            vthis.recommend = response.data.banner_list;
            vthis.audio_list = response.data.voice_list;
//            vthis.video_list = response.data.video_list;
            // 视频截取前三个显示
            for (let i = 0; i <= 2; i++){
              vthis.video_list[i] = response.data.video_list[i];
            }


            vthis.getAppIndex();
            // 白象用户会弹出此提示框
            if(response.data.welcome && response.data.welcome.is_show == 1){
              vthis.src = response.data.welcome.img
              vthis.showUserPop();
            }

          vthis.weLoadEnd();
        },(res) => {
            zzhJs.console.log(res);

        })
      },
      showDetail(id,type,url){
        if (type == 1) { // 类型为1表示音频
          window.location.href= zzhJs.config.urlAudioList+'?#/'+id;
        } else if(type == 2){ // 类型为2表示视频
          window.location.href= zzhJs.config.urlVideoList+'?#/'+id;
        } else if (url) {
          window.location.href = url;
        }

      },
      showUserPop() {
        let vthis = this;
        this.showPop = true;

        $('html,body').css({
          'height': '100vh',
          'overflow-y': 'hidden'
        });

        setTimeout(function () {
          vthis.hideUserPop();
        }, 5000);
      },
      hideUserPop() {
        $('html,body').css({
          'height': 'auto',
          'overflow-y': 'auto'
        });

        this.showPop = false;
      },

      // 获取测评信息
      showEstimate(item) {
        if (item.type == 1) { // 趣味测试
          window.location.href = zzhJs.config.urlInterestTest + '/' + item.name + '?channel=2';
        } else { // 专业测评
          window.location.href = zzhJs.config.urlEstimate + '?#/estimate/' + item .id;
        }
//        window.location = zzhJs.config.urlEstimate + '?#/estimate/' + item .id;
      },


      // 获取app首页接口内容
      getAppIndex() {
        let vthis = this;

        this.weLoadStart();
        this.$http.post(
          zzhJs.config.apiDomain + '/zzhedu/app/product/index.action').then(res =>{
            let response = res.body.data;
            vthis.consultList = response.counselor_list;
            vthis.articleList = response.article_list;
            vthis.estimateList = response.appraisal_list;
            vthis.articleTotalPage = response.total;
            vthis.currentPageNum = response.page_no;

            vthis.weLoadEnd();
        },(res) => {
            zzhJs.console.log(res)
        })
      },
      showPage(obj) {
        if (obj.id == 1) {
          this.$router.push({name:'subject.audio.list'});
        } else if (obj.id == 2) {
          this.$router.push({name:'subject.video.list'});
        } else if (obj.id == 3) { // 跳转到测评
          window.location.href = zzhJs.config.urlEstimate;
        } else if (obj.id == 4) {
          window.location.href = zzhJs.config.urlConsultList;
        } else if (obj.id == 5) {
          window.location.href = zzhJs.config.urlArticleList;
        }
      },
      // 换一换
      changeOther() {

        if (this.clickChange) {
          return;
        }
        this.clickChange = true;
        let vthis = this;
        vthis.currentPageNum++;
        if (vthis.currentPageNum > vthis.articleTotalPage) {
          vthis.currentPageNum = 1;
        }
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/article/trade.action',
          {
            page_no:vthis.currentPageNum,
            page_size:3
          }).then(res => {
            let response = res.body.data;
            vthis.articleList = response.article_list;
            vthis.clickChange = false;
            vthis.weLoadEnd();
        },(res) => {
            zzhJs.console.log(res);
        })
      },

      // 跳转文章详情
      showArticleDetail(id) {
        window.location.href = zzhJs.config.urlArticleList + '?#/' + id;
      },

      // 跳转咨询详情
      showConsult(item) {
        window.location.href = zzhJs.config.urlConsultList + '#/' + item.id;
      },


    },
    components: {
      vSwiper: swiper,
      vSwiperSlide: swiperSlide
    }
  }
</script>
