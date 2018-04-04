<template>
  <div class="first-page-wrap">
    <div class="part-1-top-img" >
      <img v-if="detail.cover" :src="detail.cover" :title="detail.title">
    </div>

    <div class="part-2-title">
      <span class="title">{{ detail.title }}</span>
      <span class="usersum">{{ detail.report_count }}人测试过</span>
    </div>

    <div class="part-3-desc">
      <p class="desc">{{ detail.subtitle }}</p>
      <p class="fit-people">适合人群：<span>{{ detail.suit }}</span></p>
      <p class="more-desc">
        <span class="tag-1">测评简介</span>
        <span class="tag-2">{{ detail.discription }}</span>
      </p>
    </div>

    <div class="part-4-buttons">
      <a class="history" href="javascript:;" @click.stop.prevent="showReport">查看报告</a>
      <a class="start" href="javascript:;" @click.stop.prevent="showQuestions" v-if="btnText">{{ btnText }}</a>
    </div>

    <div class="child-selecter" v-if="hasChildren && showChildren" @click.self="cancel()">
      <div class="children-contraner">
        <h2 class="children-container-title">选择与测试</h2>
        <ul class="children">
          <template v-for="child in children">
            <li class="child" @click="selectTest(child.id)">
              <div class="estimate-name">
                <p>{{ child.title }}</p>
                <input type="radio" class="btn-select-hide" :value="child.id" v-model="selectedChild"/>
                <label class="btn-select"></label>
              </div>
              <p class="estimate-brief">{{ child.subtitle }}</p>
            </li>
          </template>
        </ul>
        <button class="submit" :class="{ disabled: !selectedChild}"  @click="gotoQuestions">确定</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../style/variables";
  .first-page-wrap{
    font-family: "Microsoft Yahei"; position: absolute; top:0; left:0; right:0; bottom:0;

    .part-1-top-img{
      width: 100%; height: 3rem; background: lightgreen; overflow: hidden; background: url("../assets/images/placeholder.png") no-repeat center;

      img{
         width: 100%;
      }
    }
    .part-2-title{
      display:flex; justify-content: space-between; align-items: center; height:0.9rem; padding:0 0.5rem; border-bottom: 1px solid #e4e4e4;

      .title{
        font-size: 0.34rem; font-weight: 700; color: #333;
      }
      .usersum{
        font-size: 0.26rem; color: #666666;
      }
    }
    .part-3-desc{
      font-size: 0.26rem; padding:0 0.5rem 1.1rem;
      /*border-bottom: 1px solid #e4e4e4;*/

      p{
        padding:0.32rem 0; border-bottom: 1px solid #e4e4e4;
      }
      p:nth-last-child(1){
        border:none;
      }
      .desc{
        font-size: 0.28rem; line-height: 0.5rem;color: #555555;
      }
      .fit-people{
        color:#333333;
        span{
          color:#666666;
        }
      }
      .more-desc{
        display:flex; flex-direction: column; font-size: 0.26rem;
        /*height: 4rem;*/
        /*position: relative;*/

        span{
          display: block; word-break: break-all;
        }
        .tag-1{
          color:#333333;
          font-size:0.28rem ;
          font-weight: 700;
        }
        .tag-2{
          padding:0 0.2rem;
          margin-top: 0.3rem; color: #777777; line-height: 0.5rem;  display: block;
          /*overflow: scroll;*/
          /*position: absolute; left:0; top: 0.5rem; bottom: 0.1rem; right: 0;*/
        }
      }
    }
    .part-4-buttons{
      display:flex; align-items: center; justify-content: center; height:1.08rem; position: fixed; bottom:0; width:100%;background: #fff;

      a{
        display:flex; align-items: center; justify-content: center; height:0.74rem; width: 3.0rem; text-decoration: none; color: white; background-color: #47c0c2; font-size: 0.36rem; border-radius: 0.7rem;
      }
      a:nth-child(1){
        margin-right: 0.34rem;
      }

    }
    .child-selecter{
      position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5);
      .children-contraner{
        width: 6.54rem; border-radius: 10px;background: #fff; box-sizing: border-box; padding-bottom: 0.4rem;
        position: absolute;left: 50%;top:50%;transform:translate(-50%,-50%); -webkit-transform:translate(-50%,-50%); -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%); -o-transform:translate(-50%,-50%);
        .children-container-title{
          font-size: 0.32rem; background: #47c0c2; line-height: 0.87rem; color: #fff; border-top-right-radius: 10px;border-top-left-radius: 10px; text-align: center;
        }
        .child {
          box-sizing: border-box; padding:  0.2rem  0.34rem 0.3rem 0.34rem; border-bottom: 0.01rem solid #e4e4e4;
          /*&:last-child {*/
            /*border-bottom: none;*/
          /*}*/
          .estimate-name{
            font-size: 0.28rem; line-height: 0.92rem;color: #000; display: flex; justify-content: space-between;
            .btn-select-hide{
              display: none;
            }
            .btn-select{
              width: 0.26rem; height: 0.26rem; border: 0.01rem solid #979697; border-radius: 50%;margin-top: 0.3rem;position: relative;
            }
            /*.btn-select-hide:checked ~ .btn-select{*/
              /*background: url("../assets/images/deatil/dot.png") no-repeat center;*/
            /*}*/
            .btn-select-hide:checked ~ .btn-select:after{
              content: ""; width:0.12rem; height:0.12rem ; background:#47c0c2;position: absolute; left: 50%;top: 50%;margin-left: -0.06rem;margin-top: -0.06rem; border-radius: 50%;
            }
          }
          .estimate-brief{
            font-size: 0.24rem; color: #666; line-height: 0.57rem;
          }
        }

      }


      .submit{
        font-size: 0.28rem; width: 2.2rem; height: 0.65rem; border-radius: 10px; text-align: center; line-height: 0.65rem;
background: #47c0c2;margin: 0.4rem auto 0;display: block;color: #fff;border: none;outline: none;
        &.disabled{
          background: #adacac;
        }
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        loaded: false,
        detail: {
          cover: '',
          title: '测评标题',
          report_count: 0,
          subtitle: '副标题',
          suit: '',
          discription: '',
        },
        children: [],
        needPay: false,
        hasBuy: false,
        selectedChild: 0,
        showChildren: false,
        orderCreating: false,
      };
    },
    computed: {
      hasChildren() {
        return this.children.length;
      },
      btnText() {
        // 针对第三方测试后禁止再次测试
        if (zzhJs.env.channel == 'third_party' && this.hasBuy) {
          return '';
        }

        if (this.hasBuy && this.needPay) {
          return '再次购买';
        } else if(!this.hasBuy && this.needPay) {
          return '购买测评';
        } else {
          return '开始测评';
        }
      },
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        let vthis = this,
          estimateId = this.$router.currentRoute.params.id,
          apiUrl = zzhJs.helpers.routeParser('api.estimate.detail', {
            id: estimateId,
          });

        this.weLoadStart();

        this.$http.get(apiUrl).then(res => {
          let response = res.body;

          if (response.status == 404) {
            vthis.weNotify(response.message);
            vthis.$router.replace({name: 'estimate.home'});
            return;
          }

          if (response.status == 501) {
            return vthis.weNotify(response.message);
          }

          vthis.detail = response.data.detail;
          vthis.children = response.data.children;
          vthis.needPay = response.data.needPay;
          vthis.hasBuy = response.data.hasBuy;

          document.title = response.data.detail.title;

          vthis.loaded = true;
          this.weLoadEnd();
        });
      },
      showReport() {
        if (!zzhJs.env.isLogined()) {
          return zzhJs.env.callLogin();
        }

        this.$router.push({name: 'estimate.report', params: { id: this.detail.id }});
      },
      showQuestions() {
        if (!zzhJs.env.isLogined()) {
          return zzhJs.env.callLogin();
        }

        if (!this.loaded) { return; }

        let vthis = this,
          estimateId = this.$route.params.id;

        if (!this.needPay) {
          if (this.hasChildren) {
            this.showChildren = true;
          } else {
            this.$router.push({name: 'estimate.questions', param: {id: estimateId}});
          }
          return;
        }

        if (zzhJs.env.isInApp() && zzhJs.env.isLogined()) {
            //
            window.jsCallBuyEstimateSuccess = function (message) {
              vthis.getData();
            }

            return this.createOrderZCallApp();
        }

        vthis.$router.replace({ name: 'pay.confirm', query: {
          product_id: estimateId,
          product_type: window.productTypes['estimate'],
        }});
      },
      createOrderZCallApp() {
        if (this.orderCreating) {
          return;
        }
          // 获取新的 OrderID
          let vthis = this,
            estimateId = this.$route.params.id,
            url = zzhJs.helpers.routeParser('api.payment.generate_order');

          // 创建或者读取订单 同时返回用户余额
          this.weLoadStart();
          this.orderCreating = true;
          this.$http.post(url, {
            product_id: estimateId,
            product_type: window.productTypes['estimate'],
          }).then(res => {
              let response = res.body;

              vthis.weLoadEnd();
              if (response.status != 200) {
                return vthis.weNotify(response.message);
              }
              zzhJs.env.callPayment(response.data.order_info.id);
              this.orderCreating = false;
            });
      },
      gotoQuestions() {
        if (!this.selectedChild) {
          return;
        }

        let estimateId = this.$router.currentRoute.params.id;
        this.$router.push({
          name: 'estimate.questions',
          param: {id: estimateId},
          query: {child_id: this.selectedChild}
        });
      },
      selectTest(id) {
        this.selectedChild = id;
      },
      cancel() {
        this.showChildren = false;
      }
    }
  }
</script>