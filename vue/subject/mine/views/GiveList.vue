<template>
  <div class="mine-give-list-view">
    <ul class="mine-give-nav-wrap">
      <template v-for="(item,index) in nav">
        <li @click="changeList(index)"><a :class="{'active':unGive == index}">{{item}}</a></li>
      </template>
    </ul>


    <ul class="mine-give-list-wrap">
      <template v-for="item in give_list">
        <li @click="lookGiveInfo(item)">
          <div class="class-img">
            <img :src="item.product.img_min"/>
          </div>
          <div class="class-info">
            <div>
              <p class="class-name">{{item.product.name}}</p>
            </div>
            <p  class="update-time">
              <span>{{item.update_time | formatDate('YYYY-MM-DD')}}</span>
            </p>
          </div>
          <div class="btn-give" v-if="item.state == 3">已领取</div>
          <div class="btn-give2"  v-if="item.state == 0">赠送</div>
        </li>
      </template>

    </ul>

    <!--无内容的时候展示的-->
    <p class="show-no-info" v-if="noInfo">暂无内容</p>
  </div>
</template>

<style lang="scss">
  .mine-give-list-view{
    width: 100%;
    img{
      width: 100%;
    }
    .mine-give-nav-wrap{
      height: 0.8rem; width: 100%;display: flex;justify-content: space-around;align-items: center;
      &>li{
        width: 50%;text-align: center; font-size: 0.3rem;line-height: 0.8rem;
        a{
          position: relative;display: inline-block;padding-left: 3px;padding-right: 3px;
          &.active:after{
            content: ''; position: absolute;left: 0;bottom: 0;width: 100%;height: 2px;background:#2ebebf;
          }
        }

      }
    }
    .mine-give-list-wrap{
      width: 100%;background: #fff;
      &>li{
        width: 100%; height: 1.92rem; display: flex;justify-content: flex-start;align-items: center;padding: 0 0.2rem;
        .class-img{
          width: 1.67rem;height: 1.25rem;margin-right: 0.3rem;flex-shrink: 0;border-radius: 0.08rem;overflow: hidden;
          background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
        }
        .class-info{
         width: 100%; height: 1.25rem;display: flex;justify-content: space-between;flex-flow: column;
          .class-name{
            font-size: 0.3rem;color: #313131;line-height: 0.4rem;
          }
          .update-time{
            color: #b8b8b8;font-size: 0.24rem;
          }
        }
        .btn-give{
          width: 0.92rem;height: 0.5rem;border-radius: 0.08rem;font-size: 0.24rem; flex-shrink: 0;margin-left: 0.3rem;
          flex-shrink: 0;text-align: center; line-height: 0.5rem;color: #35c3c4;
        }
        .btn-give2{
          @extend .btn-give; background: #35c3c4;color: #fff;
        }
      }
    }

    .show-no-info{
      font-size: 0.4rem;color: #cccccc;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);
    }


  }
</style>

<script>

  export default {
    data() {
      return {
        nav:['未赠出','已赠出'],
        unGive:0,

        give_list:[
          {
            give_id:'',
            product:{
              id:'',
              name:'',
              img_min:''
            },
            receive_user:{},
            update_time:'',
            state:0,
          }
        ],
        noInfo:false,
      }
    },
    mounted() {
      document.title = '赠送记录'
      this.getList(zzhJs.config.apiDomain + '/zzhedu/wx/order/give_list.action',{
        page_no:1,
        page_size:1000,
        state:0
      });
    },
    methods: {
      getList(url,params){
        let vthis = this;
        this.weLoadStart();
        this.$http.post(url,params).then(res => {
            if(res.status == 200){
              let response = JSON.parse(res.bodyText).data;

              vthis.noInfo = response.total <= 0 ? true:false;

              for(let i = 0; i<response.give_list.length;i++){
                response.give_list[i].update_time = response.give_list[i].update_time;
              }

              vthis.give_list = response.give_list;
              vthis.weLoadEnd();


            }


        },res => {
            zzhJs.console.log(res)
        })

      },
//    切换导航
      changeList(index) {
        let vthis = this;
        this.unGive = index;

        if(index == 0){ // 未赠送
          this.getList(zzhJs.config.apiDomain + '/zzhedu/wx/order/give_list.action',{
            page_no:1,
            page_size:1000,
            state:0
          })
        }else if(index == 1){ // 已赠送

          this.getList(zzhJs.config.apiDomain + '/zzhedu/wx/order/give_list.action',
            {
              page_no: 1,
              page_size: 1000,
              state: 2
            })
        }

      },

      lookGiveInfo(item){
        this.$router.push({name:'subject.mine.givedetail',params:{id:item.give_id,state:item.state}})
      },

    }
  }
</script>