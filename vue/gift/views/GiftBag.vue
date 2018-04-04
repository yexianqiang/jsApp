<template>
  <div class="gift-views">

    <!--一元购买已经使用须知-->
    <div class="gift-price">
      <p class="gift-buy" @click="jumpPayment">一元购买</p>
      <p class="buy-info" @click="jumpExplain">使用须知 ></p>
    </div>

    <!--for 循环改的-->
    <div class="gift-list" v-for="item in data">
      <p class="list-title">{{ item.listTitle }}</p>
      <div class="list-explain">
        <div class="explain-img">
          <img :src="item.image" alt="">
        </div>
        <ul class="explain-text">
          <li>
            <span >{{ item.info[0] }}</span >
            <span>{{ item.info[1] }}</span>
          </li>
          <li>
            <span >{{ item.info[2] }}</span >
            <span>{{ item.info[3] }}</span>
          </li>
          <li>
            <span >{{ item.info[4] }}</span >
            <span>{{ item.info[5] }}</span>
          </li>
          <li>
            <span >{{ item.info[6] }}</span >
            <span>{{ item.info[7] }}</span>
          </li>
        </ul>
        <div class="explain-more" >
          <p @click="showMoreInfo(item.id, item.type)">查看更多</p>
        </div>
      </div>
    </div>
    <p class="gift-buy" style="margin: 0 auto;margin-top: .62rem;font-weight: bolder" @click="jumpPayment">一元购买</p>

  </div>
</template>
<style lang="scss">
  @import "../../assets/iconfont/iconfont.css";
  .gift-views{
    background: url("../assets/icon_page_bg.png") no-repeat;
    min-height:100vh;
    background-size:100% 100%;
    padding-bottom: .68rem;

  }
  .gift-price{display: flex;justify-content: center;flex-direction: column;align-items: center;padding-top: 3.1rem;font-weight: bolder}
  .gift-buy{font-size: .3rem;width: 2.94rem;height: .72rem;background: linear-gradient(to bottom, #f9e717, #f7ba11);border-radius: 6px;
    text-align: center;line-height: .72rem;color: #540000;
  }
  .buy-info{font-size: .18rem;margin-top: .14rem;color: #f3f3f3}
  .gift-list{
    margin-top: .86rem;
    background: url("../assets/icon_bg.png");
    background-size: cover;
    height: 7.13rem;
    .list-title{color: #fce832;font-size: .33rem;text-align: center;padding-top: .33rem;

    }
    .list-explain{width: 100%;text-align: center;padding-top: .53rem}
    .explain-img{ margin: 0 auto;width: 3.95rem;
      >img{width: 100%}
    }
    .explain-text{font-size: .24rem;color: #f3f3f3;line-height: .41rem;
      width: 5.29rem;margin: 0 auto;text-align: left;
    }
    .explain-more{
      font-size: .3rem;height: .6rem;background: white;border-radius: 6px;width: 1.78rem;
      line-height: .6rem;margin: 0 auto;margin-top: .40rem; color: #323993;font-weight:bold;
    }

  }
</style>

<script>
  export default {
    data() {
      return {
        // image01: require('../asset/te_01.png'),
        // image02: require('../asset/te_02.png'),
        // image03: require('../asset/te_03.png'),
        // image04: require('../asset/te_04.png'),
        calling: false,
        config: null,
        package_id:'',
        data: [
          {listTitle:"如何应对孩子的坏脾气", image:require('../assets/te_01.png'), info:['第1节','发脾气常见的类型，你的孩子是哪一种？','第2节','孩子闹情绪,到底是怎么了？','第3节','孩子发脾气时，家长千万不能这样说。','第4节','如何做个型家长。'], id:19, type:1},
          {listTitle:"杰出教子密码", image:require('../assets/te_02.png'), info:['第1节','父子关系：坚毅的儿子如何培养（上）','第2节','父子关系：坚毅的儿子如何培养（下）','第3节','冥想训练：协调父子关系的练习。','第4节','母子关系：伟大的母爱是得体的推出（上）'], id:14, type:1},

          {listTitle:"寻找高效的学习方法", image:require('../assets/te_03.png'), info:['第1节','破解孩子的“学习依赖性”','第2节','学习太单调？一招改变他！','第3节','电子产品只会干扰孩子学习？','第4节','孩子考试成绩下降，有比说教更好的方法'], id:58, type:2},
          {listTitle:"让孩子在初二逆流而进", image:require('../assets/te_04.png'), info:['第1节','发脾气常见的类型，你的孩子是哪一种？','第2节','孩子"闹情绪"，到底是怎么了？','第3节','孩子发脾气时，家长千万不能这样说。','第4节','如何做个“通情”型家长。'], id:40, type:2},
        ],
        wx_paying:false,
      }
    },
    mounted() {
      document.title = '一元体验大礼包';


    },
    methods:{
      jumpExplain() {
        // console.log('hello')
        this.$router.push({
          path: 'giftExplain'
        })
      },
      //
      jumpPayment() {
        let vthis = this;
        this.weLoadStart();
        if (this.wx_paying) {
          return false;
        }
        this.wx_paying = true;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/order/create_package.action',{
          title:'一元大礼包',
          tel:'',
          package_id: 29,
          price: 0.01,
          type: 3,
          attach: zzhJs.env.environment,
        })
          .then(res=>{
            vthis.weLoadEnd();
            let response = res.body;
            vthis.config = response.data;
            console.log(vthis.config);
            vthis.callWechat();
          },function () {
            vthis.loading = false;
            vthis.weLoadEnd();
          })
      },
      callWechat() {
        let vthis = this,
          config = _.clone(this.config);
        wx.chooseWXPay({
          timestamp: config['timestamp'],
          nonceStr: config['nonce_str'],
          package: config['package'],
          signType: config['sign_type'],
          paySign: config['pay_sign'],
          success: function (res) {
            vthis.wx_paying = false;
            if (res.errMsg != "chooseWXPay:ok") {
              return vthis.weNotify('支付失败,请重试!'+ res.errMsg);
            }

            window.location.href= `${zzhJs.config.urlMineBuy}/audio`;

          },
          cancel: function (res) {
            vthis.wx_paying = false;
          },
          fail: function (res) {
            vthis.wx_paying = false;
            return vthis.weNotify('支付失败,请重试!');
          }
        });
      },
      showMoreInfo(id, type) {
        if (type == 1) { // type为1表示为音频
          window.location.href = `${zzhJs.config.urlAudioList}?#/${id}`;
        } else { //type 为2表示为视频
          window.location.href = `${zzhJs.config.urlVideoList}?#/${id}`
        }
      }
    }
  }
</script>
