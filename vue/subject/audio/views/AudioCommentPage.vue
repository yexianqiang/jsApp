<template>
  <div class="estimate-list-view">
      <div class="banner" style="width: 100%;height:3rem;background: red;"></div>

    <div class="interest-test">
      <p class="block-title"><i class="iconfont icon-brain color-zhizilv" style="margin-right: 0.1rem;"></i>趣味测评</p>
      <!--<v-swiper class="item-wrap" :options="interestTestSwiper" ref="mySwiper">-->
      <div class="out-item-wrap">
        <div class="item-wrap">
          <template v-for="item in 4">
            <!--<v-swiper-slide class="item">-->
            <div class="item">
              <div class="test-pic"><img src=""/></div>
              <div class="test-discribe-wrap">
                <p class="test-title">家长自信水平评估{{item}}</p>
                <p class="test-intro">你的阳光值够孩子偷了吗？</p>
              </div>
            </div>
            <!--</v-swiper-slide>-->
          </template>
        </div>
      </div>


      <!--</v-swiper>-->
    </div>

    <div class="estimate-wrap">
      <p class="block-title"><i class="iconfont icon-profession color-zhizilv" style="margin-right: 0.1rem;"></i>专业测评</p>
      <ul class="estimate-list-wrap">
        <template v-for="item in 4">
          <li>
            <div class="estimate-title-wrap">
              <p class="estiamte-tag">中小学生</p><p class="estimate-title">自信评估系统</p>
            </div>
            <p class="estimate-intro">自信是成功的第一秘诀，“天生我才必有用”的豪迈</p>
            <div class="buy-info">
              <p class="buy-num ft24">16人购买</p>
              <div class="price-wrap">
                <p class="old-price ft24">120</p>
                <p class="current-price ft36">80</p>
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
  @import "../../../assets/iconfont/iconfont.css";
  .ft20{font-size: 0.2rem} .ft24{ font-size: 0.24rem;} .ft26{font-size: 0.26rem;} .ft28{font-size: 0.28rem;} .ft30{font-size: 0.3rem;} .ft32{font-size: 0.32rem;} .ft36{font-size: 0.36rem;}
  .color-zhizilv{color: #3abfc3;}

  .estimate-list-view{
    width: 100%;

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
        height: 3.5rem; width: 2.6rem !important;overflow: hidden; border-radius: 0.14rem;margin-right: 0.3rem;flex-shrink: 0;
        .test-pic{
          width: 2.6rem; height: 2.3rem; background: #ddd;border-radius: 0.14rem;
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
        width: 100%;
        &>li{
          width: 100%; height: 2.24rem;padding: 0.3rem 0.3rem 0;border-bottom: 0.01rem solid #f6f6f6;
          .estimate-title-wrap{
            display: flex;align-items: center;line-height: 0.5rem;
          }
          .estimate-title{
            font-size: 0.36rem;color: #333;
          }
          .estiamte-tag{
            display:inline-block;padding:0 0.1rem;background: #bec9c9;color: #fff;text-align: center;line-height: 0.35rem;
            border-radius: 0.08rem ;margin-right: 0.2rem; font-size: 0.24rem;
          }
          .estimate-intro{
            font-size: 0.26rem;color: #999;width: 100%;display: -webkit-box;overflow: hidden;text-overflow:ellipsis;-webkit-box-orient: vertical;-webkit-line-clamp:1;line-height: 0.5rem;
          }
          .buy-info{
            width: 100%;display: flex;justify-content: space-between;align-items: center;margin-top: 0.3rem;color: #999;
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
        interestTestSwiper: {
          loop: true,
          pagination: '.swiper-pagination',
          slidesPerView:3,
          mousewheelControl: true,
          spaceBetween: zzhJs.rem.convert(0.3),
          autoplayDisableOnInteraction: false,
          initialSlide:2,
        },
      }
    },
    mounted() {
      document.title = '评价';
    },
    methods:{
      selectStar(item) {
        this.selectedStarsIndex = item;
      },
      submitComment() {

      }
    },
    components: {
      vSwiper: swiper,
      vSwiperSlide: swiperSlide
    }
  }
</script>