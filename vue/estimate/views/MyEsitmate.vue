<template>
  <div id="my-estimate-wrap">
    <ul class="estimate-btns">
      <li @click="getData(requestUrl[2],3)" :class="{my_active:isShow == 3 ? true : false}">未完成的测评</li>
      <li @click="getData(requestUrl[1],2)" :class="{my_active:isShow == 2 ? true : false}">已完成的测评</li>
      <li @click="getData(requestUrl[0],1)" :class="{my_active:isShow == 1 ? true : false}">全部测评</li>
    </ul>
    <!--当没有测评的时候显示的默认页-->
    <div class="default-page" v-if="!hide">
      <p>暂无测评!</p>
    </div>
    <!--有测评的时候的测评列表-->
    <ul class="estimate-list" v-if="hide">
      <template v-for="item in list">
        <li class="estimate-list-item" @click="show(item)">
          <div class="my-estimate-image"><img :src="item.cover"/></div>
          <div class="my-estimate-discribe">
            <p class="my-esitmate-name">{{item.title}}</p>
            <p class="my-order-code">订单号：</p>
            <p class="my-order-code">{{item.order_id}}</p>
            <div class="about-buy">
              <p class="price">{{item.price | currency}}</p>
              <div class="btn-buy btn-go-on" v-if="item.is_used == 0">继续测评</div>
              <div class="btn-buy" v-if="item.is_used == 1" @click.stop="goBuy(item)">立即购买</div>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="scss">
  $wd_100: 100%;
  #my-estimate-wrap{
    width: $wd_100;background: #f3f3f3;min-height: 100vh;
    .my-estimate-title{
      width: $wd_100;
      height: 2.6rem;
      background:-webkit-linear-gradient(to top,#8cd8e6,#86f2be );
      background:linear-gradient(to top, #8cd8e6,#86f2be);
      padding: 0 0.63rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .title-left{
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .head-image{
        width: 1.3rem;height: 1.3rem;border-radius: 50%;overflow: hidden;border:0.05rem solid rgba(255,255,255,.4);
        img{
          width: 100%;height: 100%;
        }
      }
      .person-name{
        font-size: 0.36rem;color: #555555;margin-top: 0.15rem;text-align: center;
      }
      .title-discribe{
        line-height: 0.6rem;font-size: 0.34rem;color: #252527;display:none;
      }
    }

    .estimate-btns{
      width: $wd_100;height: 0.85rem;background: #fff;display: flex;justify-content: space-around;
      margin-bottom: 0.2rem;
      &>li{
        font-size: 0.28rem;color: #666666;line-height: 0.85rem;position: relative; text-align: center; width: 33%;
        &:after{
          content: '';
          width: 0.02rem;
          height: 0.44rem;
          background: #ececec;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);

        }
        &:nth-child(3):after{ display: none; }
      }
    }
    .my_active{
      color: #39c0c1 !important;
    }

    .default-page{
      width: 100%;font-size: 0.4rem;text-align: center;color: #ccc;position: absolute;left: 0;top: 3.65rem; bottom: 0.85rem;
      &>p{
        position: absolute;top: 50%;left:50%;transform: translate(-50%,-50%);
      }
    }

    .estimate-list{
      width: $wd_100;padding-bottom: 0.85rem;margin-bottom: 0.2rem;
      &>li{
        width: $wd_100;padding: 0.3rem 0.34rem;background: #fff;border-bottom: 0.01rem solid #f2f2f2;display: flex;justify-content: flex-start;
        .my-estimate-image{
          width: 3.32rem;height: 1.67rem;background: #33aaaa;margin-right: 0.2rem;
          &>img{
            width: 100%;height: 100%;
          }
        }
        .my-estimate-discribe{
          flex-grow:1;
        }
        .my-esitmate-name{
          font-size: 0.3rem;/*font-weight: bold;*/color: #111111;line-height: 0.6rem;
        }
        .my-order-code{
          font-size: 0.24rem;color: #777777;
        }
        .about-buy{
          display: flex; justify-content: flex-end;margin-top: 0.3rem;
          .price{
            font-size: 0.3rem;font-weight: bold;color: #ff3433;
          }
          .btn-buy{
            width: 1.63rem;height: 0.5rem;background: #fe9d2a;border-radius: 0.08rem;text-align: center;line-height: 0.5rem;color: #fff;font-size: 0.28rem;
            margin-left: 0.7rem;
            display:none;
          }
          .btn-go-on{
            background: #3bc0c4 !important;
          }
        }
      }
    }
  }
</style>
<script>

  export default{
    data(){
      return{
        list:[],
        isShow:1, // 默认“全部测评”列表显示，当其值为2时为“已完成测评”列表显示，当其值为3时为“未完成测评”列表显示
        hide:false, // 决定是否显示列表页还是显示无测评
        requestUrl:['api.mine.estimate_all','api.mine.estimate_complete','api.mine.estimate_un_complete'],
      }
    },
    mounted(){
        document.title = '测评中心';
        this.getData(this.requestUrl[0],1);
    },
    methods:{
      show(item){
        this.$router.push({ name: 'estimate.detail', params: {id: item.estimate_id }});
      },
      getData(path,num){
        this.list = [];
        this.isShow = num;

        let vthis = this,
          url = zzhJs.helpers.routeParser(path,{});

        this.weLoadStart();
        this.$http.get(url).then(res => {
          let response = res.body;
          if(response.data.length !== 0){
            vthis.hide = true;
            response.data.forEach(function (e) {
              vthis.list.push(e);
            });

          }else {
            vthis.hide = false;
          }
          this.weLoadEnd();
        },function () {
          vthis.weNotify('服务器繁忙稍后再试!');
        })

      },
      goBuy(item){
        this.$router.push({name: 'pay.confirm',query: {
          product_id: item.estimate_id,
          product_type: window.productTypes['estimate'],
        }})
      }
    }
  }

</script>