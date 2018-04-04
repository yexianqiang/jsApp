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
    background: #fff; margin-bottom: 0.25rem;

    .radar-page {
      width: 100%; position: relative; display: flex; justify-content: space-around;

      .circle {
        width: 2.6rem; height: 4.4rem;
      }
      .radar {
        width: 4.8rem; height: 4.4rem;
      }
    }
  }
</style>

<script>
  import echarts from '../../library/echarts.min';

  export default {
    props: ['options'],
    mounted() {
      this.drawCircle();
      this.drawRadar();
    },
    watch: {
      options(val) {
        this.drawCircle();
        this.drawRadar();
      }
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
        let myCharts2 = echarts.init(
          this.$el.getElementsByClassName('circle')[0]
        );

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
                fontSize: zzhJs.rem.convert(0.32),
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
              fontSize: zzhJs.rem.convert(0.22)
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
              fontSize: zzhJs.rem.convert(0.26)
            },
            x: 'center',
            y: 40
          },
          series: [
            {
              type: 'pie',
              center: ['50%','50%'],
              radius: [zzhJs.rem.convert(0.8), zzhJs.rem.convert(0.9)], // 半径[内半径，外半径]
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
              fontSize: zzhJs.rem.convert(0.26),
            },
            x: 'center',
            y: zzhJs.rem.convert(0.25),
          },
          tooltip: {
            textStyle:{
              fontSize:zzhJs.rem.convert(0.2)
            }
          },
          radar: {
            indicator: indicator,
            radius: zzhJs.rem.convert(1.1),
            splitArea: {
              areaStyle:{color: '#FFF'}
            },
            name: {
              textStyle: {
                color: '#2dcccd',
                fontSize: zzhJs.rem.convert(0.18)
              }
            }
          },
          series: [{
            type: 'radar',
            symbolSize: zzhJs.rem.convert(0.05),
            itemStyle: {
              normal: {
                color: 'rgba(187,255,255, 0.8)',
                borderWidth: zzhJs.rem.convert(0.02),
                borderColor: '#2dcccd',
                areaStyle: {type: 'default'}
              }
            },
            lineStyle: {
              normal: {
                color: '#2dcccd',
                width: zzhJs.rem.convert(0.02)
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