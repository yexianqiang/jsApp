<template>
  <div class="estimate-list-view">
    <v-swiper class="banner item-wrap" :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <template v-for="(item, index) in recommend">
        <!--<v-swiper-slide><img :src="item.cover" @click="show(item)"/></v-swiper-slide>-->
        <v-swiper-slide class="item" :data-id="index">
          <img :src="item.cover"/>
        </v-swiper-slide>
      </template>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </v-swiper>

    <div class="interest-test">
      <p class="block-title"><i class="iconfont icon-brain color-zhizilv" style="margin-right: 0.1rem;"></i>趣味测评</p>
      <!--<v-swiper class="item-wrap" :options="interestTestSwiper" ref="mySwiper">-->
      <div class="out-item-wrap">
        <div class="item-wrap">
          <template v-for="(item, index) in interestTests">
            <!--<v-swiper-slide class="item">-->
            <div class="item" @click="showInterestTest(item)">
              <div class="test-pic"><img :src="item.cover"/></div>
              <div class="test-discribe-wrap">
                <p class="test-title">{{ item.title }}</p>
                <p class="test-intro">{{item.subtitle}}</p>
              </div>
            </div>
            <!--</v-swiper-slide>-->
          </template>
        </div>
      </div>
      <!--</v-swiper>-->
    </div>

    <div class="estimate-wrap">
      <p class="block-title"><i class="iconfont icon-profession color-zhizilv" style="margin-right: 0.1rem;font-weight: bold;"></i>专业测评</p>
      <ul class="estimate-list-wrap">
        <template v-for="item in list">
          <li @click="show(item)">
            <div class="estimate-title-wrap">
              <p class="estiamte-tag">{{item.suit}}</p><p class="estimate-title">{{item.title}}</p>
            </div>
            <p class="estimate-intro">{{item.subtitle}}</p>
            <div class="buy-info">
              <p class="buy-num ft24">{{item.sold_count}}人购买</p>
              <div class="price-wrap">
                <p class="old-price ft24" v-if="item.origin_price != 0 && item.origin_price != item.price">{{item.origin_price | currency}}</p>
                <p class="current-price ft36" >{{item.price | currency}}</p>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../style/app";
  @import "../../assets/iconfont/iconfont.css";
  .ft20{font-size: 0.2rem} .ft24{ font-size: 0.24rem;} .ft26{font-size: 0.26rem;} .ft28{font-size: 0.28rem;} .ft30{font-size: 0.3rem;} .ft32{font-size: 0.32rem;} .ft36{font-size: 0.36rem;}
  .color-zhizilv{color: #3abfc3;}

  .estimate-list-view{
    width: 100%;background: #f6f6f6;
    .banner{
      width:100%;height: 3rem; overflow: hidden;
      img{ width:100%;}
    }
    .swiper-container-horizontal > .swiper-pagination-bullets{
      bottom: 0.05rem;
    }
    .block-title{ font-size: .32rem; line-height: 1rem; background: white; color: #333; padding-left: .3rem; }
    .interest-test{
      background: white; overflow: hidden; margin-bottom: .2rem;
      .out-item-wrap{
        ::-webkit-scrollbar{width:0;height:0};padding-left: 0.3rem;padding-right: 0.3rem;
      }
      .item-wrap{
        display: flex;justify-content: flex-start;width: auto;overflow-x: auto;
      }
      .item{
        height: 3.5rem; width: 2.6rem !important;overflow: hidden; border-radius: 0.05rem;margin-right: 0.3rem;flex-shrink: 0;
        .test-pic{
          width: 2.6rem; height: 2.3rem; background: #ddd;border-radius: 0.05rem;
          img{ width: 100%; }
        }
        .test-discribe-wrap{
          width: 100%;margin-top: 0.2rem;line-height: 0.4rem;
          .test-title{
            font-size: 0.26rem;color: #333;display: -webkit-box;overflow: hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:1;
          }
          .test-intro{
            font-size: 0.22rem;color: #999;display: -webkit-box;overflow: hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:1;
          }
        }
      }
    }
    .estimate-wrap{
      width: 100%;background: #fff;
      .estimate-list-wrap{
        width: 100%;padding-bottom: 0.85rem;
        &>li{

          width: 100%; height: 2.24rem;padding: 0.3rem 0.3rem 0;border-bottom: 0.01rem solid #f6f6f6;
          .estimate-title-wrap{
            display: flex;align-items: center;
            /*line-height: 0.5rem;*/
          }
          &:nth-child(1){
            padding-top: 0 !important;height: 1.94rem;
          }
          .estimate-title{
            font-size: 0.36rem;color: #333;
          }
          .estiamte-tag{
            display:inline-block;padding:0 0.1rem;background: #bec9c9;color: #fff;text-align: center;line-height: 0.38rem;
            border-radius: 0.05rem ;margin-right: 0.2rem; font-size: 0.24rem;min-width: 1rem;
          }
          .estimate-intro{
            font-size: 0.26rem;color: #999;width: 100%;display: -webkit-box;overflow: hidden;text-overflow:ellipsis;-webkit-box-orient: vertical;-webkit-line-clamp:1;line-height: 0.66rem;
          }
          .buy-info{
            width: 100%;display: flex;justify-content: space-between;align-items: center;margin-top: 0.4rem;color: #999;
          }
          .price-wrap{
            position: relative;
            .old-price{
              position: absolute; right: 0; top: -0.3rem;text-decoration:line-through;
            }
            .current-price{
              color: #ff6163;
            }
          }
        }
      }
    }
  }
</style>
<script>
  // VueAwesomeSwiper
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  require('swiper/dist/css/swiper.css')
  export default{
    data() {
      return {
        selectedStarsIndex:-1,
//        interestTestSwiper: {
//          loop: true,
//          pagination: '.swiper-pagination',
//          slidesPerView:3,
//          mousewheelControl: true,
//          spaceBetween: zzhJs.rem.convert(0.3),
//          autoplayDisableOnInteraction: false,
//          initialSlide:2,
//        },
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
        list: [], // // 专业测评
        recommend: [], // banner
        interestTests: [], // 趣味测评
        counter:1, // 当前页
        num:5, // 一页显示多少条
        pageStart:0, // 开始页数
        pageEnd:0, // 结束页数
        noMorePage: false,
        scrollData: {
          noFlag:false
        },
      }
    },
    mounted() {
      document.title = '心智测评';
      let vthis = this;
      this.getHeadData();
      this.getList();
      this.resolveSwiperClick();
    },
    methods: {
      resolveSwiperClick() {
        let vthis = this;

        let $recommendWrap = $(vthis.$el).find('.banner');
        $recommendWrap.off('click.item').on('click.item', '.item', function () {
          let $this = $(this);
          vthis.show(vthis.recommend[parseInt($this.data('id'))])
        });
      },
      show(item) {
        this.$router.push({ name: 'estimate.detail', params: {id: item.id }});
      },
      showInterestTest(item) {
        window.location = item.url;
      },
      getHeadData() {
        let vthis = this,
          url = zzhJs.helpers.routeParser('api.estimate.head', {
            channel: zzhJs.env.isInApp()? 1: 2
          });

        this.weLoadStart();
        this.$http.get(url).then(res => {
          let responseData = res.body.data,
            interestTests = responseData['interest_test'];

          interestTests.unshift(interestTests.pop());
          vthis.interestTests = interestTests;
          vthis.recommend = responseData['recommend'];

          vthis.weLoadEnd();
        }, function () {
          vthis.weNotify('服务器繁忙请稍候再试!');
        });
      },
      getList() {
        let vthis = this,
          url = zzhJs.helpers.routeParser('api.estimate', {});

        this.weLoadStart();
        this.$http.get(url).then(res => {
          let response = res.body;

//          if(!response.data || response.data.length < 5){
//            vthis.noMorePage = true;
//          }

          response.data.forEach(function (e) {
            vthis.list.push(e);
          });

          vthis.weLoadEnd();
        }, function () {
          vthis.weNotify('服务器繁忙请稍候再试!');
        });
      },
//      getListFirst(){
//        this.list = [];
//        let vthis = this,
//          url = zzhJs.helpers.routeParser('api.estimate', { page:1 });
//        this.weLoadStart();
//        this.$http.get(url).then(res => {
//          let response = res.body;
//          response.data.forEach(function (e) {
//            vthis.list.push(e);
//          })
//          vthis.weLoadEnd();
//        }, function () {
//          vthis.weNotify('服务器繁忙请稍候再试!');
//        });
//      },
//      onRefresh(done) {
//        this.getListFirst();
//        done(); // call done
//      },
//      onInfinite(done) {
//        let vthis = this;
//        let more = this.$el.querySelector('.load-more');
//        this.counter++;
//        if(this.noMorePage){
//          this.scrollData.noFlag = true;
//          more.style.display = 'none'; //隐藏加载条
//          done();
//          return false;
//        }
//
//        this.getList();
//        more.style.display = 'none'; //隐藏加载条
//
//        done();
//      },

      goBuy(item) {
        this.$router.push({name: 'pay.confirm',query: {
          product_id: item.id,
          product_type: window.productTypes['estimate'],
        }})
      }
    },
    components: {
      vSwiper: swiper,
      vSwiperSlide: swiperSlide
    }
  }
</script>