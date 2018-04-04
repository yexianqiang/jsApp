<template>
  <div class="bl-pic-wrap">
    <div class="bl-wrap"></div>
  </div>
</template>
<style lang="scss">
    .bl-pic-wrap {
      margin-bottom: 0.25rem; background: #fff;

      .bl-wrap{
        width: 100%; height: 6rem;
      }
    }
</style>
<script>
  import echarts from '../../library/echarts.min';

  export default {
    data() {
      return {
        rangeColors: ['#67dadd','#ffc387','#ff7d7d'],
      };
    },
    props:['options'],
    watch: {
      options(val) {
        this.init();
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      generateSeries() {
        let legend = [], series = [];

        let legendTpl = {
          textStyle: {
            fontSize: zzhJs.rem.convert(0.22)
          },
        };

        let seriesTpl = {
          barWidth:zzhJs.rem.convert(0.4),
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
                color:this.rangeColors[i]
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
              fontSize: zzhJs.rem.convert(0.3),
            },
            x: 'center',
            y: zzhJs.rem.convert(0.3),
          },
          tooltip: {
            textStyle:{
              fontSize:zzhJs.rem.convert(0.2)
            }
          },
          legend: {
            top: zzhJs.rem.convert(0.9),
            data: legend
          },
          grid: {
            top: zzhJs.rem.convert(1.5),
            right: zzhJs.rem.convert(0.7),
            left: zzhJs.rem.convert(0.9),
            bottom: zzhJs.rem.convert(1)
          },
          xAxis: {
            data: this.options.dimensions,
            axisLabel: {
              textStyle:{
                fontSize:zzhJs.rem.convert(fontSize)
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
            interval: parseInt(this.options.config.interval),
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
                fontSize: zzhJs.rem.convert(0.2)
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