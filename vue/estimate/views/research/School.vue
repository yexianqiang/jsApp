<template>
  <div class="school-wrap">
    <div class="text-box-area" @click="toggleSelection(true)">
      <p class="second-title">{{ options.config.user_title }}</p>
      <div class="pseudo-input">{{ selected.school? selected.school.name: '输入你的学校' }}</div>
    </div>
    <div class="selection-part" :class="{show: showSelectWrap}" @click.self="showSelectWrap = false; showCityWrap = true; showCountyWrap = false;">
      <div class="search-part" >
        <div class="left-unit" @click="showCityWrap = !showCityWrap; showCountyWrap = false;">
          <img class="point" src="../../assets/images/getInfo/point.png">
          <div class="stage" :class="{ down: showCityWrap }">
            区域
          </div>
        </div>
        <div class="right-unit">
          <input v-model="schoolName" class="school-input-box" type="text" placeholder="学校名称关键字">
        </div>
      </div>
      <div class="area-mask" :class="{show: showCityWrap}">
        <div class="item-part">
          <ul class="city" :class="{ show: showCityWrap }">
            <template v-for="(item, index) in cities">
              <li class="item-unit city-name" :class="{greenblue: temp.city && temp.city.city_id == item.city_id }" @click="selectCity(item, index)">
                {{ item.name }}
              </li>
            </template>
          </ul>
          <ul class="area" :class="{ show: showCountyWrap }">
            <template v-for="(item, index) in counties">
            <li class="item-unit" :class="{greenblue: selected.county && selected.county.city_id == item.city_id}" @click="selectCounty(item, index)">
              {{ item.name }}
            </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="school">
        <p class="user-choice">
          您当前选择的区域是：
          <span>{{ cityAndCounty }}</span>
        </p>
        <ul class="types">
          <li class="item" :class="{ active: currentType == 'primary' }" @click="currentType = 'primary'">小学</li>
          <li class="item" :class="{ active: currentType == 'middle' }" @click="currentType = 'middle'">初中</li>
          <li class="item" :class="{ active: currentType == 'high' }" @click="currentType = 'high'">高中</li>
        </ul>
        <div class="types-wrap">
          <ul class="school-list" v-show="currentType == 'primary'">
            <template v-for="(item, index) in filterPrimary">
              <li class="school-unit" :class="{active: temp.school && temp.school.id == item.id}" @click="temp.school = item">
                <p>{{ item.name }}</p>
                <div class="circle-box">
                  <div class="out-circle">
                    <div class="inner-circle"></div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
          <ul class="school-list" v-show="currentType == 'middle'">
            <template v-for="(item, index) in filterMiddle">
              <li class="school-unit" :class="{active: temp.school && temp.school.id == item.id}" @click="temp.school = item">
                <p>{{ item.name }}</p>
                <div class="circle-box">
                  <div class="out-circle">
                    <div class="inner-circle"></div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
          <ul class="school-list" v-show="currentType == 'high'">
            <template v-for="(item, index) in filterHigh">
              <li class="school-unit" :class="{active: temp.school && temp.school.id == item.id}" @click="temp.school = item">
                <p>{{ item.name }}</p>
                <div class="circle-box">
                  <div class="out-circle">
                    <div class="inner-circle"></div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="ok-button">
          <a @click="confirmSchool" href="javascript:;">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  $greenblue: #47c0c2;
  $searchPartHeight: 0.95rem;
  $innerBGC: #f1f7f7;
  $deviceHeight: 100vh;
  $userChoiceHeight: 0.68rem;

  .school-wrap{
    background-color: white;

    .text-box-area{
      .pseudo-input{
        background-color: white; border:2px solid rgb(71,192,194); border-radius: 3px; color: #333; font-size: 0.26rem; height:0.52rem; margin-top: 0.3rem; padding: 0 0.2rem; width: 4.44rem; line-height: 0.52rem;
      }
    }

    .selection-part{
      display:none; position: fixed; top: 0; left:0; bottom:0; right:0; background-color: white;

      &.show{
        display: flex;
      }

      .area-mask{
        display: none; z-index: 10; width: 100vw; background-color: rgba(0, 0, 0, .5); position: absolute; left: 0; bottom: 0; right: 0; top: .95rem;

        &.show{
          display: block;
        }
      }
      .search-part{
        display:flex; align-items: center; padding-left: 0.6rem; height:$searchPartHeight; border-bottom: 1px solid #f0f0f0; background-color: $innerBGC; width: 100%;

        .left-unit{

          display:flex; flex-direction: row;

          .point{
            display:block; width: 0.27rem; height: 0.4rem;
          }
          .stage {
            display:flex; flex-direction: column; justify-content: flex-start; align-items: center; margin-left: 0.16rem;
            background-size: 0.17rem 0.1rem; background-repeat: no-repeat; background-position: center bottom;
            background-image: url(../../assets/images/getInfo/up.jpg);
          }
          .u {
            background-image: url(../../assets/images/getInfo/up.jpg);
          }
          .down {
            background-image: url(../../assets/images/getInfo/down.jpg);
          }
        }
        .right-unit {
          margin-left: 0.66rem;
          .school-input-box{
            box-sizing: border-box; display: block; padding-left: 0.75rem; outline: none; border: 1px solid #d4d4d4; height: 0.52rem; width: 4.8rem; border-radius: 10px; font-size: 0.26rem;
            background-image: url('../../assets/images/getInfo/scope.jpg');
            background-size: 0.24rem 0.24rem; background-position: 0.25rem center; background-repeat: no-repeat;
          }
        }
      }
      .item-part{
        display: flex; justify-content: center; background-color: $innerBGC; height: 80%;

        .item-unit {
          color:#373737; line-height: 0.8rem; text-align: center;


          &.greenblue {
            position: relative;

            &:before {
              content: ""; position: absolute; border-bottom: 0.02rem solid transparent; background: $greenblue; height: .03rem; width: 1rem; margin-left: -0.5rem;
              left: 50%; margin-top: 0.7rem; -webkit-tap-highlight-color: transparent;
            }
          }
        }
        .item-unit:first-child{
          padding-top: .3rem;
        }
        .item-unit:last-child{
          padding-bottom: .3rem;
        }
        .city {
          display:none; margin: 0 auto; overflow: auto; min-width: 50%; flex-grow: 1;
        }
        .area {
          $backColor:rgba(0,0,0,0.03); display: none; margin: 0 auto; background-color: $backColor; overflow: auto; max-width: 50%; flex-grow: 1;
        }

        .show{
          display: block;
        }
      }
      .school{
        display: flex; box-sizing: border-box; position: absolute; /*z-index: -8;*/ top: $searchPartHeight; left: 0; right: 0; bottom: 0; flex-direction: column;

        .user-choice{
          display:flex; align-items: center; padding-left: 0.5rem; height: 0.68rem; color: white; background-color: $greenblue;

          span{
            padding-left: 0.4rem; color: white;
          }
        }
        .types {
          display: flex; flex-direction: row; justify-content: space-around; background: #f1f7f7; height: 0.8rem;

          .item{
            line-height: 0.8rem; flex-grow: 1; text-align: center; position: relative;

            &.active::before{
              content: ""; background: $greenblue; width: 40%; height: .07rem; position: absolute; left: 50%; bottom: 0; margin-left: -20%;
            }
          }
        }

        .types-wrap{
          overflow: hidden; position: absolute; left: 0; right: 0; bottom: 1.04rem; top: 1.48rem;

          .school-list{
            background-color: white; overflow: auto; height: 100%;

            .active{
              .circle-box{
                .out-circle{
                  .inner-circle{
                    display:block !important;
                  }
                }
              }
            }
            .school-unit {
              display: flex; align-items: center; justify-content: space-between; height: 1rem; border-bottom: 1px solid #eeeeee; padding: 0 .5rem;

              .circle-box{
                .out-circle{
                  display: flex; align-items: center; justify-content: center; width: 0.28rem; height: 0.28rem; border: 1px solid #989898; border-radius: 50%;

                  .inner-circle{
                    display:none; width: 0.12rem; height: 0.12rem; background-color: $greenblue; border-radius: 50%;
                  }
                }

              }
            }
          }
        }


        .ok-button {
          width: 100vw; padding: .2rem; position: absolute; bottom: 0px;

          a {
            display: block; margin: 0 auto; width: 2.3rem; height: 0.64rem; text-decoration: none; border-radius: 10px; color: white;
            background-color: $greenblue; text-align: center; line-height: 0.64rem;
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
        currentType: 'primary',
        showSelectWrap: false,
        showCityWrap: true,
        showCountyWrap: false,

        cities: [],
        counties: [],
        temp: {
          city: null,
          school: null,
        },
        selected: {
          city: null,
          county: null,
          school: null,
        },
        schools: {
          primary: [],
          middle: [],
          high: [],
        },
        schoolName:'',
      };
    },
    props: ['options', 'index'],
    computed: {
      cityAndCounty() {
        return this.selected.city && this.selected.county ?
          this.selected.city.name + ' > '+ this.selected.county.name
          : '未选择地区';
      },
      filterPrimary() {
        let vthis = this;
        return this.schools.primary.filter(function (item) {
          return item.name.indexOf(vthis.schoolName) !== -1;
        });
      },
      filterMiddle() {
        var vthis = this;
        return this.schools.middle.filter(function (item) {
          return item.name.indexOf(vthis.schoolName) !== -1;
        });
      },
      filterHigh() {
        var vthis = this;
        return this.schools.high.filter(function (item) {
          return item.name.indexOf(vthis.schoolName) !== -1;
        });
      },
    },
    mounted() {
      this.getConties();
    },
    methods: {
      toggleSelection(flag) {
        if(flag){
          $(document.body).css({
            'height': '100vh',
            'overflow-y': 'hidden'
          });
        } else {
          $(document.body).css({
            'height': 'auto',
            'overflow-y': 'auto'
          });
        }

        this.showSelectWrap = flag;
      },
      selectCity(item, index) {
        this.showCountyWrap = true;
        this.temp.city = item;
        this.counties = this.cities[index].children;
      },
      selectCounty(item, index) {
        this.selected.city = this.temp.city;
        this.selected.county = item;
        this.showCityWrap = false;
        this.getSchools();
      },
      getConties() {
        let vthis = this,
          apiUrl = zzhJs.helpers.routeParser('api.util.city_and_county');

        this.weLoadStart();
        this.$http.get(apiUrl).then(res => {
          this.weLoadEnd();

          let response = res.body;
          vthis.cities = response.data;
        });
      },
      getSchools() {
        let vthis = this,
          apiUrl = zzhJs.helpers.routeParser('api.util.schools');

        this.weLoadStart();
        this.$http.get(apiUrl, {
          params: {
            city: this.selected.city.city_id,
            county: this.selected.county.city_id
          },
        }).then(res => {
          this.weLoadEnd();

          let response = res.body;

          vthis.schools = response.data;
        });
      },
      confirmSchool() {
        this.selected.school = this.temp.school;
        this.toggleSelection(false);
        this.showCityWrap = true;
        this.showCountyWrap = false;

        let data = _.assign(_.clone(this.options), {
          answer: {
            id: this.selected.school.id,
            city_id: this.selected.city.city_id,
            county_id: this.selected.county.city_id,
            text: `${this.selected.city.name}${this.selected.county.name}${this.selected.school.name}`,
          }
        });
        this.$emit('input', this.index, data);
      }
    }
  }
</script>