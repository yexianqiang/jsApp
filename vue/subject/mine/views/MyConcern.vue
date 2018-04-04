<template>
  <div class="my-concern-view">
    <div v-if="hasData" >
      <p style="font-size: 20px;color: #cacaca;display: flex;justify-content: center;align-items: center;min-height: 100vh;">暂无关注</p>
    </div>
    <ul class="concern-list-wrap" v-else>
      <li v-for="(item, index) in dataList" >
        <div class="head-img" @click="clickConcult(item.id)"><img :src=item.avatar alt="知子花教育"></div>
        <div class="teacher-info-wrap"　@click="clickConcult(item.id)">
          <p class="teacher-name">{{ item.name }}</p>
          <p class="teacher-title">{{ item.grade }}</p>
        </div>
        <div class="btn-concern" v-if="item.isAttention" @click="clickConcern(index, item.id)">已关注</div>
        <div class="btn-concern" v-else @click="clickConcern(index,item.id)">关注</div>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
.my-concern-view{
  width: 100%;min-height:100vh;background: #fff;
  .concern-list-wrap{
    width: 100%;background: #fff;
    &>li{
      width: 100%;height: 1.8rem;border-bottom: 0.01rem solid #f3f3f3;padding-left: 0.3rem;padding-right: 0.3rem;display: flex;justify-content: space-between;align-items: center;
      .head-img{
        width: 1rem;height: 1rem;border-radius: 50%;background:url("../../../assets/image/icon_head.png") no-repeat center;background-size:100%;flex-shrink:0;overflow: hidden;
        img{
          width: 100%;
        }
      }
      .teacher-info-wrap{
        flex-shrink: 1;font-size: 0.26rem;width: 100%;margin-left: 0.3rem;
        .teacher-title{
          color: #999999;font-size: 0.24rem;margin-top: 0.2rem;
        }
      }
      .btn-concern{
        width: 1.2rem;border-radius: 1rem;border: 0.01rem solid #d2d2d2;text-align: center;line-height: 0.6rem;flex-shrink:0;font-size: 0.26rem;color: #333333;z-index: 499;
      }
    }
  }
}
</style>
<script>
  export default{
    data() {
      return {
        dataList: [],
        hasData: false,
        counselor_id: '',
        changeConcern: true,
        is_attention:1
      }
    },
    mounted() {
      document.title = '我的关注';
      this.getData();

    },
    methods:{
      // 点击个人中心关注跳到 咨询 老师个人详情
      clickConcult(id) {
        window.location.href = zzhJs.config.urlConsultList + '?#/'+ id ;
      },
      getData() {
        var _this = this
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/user/my_attention.action')
          .then(res=> {
            if(res.status == 200) {
              res.data.data.forEach((item, index) => {
                item.isAttention = true;
                _this.$set(_this.dataList,index,item)
              })

              _this.dataList = res.data.data
              if(res.data.data.length) {
                _this.hasData = false
              }else {
                _this.hasData = true
              }

            }
        },res =>{

          })
      },
      clickConcern(index, id) {
        // console.log(id)
        this.counselor_id = id
        var _this = this

        this.$http.post(zzhJs.config.apiDomain + '/zzhedu//app/consult/attention.action',
          {
            counselor_id:id
          })
          .then(res=> {
            _this.is_attention = res.data.data.is_attention;
            if (_this.is_attention == 1) {
              _this.dataList[index].isAttention = true;
            } else if(_this.is_attention == 0){
              _this.dataList[index].isAttention = false;
            }
          },res => {

          })
      }
    }
  }

</script>