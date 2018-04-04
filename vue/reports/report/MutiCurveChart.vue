<template>
  <div class="broken-line1-wrap-rp">
    <div class="broken-line"></div>
  </div>

</template>
<style lang="scss">
  .broken-line1-wrap-rp {
    background: #fff; box-sizing: border-box; margin-bottom: 20px;
    .broken-line {
      width: 100%; height: 350px;
    }
  }
</style>
<script>
  import echarts from '../library/echarts.min';

  export default {
    data() {
      return {
        colorList: ['#67dadd','#ffc387','#ff7d7d','#ff1318'],
      };
    },
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
    mounted() {
        this.init();
    },
    methods: {
      generateSeries() {
        let legend = [], series = [];

        let itemTemp = {
          type: 'line',
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: 12,
              },
              formatter: '{c}'
            }
          },
          symbolSize: 4,
          lineStyle: {
            normal: {
              width:2,
            }
          },
          smooth: true
        };

        for (let i in this.options.series) {
          let item = this.options.series[i];

          let points = [];

          for (let j in item.data) {
            points.push({
              name: this.options.dimensions[j],
              value: item.data[j],
            });
          }

          legend.push({
            name: item.title,
            textStyle:{
              color: this.colorList[i],
              fontSize: 8
            },
          });

          let seriesItem = {
            name: item.title,
            data: points,
            itemStyle: {
              normal:{
                color: this.colorList[i],
                lineStyle:{
                  normal:{
                    color: this.colorList[i]
                  }
                },
              }
            }
          };

          seriesItem = _.assign(
            _.clone(itemTemp),
            seriesItem
          );

          series.push(seriesItem);
        }

        return { legend, series };
      },
      init() {

        let myBarLineChart = echarts.init(
          this.$el.getElementsByClassName('broken-line')[0]
        );

        let { legend, series } = this.generateSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle: {
              fontSize: 14,
              color: '#3bc1c4'
            },
            x: 'center',
            y:10
          },
          grid: {
            show: true,
            backgroundColor: '#f2f9f5',
            top: 100,
            right: 20,
            left: 30,
            bottom: 60,
            borderWidth: 0,
          },
          tooltip: {},
          legend: {
            type: 'scroll',
            top: 35,
            orient: 'vertical',
            data: legend,
          },
          xAxis: {
            splitLine: {
              show: false,
              lineStyle: {
                color: '#baf0d6',
                width: 1
              }
            },
            type: 'category',
            data: this.options.dimensions,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 8
              },
              interval: 0
            },
            axisTick: {show: false},
            axisLine: {show: false},
          },
          yAxis: {
            splitLine: {
              show: false,
              lineStyle: {color: '#baf0d6', width: 1}
            },
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 8,
                interval: 0
              }
            },
            axisTick: {show:false},
            axisLine: {show:false},
            interval: parseInt(this.options.config.interval),
            min: parseInt(this.options.config.min),
            max: parseInt(this.options.config.max),
          },
          series: series,
        };

        myBarLineChart.setOption(option);
      }
    },
  }
</script>