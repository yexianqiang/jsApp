<template>
  <div class="video-list-wrap">

    <!--视频列表页导航 start-->
    <div class="video-list-nav-wrap">
      <ul class="video-list-nav">
        <template v-for="(item,index) in nav">
          <li :class="{active:nav_selected == index}" @click="selectNav(index)">{{item}}</li>
        </template>
      </ul>
      <div class="arrow iconfont icon-list" @click="showPanel()"></div>
    </div>

    <transition name="slide">
      <div class="tags-panel-wrap" v-if="isShowPanel">
        <div class="tags-panel">
          <div class="panel-title1">
            <p>年级</p>
          </div>
          <ul class="grade-tags">
            <template v-for="(item,index) in grade_tags">
              <li :class="{'active': item.active}" @click="selectTags('grade',item, index)">{{item.name}}</li>
            </template>
          </ul>
          <div class="panel-title1">
            <p>主题</p>
          </div>
          <ul class="theme-tags">
            <template v-for="(item,index) in theme_tags">
              <li :class="{'active':item.active}" @click="selectTags('theme',item,index)">{{item.name}}</li>
            </template>
          </ul>
        </div>
        <div class="select-btns-wrap">
          <div class="btn-reset ft28" :class="{'active':false}" @click="resetTags()">重置</div>
          <div class="btn-yes ft28" :class="{'active':true}" @click="confirmTags()">确定</div>
        </div>
      </div>
    </transition>
    <!--视频列表页导航 end-->

    <!--<we-scroll  :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">-->
    <scroller style="padding-top: 1rem;" :on-refresh="refresh" :on-infinite="infinite" :minContentHeight="100" :noDataText="noDataText" ref="my_scroller">
      <!--视频列表-->
      <ul class="video-list">
        <template v-for="item in video_list">
          <li @click="showDetail(item)">
            <div class="video-img"><img :src="item.img_min"/></div>
            <div class="video-intro-wrap">
              <div>
                <p class="video-title">{{item.name}}</p>
                <p class="video-intro">{{item.intro}}</p>
              </div>
              <div class="video-intro-bottom">
                <p v-if="item.price_curr == 0">已更新{{item.update_section}}节|{{item.sell_num}}人浏览</p>
                <p v-else>已更新{{item.update_section}}节|{{item.sell_num}}人订阅</p>
                <p class="video-price" v-if="item.price_curr == 0">免费</p>
                <div class="video-price" v-else>
                  <span class="old_price" v-if="item.price_orig && item.price_curr != item.price_orig">{{item.price_orig | currency}}</span>
                  <span class="current-price">{{item.price_curr | currency}}</span>
                </div>

              </div>
            </div>
          </li>

        </template>
      </ul>
    </scroller>

    <!--</we-scroll>-->
    <!--无内容的时候展示的-->
    <p class="show-no-info" v-if="noInfo">暂无内容</p>

  </div>
</template>

<style lang="scss">
  @import "../../../assets/iconfont/iconfont.css";
.video-list-wrap{
  width: 100%;background: #f6f6f6;
  .ft20{font-size: 0.2rem} .ft24{ font-size: 0.24rem;} .ft28{font-size: 0.28rem;} .ft30{font-size: 0.3rem;}

  img{
    width: 100%;
  }
  .video-list-nav-wrap{
    width: 100%;height: 0.8rem; display: flex;justify-content: space-between;align-items: center;position: relative;z-index: 10;background: #fff;
  }
  .arrow{
    width: 0.8rem;height: 100%;font-size: 0.4rem;line-height: 0.8rem;text-align: center;
  }
  .video-list-nav{
    width:1.8rem;display: flex;justify-content: space-between;flex-wrap: nowrap;
    &>li{
      font-size: 0.3rem;color:#757575;margin: 0 0.2rem;line-height: 0.8rem;flex-shrink: 0;position: relative;
      &.active:after{
        content: '';position: absolute;left: 0;bottom: 0;width: 100%;height: 0.03rem;background: #44bfb7;
      }
    }
  }
  .tags-panel-wrap{
    width: 100%;position: absolute;left: 0;top: 0.8rem;right:0;bottom:0;background: rgba(0,0,0,0.3);z-index: 300;
  }
  .tags-panel{
    width: 100%;background: #fff;padding-bottom: 0.8rem;
    .panel-title1{
      width: 100%;height: 0.8rem;display: flex;justify-content: space-between;align-items: center;padding-left: 0.22rem;padding-right: 0.22rem;font-size: 0.3rem;color: #b7adae;
      &>p{
        font-size: 0.28rem;
      }
    }
    .grade-tags{
      width: 100%;background: #fff;padding:0.2rem 0.22rem;display: flex;justify-content: flex-start;flex-wrap: wrap;
      &>li{
        width:1.45rem;height:0.55rem;text-align:center;line-height:0.55rem;font-size: 0.3rem;color: #585858;margin: 0.15rem 0.4rem;
        border: 1px solid #3cc0c4;border-radius: 0.1rem;flex-shrink: 0;
        &.active{
          background: #3cbfc1;color: #fff;
        }
      }
    }
    .theme-tags{
      @extend .grade-tags;
      &>li{
        width: 1.96rem;margin: 0.15rem 0.18rem;
      }
    }
  }
  .select-btns-wrap{
    width: 100%;height: 0.8rem;background:#fff;display: flex;justify-content: space-between;align-items: center;
    border-top: 1px solid #e7e7e7;
    .btn-reset{
      width: 50%;text-align: center;line-height: 0.8rem;
    }
    .btn-reset.active{
      background: #33aaaa;color: #fff;
    }
    .btn-yes{
      @extend .btn-reset;
    }
  }
  .slide-enter-active,.slide-leave-active{
    transition: all .5s ease;
  }
  .slide-enter,.slide-leave-to{
    transform: translateY(-1.2rem);
    opacity: 0;
  }


  .video-list{
    width: 100%;background: #fff;
    &>li{
      width: 100%; height:2.58rem;border-bottom: 0.01rem solid #efefef;padding: 0.43rem 0.2rem;display: flex;justify-content: flex-start;align-items: center;
      .video-img{
        width: 2.32rem;height: 1.72rem;flex-shrink: 0;margin-right: 0.2rem;border-radius: 0.08rem;overflow: hidden;
        background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
      }
      .video-intro-wrap{
      width: 100%; height: 100%;display: flex;flex-direction: column;justify-content: space-between;
        .video-title{
          line-height: 0.6rem;font-size: 0.32rem;color:#222;display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 1;
        }
        .video-intro{
          font-size: 0.26rem;color: #717171;line-height: 0.36rem;
          display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;
        }
      }
      .video-intro-bottom{
        display: flex;justify-content: space-between;font-size: 0.22rem;color: #949494;
      }
      .video-price{
        color: #fd0000;font-size: 0.26rem;display: flex;
        .old_price{
          font-size: 0.18rem;text-decoration: line-through;color: #9c9c9c;
        }
      }
    }

  }
  .show-no-info{
    font-size: 0.4rem;color: #cccccc;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);z-index: 10;
  }
  .yo-scroll{
    top: 0.8rem;bottom: 0;z-index: 50;
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
  import WeScroll from '../../../zhizihua/components/Scroll/Scroll.vue'

  export default {
    data() {
      return {
        nav:['全部','免费'],
        grade_tags:[],
        theme_tags:[],
        video_list:[
          {
            id:'',
            name:'',
            intro:'',
            update_time:'',
            img_min:'',
            price_curr:'',
            sell_num:'',
            update_section:''
          }
        ],
        isShowPanel: false,
        nav_selected: 0,
        noInfo: false,

        // 上拉加载，下拉刷新所需要的配置

        grades:[],
        questions:[],

        counter:1,// 当前页
        num:5, // 一页显示多少条
        pageStart:1, // 开始页数
        pageEnd:1, // 结束页数
        noDataText:''
      }
    },
    watch:{
      isShowPanel(val) {
        if (val) {
          $('html,body').css({
            'height': '100vh',
            'overflow-y': 'hidden'
          });
        } else {
          $('html,body').css({
            'height': 'auto',
            'overflow-y': 'auto'
          });
        }
      }
    },
    mounted(){
      document.title = '视频课程'
      let vthis = this;
      this.getTags();
      this.getListFirst({
          page_no:vthis.pageStart,
          page_size:vthis.num,
          free:1,
          grades:[],
          questions:[]
        })
    },
    methods:{
//       获取面板标签内容
      getTags() {
        let vthis = this,tagsSession = '',response = {},video_tags=[],s_tags=[];

        // 先获取sessionStorage里的，如果sessionStorage里没有，再请求后台获取标签数据
        tagsSession = sessionStorage.getItem('tags');
        if(tagsSession){
          response = JSON.parse(tagsSession)
          video_tags = response.data[1].attr_list;
          for(let i = 0;i < video_tags.length;i++){
            if(video_tags[i].id == 38){
              vthis.grade_tags = video_tags[i].attr_list;
            }else if(video_tags[i].id == 39){
              vthis.theme_tags = video_tags[i].attr_list;
            }
          }
        }else {
          this.$http.post(zzhJs.config.apiDomain+'/zzhedu/wx/product/attr.action')
            .then(res => {
            if(res.status == 200){
              // 将获取到的所有标签都存入sessionStorage（H5本地存储）中;
              sessionStorage.setItem('tags',res.bodyText);

              response = JSON.parse(res.bodyText);
              video_tags = response.data[1].attr_list;
              for(let i = 0;i < video_tags.length;i++){
                if(video_tags[i].id == 38){
                  vthis.grade_tags = video_tags[i].attr_list;
                }else if(video_tags[i].id == 39){
                  vthis.theme_tags = video_tags[i].attr_list;
                }
              }

            }


          },(res) => {
            zzhJs.console.log(res);
          })
        }
      },

//       选取面板中的标签
      selectTags (str,obj,index) {
        if(str == 'grade'){
          if (obj.active) {
            obj.active = false;
            let gradeIndex = this.grades.indexOf(obj.id);
            this.$delete(this.grades, gradeIndex)
          } else {
            obj.active = true;
            this.grades.push(obj.id);
          }

          this.$set(this.grade_tags, index, obj);
        }else {
          if (obj.active) {
            obj.active = false;
            let themeIndex = this.questions.indexOf(obj.id);
            this.$delete(this.questions, themeIndex)
          } else {
            obj.active = true;
            this.questions.push(obj.id);
          }

          this.$set(this.theme_tags, index, obj);
        }
      },
//     重置选中的标签，并清空选中的数据
      resetTags (){
        let vthis = this;
        this.clearSelected(this.theme_tags);
        this.clearSelected(this.grade_tags);
      },
      //清空标签选中的样式，及选中的数据，
      clearSelected(obj) {
        let vthis = this;
        obj.forEach(function (value,key) {
          value.active = false;
          vthis.$set(obj,key,value)
        })
        this.grades = [];
        this.questions = [];

      },

//      标签选完之后，点击确认按钮
      confirmTags (){
        this.isShowPanel = false;
        if(this.nav_selected == 0){// 表明当前是在全部的列表
          this.getListFirst({
              page_no:1,
              page_size:5,
              free:1,
              grades:this.grades,
              questions:this.questions
            })

        }else if(this.nav_selected == 1){ // 表明当前是免费的列表
          this.getListFirst({
              page_no:1,
              page_size:5,
              free:0,
              grades:this.grades,
              questions:this.questions
            })
        }
      },
//      第一次ui的导航栏所需要的方法 end
      showPanel (){
        this.isShowPanel = !this.isShowPanel;
      },

//      选择导航栏
      selectNav (index){
        let vthis = this;
        this.nav_selected = index;
        this.clearSelected(this.grade_tags);
        this.clearSelected(this.theme_tags);
        if(index == 0){
          this.getListFirst({
              page_no:vthis.pageStart,
              page_size:vthis.num,
              free:1,
              grades:this.grades,
              questions:this.questions
            })
        }else if(index == 1) {
          this.getListFirst({
              page_no:vthis.pageStart,
              page_size:vthis.num,
              free:0,
              grades:this.grades,
              questions:this.questions
            })
        }
      },
//      获取列表页
      getList(params,callback) {
        let vthis = this;

        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/videos.action',params).then(res => {
          if(res.status == 200){
            let response = JSON.parse(res.bodyText);
            vthis.noInfo = response.data.total <= 0 ? true:false;
            vthis.noDataText = response.total <= 0 ? '':'暂无更多数据';
//            vthis.video_list = response.data.video_list;
            res.body.data.video_list.forEach(function (e) {
              vthis.video_list.push(e);
            })
          }
          if (callback) {
            callback();
          }

          this.weLoadEnd();
        },res => {
            zzhJs.console.log(res);
        })
      },
//    展示详情页
      showDetail(item) {
        if (zzhJs.env.isInApp()) {
          zzhJs.env.callVideoDetail(item.id);
        } else {
          window.location.href = zzhJs.config.urlVideoList + '?#/'+ item.id;
        }

      },

//      下拉刷新，上拉加载
      getListFirst (params,callback){
        let vthis = this;
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/videos.action',params).then(res => {
          let response = res.body.data;
          vthis.noInfo = response.total <= 0 ? true:false;
          vthis.noDataText = response.total <= 0 ? '':'暂无更多数据';

          vthis.counter = response.page_no;
          vthis.pageEnd = Math.ceil(response.total / vthis.num);
          this.video_list = [];
          response.video_list.forEach(function (e) {
            vthis.video_list.push(e);
          });

          if (callback) {
            callback();
          }
          vthis.weLoadEnd();
        }, function () {
          vthis.weNotify('服务器繁忙请稍候再试!');
        });
      },


      // 更改后的刷新和加载
      refresh(done) {
        let vthis = this;
        if (this.nav_selected == 0) {
          this.getListFirst({
              page_no:vthis.pageStart,
              page_size:vthis.num,
              free:1,
              grades:vthis.grades,
              questions:vthis.questions
            },done);
        } else if(this.nav_selected == 1) {
          this.getListFirst({
              page_no:vthis.pageStart,
              page_size:vthis.num,
              free:0,
              grades:vthis.grades,
              questions:vthis.questions
            },done);
        }
      },
      infinite(done) {
        let vthis = this;
        this.counter++;
        if (this.counter > this.pageEnd) {
          setTimeout(function () {
            done(true);
          },500)
          return false;
        }
        if (this.nav_selected == 0) {
          this.getList({
              page_no:vthis.counter,
              page_size:vthis.num,
              free:1,
              grades:vthis.grades,
              questions:vthis.questions
            },done);
        } else if(this.nav_selected == 1){
          this.getList({
              page_no:vthis.counter,
              page_size:vthis.num,
              free:0,
              grades:vthis.grades,
              questions:vthis.questions
            },done);
        }
      }

    },
    components:{
      WeScroll
    }
  }
</script>