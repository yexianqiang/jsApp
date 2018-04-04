<template>
  <div class="list-view">
    <ul class="list-items">
      <template v-for="(item, key) in listData">
        <li class="item" @click="showDetail(key)">
          <div class="item-con-wrap">
            <div class="head-img"><img :src="'https://s2.zhizihua.com/upload/experts/'+ item.src+ '.png'"/></div>
            <div class="expert-title">
              <p class="teacher-name">{{ item.name }}</p>
              <p class="job-title">{{ item.subtitle }}</p>
            </div>
          </div>
          <div class="item-price-wrap">
            <p class="tele-price">{{item.phone_price}}元<span class="time">(60分钟)</span></p>
            <p class="price">{{ item.face2face_price }}元<span class="time">(60分钟)</span></p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
  .list-view{
    width:100%;min-height:100vh;padding: 0.25rem 0.25rem;
    img{
      width: 100%;
    }
    .item{
      width: 100%;height: 3.3rem;background: #fff;border-radius: 0.3rem;box-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.1);margin-bottom: 0.2rem;
      .item-con-wrap{
        width: 100%;height: 2.45rem;border-bottom: 0.01rem solid #f0f0f0;display: flex;justify-content: flex-start;align-items: center;padding: 0 0.52rem;
      }
      .head-img{
        width: 1.8rem;height: 1.8rem;border-radius: 50%;overflow: hidden;margin-right: 0.43rem; flex-shrink: 0;
      }
      .expert-title{
        .teacher-name{
          font-size: 0.4rem;color: #333333;line-height: 0.75rem;
        }
        .job-title{
          font-size: 0.28rem;color: #989898;line-height: 0.5rem;
        }

      }
      .item-price-wrap{
        padding-right: 0.5rem; padding-left: 0.5rem;display: flex;justify-content: space-between;align-items: center;
      }
      .price{
        font-size: 0.26rem;color: #feaa30;text-align: right;line-height: 0.9rem;position: relative;text-indent: 0.5rem;
        &:before{
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
        }
      }
      .tele-price{
        @extend .price;text-align: left;
        &:before{
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
        }
      }
      .time{
        color: #6d6d6d;margin-left: 0.1rem;
      }
    }
  }
</style>

<script>

  export default {
    data() {
      return {
        listData: window.experts
      }
    },
    mounted() {
      document.title = '咨询';
      $(window).scrollTop(0);
    },
    methods:{
      showDetail(id) {
        this.$router.push({ name: 'detail', params: { id }});
      }
    }
  }
</script>