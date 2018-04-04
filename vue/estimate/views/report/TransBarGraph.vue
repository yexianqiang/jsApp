<template>
  <div class="trans-bar-graph-rp">
    <div class="broken-bar"></div>
    <p class="tip">{{ options.tip }}</p>
  </div>
</template>

<style lang="scss">
  .trans-bar-graph-rp {
    position: relative; background: #fff; margin-bottom: .25rem;

    .broken-bar {
      width: 100%; height: 2.5rem; background: #f7f7f7;
    }

    .tip {
      font-size: 0.2rem !important;color: #33aaaa; padding: .2rem !important; line-height: .4rem;background: rgba(51, 170, 170, 0.04);
      margin: .3rem;color: #33aaaa;margin-bottom: .2rem;border-radius: .11rem; text-align: left !important;
    }
  }
</style>
<script>
  import echarts from '../../library/echarts.min';

  export default {
    props: ['options'],
    watch: {
      options(val) {
        this.draw();
      }
    },
    data() {
      return {
        rangeColors: ['#67dadd','#ffc387','#ff7d7d'],
        chartInc: null,
      };
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw() {
        let vthis = this,
          fontSize = zzhJs.helpers.calculateFontSize(this.options.dimensions);

        if (this.chartInc) {
          this.chartInc.des
        }

        this.chartInc = echarts.init(this.$el.getElementsByClassName('broken-bar')[0]);
        let titles = [], scores = [];
        for (let item of this.options.dimensions) {
          titles.push(item.title);
          scores.push(item.score);
        }
        let option = {
          title: {
            text: this.options.title,
            textStyle:{
              color:'#3bc1c4',
              fontSize:14
            },
            x:'center',
            y:10,
          },
          tooltip: {},
          grid: {
            top: 40,
            right: 30,
            left: 30,
            bottom: 30
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              lineStyle: {
                type:'solid'
              }
            },
            axisTick: {
              show:false
            },
            axisLabel:{
              show: true,
            },
            min: parseInt(this.options.min),
            max: parseInt(this.options.max),
            interval: parseInt(this.options.interval),
          },
          yAxis: {
            type: 'category',
            data: titles,
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
          series: [{
            type: 'bar',
            data: scores,
            barWidth: 20,
            label: {
              normal: {
                show:true,
                position:'top',
                textStyle:{
                  fontSize:12,
                  color:'#242424'
                }
              }
            },
            itemStyle: {
              normal: {
                color: function (param) {
                  for (let index in vthis.options.range) {
                    let item = vthis.options.range[index];
                    if (parseInt(param.value) < parseInt(item.max)
                      && parseInt(param.value) >= parseInt(item.min)) {
                      return vthis.rangeColors[index];
                    }
                  }
                }
              }
            }
          }]
        };
        this.chartInc.setOption(option);
      }
    },
  }
</script>