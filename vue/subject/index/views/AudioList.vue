<template>
  <div class="audio-list-view">
    <!--音频列表页导航 start-->
    <div class="audio-list-nav-wrap">
      <ul class="audio-list-nav">
        <template v-for="(item,index) in nav">
          <!--<li  :class="{'active':nav_selected == index && nav_selected != 4}" @click="selectNav(index,item)">{{item}}<i class="iconfont"></i></li>-->
          <li :class="{'active':nav_selected == index}" @click="selectNav(index,item)">{{item}}<i class="iconfont"></i></li>
        </template>
      </ul>
    </div>

    <transition name="slide">
      <div class="tags-panel-wrap" v-if="isShowPanel">
        <!--孩子的标签面板-->
        <div class="tags-panel" v-if="showChildrenTags">
            <div class="panel-title1">
              <p>年级(可多选)</p>
            </div>
            <ul class="grade-tags">
              <template v-for="(item,index) in s_grade_tags">
                <li :class="{'active':item.active}" @click="selectTags('grade',item,index)">{{item.name}}</li>
              </template>
            </ul>
            <div class="panel-title1">
              <p>主题(可多选)</p>
            </div>
            <ul class="theme-tags">
              <template v-for="(item,index) in theme_tags">
                <li :class="{'active':item.active}" @click="selectTags('theme',item,index)">{{item.name}}</li>
              </template>
            </ul>
        </div>

        <!--家长的标签面板-->
        <div class="tags-panel" v-if="showParentTags">
          <div class="panel-title1">
            <p>主题(可多选)</p>
          </div>
          <ul class="theme-tags">
            <template v-for="(item,index) in theme_tags">
              <li :class="{'active':item.active}" @click="selectTags('theme',item,index)">{{item.name}}</li>
            </template>
          </ul>
        </div>

        <!--综合排序的面板-->
        <!--<ul class="comprehensive-panel" v-if="showOrder">-->
          <!--<template v-for="(item,index) in orderBy">-->
            <!--<li @click="order(index)" :class="{'active':default_order == index}">{{item}}</li>-->
          <!--</template>-->
        <!--</ul>-->

        <div class="select-btns-wrap" v-if="!showOrder">
          <div class="btn-reset" :class="{'active':false}" @click="resetTags()">重置</div>
          <div class="btn-yes" :class="{'active':true}" @click="confirmTags()">确定</div>
        </div>
      </div>
    </transition>
    <!--音频列表页导航 end-->

    <!--音频列表-->
    <!--<we-scroll  :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">-->
    <scroller style="padding-top: 0.8rem;" :on-refresh="refresh" :on-infinite="infinite" :minContentHeight="100" :noDataText="noDataText" ref="my_scroller">
      <ul class="audio-list">
        <template v-for="item in audio_list">
          <li @click="showDetail(item)">
            <div class="audio-img"><img :src="item.img_min"/></div>
            <div class="audio-intro">
              <div>
                <p class="audio-title">{{item.name}}</p>
                <p class="audio-intro-info">{{item.intro}}</p>
              </div>
              <div class="audio-intro-bottom">
                <p class="has-update" v-if="item.price_curr == 0">已更新{{item.update_section}}节|{{item.sell_num}}人浏览</p>
                <p class="has-update" v-else>已更新{{item.update_section}}节|{{item.sell_num}}人订阅</p>
                <p class="audio-price" v-if="item.price_curr == 0">免费</p>
                <div class="audio-price" v-else>
                  <span class="old-price" v-if="item.price_orig && item.price_curr != item.price_orig">{{item.price_orig | currency}}</span>
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
  .audio-list-view{
    .audio-list-nav-wrap{
      width: 100%;height: 0.8rem;border-bottom:0.01rem solid #efefef;background: #fff;
      display: flex;justify-content: space-between;align-items: center;position: relative;z-index: 10;
    }
    .audio-list-nav{
      width:100%;display: flex;justify-content: space-around;flex-wrap: nowrap;
      &>li{
        font-size: 0.3rem;color:#222;margin: 0 0.3rem;line-height: 0.8rem;flex-shrink: 0;position: relative;
        &.active:after{
          content: '';position: absolute;left:50%;transform:translateX(-50%);bottom: 0;width: 0.6rem;height: 0.03rem;background: #44bfb7;
        }
      }
    }
    img{
      width: 100%;
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
    .comprehensive-panel{
      width: 100%;padding: 0 0.2rem;background: #fff;
      &>li{
        width: 100%;height: 0.8rem;border-bottom: 1px solid #e8e8e8;line-height: 0.8rem;font-size: 0.3rem;color: #585858;
        &.active{
          color: #5cd9cb;
        }
        &:last-child{
          border-bottom: 0;
        }
      }
    }
    .select-btns-wrap{
      width: 100%;height: 0.8rem;background:#fff;display: flex;justify-content: space-between;align-items: center;
      border-top: 1px solid #e7e7e7;
      .btn-reset{
        width: 50%;text-align: center;line-height: 0.8rem;font-size: 0.28rem;
      }
      .btn-reset.active{
        background: #33aaaa;color: #fff;
      }
      .btn-yes{
        @extend .btn-reset;
      }
    }


    .audio-list{
      width: 100%;background: #fff;
      &>li{
        width: 100%; height:2.58rem;border-bottom: 0.01rem solid #efefef;padding: 0.43rem 0.2rem;display: flex;justify-content: flex-start;align-items: center;
        .audio-img{
          width: 2.32rem;height: 1.72rem;border-radius:0.08rem;overflow:hidden;flex-shrink: 0;margin-right: 0.2rem;
          background: url("../assets/placeholder.png") no-repeat center;background-size: 100%;
        }
        .audio-intro{
          width: 100%; height: 100%;display: flex;flex-direction: column;justify-content: space-between;font-size: 0.26rem;color: #717171;
          .audio-title{
            line-height: 0.6rem;font-size: 0.32rem;color:#222;
            display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 1;
          }
          .audio-intro-info{
            font-size: 0.26rem;color: #717171;line-height: 0.36rem;
            display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;
          }
        }
        .audio-intro-bottom{
          display: flex;justify-content: space-between;font-size: 0.22rem;color: #949494;
          .has-update{
            font-size: 0.22rem;
          }
        }
        .audio-price{
          color: #fd0000;font-size: 0.26rem;display: flex;
          &>span{
            font-size: 0.26rem;
          }
          .old-price{
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
        nav: ['人气','免费','家长','孩子','职场自助'],
        parent_id: 5,
        child_id: 6,
        job_market_id:63,
        nav_selected: 0,
        audio_list: [],
        theme_tags: [],
        s_grade_tags: [],
        s_theme_tags: [],
        p_theme_tags: [],
        orderBy: ['综合排序','最近更新','价格排序'],
        orderByLetter:['default','update','price'],// 对应于orderBy的
        default_order: 0, // 默认为综合排序
        isShowPanel: false,// 是否展示标签面板
        showChildrenTags: false, // 是否展示孩子标签
        showParentTags: false, // 是否展示家长的标签
        showOrder: false, //是否展示排序的选项
        arrow_up: -1,
        arrow_down: 4,
        criterion: [],
        isFree:1,
        noInfo:false,

//      上拉加载，下拉刷新的配置
        counter:1,// 当前页
        num:5, // 一页显示多少条
        pageStart:1, // 开始页数
        pageEnd:1, // 结束页数
        noDataText: '',
        asc: true,
      }
    },
    watch: {
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
    mounted() {
      document.title = '音频课程';

      // 获取数据
      this.getNavTags();

      if (!this.$route.query || !this.$route.query.channel) {
        return this.getListFirst({
          criterion:this.criterion,
          free:1
        });
      }

      this.intiSpecialPage()

    },
    methods: {
      // 初始化特定的页面
      intiSpecialPage() {
        if (this.$route.query.channel == 5) { // 家长课程
          this.getListFirst({ criterion: [5], free: 1});
          this.nav_selected = 2;
        } else if (this.$route.query.channel == 6) { // 孩子课程
          this.getListFirst({ criterion: [6], free: 1});
          this.nav_selected = 3;
        } else if (this.$route.query.channel == 4) { // 免费
          this.getListFirst({ criterion:[], free: 0});
          this.nav_selected = 1;
        } else if (this.$route.query.channel == 7) { // 职场自助
          this.getListFirst({ criterion:[63]});
          this.nav_selected = 4;
        }
      },

      // 获取标签
      getNavTags() {
        let vthis = this, tagsSession = '', response = {}, audio_tags=[], s_tags=[];

        // 先获取sessionStorage里的，如果sessionStorage里没有，再请求后台获取标签数据
        tagsSession = sessionStorage.getItem('tags');
        if (tagsSession) {
          response = JSON.parse(tagsSession)
          audio_tags = response.data[0].attr_list;
          for (let i = 0; i < audio_tags.length; i++) {
            if (audio_tags[i].id == 5) {
              vthis.p_theme_tags = audio_tags[i].attr_list;
            }else if (audio_tags[i].id == 6) {
              s_tags = audio_tags[i].attr_list;
            }
          }
          for (let j = 0; j < s_tags.length; j++) {
            if (s_tags[j].id == 16) {
              vthis.s_theme_tags = s_tags[j].attr_list;
            }else if (s_tags[j].id == 15) {
              vthis.s_grade_tags = s_tags[j].attr_list;
            }
          }

        } else {
          this.$http.post(zzhJs.config.apiDomain+'/zzhedu/wx/product/attr.action').then(res => {
            if(res.status == 200){
            // 将获取到的所有标签都存入sessionStorage（H5本地存储）中;
              sessionStorage.setItem('tags',res.bodyText);

              response = JSON.parse(res.bodyText);
              audio_tags = response.data[0].attr_list;
              for(let i = 0; i < audio_tags.length; i++){
                if(audio_tags[i].id == 5){
                  vthis.p_theme_tags = audio_tags[i].attr_list;
                }else if(audio_tags[i].id == 6){
                  s_tags = audio_tags[i].attr_list;

                }
              }
              for(let j = 0; j < s_tags.length; j++){
                if(s_tags[j].id == 16){
                  vthis.s_theme_tags = s_tags[j].attr_list;
                }else if(s_tags[j].id == 15){
                  vthis.s_grade_tags = s_tags[j].attr_list;
                }
              }
            }


          },(res) => {
            zzhJs.console.log(res)
          })
        }
      },
      // 选取导航栏标签
      selectNav(index,item) { // 选择导航栏中的标签来切换面板
        let vthis = this;
        if (item == '家长') {
          this.showParentTags = true;
          this.showChildrenTags = false;
          this.showOrder = false;
          if (this.nav_selected == index) {
            this.isShowPanel = !this.isShowPanel;
          } else {
            this.isShowPanel = true;
            this.clearSelected(this.theme_tags);
          }
          this.theme_tags =  this.p_theme_tags;
          this.nav_selected = index;
        } else if (item == '孩子'){
          this.showParentTags = false;
          this.showChildrenTags = true;
          this.showOrder = false;
          if (this.nav_selected == index){
            this.isShowPanel = !this.isShowPanel;
          } else {
            this.isShowPanel = true;
            this.clearSelected(this.theme_tags);
            this.clearSelected(this.s_grade_tags);
          }
          this.theme_tags =  this.s_theme_tags;
          this.nav_selected = index;

        } else if (item == '综合'){
          this.showParentTags = false;
          this.showChildrenTags = false;
          this.showOrder = true;
          this.isShowPanel = (this.nav_selected == index) ? (!this.isShowPanel) : true;


        } else if (item == '人气'){
          this.isShowPanel =  false;
          this.criterion = [];
          this.getListFirst({ criterion: [], free: 1});

          this.nav_selected = index;

        } else if (item == '免费') {
          this.isShowPanel =  false;
          this.criterion = [];
          this.getListFirst({ criterion: [], free: 0})
          this.nav_selected = index;
        } else if (item == '职场自助') {
          this.isShowPanel =  false;
          this.clearSelected(this.theme_tags);
          this.clearSelected(this.s_grade_tags);
          this.criterion.push(this.job_market_id);
          this.getListFirst({ criterion: vthis.criterion,});
          this.nav_selected = index;
        }

//        this.nav_selected = index;
      },
      // 选中面板中的标签
      selectTags(str,item,index) {
        if (str == 'grade') {
          if (item.active) {
            item.active = false;
            let gradeIndex = this.criterion.indexOf(item.id)
            this.$delete(this.criterion,gradeIndex)
          } else {
            item.active = true;
            this.criterion.push(item.id)
          }
          this.$set(this.s_grade_tags,index,item)
        } else if (str == 'theme'){
          if (item.active) {
            item.active = false;
            let themeIndex = this.criterion.indexOf(item.id);
            this.$delete(this.criterion,themeIndex)
          } else {
            item.active = true;
            this.criterion.push(item.id)
          }

          this.$set(this.theme_tags,index,item)
        }

      },
      // 清空标签选中的样式，及选中的数据，
      clearSelected(obj) {
        let vthis = this;
        obj.forEach(function (value,key) {
          value.active = false;
          vthis.$set(obj,key,value)
        })
        this.criterion = [];

      },
      // 重置标签
      resetTags() {
        if (this.nav_selected == 2) { // 2代表当前面板为家长的
          this.clearSelected(this.theme_tags);
          // this.criterion = []
        } else if (this.nav_selected == 3){ //3代表当前面板为学生的
          this.clearSelected(this.theme_tags);
          this.clearSelected(this.s_grade_tags);
          // this.criterion = [];
        }
      },
      // 选完标签之后，点击确认按钮
      confirmTags() {
        let vthis = this;
        this.isShowPanel = false;
        if (this.nav_selected == 2) {
          // 表明当前是请求的家长的
          if (!this.criterion.length) {
            this.criterion.push(this.parent_id);
          } else {
            let parentIndex = this.criterion.indexOf(this.parent_id);
            if (parentIndex != -1) {
              this.$delete(this.criterion,parentIndex)
            }
          }
          this.getListFirst({ criterion: this.criterion,})

        } else if (this.nav_selected ==3){ // 表明当前请求的是学生的
          if (!this.criterion.length) {
            this.criterion.push(this.child_id)
          } else {
            let childIndex = this.criterion.indexOf(this.child_id);
            if (childIndex != -1) {
              this.$delete(this.criterion,childIndex)
            }

          }
          this.getListFirst({ criterion: this.criterion,})
        }
      },
      // 选择排序的方式
      order(index) {
        let vthis = this;
        if (this.nav_selected == 0 || this.nav_selected == 1) {

          this.isFree = this.nav_selected == 0 ? 1 : 0;
          if (index == 0) {
            this.getListFirst({
                order_by:{
                  name:'default',
                  price:'',
                  asc:true
                },
                criterion:[],
                free:vthis.isFree
              })
          } else if (index == 1) {
            this.getListFirst({
                order_by:{
                  name:'update',
                  price:'',
                  asc:true
                },
                criterion:[],
                free:vthis.isFree
              })
          } else if (index == 2){
            this.getListFirst({
                order_by:{
                  name:'price',
                  price:'',
                  asc:true
                },
                criterion:[],
                free:vthis.isFree
              })
          }

        } else if (this.nav_selected == 2 || this.nav_selected == 3) {
          if(index == 0){
            this.getListFirst({
                order_by:{
                  name:'default',
                  price:'',
                  asc:true
                },
                criterion:this.criterion,
              })
          } else if (index == 1) {
            this.getListFirst({
                order_by:{
                  name:'update',
                  price:'',
                  asc:true
                },
                criterion:this.criterion,
              })
          } else if (index == 2) {
            this.getList({order_by: {name: 'price'}});
          }
        }
        this.default_order = index;
        this.isShowPanel = false;
      },
      // 获取音频列表
      getList(params,callback) {
        // 默认是获取人气的
        let vthis = this;

        let paramDefault = {
          order_by: {
            name: 'default',
            value: '',
            asc: vthis.asc,
          },
          criterion: vthis.criterion,
          page_no: 1,
          page_size: vthis.num,
        };

        params = _.assign(paramDefault, params);
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/product/voices.action', params).then(res => {
          let response = res.body.data;
          vthis.noInfo = response.total <= 0 ? true : false;
          vthis.noDataText = res.body.data.total <= 0 ? '':'暂无更多数据';

          vthis.counter = response.page_no;
          vthis.pageEnd = Math.ceil(response.total / vthis.num);

          response.voice_list.forEach(function (e) {
            vthis.audio_list.push(e);
          })
          if (callback) {
            callback();
          }

          vthis.weLoadEnd();
        },res => {
          zzhJs.console.log(res);
        })
      },
      //  下拉刷新，上拉加载
      getListFirst(params, callback) {
        let vthis = this;;
        params = _.assign({
          page_no: 1,
        }, params);
        this.audio_list = [];
        this.getList(params, callback);
      },
      showDetail(item) {
        // this.$router.push({name:'audio.detail',params:{id:item.id}})
        if (zzhJs.env.isInApp()) {
          zzhJs.env.callAudioDetail(item.id)
        } else {
          window.location.href = zzhJs.config.urlAudioList + '?#/'+ item.id;
        }
      },
      // vue-scroller 的方法
      refresh(done) {
        let vthis = this;

        this.counter = 1;
        if (this.nav_selected == 1) {
          this.getListFirst({ free: 0}, done)
        } else {
          this.getListFirst({ free: 1}, done)
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

        if (this.nav_selected == 1) { //免费
          this.getList({ page_no: vthis.counter, free: 0}, done);
        } else if(this.nav_selected == 0) { // 人气
          this.getList({ page_no: vthis.counter, free: 1}, done);
        } else { // 孩子或者家长或职场自助
          this.getList({ page_no: vthis.counter,}, done);
        }
      }
    },
    components:{
      WeScroll
    }
  }
</script>
