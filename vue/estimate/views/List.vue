<template>
  <div class="list-page">
    <!--<we-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">-->
    <!--</we-scroll>-->

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
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
      <!--<div class="swiper-scrollbar"   slot="scrollbar"></div>-->
    </v-swiper>

    <div class="interest-test">
      <p class="block-title">趣味测评</p>
      <v-swiper class="item-wrap" :options="interestTestSwiper" ref="mySwiper">
        <template v-for="(item, index) in interestTests">
          <v-swiper-slide class="item" :data-id="index">
            <div>
              <img :src="item.cover"/>
              <p class="pannel">
                <span class="title">{{ item.title }}</span>
              </p>
            </div>
          </v-swiper-slide>
        </template>
      </v-swiper>
    </div>

    <div class="estimates">
      <p class="block-title">专业测评</p>
      <ul class="list-con" :class="[ showNav ? 'leave-bottom': '']">
        <template v-for="item in list">
          <li @click="show(item)" class="list-item">
            <div class="list-img-text">
              <div class="list-img">
                <img :src="item.cover"/>
                <!--测过or未测过的标志-->
                <div class="tested" v-if="item.has_tested > 0">
                  <div class="tested-bar"></div>
                  <div class="tested-con">测过</div>
                </div>
              </div>
              <div class="estimate-info">
                <div class="estimate-title">
                  <span class="estimate-name">{{item.title}}</span>
                </div>
                <div class="estimate-discribe">
                  <p class="brief">{{item.subtitle}}</p>
                </div>
                <div class="estimate-fit">
                  <span>适合人群：{{item.suit}}</span>
                </div>
              </div>
            </div>
            <div class="estimate-buy">
              <div class="estimate-buy-num">{{ item.sold_count }}人购买</div>
              <div class="estimate-price">
                <div class="estimate-now-price">
                  {{item.price | currency}}
                  <p class="estimate-old-price">{{item.origin_price | currency}}</p>
                </div>
                <div class="btn-estimate-buy" v-if="item.can_test == 0" @click.stop="goBuy(item)">立即购买</div>
                <div class="btn-estimate-go-on btn-go-on" v-if="item.can_test > 0">继续测评</div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  $wd_100: 100%;

  .list-page{
    width: $wd_100; background: #f6f6f6; min-height: 100vh; font-size: .14rem;

    .wc-dot{ width: .15rem !important; height: .15rem !important; border-radius: 50% !important; }
    .wc-pagination{ bottom: .2rem; }
    .block-title{ font-size: .32rem; line-height: 1rem; background: white; color: #333; padding-left: .28rem; }
    .banner{
      height: 3.75rem; overflow: hidden; margin-bottom: .2rem;
      img{ width: $wd_100; }
    }
    .list-banner{ width: $wd_100;height: 3rem; }
    .list-con{ margin-bottom: 0.2rem; }
    .list-con.leave-bottom{ padding-bottom: 0.85rem; }

    .interest-test{
      background: white; overflow: hidden; margin-bottom: .2rem;

      .item-wrap{ width: 19.3rem; height: 4.25rem; margin-top: .28rem; margin-left: -5.9rem; }

      .item{
        height: 3.9rem; width: 6.2rem !important; margin: .28px .17px; border-radius: .05rem; overflow: hidden;
        border-radius: .14rem;box-shadow: 0 0 0.1rem 0.06rem rgba(0, 0, 0, 0.09);

        img{ height: 3.9rem; width: 6.2rem; }

        .pannel{
          height: .9rem; width: 6.2rem; margin-top: -.9rem; font-size: .32rem; padding: 0 .32rem 0 .28rem; line-height: .9rem; position: absolute;
          background: linear-gradient(to top, rgba(0, 0, 0, .4), rgba(0, 0, 0, 0));

          .title{ font-size: .32rem; color: white; }
          .type{ font-size: .28rem; color: #47c0c2; display: block; float: right; }
        }
      }
    }

    ul li{
      width: $wd_100; background: #fff; margin-bottom: 0.2rem;
      .tested{
        width: 0.34rem;height:0.47rem;position: absolute;left: 0;top: 0;display: flex;justify-content: space-between;
        .tested-bar{
          width: 0.01rem;height: 0.47rem;background: #f05827;
        }
        .tested-con{
          width: 0.28rem;height: 0.47rem;border-left: 0.01rem solid #fff;border-right: 0.01rem solid #fff;background: #f05827;color: #fff;
          font-size: 0.16rem;text-align: center;padding-top: 0.05rem;
        }
      }
      .list-img-text {
        width: 100%; height: 2.24rem; display: flex; justify-content: flex-start; border-bottom: 0.01rem solid #f2f2f2; padding: 0.24rem 0.32rem 0.34rem 0.34rem;
      }

      .list-img {
        width: 3.32rem; margin-right: 0.3rem; flex-shrink: 0; background: url("../assets/images/placeholder.png"); position: relative;
        & > img {
          width: $wd_100; height: 100%;
        }
      }
      .estimate-info{
        .estimate-title{
          width: 100%; height: 0.4rem; line-height: 0.4rem; font-weight: bold; display: flex; justify-content: space-between;

          .estimate-name{
            font-size: 0.3rem; color: #242424;
          }
        }
        .estimate-discribe{
          width: $wd_100;
          .brief{
            line-height: 0.39rem; font-size: 0.26rem; margin-top: 0.05rem; margin-bottom: 0.27rem; color: #aaaaaa; overflow: hidden; display: -webkit-box;
            text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          }
        }
        .estimate-fit{
          width: 100%; margin-top: 0.15rem; color: #bdbdbd; font-size: 0.22rem; display: flex; justify-content: space-between;
        }
      }
      .estimate-buy{
        width: 100%; height: 0.7rem; display: flex; justify-content: flex-start; align-items: center; padding-left: 0.34rem; padding-right: 0.34rem;

        .estimate-buy-num{
          font-size: 0.26rem; color: #a2a2a2; width: 3.32rem; margin-right: 0.3rem; line-height: 0.52rem;
        }

        .estimate-price{
          display: flex;justify-content: flex-end;flex-grow:1;
        }

        .estimate-now-price{
          font-size: 0.30rem; color: #ff3435; font-weight: bold; position: relative; line-height: 0.52rem; width: 1.65rem; display: flex; justify-content: flex-start;

          .estimate-old-price{
            top: 0; font-size: 0.2rem; color: #b4b4b4; text-decoration: line-through; text-align: left; line-height: 0.4rem;
          }
        }

        .btn-estimate-buy,.btn-estimate-go-on{
          width: 1.63rem; height: 0.5rem; text-align: center; background: #fe9d2a; border-radius: 0.08rem; font-size: 0.26rem; color: #fff;
          box-sizing: border-box; padding-top: 0.13rem; display: none;
        }
        .btn-estimate-go-on{
          background: #3bc0c4 !important;
        }
      }
    }
  }
</style>

<script>
  // VueAwesomeSwiper
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  require('swiper/dist/css/swiper.css')

//  import WeScroll from '../../library/components/Scroll/Scroll.vue'

  export default {
    data() {
      return {
        list: [], // 要存放的数据
        recommend: [],
        interestTests: [],
        counter:1,// 当前页
        num:5, // 一页显示多少条
        pageStart:0, // 开始页数
        pageEnd:0, // 结束页数
        noMorePage: false,
        scrollData: {
          noFlag:false
        },
        showNav: !zzhJs.env.isInApp(),
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
        interestTestSwiper: {
          loop: true,
          pagination: '.swiper-pagination',
          slidesPerView: 3,
          paginationClickable: true,
          mousewheelControl: true,
          spaceBetween: zzhJs.rem.convert(0.35),
          autoplayDisableOnInteraction: false,
          initialSlide: 2,
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