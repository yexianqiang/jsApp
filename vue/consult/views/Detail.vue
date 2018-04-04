<template>
  <div class="detail-view">
    <div class="banner">
      <img :src="expert.avatar"/>
    </div>
    <div class="expert-title-info">
      <div class="expert-title-info-top">
        <p class="expert-name">{{ expert.name }}</p>
        <p class="expert-title">{{ expert.intro }}</p>
      </div>
      <ul class="work-experience">
        <li>
          <p class="work-experience-top">{{expert.work_year}}年</p>
          <p class="work-experience-bot">从业</p>
        </li>
        <li>
          <p class="work-experience-top">{{expert.service_num}}人次</p>
          <p class="work-experience-bot">服务过</p>
        </li>
        <li>
          <p class="work-experience-top">{{expert.satisfaction}}%</p>
          <p class="work-experience-bot">好评率</p>
        </li>
      </ul>

    </div>
    <ul class="tel-face-wrap">
      <li>
        <span class="consult_icon"></span>
        <div>
          <p>电话咨询</p>
          <p><span>{{expert.tel_price}}</span>元/<span>{{expert.tel_time}}</span>分钟</p>
        </div>
      </li>
      <li>
        <span class="consult_icon consult_icon_face"></span>
        <div>
          <p>面对面咨询</p>
          <p><span>{{expert.interview_price}}</span>元/<span>{{expert.interview_time}}</span>分钟</p>
        </div>
      </li>
    </ul>

    <div class="order-wrap">
      <div class="order-content">
        <p class="order-title">预约须知：</p>
        <ul class="order-items">
          <li>
            <p class="order-item-title">咨询流程</p>
            <p class="order-item-con">预约，选择套餐</p>
            <p class="order-item-con">付款成功</p>
            <p class="order-item-con">客服确认咨询方式与时间</p>
            <p class="order-item-con">正式咨询</p>
          </li>
          <li>
            <p class="order-item-title">回应时长</p>
            <p class="order-item-con">机构将在收到预约的4小时内由客服与您取得联系，协商咨询的时间和形式。</p>
          </li>
          <li>
            <p class="order-item-title">可预约时段</p>
            <p class="order-item-con">提供工作日及周末全天的咨询，但需要同客服协商后确认，方可进行咨询。</p>
          </li>
          <li>
            <p class="order-item-title">若变更预约</p>
            <p class="order-item-con">若因为不可抗力需要变更/取消已协商好的咨询预约，请务必提前24小时（1个工作日）告知客服人员，否则咨询将如期开始。</p>
          </li>
          <li>
            <p class="order-item-title">爽约/迟到</p>
            <p class="order-item-con">若没有提前24小时告知情况，爽约/迟到30分钟以上，则默认这次咨询已经完成。其他特殊情况，需与客服人员协商处理。</p>
          </li>
          <!--<li>-->
            <!--<p class="order-item-title">客服信息</p>-->
            <!--<p class="order-item-con">电话：<a href="tel:18364167587">18364167587</a></p>-->
            <!--<p class="order-item-con">邮箱：<a href="mailto:zixun@zhizihua.com">zixun@zhizihua.com</a></p>-->
          <!--</li>-->
        </ul>
        <div class="order-bottom">
          <p class="order-item-con">电话：<a href="tel:18364167587">18364167587</a></p>
          <p class="order-item-con">邮箱：<a href="mailto:zixun@zhizihua.com">zixun@zhizihua.com</a></p>
        </div>
      </div>

    </div>
    <div class="space-bar" style="width: 100%;height: 0.2rem;background: #edf1f2"></div>
    <div class="expert-info-wrap">
      <ul class="expert-info">
        <li class="item-info">
          <p class="item-title">专业资质</p>
          <!--<p class="item-icon" ></p>-->
          <p class="item-discribe">{{ expert.grade }}</p>
        </li>
        <li class="item-info">
          <p class="item-title">擅长领域</p>
          <!--<p class="item-icon icon_area"></p>-->
          <p class="item-discribe">{{ expert.advantage }}</p>
        </li>
        <li class="item-info">
          <p class="item-title">擅长技术</p>
          <!--<p class="item-icon icon_tech"></p>-->
          <p class="item-discribe">{{ expert.skill }}</p>
        </li>
        <!--<li class="item-info" v-if="expert.remind">-->
          <!--<p class="item-title">咨询寄语</p>-->
          <!--&lt;!&ndash;<p class="item-icon icon_word" ></p>&ndash;&gt;-->
          <!--<p class="item-discribe">{{ expert.remind }}</p>-->
        <!--</li>-->
      </ul>
      <div class="item-info" v-show="showMoreInfo == 1">
        <p class="item-title">咨询寄语</p>
        <!--<p class="item-icon icon_word" ></p>-->
        <p class="item-discribe">{{ expert.remind }}</p>
      </div>
    </div>
    <div class="btn-look-for"  @click="showMore" v-if="expert.remind">{{showMoreText}}</div>
    <div style="width: 100%;height: 0.2rem;background: #edf1f2"></div>


    <!--文章，课程，问答的按钮，仅在app里显示-->
    <ul class="mix-btns-wrap" v-if="zzhJs.env.isInApp()">
      <li @click="showInfoInApp(expert, 'showTeacherArticleList', 'article')">
        <p>文章<span>({{expert.article}})</span></p>
      </li>
      <li @click="showInfoInApp(expert, 'showTeacherCourseList', 'course')">
        <p>课程<span>({{expert.course}})</span></p>
      </li>
      <li @click="showInfoInApp(expert, 'showTeacherAnswerList', 'answer')">
        <p>问答<span>({{expert.answer}})</span></p>
      </li>
    </ul>
    <!--评价部分-->
    <div class="consult-comments-wrap">
      <div class="comments-title-wrap">
        <p>最新评价</p>
        <p class="btn-to-comment" @click="goComment(expert.id)">我要评价</p>
      </div>
      <div class="comment-area" v-for="(item, index) in commentInfo" >
        <div v-if="index <= 2">
          <div class="comment-title-bar">
            <div class="comment-user-info">
              <div class="comment-user-head">
                <img :src="item.avatar"/>
              </div>
              <span class="comment-user-name ft26">{{item.name}}</span>
            </div>
            <ul class="comment-grade">
              <template v-for="num in 5">
                <li class="iconfont" :class="{'icon-selected-star':num <= item.grade ,'icon-unselect-star':num > item.grade}"></li>
              </template>
            </ul>
          </div>
          <div class="comment-info">
            <p class="comment-con">{{item.content}}</p>
            <p class="comment-reply ft26" v-if="item.answer_info.content"><span class="reply-name ft26">{{item.answer_info.name}}:</span>{{item.answer_info.content}}</p>
            <p class="comment-time ft24">{{item.create_time | timeAgo}}</p>
          </div>
        </div>
      </div>
      <div class="noMoreComment" v-if="!commentInfo.length">暂无评价</div>
      <div class="lool-more-comments" v-if="commentInfo.length > 3" @click="showMoreComment(expert.id)">查看更多</div>
    </div>




    <div class="footer-wrap">
      <div class="btn-concern" @click="concern" v-text="is_attention == 0 ? '+关注' : '已关注'"></div>
      <div class="consult-btn" @click="appointment()">立即预约</div>
    </div>
    <div class="mask" v-show="isPop" @click="hidePopup()">
      <transition name="slide">
        <div class="pop-wrap" :class="{'text_input':flag}" v-show="isPop" @click.stop>
          <div class="btn-close" @click="hidePopup()"></div>
          <form id="info" @submit.prevent="confirm()" novalidate>
            <div class="form-top">
              <label class="l-title text">
                您的称呼：<input type="text" class="name"  placeholder="请输入1-10个字符" v-model="order.name" :readonly="loading"/>
                <p class="tips" v-if="false">请输入正确的名字（长度为1-10个字符）</p>
              </label>
              <label class="l-title text">
                手机号码：<input type="number" class="mobile" placeholder="请输入您的手机号" v-model="order.mobile" :readonly="loading"/>
                <p class="tips" v-if="false">请输入正确的手机号</p>
              </label>
            </div>
            <!--按钮模式-->
            <div class="btns-wrap">
              <div class="btn-call" :class="[order.package == 1 ?'btn-active' :'']" @click="selectConsultWay(1)">电话</div>
              <div class="btn-face" :class="[order.package == 2 ?'btn-active' :'']" @click="selectConsultWay(2)">面询</div>
            </div>
            <div class="price-wrap">
              <p class="time-item">{{consultTime}}分钟/次</p>
              <div class="times-wrap">
                <div class="btn-sub" @click="minusPieces">-</div>
                <div class="num-wrap">{{order.pieces}}</div>
                <div class="btn-add" @click="addPieces">+</div>
              </div>
              <p class="price-item">{{amount | currency}}</p>
            </div>
            <button class="bth-pay" type="submit">确认支付</button>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss">
  .noscroll,
  .noscroll body {
    overflow: hidden;
  }
  .noscroll body {
    position: relative;
  }
  .detail-view{
    width: 100%; min-height: 100vh; overflow: hidden; padding-bottom: 1rem; position: relative;background: #fff;
    .text_input{
      position: static !important;
    }
    img{
      width: 100%;
    }
    .banner{
      width: 100%;height: 5.6rem;margin-bottom: 0.2rem;
      img{width: 100%;}
      background: #ccc; position: relative;overflow: hidden;
    }

    .expert-title-info{
      width: 90%;background: #fff;position: relative;margin: -1.2rem auto 0;border-radius: 0.08rem; box-shadow: 0 0.02rem 0.2rem rgba(0, 0, 0, 0.05);
      padding: 0 0.24rem;
      .expert-title-info-top{
        width: 100%; padding: 0.15rem 0.24rem; border-bottom: 0.01rem solid #f0f0f0;
      }
      .expert-name{
        font-size: 0.48rem;color: #3e3e3e;line-height: 0.9rem;
      }
      .expert-title{
        font-size: 0.26rem;color: #777;line-height: 0.4rem; display: -webkit-box;-webkit-box-orient:vertical;text-overflow: ellipsis;overflow : hidden;-webkit-line-clamp: 2;
      }
      .work-experience{
        width: 90%;height: 1.38rem;padding: 0.3rem 0 0.2rem;display: flex;justify-content: space-between;align-items: center;margin: 0 auto 0;
        &>li{
          height: 100%;text-align: center;
        }
        &>li:nth-child(2){
          width: auto;flex-shrink: 1;
        }
        &>li:nth-child(1),&>li:nth-child(3){
          width: 0.8rem;flex-shrink: 0;
        }
        .work-experience-top{
          font-size: 0.24rem;color: #2d2d2d;line-height: 0.4rem;
        }
        .work-experience-bot{
          font-size: 0.22rem;color: #777;
        }

      }
    }

    .tel-face-wrap{
      width: 100%;height: 2rem;margin-top: 0.15rem;padding: 0 0.3rem;display: flex;justify-content: space-between;align-items: center;
      &>li{
        width: 50%;height:100%;display: flex;justify-content: flex-start;align-items: center;position: relative;
        .consult_icon{
          width: 0.75rem;height: 0.75rem;background: url("../assets/images/consult_sprite.png") no-repeat center;background-position:0 0;background-size:100%;margin-right: 0.22rem;border-radius: 50%;
        }
        &>div p{
          color: #3abfc3;
        }
        &>div p:nth-child(1){
          font-size: 0.26rem;margin-bottom: 0.2rem;
        }
        &>div p:nth-child(2){
          font-size: 0.22rem;
        }
        .consult_icon_face{
          background-position: 0 -1.06rem;
        }
      }
      &>li:nth-child(2){
        padding-left: 0.54rem;
      }
      &>li:nth-child(2):before{
        content: '';width: 0.02rem;height: 0.82rem;background: #f4f4f4;position: absolute;left: 0;top: 50%;transform: translateY(-50%);
      }
    }
    .expert-info-wrap{
      width: 100%;transition: all .5s ease;position: relative;padding: 0 0.4rem;
      /*&:after{*/
        /*content: '';width:100%; height: 0.5rem;background:#fff;position: absolute;left: 0;bottom: 0;*/
      /*}*/
    }
    .expert-info{
      width: 100%;
      &>li{
        width:100%;padding:0 0 0.3rem;
      }
      &>li:nth-child(1){
        padding-top: 0.3rem;
      }
      .item-title{
        font-size: 0.3rem;color: #333333;line-height: 0.55rem;margin-bottom: 0.2rem;
      }
      .item-icon{
        width: 0.7rem;height: 0.18rem;background: url("../assets/images/detail/icon_spirte.png") no-repeat;background-size: 100%;background-position: 0.1rem 0;
        margin: 0.1rem auto 0.2rem;
      }
    }
    .item-discribe{
      font-size: 0.24rem;color: #6c6c6c;line-height: 0.38rem;text-align: justify;
    }
    .item-info{
      font-size: 0.3rem;
    }
    .btn-look-for{
      width: 100%;height: 0.8rem;line-height:0.8rem;color: #3bc1c2;text-align: center;font-size: 0.24rem;
    }
    .icon_area{
      background-position: 0.1rem -0.3rem !important;
    }
    .icon_tech{
      background-position: 0.1rem -0.59rem !important;
    }
    .icon_word{
      background-position: 0.1rem -0.86rem !important;
    }
    .order-wrap{
      width: 100%;background: #fff;padding-bottom: 0.4rem;
      .order-content{
        border-radius: 0.08rem;box-shadow: 0.06rem 0.06rem 1rem 0.08rem rgba(0, 0, 0, 0.01);
        .order-bottom{
          text-align: center;font-size: 0.24rem;margin-top: 0.65rem;
          .order-item-title{
            color: #a2a2a2;line-height: 0.54rem;font-weight: bold;
          }
          .order-item-con{
            color: #a2a2a2;line-height: 0.38rem;
            &>a{
              color: #a2a2a2;
            }
          }
        }
      }
      .order-title{
        width: 100%;line-height: 0.85rem;font-size: 0.3rem;color: #1c1c1c;padding: 0 0.4rem;
        font-weight: bold;
      }
      .order-items{
        width: 100%;
        counter-reset: count 0;
        &>li{
          width: 100%; font-size: 0.25rem;padding: 0.1rem 0.4rem 0 0.8rem;position: relative;
          counter-increment: count;
          margin-bottom: 0.2rem;
          &:before{
            position: absolute; left: 0.4rem; top: 0.22rem; width: 0.24rem; height: 0.24rem; border: 1px solid #7ec9e9; border-radius: 50%; font-size: 0.14rem;
            text-align: center; line-height: 0.24rem; color: #7ec9e9 ; content: counter(count);
          }
        }
        .order-item-title{
          color: #494949;line-height: 0.54rem;font-weight: bold;
        }
        .order-item-con{
          color: #868686;line-height: 0.38rem;
        }

      }

    }

    .mix-btns-wrap{
      width: 100%;height: 1.83rem;background: #edf1f2;padding: 0.2rem 0 0.2rem;display: flex;justify-content: flex-start;align-items: center;
      &>li{
        width: 2.4rem;height: 1.42rem;background: #fff;flex-shrink: 0;line-height: 1.42rem;padding-right: 0.35rem;text-align: right;
        p{
          font-size: 0.3rem;color: #494949;position: relative;
          span{
            font-size: 0.26rem;color: #7f7f7f;
          }
          &:before{
            content: '';position: absolute;left: 0.3rem;top: 50%;transform: translateY(-50%);width: 0.6rem;height: 0.7rem;
            background: url("../assets/images/consult_sprite.png") no-repeat center;background-position: 0 -2.75rem;background-size: 100%;
          }
        }
      }
      &>li:nth-child(2){
        p:before{
          background-position: 0 -1.7rem;
        }
      }
      &>li:nth-child(3){
        p:before{
          background-position: 0 -3.55rem;
        }
      }
      &>li:nth-child(1),&>li:nth-child(2){
        margin-right: 0.15rem;
      }
    }


    .consult-comments-wrap{
      width: 100%;padding-left: 0.3rem;padding-right: 0.3rem;padding-top: 0.2rem;padding-bottom: 0.2rem;
      .comments-title-wrap{
        width: 100%;height: 0.6rem;display: flex;justify-content: space-between;align-items: center;font-size: 0.3rem;color: #1c1c1c;
        .btn-to-comment{
          width: 1.45rem;height: 0.45rem;border-radius: 1rem;border: 0.01rem solid #30bfc3;text-align: center;line-height: 0.45rem;color: #30bfc3;font-size: 0.2rem;
        }
      }

      .comment-area{
        margin-bottom: 0.2rem;
      }
      .comment-title-bar{
        width:100%;height: 1rem;display: flex;justify-content: space-between;align-items: center;
      }
      .comment-user-info{
        height: 100%;display: flex;justify-content: flex-start;align-items: center;font-size: 0.26rem;
      }
      .comment-user-head{
        width: 0.6rem;height: 0.6rem;border-radius: 50%;overflow: hidden;background: pink;margin-right: 0.2rem;flex-shrink: 0;
        background: url("../../assets/image/icon_head.png") no-repeat center;background-size: 100%;
        &>img{
          width: 100%;display: block;
        }
      }
      .comment-user-name{color: #666;}
      .comment-grade{
        height: 100%;flex-shrink: 0;display: flex;justify-content:flex-start;align-items: center;
        &>li{
          font-size: 0.45rem;color: #ffd02b;
        }
      }
      .comment-info{
       line-height: 0.4rem;font-size: 0.26rem;
        .comment-con{
          color: #6f6f6f;margin-bottom: 0.25rem;
        }
        .comment-time{
          color: #ccc;margin-bottom: 0.3rem;font-size: 0.2rem;
        }
        .comment-reply{
          background: #eeeeee;color: #333;padding: 0.15rem;margin-top: 0.2rem;margin-bottom: 0.3rem;border-radius: 0.07rem;
          .reply-name{
            color: #3abfc3;margin-right: 0.2rem;
          }
        }
      }

      .noMoreComment{
        font-size: 0.4rem;color: #c1c1c1;text-align: center;line-height: 2.5rem;
      }
      .lool-more-comments{
        width: 100%;height: 0.95rem;line-height: 0.95rem;text-align: center;font-size: 0.26rem;color: #3cbfc1;
      }

    }
    .footer-wrap{
      width: 100%;height: 1rem;position: fixed;bottom: 0;left: 0;font-size: 0.3rem;line-height: 1rem;-webkit-transform: translateZ(0);display: flex;justify-content: flex-start;
      border-top: 0.01rem solid #e9e9e9;
      .btn-concern{
        width: 30%;height: 100%;background: #fff;line-height: 1rem;color: #21b7b6;font-size: 0.3rem;text-align: center;
      }
      .consult-btn{
        width: 70%;height: 100%;background: #22b8bb;color: #fff;text-align: center;
      }
    }

    .mask{
      width: 100%;background: rgba(0,0,0,0.6); height: 100%; position: absolute;left:0;top:0;
      .pop-wrap{
        width: 100%;background: #fff;padding-bottom: 0.7rem; height: 9.3rem; overflow: hidden; position: fixed; left: 0; bottom: 0;
        .btn-close{
          width: 0.41rem;height: 0.41rem;position: absolute;right: 0.32rem;top: 0.27rem;background: url("../assets/images/detail/icon_spirte.png") no-repeat center;
          background-position: 0 -1.2rem; background-size: 150%;
        }
        #info{
          width: 100%;
          .form-top{
            width: 100%;padding: 0.5rem 0.8rem 0.2rem;
          }
          .l-title{
            font-size: 0.28rem;color: #393939;display: block;margin-bottom: 0.2rem;margin-top: 0.2rem;
          }
          .text{
            position: relative;
            .tips{
              position: absolute;left: 2rem;top: 0.8rem;font-size: 0.14rem;color: red;
            }
          }
          .name{
            width: 3.82rem;height: 0.7rem;border: 1px solid #dcdcdc;border-radius: 0.08rem;text-indent: 0.1rem;font-size: 0.24rem;margin-left: 0.3rem;outline:none;
          }
          .mobile{
            @extend .name
          }
          .icon-pay{
            display: inline-block;width: 0.678rem;height: 0.67rem;background: url("../assets/images/detail/wx_pay.png") no-repeat center;
            background-size: 100%;transform: translateY(30%);margin-left: 0.3rem;
          }
          .bth-pay{
            display: block;width: 2.92rem; height: 0.78rem;line-height: 0.78rem;text-align: center;color: #fff;background: #22b8bb;border: none;border-radius: 0.1rem;
            margin: 0 auto; outline: none; font-size: 0.24rem;
          }
          .select-wrap{
            width: 100%;border-top: 0.01rem solid #e5e5e5;padding: 0 0.3rem;margin-bottom:0.7rem;
            &>li{
              width: 100%;font-size: 0.28rem;border-bottom: 0.01rem solid #e5e5e5;display: flex;justify-content: space-around;line-height: 0.8rem;
              .meal-A{
                font-size: 0.28rem;color: #393939;min-width: 1.4rem;text-align: center;
              }
              .meal-time{
                font-size: 0.24rem;color: #5e5e5e;min-width: 2.1rem;text-align: left;
              }
              .meal-price{
                font-size: 0.24rem;color: #ffaa30;min-width: 1.35rem ;text-align: left;
              }
              .select-btn{
                display:none;
              }
              .select-circle{
                display: inline-block;width: 0.36rem;height: 0.36rem;border: 0.03rem solid #bceaea;border-radius: 50%;vertical-align: middle;
              }
              .select-btn:checked ~ .select-circle{
                /*background: url("../assets/images/detail/icon_circle.png") no-repeat center;background-size: 100%;*/
                background: #bceaea;position: relative;
                &:after{
                  content: ''; width: 0.22rem; height: 0.22rem; border-radius: 50%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
                  background: #22b8bb;
                }
              }
            }
          }


          .btns-wrap{
            width: 100%;display: flex;justify-content: flex-start;padding-left: 0.8rem;padding-right: 0.8rem;padding-bottom: 0.85rem;border-bottom: 0.01rem solid #c9c9c9;
            margin-top: 0.4rem;
            .btn-call{
              width: 1.74rem;height: 0.73rem;border: 1px solid #c9c9c9;border-radius: 0.1rem;color: #c9c9c9;font-size: 0.3rem;text-align: center;line-height: 0.73rem;
            }
            .btn-face{
              @extend .btn-call;margin-left: 0.36rem;
            }
            .btn-active{
              border-color:#20b8bb;color: #21b6ba;
            }

          }
          .price-wrap{
            width: 100%;display: flex;justify-content: space-around;padding: 0.3rem 1.2rem;align-items: center;margin-bottom: 0.7rem;
            .time-item{
              font-size: 0.24rem;color: #717171;
            }
            .price-item{
              @extend .time-item;color: #000;
            }
            .times-wrap{
              width: 1.85rem;height: 0.6rem;display: flex;justify-content: space-around;align-items: center;
              .btn-sub{
                width: 0.5rem;height: 0.5rem;border: 1px solid #c9c9c9;border-radius: 0.08rem;font-size: 0.3rem;text-align: center;line-height: 0.4rem;
              }
              .btn-add{
                @extend .btn-sub;
              }
              .num-wrap{
                width: 0.58rem;height: 0.58rem;border: 1px solid #c9c9c9;text-align: center;font-size: 0.26rem;line-height: 0.55rem;
              }
              div:active{
                color: #21b6ba;
              }
            }
          }

        }
      }
    }

    .slide-leave-active, .slide-enter-active{
      transition: all .3s ease;
    }

    .slide-enter, .slide-leave-to {
      transform: translateY(1.2rem);
      opacity: 0;
    }

    input[type=button],
    input[type=submit],
    input[type=file],
    input[type=text],
    button,textarea,div{
      cursor: pointer;
      /*去除系统默认样式*/
      -webkit-appearance: none;
      /*点击高亮的颜色*/
      -webkit-tap-highlight-color:rgba(255,255,255,0);
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        expert: {
          id: 0,
          name: '',
          intro: '',
          avatar: '',
          tel_price: 300,
          info: [
            {
              id: 1,
              title: '',
              discribe: '',
            }
          ]
        },
        packages: window.packages,
        order: {
          name: '',
          mobile: '',
          package: 1,
          pieces: 1,
        },
        price: 0,
        amount: 0,
        loading: false,
        isPop: false,
        flag: false,
        isCall: true,
        consultTime:'',
        showMoreInfo:0, // 表明咨询师的专业技能那是否展示多个，还是仅展示三个
        showMoreText:'查看更多',
        commentInfo:[],
        is_attention:0,
        isShowLookMore:false,
        isConcerning:false,
      }
    },
    mounted() {
      document.title = '咨询辅导';

      this.expert.id = this.$route.params.id
      this.getData();
      this.getCommentContent();
      this.resolveStyle();
    },
    methods: {
      resolveStyle() {
        let vthis = this;
        $(window).scrollTop(0);
        $(this.$el).find('.name').on('focus', function () {
          if(vthis.getDeviceInfo() == 'android'){
            vthis.flag = true;
            $(window).scrollTop(0);
            $('.mask').height($(document).height());
          }
        }).on('blur',function () {
          vthis.flag = false;
          if(vthis.getDeviceInfo() == 'android'){
//          console.log(window.screen.height)
//          $('.mask').height(screen.height);
            $('.mask').height(screen.height);
          }
        });

        $(this.$el).find('.mobile').on('focus', function () {
          if (vthis.getDeviceInfo() == 'android') {
            vthis.flag = true;
            $(window).scrollTop(0);
            $('.mask').height($(document).height());
          }
        }).on('blur',function () {
          vthis.flag = false;
          if(vthis.getDeviceInfo() == 'android'){
            $('.mask').height(screen.height);
          }

        });
      },
      getDeviceInfo() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //苹果端
          return 'iphone';
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //安卓端
          return 'android'
        }
      },
      getData() {
        this.weLoadStart();
        this.$http.post(zzhJs.config.apiDomain+'/zzhedu/app/consult/counselor_detail.action', {
          counselor_id: this.$route.params.id,
        }).then(res => {
          let response = res.body;

          this.expert = response.data;
          this.is_attention = response.data.is_attention;

          this.price = this.expert.tel_price;
          this.amount = this.expert.tel_price;
          this.consultTime = this.expert.tel_time;
          this.weLoadEnd();
        }).catch((res) => {
          zzhJs.console.log(res);
        });
      },
      appointment() {
//        zzhJs.messageBridge.listenOnce('provideUserToken',content => {
//          if (content.token) {
//            this.showPopup();
//          } else {
//            console.log('login')
//            zzhJs.messageBridge.sendToApp({type:'showLogin'})
//          }
//        })
//
//        zzhJs.messageBridge.sendToApp({type:'requestUserToken'});

      zzhJs.env.isLogined((login) => {
        if (login) {
          this.showPopup();
        } else {
          zzhJs.env.callLogin();
        }
      });


      },
      showPopup() {
        this.isPop = true;
        $('.mask').height('100%')
        $('html').addClass('noscroll');
        this.deal($('.mask'), '.pop-wrap');
      },
      hidePopup() {
        this.isPop = false;
        $('html').removeClass('noscroll');
      },
      // 尝试解决弹框底部会滑动问题
      deal(container, selectorScrollable) {
        // 如果没有滚动容器选择器，或者已经绑定了滚动事件，忽略
        if (!selectorScrollable || container.data('isBindScroll')) {
          return;
        }

        // 是否是搓浏览器
        // 自己在这里添加判断和筛选
        var isSBBrowser;

        var data = {
          posY: 0,
          maxscroll: 0
        };

        // 事件处理
        container.on({
          touchstart: function (event) {
            var events = event.touches[0] || event;

            // 先求得是不是滚动元素或者滚动元素的子元素
            var elTarget = $(event.target);

            if (!elTarget.length) {
              return;
            }

            var elScroll;

            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
              elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
              elScroll = null;
            }

            if (!elScroll) {
              return;
            }

            // 当前滚动元素标记
            data.elScroll = elScroll;

            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
          },
          touchmove: function () {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
              // 禁止滚动
              event.preventDefault();
            }
            // 滚动元素
            var elScroll = data.elScroll;
            // 当前的滚动高度
            var scrollTop = elScroll.scrollTop();

            // 现在移动的垂直位置，用来判断是往上移动还是往下
            var events = event.touches[0] || event;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            if (isSBBrowser) {
              elScroll.scrollTop(data.scrollY - distanceY);
              elScroll.trigger('scroll');
              return;
            }

            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
              // 往上滑，并且到头
              // 禁止滚动的默认行为
              event.preventDefault();
              return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
              // 往下滑，并且到头
              // 禁止滚动的默认行为
              event.preventDefault();
              return;
            }
          },
          touchend: function () {
            data.maxscroll = 0;
          }
        });

        // 防止多次重复绑定
        container.data('isBindScroll', true);
      },
      confirm() {
        let vthis = this;

        // 验证
        if (this.order.name.length == 0) {
          return this.weNotify('请输入您的称呼 !');
        }

        if (!/^[\u4e00-\u9fa5]+$/.test(this.order.name)) {
          return this.weNotify('请输入正确的称呼 !');
        }

        if (!/^[\u4e00-\u9fa5]{1,10}$/.test(this.order.name)) {
          return this.weNotify('称呼应在 10 个字符以内 !');
        }

        if (this.order.mobile.length == 0) {
          return this.weNotify('请输入您的手机号 !');
        }

        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.order.mobile)) {
          return this.weNotify('手机号格式错误 !');
        }

        // 判断用户是否点击过提交按钮，如果点击过，在还没有提交完成的时候禁止再次提交
        if (this.loading) {
          return false;
        }

        if (zzhJs.env.isInApp()) {
          // 吊起 app 支付
          return zzhJs.env.callPayment({
            counselor_info: _.clone(this.expert),
            userinput: {
              name: this.order.name,
              tel: this.order.mobile,
              type: this.order.package,
              amount: this.order.pieces,
              total_price: this.amount,
            },
          });
        }


        // 创建同时确认订单 吊起 微信支付
        this.weLoadStart();
        this.loading = true;
        this.$http.post(zzhJs.config.apiDomain+'/zzhedu/wx/order/create_consult.action', {
          title: document.title,
          attach: 'wx',
          name: this.order.name,
          tel: this.order.mobile,
          counselor_id: this.$route.params.id,
          type: this.order.package,
          amount: this.order.pieces,
          price: this.amount,
        }).then(res => {
          vthis.weLoadEnd();
          let response = res.body;

          this.config = response.data;

          vthis.callWechat();
        }, function () {
          vthis.loading = false;
          vthis.weLoadEnd();
        });
      },
      signAndCall(orderId) {
        let vthis = this,
          url = zzhJs.helpers.zzhJs.helpers.routeParser('api.payment.wechat.argument_sign');

        // 签名预创建微信订单
        this.$http.post(url, {
          order_id: orderId
        }).then(res => {
          var response = res.body;

          if (response.status == 503 || response.status == 504) {
            this.$router.replace('/');
            return vthis.weNotify(response.message);
          }

          if (response.status != 200) {
            return vthis.weNotify(response.message);
          }

          vthis.config = response.data.config;
          vthis.callWechat(orderId);

        }, res => {
          vthis.loading = false;
          vthis.weLoadEnd();
          vthis.weNotify('服务器繁忙请稍后!');
        });
      },
      callWechat() {
        let vthis = this,
          config = _.clone(this.config);

        this.called = this.calling = true;

        // 调起支付
        wx.chooseWXPay({
          timestamp: config['timestamp'],
          nonceStr: config['nonce_str'],
          package: config['package'],
          signType: config['sign_type'],
          paySign: config['pay_sign'],
          success: function (res) {
            vthis.calling = false;
            vthis.loading = false;

            if (res.errMsg != "chooseWXPay:ok") {
              vthis.needRetry = true;
              return vthis.weNotify('支付失败,请重试!'+ res.errMsg);
            }

            vthis.$router.replace({
              name: 'consult.success',
              params: { id: vthis.config.order_no }
            });
          },
          cancel: function (res) {
            vthis.calling = false;
            vthis.needRetry = true;
            vthis.loading = false;
          },
          fail: function (res) {
            vthis.calling = false;
            vthis.needRetry = true;
            vthis.loading = false;

            return vthis.weNotify('支付失败,请重试!');
          }
        });
      },
      selectMeal(key) {
        this.order.package = key;
      },
      // 选择电话还是面询
      selectConsultWay(channel) {
        this.order.package = channel;
        this.order.pieces = 1;

        let price = channel == 1? this.expert.tel_price: this.expert.interview_price;
        let time = channel == 1? this.expert.tel_time :this.expert.interview_time;
        this.price = price
        this.amount = price;
        this.consultTime = time;
      },
      addPieces() {
        this.order.pieces++;
        let amount = this.price * this.order.pieces;
        this.amount = Math.round(amount * 100) / 100;
      },
      minusPieces() {
        if (this.order.pieces > 1) {
          this.order.pieces--;
        }

        let amount = this.price * this.order.pieces;
        this.amount = Math.round(amount * 100) / 100;
      },

      // 关注咨询师
      concern() {
        let vthis = this;

        if (this.isConcerning) {
          return;
        }
        this.isConcerning = true;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/app/consult/attention.action',
        {
          counselor_id:vthis.expert.id
        }).then(res => {
          this.is_attention = res.body.data.is_attention;
          this.weNotify(res.body.msg);
          this.isConcerning = false;
        },res => {

        })
      },
      // 展示更多教师的专业信息
      showMore() {
        this.showMoreInfo = this.showMoreInfo == 0 ? 1 : 0;
        this.showMoreText =  this.showMoreInfo == 0 ? '查看更多' : '收起'

      },

      // 获取评价内容
      getCommentContent() {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/consult/index.action',
          {
            counselor_id:vthis.expert.id
          }).then(res => {
            vthis.commentInfo = res.body.data;
        },res => {
            zzhConsole.log(res);
        })
      },

      // 展示更多评价内容
      showMoreComment(id) {
        this.$router.push({name:'consult.allComment',params:{id:id}});
      },
      // 去评价
      goComment(id) {
        let vthis = this;
        this.$http.post(zzhJs.config.apiDomain + '/zzhedu/wx/evaluate/consult/is_evaluate.action',
          {
            counselor_id:id
          }).then(res => {
            if (res.body.data.is_evaluate == 0) {
              return vthis.weNotify(res.body.data.msg);
            }
          window.location.href = zzhJs.config.urlSubjectCommentPage + '?#/'+ id + '/consult';


        },res => {
          zzhConsole.log(res);
        })

      },

      // 跳到app里的咨询师的文章列表
      showInfoInApp(expert,type,con) {
        if (expert[con] == 0) {
          return this.weNotify('暂无内容')
        }
        zzhJs.messageBridge.sendToApp({type: type,data:{consult_id:expert.id, teacher_name:expert.name}})
      },

    }
  }
</script>