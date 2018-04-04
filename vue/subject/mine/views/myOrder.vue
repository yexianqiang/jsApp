<template>
  <div class="my-order-view">
    <ul class="my-order-list-wrap">
      <template v-for="item in orderList">
        <li>
          <div class="title-bar">
            <p class="order-name">
              <span class="order-type" v-if="item.type == 2">视频 &nbsp;-&nbsp;</span>
              <span class="order-type" v-if="item.type == 1">音频 &nbsp;-&nbsp;</span>
              <span class="order-type" v-if="item.type == 3">问题包 &nbsp;-&nbsp;</span>
              <span class="product-name" v-if="item.product">{{item.product.name}}</span>
              <span class="product-name" v-if="item.packaging">{{item.packaging.name}}</span>
            </p>
            <p class="order-num" v-if="item.product">x{{item.product_num}}</p>

          </div>
          <div class="order-info">
            <div>
              <p class="order-no">订单号：{{item.order_no}}</p>
              <p class="order-date">日期：{{item.create_time}}</p>
            </div>
            <p class="order-item-price">{{item.price | currency}}</p>
          </div>
          <div class="user-info">
            <div class="user-head-pic"><img :src="item.user.avatar"/></div>
            <p class="user-name">{{item.user.name}}</p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="scss">
.my-order-list-wrap{
  width: 100%;
  &>li{
    width: 100%;height: 2.77rem;background: #fff;margin-bottom: 0.2rem;
    .title-bar{
      width: 100%;height: 1.15rem;border-bottom: 0.02rem solid #f9f9f9;display: flex;justify-content: space-between;align-items: center;padding: 0.4rem 0.3rem;
      .order-name{
        font-size: 0.32rem;color: #232323;margin-right: 0.75rem;display: flex;justify-content: flex-start;align-items: center;
        .order-type{
          font-size: 0.26rem;color: #b0b0b0;display: block;flex-shrink: 0;
        }
      }
      .product-name{
        line-height: 0.42rem;
      }
      .order-num{
        font-size: 0.28rem;color: #b0b0b0;
      }

    }
    .order-info{
      padding: 0.2rem 0.3rem 0;display: flex;justify-content: space-between;
      .order-item-price{
        font-size: 0.3rem;color: #fb9c3a;
      }
    }
    .order-no,.order-date,.user-name{
      font-size: 0.22rem;color: #d2d2d2;line-height: 0.3rem;
    }
    .user-info{
      display: flex;justify-content: flex-start;align-items: center;margin-top: 0.24rem;padding: 0 0.3rem;
      .user-head-pic{
        width: 0.37rem;height: 0.37rem;border-radius: 50%;overflow: hidden;margin-right: 0.2rem;
        background: url("../../../assets/image/icon_head.png") no-repeat center;background-size: 100%;
        &>img{
          width: 100%;display: block;
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
        orderList:[],
      }
    },
    mounted() {
      document.title = '我的订单';
      this.getOrderData();
    },
    methods:{
      getOrderData() {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/order/my_order.action')
          .then(res => {
            let response = res.body.data;
            response.forEach((item, index) => {
              item.create_time = vthis.formatTime(item.create_time);
            })
            vthis.orderList = response;
          }, res => {

          })
      },
      formatTime(time) {
        let date = new Date(time);
        let hour = date.getHours() > 10 ? date.getHours() :'0'+ date.getHours(),
            minute = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes(),
            seconds = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
        return [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-')+' '+ [hour, minute, seconds].join(':');

      },
    }
  }
</script>