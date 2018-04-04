<template>
  <div class="bl-pic-wrap-rp">
    <div class="bl-wrap"></div>
  </div>
</template>
<style lang="scss">
  .bl-pic-wrap-rp {
    margin-bottom: 20px; background: #fff;

    .bl-wrap{
      width: 100%; height: 350px;
    }
  }
</style>
<script>
  import echarts from '../library/echarts.min';

  export default {
    mounted() {
      this.init()
    },
    data() {
      return {
        rangeColors: ['#67dadd','#ffc387','#ff7d7d'],
      };
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
          textStyle: {
            fontSize: 12
          },
        };

        let seriesTpl = {
          barWidth:25,
          itemStyle: {
            normal: {
              color:'#f79746'
            }
          }
        };

        for (let i in this.options.collections) {
          let item = this.options.collections[i];

          let points = [];

          for (let j in item.data) {
            points.push({
              name: item.data[j].title,
              value: item.data[j].score,
            });
          }

          legend.push(_.assign(_.clone(legendTpl), {
            name: item.title,
          }));

          series.push(_.assign(_.clone(seriesTpl), {
            name: item.title,
            type: item.type,
            data: item.data,
            itemStyle:{
              normal:{
                color: this.rangeColors[i]
              }
            }
          }));
        }

        return { legend, series };
      },
      init() {
        let fontSize = zzhJs.helpers.calculateFontSize(
          this.options.dimensions.length
        );

        let myCharts = echarts.init(
          this.$el.getElementsByClassName('bl-wrap')[0]
        );

        let { legend, series } = this.generateSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle: {
              color: '#3bc1c4',
              fontSize: 14,
            },
            x: 'center',
            y:30,
          },
          tooltip: {},
          legend: {
            top:65,
            data: legend
          },
          grid: {
            top:110,
            right:38,
            left:35,
            bottom:50
          },
          xAxis: {
            data: this.options.dimensions,
            axisLabel: {
              textStyle:{
                fontSize:fontSize
              },
              interval:0,
            },
            axisTick: {
              show:false
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
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
              show: true,
              textStyle: {
                fontSize: 12
              }
            }
          },
          series: series
        };

        myCharts.setOption(option);
      }
    }
  }
</script>