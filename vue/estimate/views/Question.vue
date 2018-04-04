<template>
  <div class="answer-page">
    <div class="process-bar">
      <span class="prev-one" @click="goBack1()">上一题</span>
      <span class="bar"><span :style="{width: paintedWidth+ '%'}" class="painted"></span></span>
      <span class="current-and-total">
          <span class="current">{{ currentIndex + 1 }}</span>
          <span class="slash">/</span>
          <span class="total">{{ questionList.length }}</span>
        </span>
    </div>
    <div class="container answer" v-if="true">
      <component :is="currentItem.type" :item="currentItem" @choose="choose($event)"></component>
    </div>
    <div class="submit" :class="{disabled: !canSubmit || submiting}">
      <a href="javascript:;" @click="submit">
        提交
      </a>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../style/variables";

  .answer-page{
    width:100%; min-height: 100vh; background-color:#eef3f1;
  }

  .answer-page .container{
    width:100vw; height:auto; background-color:transparent;
    display:flex;align-items: center;justify-content:center; min-height: 100vh;flex-direction: column;overflow: scroll;
    padding-top: 0.8rem;padding-right: 0.2rem;padding-left: 0.2rem;padding-bottom: 1rem;
    div{
      box-sizing: content-box;
    }
    .part-2-img{
      display: flex; align-items: center; justify-content: center; overflow: hidden; margin-bottom: 0.15rem;
      min-height:5.7rem;
      img{
        display:block;width: 100%;
      }
    }
  }
  .answer-page .process-bar {
    box-sizing: border-box; width:100%; padding:0 0.2rem; height:0.8rem; display:flex; align-items: center; justify-content: flex-start;  background-color: #eef3f1;
    position:fixed; left:0; top: 0;
  }

  .answer-page .process-bar span{
    /*height:0.3rem;*/
  }

  .answer-page .prev-one{
    width: 17%; color:#3bc0c3; font-size: 0.3rem; padding-right: 0.2rem; cursor:pointer; user-select: none; text-align: left;
  }

  .answer-page .current-and-total{
    min-width: 15%; display: flex; justify-content: flex-end;
  }

  .answer-page .current-and-total span{
    font-size: 0.3rem; padding: 0 0.05rem; height:auto;
  }

  .answer-page .current{
    display: flex; align-items: flex-end; color:#3bc0c3; font-size: 0.3rem;
  }

  .answer-page .slash{
    display: flex; align-items: flex-end; font-size: 0.24rem !important; padding-bottom: 0.05rem!important;
  }

  .answer-page .total{
    display:flex; align-items: flex-end;
  }

  .answer-page .bar{
    margin-right: 0.2rem; /*width:5.2rem;*/ height:0.1rem!important; background-color: #3bc0c3; background-color: rgba(59,192,195,0.3); border-radius: 5px;
    flex-grow: 1;
  }

  .answer-page .painted{
    display:flex; width:10%; height:100% !important; background-color: #3bc0c3; border-radius: 5px; transition: all .3s ease;
  }

  .answer-page .question-board{
    padding: 0.45rem 0.20rem; background-color: white;
  }

  .answer-page .question{
    min-height: 1.5rem; padding-bottom: 0.25rem; font-size: 0.33rem; line-height: 0.6rem; letter-spacing: 4px; transition: all .3s ease;
  }

  .answer-page .pic{
    display: block; width:100%; height:3rem; margin-bottom: 0.60rem; margin-top: 0.3rem;
  }

  .answer-page .button-list{
    display:flex; justify-content: space-between;
  }

  .answer-page .button-unit{
    height:1rem; display: flex; align-items: flex-end; flex-direction: column; font-size: 0.3rem;
  }

  .answer-page .level-1 i{
    width:100%; height:100%; background-color: #00AA88;
  }
  .answer-page .level-2 i{
    width:100%; height:100%; background-color: #00CCFF;
  }
  .answer-page .level-3 i{
    width:100%; height:100%; background-color: #8c3900;
  }
  .answer-page .level-4 i{
    width:100%; height:100%; background-color: #AFF29A;
  }

  .answer-page .button-unit:active i{
    background-color: #ae81ff;
  }

  .answer-page .submit{
    position: fixed; bottom: 0; left: 0; width: 100vw; overflow: hidden; background: white; height: 1rem;
    display: flex; justify-content: center; align-items: center;
  }

  .answer-page .submit a{
    width: 4rem; height: .7rem; display: block; border-radius: 0.6rem ; font-size: 0.3rem; background-color: #3bc0c3; color:white; line-height: 0.7rem; text-align: center;
  }

  .answer-page .submit.disabled a{
    background: #CCC;
  }

  .answer-page .research{
    height:100vh; padding: 0.2rem 0.3rem;

    div, p, span, ul, li{
      font-size: 0.24rem; color:#333333;
    }
  }
</style>

<script>

  export default {
    data() {
      return {
        questionAndEstimate: null,
        userEstimate: null,
        estimate: null,
        currentPackage: 0,
        currentIndex: 0,
        currentItem: {},
        questionList: [],
        answers: [],
        canSubmit: false,
        submiting: false,
      };
    },
    computed: {
      paintedWidth:function () {
        return (this.currentIndex + 1) * 100 / this.questionList.length;
      },
    },
    watch: {
      answers(val) {
        this.canSubmit = val.length > 0 && val.length == this.questionList.length;
      },
      currentIndex: function () {
        document.title = '测评题目'+ (this.currentIndex + 1);
      }
    },
    props() {},
    created() {
      this.filterEstimateId();
    },
    mounted() {
      document.title = '测评题目';

      this.initStyle();
      this.getQuestions();
    },
    methods: {
      filterEstimateId() {
        if (!this.$router.currentRoute.params || !this.$router.currentRoute.params.id) {
          this.$router.replace({name: 'estimate.home'});
        }
      },

      getQuestions() {
        let vthis = this,
          estimateId = this.$router.currentRoute.params.id,
          apiUrl = zzhJs.helpers.routeParser('api.estimate.questions', {
            id: estimateId,
            child_id: this.$router.currentRoute.query.child_id || 0
          });

        this.weLoadStart();
        this.$http.get(apiUrl).then(res => {
          this.weLoadEnd();

          let response = res.body;

          if (response.status == 404) {
            vthis.weNotify(response.message);
            vthis.$router.replace({name: 'estimate.home'});
            return;
          }

          if (response.status == 504) {
            this.weLoadEnd();
            return vthis.showReport();
          }

          if (response.status == 503) {
            this.weConfirm('提示', '该测评需要收费, 测评之前需要先购买!', () => {
              vthis.$router.replace({ name: 'pay.confirm', query: {
                product_id: estimateId,
                product_type: window.productTypes['estimate'],
              }});
            }, () => {
              vthis.$router.replace({ name: 'estimate.detail', params: {
                id: estimateId,
              }});
            });
            return;
          }

          if (response.status >= 502) {
            vthis.weNotify(response.message);
            vthis.$router.replace({ name: 'estimate.detail', params: {
              id: estimateId,
            }});
            return;
          }

          vthis.loaded = true;

          let questionAndEstimate = response.data.questionAndEstimate;
          vthis.currentIndex = 0;
          vthis.questionAndEstimate = questionAndEstimate;
          let qeItem = questionAndEstimate[0];
          vthis.estimate = qeItem.estimate;
          vthis.questionList = qeItem.questions;
          vthis.currentItem = qeItem.questions[0];
          vthis.userEstimate = response.data.userEstimate;

          let hasAnswer = questionAndEstimate.length
            && questionAndEstimate[questionAndEstimate.length - 1].hasOwnProperty('answer');

          if (hasAnswer) {
            vthis.weNotify('您有一份中断的测试已经为您还原!');
            let answerLength = vthis.questionList.length;
            vthis.currentIndex = answerLength-1;
            vthis.currentItem = qeItem.questions[answerLength-1];
            vthis.answers = qeItem.answer.answers;
          } else if (!hasAnswer && vthis.estimate.notify) {
            vthis.weConfirm(
              '提示',
              String.prototype.replace.call(vthis.estimate.notify, "\n", '<br/>')
            );
          }
        });
      },

      loadedNextPackage() {
        this.currentPackage++;
        this.currentIndex = 0;
        this.estimate = this.questionAndEstimate[this.currentPackage].estimate;
        if (this.estimate.notify) {
          this.weConfirm(
            '提示',
            String.prototype.replace.call(this.estimate.notify, "\n", '<br/>')
          );
        }
        this.questionList = this.questionAndEstimate[this.currentPackage].questions;
        this.currentItem = this.questionAndEstimate[this.currentPackage].questions[0];
      },
      // 选题行为
      choose(val, $event) {
        this.$set(this.answers, this.currentIndex, val);

        if (this.currentIndex + 1 === this.questionList.length) {
          return;
        }

        this.currentItem = this.questionList[this.currentIndex + 1];
        this.currentIndex++;
      },
      // 回退一道题行为
      goBack1() {
        if (this.currentIndex === 0) {
          return;
        }

        this.currentItem = this.answers[this.currentIndex - 1];

        this.$delete(
          this.answers,
          this.currentIndex
        );

        this.currentIndex--;
      },
      // 初始化一些样式
      initStyle() {
        //进度条初始化
        let one = 5+'%';
        $('.painted').css('width',one)
      },
      // 提交按钮动作
      submit() {
        if (!this.canSubmit || this.submiting) {
          return;
        }

        let vthis = this,
          apiUrl = zzhJs.helpers.routeParser('api.estimate.answers.store'),
          estimate_id = this.$router.currentRoute.params.id,
          child_id = this.$router.currentRoute.query.child_id? this.$router.currentRoute.query.child_id: 0,
          source_id = this.estimate.id;

        let answer_id = this.questionAndEstimate[this.currentPackage].answer ?
          this.questionAndEstimate[this.currentPackage]['answer']['id'] : 0;

        this.submiting = true;
        this.weLoadStart(false);
        this.$http.post(apiUrl, {
          answer_id, estimate_id, child_id, source_id, answers: _.clone(this.answers)
        }).then((res) => {
          vthis.weLoadEnd();
          vthis.submiting = false;

          let response = res.body;

          if (response.status > 501) {
            return vthis.weNotify(response.message);
          }

          // 多问卷
          if (response.status == 501) {
            return vthis.loadedNextPackage();
          }

          // 需要问卷
          if (parseInt(this.userEstimate.need_paper)) {
            vthis.weNotify('问题回答完毕!');
            vthis.$router.replace({
              name: 'estimate.research',
              params: {id: estimate_id},
              query: child_id? {child_id: child_id} : null
            });
            return;
          }

          vthis.showReport();
        }).catch(function() {
          vthis.submiting = false;
        });
      },

      showReport() {
        this.weNotify('回答完成,正在跳转到报告!');

        this.$router.replace({
          name: 'estimate.report',
          params: {
            'id': this.$router.currentRoute.params.id
          }
        });
      },
    },
    components: {
      "face4": require('./question/Face4.vue'),
      "face5": require('./question/Face5.vue'),
      "choice": require('./question/Choice.vue'),
      "yesNo": require('./question/YesNo.vue'),
      "multiDimensional":require('./question/MultiDimensional.vue')
    }
  };
</script>