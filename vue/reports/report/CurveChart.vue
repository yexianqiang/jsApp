<template>
  <div class="curve-chart-wrap-rp">
    <div class="broken-line2"></div>
  </div>

</template>
<style lang="scss">
  .curve-chart-wrap-rp {
    background: #fff; margin-bottom: 20px;

    .broken-line2{
      width: 100%; box-sizing: border-box; height: 350px;
    }
  }

</style>
<script>
  import echarts from '../library/echarts.min'

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
    mounted() {
      this.init();
    },
    methods: {
      generSeries() {
        let titles = [], scores = [];

        for (let i in this.options.dimensions) {
          let item = this.options.dimensions[i];
          titles.push(item.title);
          scores.push(item.score);
        }

        return { titles, scores };
      },
      init() {
        let fontSize = 6;

        let myBarLineChart = echarts.init(
          this.$el.getElementsByClassName('broken-line2')[0]
        );

        let { titles, scores } = this.generSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle: {
              fontSize: 14,
              color: '#3bc1c4'
            },
            x: 'center',
            y: 20
          },
          grid: {
            show: true,
            backgroundColor: '#f2f9f5',
            top:85,
            right:20,
            left:30,
            bottom:60,
            borderWidth:0
          },
          tooltip: {},
          legend: {
            top:55,
            orient:'vertical',
            data: [
              {
                name: this.options.legend,
                textStyle: {
                  color: '#26cbcf',
                  fontSize: 12
                },
              }
            ],
          },
          xAxis: {
            splitLine: {
              show: false,
              lineStyle: {
                color: '#baf0d6',
                width: 1
              }
            },
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {
              show: true,
              textStyle: {fontSize: 12},
              interval: 0
            },
            data: titles,
            type: 'category'
          },
          yAxis: {
            interval: this.options.config.interval,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#baf0d6',
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: fontSize,
                interval: 0
              }
            },
            type:'value',
            min: this.options.config.min,
            max: this.options.config.max,
            interval: this.options.config.interval
          },
          series: [
            {
              name: this.options.legend,
              type: 'line',
              data: scores,
              itemStyle: {
                normal: {
                  color:'#26cbcf',
                  lineStyle: {
                    normal: {
                      color:'#26cbcf'
                    }
                  },
                }
              },
              label: {
                normal: {
                  show: false,
                  formatter: '{c}'
                }
              },
              lineStyle: {
                normal: {
                  width: 2,
                }
              },
              symbolSize: 4,
              smooth: true
            },
          ],
        };

        myBarLineChart.setOption(option);
      }
    },
  }

</script>