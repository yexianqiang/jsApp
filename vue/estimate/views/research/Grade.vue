<template>
  <div class="grade-wrap" @click="">
    <div class="text-box-area">
      <p class="second-title">{{ options.config.user_title }}</p>
      <!--<input type="text" :placeholder="options.config.user_placeholder" :value="userSelected" @click="showSelections = true">-->
      <div class="pseudo-input" @click="showSelections = true">{{userSelected? userSelected: options.config.user_placeholder}}</div>
    </div>
    <div class="grade-outer-area" :class="[showSelections? 'show-selections': '']">
      <div class="grade-inner-part">
        <div class="grade">
          <ul class="grade-list first-grade">
            <template v-for="item in schools">
              <li class="grade-unit " :class="{selected: temp.school.id && temp.school.id == item.id }" @click="selectSchool(item)">
                {{ item.name }}
              </li>
            </template>
          </ul>
          <ul class="grade-list second-grade">
            <template v-for="index in temp.school.maxGrade">
              <li class="grade-unit" :class="{selected:  temp.grade && temp.grade.id == index}"  @click="selectGrade(index)">
                {{ grades[index - 1] }}
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  $greenblue: #47c0c2;

  .grade-wrap{
    .text-box-area{
      background-color: white; padding:0.3rem; margin:0.4rem 0;

      input {
        display:block; margin-top: 0.3rem; padding:0 0.2rem; width: 4rem; height:0.48rem; outline: none; border:2px solid $greenblue; border-radius: 3px; font-size: 0.26rem;
      }
      .pseudo-input{
        background-color: white; border:2px solid rgb(71,192,194); border-radius: 3px; color: #333; font-size: 0.26rem; height:0.52rem; margin-top: 0.3rem; padding: 0 0.2rem; width: 4.44rem; line-height: 0.52rem;
      }
    }

    .show-selections{
      display:flex !important;
    }
    .grade-outer-area{
      position: fixed; top: 0; left:0; right:0; bottom:0; display:none; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.3);

      .grade-inner-part{
        position: relative; margin:0 0.6rem; width: 100%; height: 5.85rem; background-color: white; border-radius: 10px;

        .grade{
          display:flex; flex-direction: row; justify-content: space-between; padding: 0.3rem;

          .grade-list{
            margin-top: 0.3rem; padding: 0 0.3rem;

            .grade-unit{
              width:1.9rem; height: 0.5rem; display: flex; justify-content: flex-start; align-items: center; background-color: #efefef;
              margin-bottom: 0.3rem; padding-left: 0.2rem; border-radius: 5px;
            }
            .selected{
              background-color: $greenblue; color: white;
            }
          }
          .first-grade-list:after{
            content: ''; display: block; height: 0; clear: both; visibility: hidden;
          }
        }

        .button-type1{
          position: absolute; bottom: 0; width: 100%; display: flex; flex-direction: row; justify-content: space-around;

          a {
            display: flex; justify-content: center; align-items: center; width: 50%; height: 0.64rem; text-decoration: none;
            border-radius: 10px; color: #666666;
          }
          a:nth-child(1) {
            border-top: 1px solid #eeeeee; border-right: 1px solid #eeeeee;
          }
          a:nth-child(2) {
            border-top: 1px solid #eeeeee;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        showSelections: false,
        temp: {
          school: {id: 1, name: '小学', maxGrade: 6},
          grade: null
        },
        selected: {
          school: null,
          grade: null,
        },
        schools: [
          {id: 1, name: '小学', maxGrade: 6},
          {id: 2, name: '初中', maxGrade: 3},
          {id: 3, name: '高中', maxGrade: 3},
        ],
        grades: [
          '一年级', '二年级', '三年级', '四年级', '五年级', '六年级',
        ],
      };
    },
    props: ['options', 'index'],
    computed: {
      userSelected() {
        return this.selected.school && this.selected.grade?
          this.selected.school.name + this.selected.grade.name: '';
      }
    },
    methods: {
      selectSchool(item) {
        this.temp.school = item;
        if (!this.selected.school || item.name != this.selected.school.name) {
          this.temp.grade = '';
        }
      },
      selectGrade(index) {
        this.selected.school = this.temp.school;
        this.selected.grade = this.temp.grade = {id: index, name: this.grades[index-1]};
        this.showSelections = false;

        let data = _.assign(_.clone(this.options), {
          answer: {
            id: `${this.selected.school.id}${this.selected.grade.id}`,
            text: `${this.selected.school.name}${this.selected.grade.name}`,
          }
        });
        this.$emit('input', this.index, data);
      }
    }
  };
</script>