<template>
  <div class="radar-chart-rp">
    <p class="title">{{ options.title }}</p>
    <div class="radar"></div>
    <p class="tip">{{ options.tip }}</p>
  </div>
</template>

<style lang="scss">
  .radar-chart-rp {
    background: #fff;margin-bottom: .25rem;padding: .4rem .2rem 0; overflow: hidden;

    .title{ font-size: .3rem; font-weight: 700; color: #3bc1c4; text-align: center; }

    .radar {
      width: 100%; height: 250px;
    }

    .tip {
      font-size: 0.25rem !important; padding-top: 0 !important; color: #33aaaa;padding: .2rem !important;
      line-height: .4rem;background: rgba(51, 170, 170, 0.04);margin: .3rem;color: #33aaaa;
      margin-bottom: .2rem;border-radius: .11rem; text-align: left !important;
    }
  }
</style>

<script>
  import echarts from '../../library/echarts.min';

  export default {
    props: ['options'],
    watch: {
      options(val) {
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
                fontSize: zzhJs.rem.convert(0.28)
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