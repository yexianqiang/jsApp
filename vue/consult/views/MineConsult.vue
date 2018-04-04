<template>
  <div class="mine-view">
    <!--<we-scroll  :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">-->
    <scroller :on-refresh="refresh" :on-infinite="infinite" :minContentHeight="100"  :noDataText="noDataText" ref="my_scroller">
      <div class="mine-info">
        <ul class="info-tele-items">
          <template v-for="(item, index) in list">
            <li>
              <div class="info-title" v-if="item.type == 1 ">电话咨询</div>
              <div class="info-title face-to-face-title" v-else>面对面咨询</div>
              <div class="info-detail">
                <p class="s-title">咨询师姓名：{{ item.counselor_info.name }}</p>
                <p class="s-title">订单价格：{{ item.consult_num }}次/{{ item.consult_time }}分钟 <span class="price">{{ item.price | currency }}</span></p>
                <p class="s-title">购买时间：{{ item.create_time | formatDate }}</p>
              </div>
            </li>
          </template>

        </ul>
      </div>
    </scroller>
    <!--</we-scroll>-->
    <!--无内容的时候展示的-->
    <p class="show-no-info" v-if="noInfo">暂无内容</p>
  </div>
</template>

<style lang="scss">
  .mine-view{
    width: 100%;
    .mine-info{
      width: 100%;padding: 0.2rem 0.2rem 0.97rem 0.2rem;min-height: 100vh;
      .info-tele-items{
        width: 100%;
        &>li{
          width: 100%;height: 2.85rem;border-radius: 0.16rem;background: #fff;box-shadow: 0.06rem 0.04rem 0.24rem rgba(97,93,93,.2);margin-bottom: 0.25rem;
          .info-title{
            width: 100%;height: 0.75rem;border-top-left-radius: 0.16rem; border-top-right-radius: 0.16rem;background: linear-gradient(to right,#22abb5,#23e1df);
            font-size: 0.36rem;color: #fff;line-height: 0.75rem;text-indent: 0.9rem;position: relative;
            &::before{
              content: '';width: 0.42rem;height: 0.42rem;background:url("../assets/images/mine/icon-sprite.png") no-repeat center;background-position: 0 0;background-size: 100%;
              position:absolute;left: 0.3rem;top: 50%;transform: translateY(-50%);
            }
          }
          .face-to-face-title{
            &::before{
              background:url("../assets/images/mine/icon-sprite.png") no-repeat center;background-position: 0 -1rem;background-size: 100%;
            }
          }
          .info-detail{
            width: 100%;padding-top: 0.3rem;padding-left: 0.3rem;padding-right: 0.3rem;
          }
          .s-title{
            font-size: 0.24rem;color: #545454;line-height: 0.5rem;
          }
          .price{
            color: #ff9805;
          }
        }
      }
      .info-face-items{
        @extend .info-tele-items;
        &>li{
          .info-title{
            &::before{
             background:url("../assets/images/mine/icon-sprite.png") no-repeat center;background-position: 0 -1rem;background-size: 100%;
            }
          }
        }
      }
    }

    .show-no-info{
      font-size: 0.4rem;color: #cccccc;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);z-index: 299;
    }

    .yo-scroll{
     bottom: 0.97rem;z-index: 50;
      .inner{
        .load-more{
          height: 0.9rem; line-height: 0.9rem; font-size: 0.34rem;
        }
        .nullData{
          @extend .load-more;
        }
        .pull-refresh{
          font-size: 0.34rem;
        }
      }
    }
  }
</style>

<script>
  import WeScroll from '../../zhizihua/components/Scroll/Scroll.vue'

  export default {
    data() {
      return {
        list: [

        ],
        noInfo:false,
        // 上拉加载，下拉刷新的配置
        scrollData:{
          noFlag:false
        },
        counter:1,// 当前页
        num:5, // 一页显示多少条
        pageStart:1, // 开始页数
        pageEnd:0, // 结束页数
        noDataText:'',
        isFreshing:false, // 表示当前是否有正在刷新的数据
      }
    },
    mounted() {
      document.title = '我的咨询';
      let vthis = this;
      this.getDataFirst({
          page_no: vthis.pageStart,
          page_size: vthis.num,
        });
    },
    methods: {
      getData(params,callback) {
        let vthis = this;

        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/consult/mine.action',params).then(res => {
          let response = res.body;
          vthis.noInfo = response.data.consult_list.length > 0 ? false : true;
          vthis.noDataText = response.data.consult_list.length > 0 ? '暂无更多数据' : '';
          vthis.counter = response.data.page_no;
          vthis.pageEnd = Math.ceil(response.data.total / vthis.num);


          response.data.consult_list.forEach(function (e) {
            vthis.list.push(e)
          })

          if (callback) {
            callback();
          }
          vthis.isFreshing = false;

          this.weLoadEnd();
        }).catch((res) => {
          zzhJs.console.log(res);
        });

      },

      getDataFirst(params,callback) {
        let vthis = this;
        vthis.list = [];
        this.getData(params,callback);
        vthis.$refs.my_scroller.scrollTo(0, 0, false)

      },

//      formatDate(time) {
//        let date = new Date(time),
//         day = [date.getFullYear(),date.getMonth()+1,date.getDate()].join('-'),
//         hour_minute = [date.getHours(),date.getMinutes()].join(':')
//        return day+' '+hour_minute;
//      },

      // 修改后的刷新和加载
      refresh(done) {
        let vthis = this;

        if (this.isFreshing){
          return;
        }

        this.isFreshing = true;

        this.getDataFirst({
          page_no:vthis.pageStart,
          page_size:vthis.num
        },done)
      },
      infinite(done) {
        let vthis = this;
        this.counter++;
        if (this.counter > this.pageEnd) {
//          vthis.noDataText = '暂无更多数据'
          setTimeout(function () {
            done(true);
          },500)
          return;
        }
        this.getData({
          page_no:vthis.counter,
          page_size:vthis.num
        },done)
      }

    },
    components:{
      WeScroll
    }
  }
</script>