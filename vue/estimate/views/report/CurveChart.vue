<template>
  <div class="curve-chart-wrap-rp">
    <div class="broken-line2"></div>
  </div>

</template>
<style lang="scss">
  .curve-chart-wrap-rp {
    background: #fff; padding-top: 0.3rem; margin-bottom: 0.25rem;

    .broken-line2 {
      width: 100%; box-sizing: border-box; height: 5rem;
    }
  }
</style>
<script>
  import echarts from '../../library/echarts.min'

  export default {
    props: ['options'],
    mounted() {
      this.init();
    },
    watch: {
      options(val) {
        this.init();
      }
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

        let count = 0;
        for (let i in this.options.dimensions) {
          count++;
        }

        let fontSize = zzhJs.helpers.calculateFontSize(count);

        let myBarLineChart = echarts.init(
          this.$el.getElementsByClassName('broken-line2')[0]
        );

        let { titles, scores } = this.generSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle: {
              fontSize: zzhJs.rem.convert(0.32),
              color: '#3bc1c4'
            },
            x: 'center',
            y: 'top'
          },
          grid: {
            show: true,
            backgroundColor: '#f2f9f5',
            top: zzhJs.rem.convert(1.5),
            right: zzhJs.rem.convert(0.7),
            left: zzhJs.rem.convert(0.9),
            bottom: zzhJs.rem.convert(1),
            borderWidth: 0
          },
          tooltip: {
            textStyle:{
              fontSize:zzhJs.rem.convert(0.2)
            }
          },
          legend: {
            top: zzhJs.rem.convert(0.6),
            orient:'vertical',
            data: [
              {
                name: this.options.legend,
                textStyle: {
                  color: '#26cbcf',
                  fontSize: zzhJs.rem.convert(0.22)
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
              textStyle: {fontSize: zzhJs.rem.convert(fontSize)},
              interval: 0
            },
            data: titles,
            type: 'category'
          },
          yAxis: {
            interval: parseInt(this.options.config.interval),
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
                fontSize: zzhJs.rem.convert(fontSize),
                interval: 0
              }
            },
            type:'value',
            min: this.options.config.min,
            max: this.options.config.max
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
                  width: zzhJs.rem.convert(0.03),
                }
              },
              symbolSize: zzhJs.rem.convert(0.06),
              smooth:true
            },
          ],
        };

        myBarLineChart.setOption(option);
      }
    },
  }
</script>