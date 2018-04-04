<template>
  <div id="pay-success-page">
    <div class="pay-tip-wrap">
        <p><span class="icon_success"></span>恭喜您，购买成功！</p>
    </div>

    <div class="pay-test-info-wrap">
      <div class="pay-test-info">
        <p>购买产品：<span>{{ info.title }}</span></p>
        <p>支付金额：<span>{{ info.amount }}元</span></p>
      </div>
    </div>

    <div class="pay-btn-wrap">
      <button class="watch-btn" :class="{disabled: !loaded}" @click="showProduct">查看产品</button>
      <button class="pay-complete-btn" :class="{disabled: !loaded}" @click="showProduct">完成</button>
    </div>
  </div>
</template>

<style lang="scss">
  $goldColor:#f08619;

  #pay-success-page {
    height: 100vh; background: #edf1f1;

    .pay-tip-wrap {
      width: 100%; height: 1.6rem; position: relative;

      p {
        width: 3.3rem; height: 0.6rem; line-height: 0.6rem; margin-left: -1.6rem; margin-top: -0.3rem;

        font-size: 0.28rem; color: #333333; text-align: right; position: absolute; left: 50%; top: 50%;
        .icon_success{
          display: inline-block;width: 0.6rem;height: 0.6rem;background:url("../../assets/images/pay/pay_icon.png") no-repeat left center; background-size: 100%;background-position: 0 -3.16rem;
          vertical-align: middle;margin-right: 0.1rem;
        }
      }
    }

    .pay-test-info-wrap {
      width: 100%; padding: 0 0.3rem;

      .pay-test-info {
        box-sizing: border-box; width: 100%; height: 1.8rem; background: #fff; border-radius: 0.15rem; padding: 0 0.25rem;

        p{
          font-size: 0.28rem; color: #333; line-height: 0.9rem;

          &:nth-child(1) {
            border-bottom: 0.01rem solid #dfe6e6;
          }

          span {
            color: $goldColor;
          }
        }
      }
    }
    .pay-btn-wrap {
      width: 100%; padding: 0 0.3rem; display: flex; justify-content: center; margin-top: 0.4rem;

      button {
        width: 3.3rem; height: 0.8rem; border-radius: 5rem; outline: none; border: none; font-size: 0.30rem; color: #fff; margin-right: 0.3rem;

        &:last-child {
          margin-right: 0;
        }

        &:active {
          position: relative;
          top: 0.01rem;
        }
      }

      .watch-btn {
        background: $goldColor;
      }

      .pay-complete-btn {
        background: #47c0c2;
      }

      .disabled{
        background: #ccc;
      }
    }
  }
</style>

<script>

  export default {
    data() {
      return {
        info: {
          title: '',
          amount: 0,
        },
        order: null,
        loaded: false,
      };
    },
    mounted() {
      this.getData();
    },
    props() {},
    methods: {
      getData() {
        let vthis = this,
          url = zzhJs.helpers.routeParser('api.payment.order_detail', {
          id: this.$router.currentRoute.query.order_id,
        });

        this.weLoadStart();
        this.$http.get(url)
          .then(res => {
          let response = res.body;

          if(response.status != 200){
            return vthis.weNotify(response.message);
          }

          vthis.info.title = response.data.product_info.title;
          vthis.info.amount = response.data.order_info.amount;
          vthis.order = response.data.order_info;
          vthis.loaded = true;

          vthis.weLoadEnd();

        }, res => {
          vthis.weLoadEnd();

          vthis.weNotify('服务端繁忙请稍后再试!');
        });
      },
      showProduct() {
        if(!this.loaded){
          return;
        }

        if (this.order.product_type == window.productTypes['estimate']) {
          this.$router.replace({name: 'estimate.detail', params: {id: this.order.product_id}});
          return;
        }

      }
    }
  }
</script>
