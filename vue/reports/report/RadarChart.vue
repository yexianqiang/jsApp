<template>
  <div class="radar-chart-rp">
    <p class="title">{{ options.title }}</p>
    <div class="radar"></div>
    <p class="tip">{{ options.tip }}</p>
  </div>
</template>

<style lang="scss">
  .radar-chart-rp {
    background: #fff; margin-bottom: 20px; padding: 20px 20px 0; overflow: hidden;

    .title{ font-size: 14px; font-weight: 500; color: #3bc1c4; text-align: center; }

    .radar {
      width: 100%; height: 250px;
    }

    .tip {
      background: #eafbfe; padding: 10px; border-radius: 4px; margin-bottom: 20px; font-size: 12px;
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
        this.drawRadar();
      }
    },
    mounted() {
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
            radius: 70,
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