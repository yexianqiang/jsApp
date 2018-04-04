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
          <p class="tele">{{ info.tel }}</p>
        </li>
        <li>
          <p class="info-title">咨询师信息</p>
          <p class="teacher-name">咨询师姓名：{{ info.counselor_info.name }}</p>
          <p class="meal">购买套餐：{{info.type == 1? '电话咨询': '面询' }} {{ info.consult_num }}次/{{ info.consult_time }}分钟<span class="price">￥{{ info.price }}</span></p>
        </li>
        <li>
          <p class="info-title">提示信息</p>
          <p class="tip">请保持电话畅通，客服人员会在收到付款后的4小时内和您取得联系，如有疑问请咨询<a class="tele-num" :href="'tel:'+ info.service_tel">{{  info.service_tel }}</a></p>
        </li>
        <li>
          <a :href="zzhJs.config.urlConsultList"><div class="btn-back">确定</div></a>
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
        &:nth-child(3),&:nth-child(4){
          border-bottom: 0;
        }

        .btn-back{
          width: 60%;height: 0.7rem;margin:0 auto;background: #3fbfc0;border-radius: .1rem;text-align: center;line-height: .7rem;font-size: .36rem;color: #fff;
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
          tel: '00000000000',
          type: 1,
          price: 0,
          consult_num: 1,
          consult_time: 60,
          counselor_info: {
            name: 'XXX',
          }
        },
      }
    },
    mounted() {
      document.title = '支付完成';
      this.getData();
    },
    methods: {
      getData() {
        let vthis = this;

        // 签名预创建微信订单
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain+ '/zzhedu/app/consult/detail.action', {
          order_no: this.$route.params.id
          })
          .then(res => {
          this.weLoadEnd();

          var response = res.body;

          if (response.status != 200) {
            return vthis.weNotify(response.message);
          }

          vthis.info = response.data;

        }).catch(e => {});
      }
    }
  }
</script>