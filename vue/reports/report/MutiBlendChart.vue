<template>
  <div class="bl-pic-wrap2-rp">
    <div class="bl-wrap2"></div>
  </div>
</template>
<style lang="scss">
  .bl-pic-wrap2-rp {
    background: #fff; margin-bottom: 20px;

    .bl-wrap2 {
      width: 100%; height: 350px; padding-top: 10px;
    }
  }
</style>
<script>
  import echarts from '../library/echarts.min'

  export default {
    data() {
      return {
        rangeColors: ['#67dadd','#ffc387','#ff7d7d'],
      };
    },
    mounted() {
      this.init()
    },
    props: ['user_options'],
    watch: {
      user_options(val) {
        this.init();
      }
    },
    computed: {
      options() {
        return this.user_options;
      }
    },
    methods: {
      generateSeries() {
        let legend = [], series = [];

        let legendTpl = {
          name: '社会支持',
          textStyle: {
            fontSize: 12
          },
        };

        let seriesTpl = {
          barWidth: 15,
//          barGap:0
        };

        for (let i in this.options.collections) {
          let item = this.options.collections[i];

          for(let j in item.data){
            let unit = item.data[j];

            legend.push(_.assign(_.clone(legendTpl), {
              name: unit.title,
            }));

            series.push(_.assign(_.clone(seriesTpl), {
              name: unit.title,
              type: item.type,
              data: unit.data,
              itemStyle:{
                normal:{
                  color: this.rangeColors[j]
                }
              }
            }));
          }
        }

        return { legend, series };
      },
      init() {
        let fontSize = zzhJs.helpers.calculateFontSize(
          this.options.dimensions.length
        );

        let myCharts = echarts.init(
          this.$el.getElementsByClassName('bl-wrap2')[0]
        );

        let { legend, series } = this.generateSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle:{
              color:'#3bc1c4',
              fontSize:14
            },
            x:'center',
            y:2,
          },
          tooltip: {},
          legend: {
            top:25,
            right:15,
            left:15,
//            itemGap:10,
            data:legend,
//            itemGap:20
          },
          grid:{
            top:110,
            right:38,
            left:35,
            bottom:50
          },
          xAxis: {
            data: this.options.dimensions,
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
          yAxis: [
            {
              type:'value',
              axisLine:{
                show:false
              },
              min: this.options.config.min,
              max: this.options.config.max,
              interval: this.options.config.interval,
              splitLine: {
                lineStyle: {
                  type:'solid'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show:true,
                textStyle:{
                  fontSize:12
                }
              }
            }
          ],
          series:series
        };

        myCharts.setOption(option);
      }
    }
  }


</script>