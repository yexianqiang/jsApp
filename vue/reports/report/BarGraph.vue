<template>
  <div class="broken-bar-wrap-rp">
    <div class="broken-bar"></div>
    <!--<ul class="left-icon">-->
      <!--<li></li>-->
      <!--<li></li>-->
      <!--<li></li>-->
    <!--</ul>-->
  </div>
</template>

<style lang="scss">
  .broken-bar-wrap-rp {
    position: relative; background: #fff; margin-bottom: 20px;

    .broken-bar {
      width: 100%; height:300px; background: #f7f7f7;
    }

    .left-icon {
      position: absolute; left: 20px; top: 0; width: 38px; height: 100%;

      &>li {
        width: 38px; height: 38px; border-radius: 50%; position: absolute; left: 0;

        &:nth-child(1) {
          top: 100px ; background: #67dadd;
        }
        &:nth-child(2) {
          background: yellow; top: 320px;
        }
        &:nth-child(3) {
          background: red; top: 525px;
        }
      }
    }
  }
</style>
<script>
  import echarts from '../library/echarts.min';

  export default {
    props: ['user_options'],
    computed: {
      options() {
        return this.user_options;
      }
    },
    watch: {
      user_options(val) {
        this.init();
      }
    },
    data() {
      return {
        rangeColors: ['#67dadd','#ffc387','#ff7d7d'],
      };
    },
    mounted(){
      this.init();
    },
    methods: {
      init() {
        let vthis = this,
          fontSize = zzhJs.helpers.calculateFontSize(
            this.options.dimensions
          );

        let myCharts = echarts.init(
          this.$el.getElementsByClassName('broken-bar')[0]
        );

        let titles = [], scores = [];

        for (let item of this.options.dimensions) {
          titles.push(item.title);
          scores.push(item.score);
        }

        let option = {
          title: {
            text: this.options.title,
            textStyle:{
              color:'#3bc1c4',
              fontSize:14
            },
            x:'center',
            y:10,
          },
          tooltip: {},
          grid:{
            top:40,
            right:20,
            left:20,
            bottom:50
          },
          xAxis: {
            data: titles,
            axisLabel:{
              textStyle:{
                fontSize:fontSize
              },
              interval:0,
            },
            axisTick:{
              show:false
            },

          },
          yAxis: {
            axisLine: {
              show:false
            },
            splitLine: {
              lineStyle: {
                type:'solid'
              }
            },
            axisTick: {
              show:false
            },
            axisLabel:{
              show:false
            }

          },
          series: [{
            type: 'bar',
            data: scores,
            barWidth:25,
            label:{
              normal:{
                show:true,
                position:'top',
                textStyle:{
                  fontSize:12,
                  color:'#242424'
                }
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  for (let index in vthis.options.range) {
                    let item = vthis.options.range[index];
                    if (parseInt(param.value) < parseInt(item.max)
                      && parseInt(param.value) >= parseInt(item.min)) {
                      return vthis.rangeColors[index];
                    }
                  }
                }
              }
            }
          }]
        };

        myCharts.setOption(option);
      }
    },
  }
</script>