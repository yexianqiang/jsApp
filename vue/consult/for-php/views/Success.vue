<template>
  <div class="success-view">
    <div class="success-title">
      <p class="icon-success"></p>
      <p class="success-tip">支付成功！</p>
    </div>
    <div class="success-info">
      <ul class="info-items">
        <li>
          <p class="info-title">您的信息</p>
          <p class="name">{{ info.name }}</p>
          <p class="tele">{{ info.mobile }}</p>
        </li>
        <li>
          <p class="info-title">咨询师信息</p>
          <p class="teacher-name">咨询师姓名：{{ expert.name }}</p>
          <p class="meal">购买套餐：{{info.package == 1? '电话咨询': '面询' }} {{ info.pieces }}次/60分钟<span class="price">￥{{ order.amount }}</span></p>
        </li>
        <li>
          <p class="info-title">提示信息</p>
          <p class="tip">请保持电话畅通，客服人员会在收到付款后的4小时内和您取得联系，如有疑问请咨询<a class="tele-num" href="tel:17600735310">17600735310</a></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.success-view{
  width: 100%;padding-top: 0.5rem;
  .success-title{
    width: 100%;height: 1.85rem;display: flex;justify-content: flex-start;align-items: center;padding: 0 1.6rem;
    .icon-success{
      width: 1.3rem;height: 1.3rem;border-radius:50%; overflow:hidden;background:url("../assets/images/success/right.png") no-repeat center;background-size:100%;margin-right: 0.3rem;
    }
    .success-tip{
      font-size: 0.45rem;color: #313131;font-weight: bold;
    }
  }
  .success-info{
    width: 6.42rem;height: 8.91rem;background: url("../assets/images/success/success_bg.png") no-repeat center;background-size:100%;margin: 0.2rem auto 0;padding-top: 0.53rem;
    .info-items{
      width: 100%;padding-left: 0.4rem;padding-right: 0.4rem;
      &>li{
        width: 100%;border-bottom: 0.01rem solid #ececec;color: #656565;font-size: 0.28rem;line-height: 0.54rem;padding-bottom: 0.3rem;
        .info-title{
          font-size: 0.32rem;color: #313131;font-weight: bold;
        }
        .price{
          color: #ff8a00;margin-left: 0.1rem;
        }
        .tele-num{
          @extend .price
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
        info: {
          name: 'XXX',
          mobile: '00000000000',
        },
        package: {
          pieces: 0,
        },
        expert: {
          name: ''
        },
        order: {
          amount: 0
        }
      }
    },
    mounted() {
      document.title = '支付完成';
      this.getData();
    },
    methods: {
      getData() {
        let vthis = this,
        orderId = this.$route.params.id,
        url = zzhJs.helpers.routeParser('wechat.consult.item', {
          orderId
        });

        // 签名预创建微信订单
        this.weLoadStart();
        this.$http.get(url)
          .then(res => {
          this.weLoadEnd();

          var response = res.body;

          if (response.status != 200) {
            return vthis.weNotify(response.message);
          }

          vthis.info = response.data.info;
          vthis.expert = window.experts[response.data.info.expert_id];
          vthis.order = response.data.order;

        });
      }
    }
  }
</script>