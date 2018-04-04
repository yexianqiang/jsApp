<template>
  <div class="footer-bar">
    <div class="footer-nav">
      <template v-for="(item,index) in footerNav">
        <a :href=item.url :class="{'active':item.routeName == $route.name }" :data-name="$route.name" >{{item.name}}</a>
      </template>
    </div>
  </div>
</template>
<style lang="scss">
  .footer-bar{
    width: 100%;height: 0.98rem;background: #fff;position: fixed;bottom: 0;left: 0;display: flex;justify-content:center;border-top: 0.01rem solid #f1f1f1;
    padding-bottom: 0.02rem;z-index: 500;
    .footer-nav{
      width: 100%;height: 100%;display: flex;justify-content: space-around;align-items: center;

      &>a{
       display: block;width: 0.5rem;height:100%;text-align: center; font-size: 0.2rem;color: #909090;position: relative;line-height: 1.5rem;
      }
      &>a:before{
        content: '';width: 0.5rem;height: 0.5rem;background: url("../../../assets/image/footerNav/sprite_index_icon.png") no-repeat center;background-size: 130%;background-position: 0.05rem -4.95rem;
        position: absolute;left: 50%;top: 0.1rem;transform: translateX(-50%);
      }
      &>a{
        &.active{
          color: #35c1c2;
        }
        &:nth-child(1).active:before{
          background-position: 0.05rem -4.33rem;
        }
        &:nth-child(2):before{
          background-position: 0.05rem -5.56rem;
        }
        &:nth-child(2).active:before{
          background-position: 0.04rem -6.1rem;
        }
        &:nth-child(3):before{
          background-position: 0.05rem -6.75rem;
        }
        &:nth-child(3).active:before{
          background-position: 0.05rem -7.35rem;
        }
        &:nth-child(4):before{
          background-position: 0.05rem -7.99rem;
        }
        &:nth-child(4).active:before{
          background-position: 0.05rem -8.6rem;
        }
      }
    }



  }
</style>
<script>
  export default{
    data() {
      return {
        footerNav:[
          {
            name:'首页',
            id:1,
            routeName:'subject.index',
            url:zzhJs.config.urlIndexPage
          },
          {
            name:'学习',
            id:2,
            routeName:'subject.mine.list',
            url:zzhJs.config.urlMineBuy + '/audio'
          },
          {
            name:'咨询',
            id:3,
            routeName:'consult.list',
            url:zzhJs.config.urlConsultList
          },{
            name:'我',
            id:4,
            routeName:'subject.mine',
            url:zzhJs.config.urlMine
          },

        ],
      }
    },
    mounted() {

    },
    methods:{}
  }
</script>