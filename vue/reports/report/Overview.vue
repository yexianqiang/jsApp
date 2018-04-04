<template>
  <div class="radar-page-wrap-rp">
    <div class="radar-page">
      <div class="circle"></div>
      <div class="radar"></div>
    </div>
  </div>
</template>

<style lang="scss">
  .radar-page-wrap-rp {
    background: #fff; margin-bottom: 20px;

    .radar-page {
      width: 100%; position: relative; display: flex; justify-content: space-around;

      .circle {
        width: 120px; height: 220px;
      }
      .radar {
        width: 200px; height: 220px;
      }
    }
    .remark {
      width: 320px; margin: 0 auto; box-sizing: border-box; padding:15px 30px 15px; background: #50c9cb; font-size: 14px;
      color: #fff; line-height: 30px; border-radius: 6px;
      margin-bottom: 10px;
    }
    .remark-title {
      width: 320px; margin: 0 auto; box-sizing: border-box; font-size: 14px; color: #50c9cb; line-height: 25px; text-align: center; font-weight: bold;
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
        this.drawCircle();
        this.drawRadar();
      }
    },
    mounted() {
      this.drawCircle();
      this.drawRadar();
    },
    methods: {
      calculateRadar() {
        // 循环生成数据
        let indicator = [], scores = [];

        for (let i in this.options.dimensions) {
          let item = this.options.dimensions[i];
          indicator.push({name: item.title, max: 100});
          scores.push(item.score);
        }

        return { indicator, scores };
      },
      drawCircle() {

        // 绘制表盘
        let myCharts2 = echarts.init(this.$el.getElementsByClassName('circle')[0]);

        // 上层样式
        let labelTop = {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#21c9cb'
              }, {
                offset: 1, color: '#a2ded6'
              }],
              globalCoord: false
            },
            label: {
              show: true,
              position: 'center',
              formatter: '{b}',
              textStyle: {
                baseline: 'top',
                fontSize: 12,
                color: "#01c3c7"
              }
            }
          },
          labelLine: {show: false},
        };

        // 底层样式
        let labelBottom = {
          normal: {
            color: '#F2F2F2',
            label: {
              show: true,
              position: 'center',
              fontSize: 12
            },
            labelLine: {
              show: false
            }
          }
        };

        let option2 = {
          title: {
            text: '本次测评总得分',
            textStyle: {
              color: '#039fa2',
              fontSize: 14
            },
            x: 'center',
            y: 20
          },
          series: [
            {
              type: 'pie',
              center: ['50%','50%'],
              radius: [40,50], // 半径[内半径，外半径]
              x:'0%',
              itemStyle: labelTop,
              data:[{
                name: '总得分',
                value: this.options.total,
                itemStyle: labelTop
              }, {
                name: this.options.total,
                value: this.options.highest - this.options.total,
                itemStyle: labelBottom
              }]
            }
          ]
        };

        myCharts2.setOption(option2)
      },
      drawRadar() {
        // 绘制雷达图
        let myCharts = echarts.init(
          this.$el.getElementsByClassName('radar')[0]
        );

        let {indicator, scores} = this.calculateRadar();

        let option = {
          title: {
            text: '',
            textStyle: {
              color: '#3bc1c4',
              fontSize: 12,
            },
            x: 'center',
            y: 25,
          },
          tooltip: {},
          radar: {
            indicator: indicator,
            radius: 40,
            splitArea: {
              areaStyle:{color: '#FFF'}
            },
            name: {
              textStyle: {
                color: '#2dcccd',
                fontSize: 10
              }
            }
          },
          series: [{
            type: 'radar',
            symbolSize: 3,
            itemStyle: {
              normal: {
                color: 'rgba(187,255,255, 0.8)',
                borderWidth: 2,
                borderColor: '#2dcccd',
                areaStyle: {type: 'default'}
              }
            },
            lineStyle: {
              normal: {
                color: '#2dcccd',
                width: 2
              }
            },
            data: [{
              value: scores,
              name: '维度分数'
            }]
          }]
        };

        myCharts.setOption(option);
      }
    }
  }
</script>