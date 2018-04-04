<template>
  <div class="get-info-wrap">
    <div class="choose-role" v-if="showSelectRole">
      <div class="role-wrap">
        <div class="title">选择您的角色</div>
        <ul class="roles">
          <template v-for="item in papers">
            <li class="item" @click="selectRole(item)">
              <div class="role-img" :class="['pic-'+ item.role, (currentRole == item.role? 'on': '')]"></div>
              <p class="role-name" :class="currentRole == item.role ? 'name-color':'' ">{{ item.roleTitle }}</p>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="question-wrap">
      <template v-for="(item, index) in paper.paper_meta">
        <component :is="item.type + 'Cm'" :options="item" :index="index" @input="inputItem"></component>
      </template>
    </div>
    <div class="ok-button" :class="{disabled: !canSubmit}">
      <a href="javascript:;" @click="storePaper">提交</a>
    </div>
  </div>
</template>

<style lang="scss">
  $greenblue: #47c0c2;

  .get-info-wrap {
    padding: 0.02rem 0.3rem; min-height:100vh; background-color: #f1f7f7;

    div, p, span, ul, li {
      font-size: 0.24rem; color: #333333;
    }

    .choose-role{
      position: fixed; width: 100vw; height: 100vh; background: rgba(0, 0, 0, .5); left: 0; top: 0; display: flex; justify-content: center; align-items: center;

      .role-wrap{
        width: 7rem; background: white; border-radius: 0.05rem; margin-top: -1.5rem; padding-bottom: 0.5rem; padding-top: 0.3rem;

        .title{
          font-size: 0.3rem; color:#535353; line-height: 0.8rem; padding-left: .3rem; text-align: center;
        }

        .roles{
          display: flex; justify-content: center; align-items: center; flex-wrap: wrap;margin-top: 0.3rem;

          .item{
            overflow: hidden;margin: 0.2rem 0.5rem;
            .role-img{
              width: 1.08rem; height: 1.08rem;background: url("../assets/images/roles/spirit_icon.png") no-repeat;background-position: 0 0 ;background-size: 100%;
            }
            .pic-teacher{background-position: 0 -2.76rem;}
            .pic-teacher.on {background-position: 0 -4.14rem;}
            .pic-worker{background-position: 0 -5.52rem;}
            .pic-worker.on{background-position: 0 -6.89rem;}
            .pic-parent{background-position: 0 0 ;}
            .pic-parent.on{background-position: 0 -1.38rem;}
            .name-color {color: #48c0c2 !important;}

            .role-name{
              font-size: 0.24rem; color:#dadada; text-align:center;line-height: 0.6rem;
            }
          }
        }
      }
    }

    .question-wrap{ min-height: 50vh; width: 100%; }

    .ok-button {
      padding: .2rem;

      a {
        display: block; margin: 0 auto; width: 2.3rem; height: 0.64rem; text-decoration: none; border-radius: 10px; color: white;
        background-color: $greenblue; text-align: center; line-height: 0.64rem;
      }

      &.disabled a{
        background: #cccccc; color: white;
      }
    }

    .counter{
      counter-reset: sectioncounter;
    }
    .second-title:before{
      content:counter(sectioncounter) "、";
      counter-increment:sectioncounter;
    }
  }
</style>

<script>

  export default{
    data(){
      return {
        currentRole: '',
        papers: [],
        paper: {
          paper_meta: []
        },
      }
    },
    computed: {
      showSelectRole() {
        return !this.currentRole && this.papers.length > 1;
      },
      canSubmit() {
        return !this.paper.paper_meta.filter(function (item) {
            return item.type != 'notice' && !item.answer;
          }).length;
      },
    },
    created() {
      this.filterEstimateId();
    },
    mounted() {
      document.title = '测评问卷';
      this.getPapers();
    },
    methods:{
      filterEstimateId() {
        if (!this.$router.currentRoute.params || !this.$router.currentRoute.params.id) {
          this.$router.replace({name: 'estimate.home'});
        }
      },
      getPapers() {
        let vthis = this,
          estimateId = this.$router.currentRoute.params.id,
          apiUrl = zzhJs.helpers.routeParser('api.estimate.papers', {
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

          vthis.papers = response.data;

          if(vthis.papers.length < 2) vthis.selectRole(response.data[0]);
        }, function() {
          vthis.weNotify('服务端繁忙!');
        });
      },
      selectRole(item) {
        this.paper = item;
        this.currentRole = item.role;
      },
      inputItem(index, data) {
        this.$set(this.paper.paper_meta, index, data);
      },
      storePaper() {
        if (!this.canSubmit) {
          return;
        }

        let vthis = this,
          estimate_id = this.$router.currentRoute.params.id,
          child_id = this.$router.currentRoute.query? this.$router.currentRoute.query.child_id: 0,
          paper_id = this.paper.id;

        let apiUrl = zzhJs.helpers.routeParser('api.estimate.store_paper');

        let answers = this.paper.paper_meta.filter(function (item) {
          return item.type != 'notice';
        });

        this.$http.post(apiUrl, {
          estimate_id, child_id, paper_id, answers
        }).then(res => {
          let response = res.body;

          if (response.result == 404) {
            vthis.weNotify(response.message);
            vthis.$router.replace({name: 'estimate.home'});
            return;
          }

          if (response.status == 502) {
            vthis.weNotify(response.message);
            vthis.$router.replace({name: 'estimate.detail', param: {id: estimate_id}});
            return;
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

          if (response.status != 200) {
            return vthis.weNotify(response.message);
          }

          vthis.weNotify('问卷提交完成,即将跳转到报告页面!');
          vthis.$router.replace({name: 'estimate.report', param: {
            id: estimate_id
          }});
        }, res => {
          vthis.weNotify('服务端繁忙!');
        });
      }
    },
    components: {
      "noticeCm": require('./research/Notice.vue'),
      "genderCm": require('./research/Gender.vue'),
      "radioCm": require('./research/Radio.vue'),
      "schoolCm": require('./research/School.vue'),
      "textCm": require('./research/Textbox.vue'),
      "gradeCm": require('./research/Grade.vue'),
    }
  }
</script>