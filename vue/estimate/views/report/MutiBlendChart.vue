<template>
  <div class="bl-pic-wrap2-rp">
    <div class="bl-wrap2"></div>
  </div>
</template>
<style lang="scss">
  .bl-pic-wrap2-rp {
    background: #fff;

    .bl-wrap2 {
      width: 100%; height: 6rem;
    }
  }
</style>
<script>
  import echarts from '../../library/echarts.min'

  export default{
    data() {
      return {
        rangeColors: ['#67dadd','#ffc387','#ff7d7d'],
      };
    },
    mounted() {
      this.init()
    },
    watch: {
      options(val) {
        this.init();
      }
    },
    props:['options'],
    methods: {
      generateSeries() {
        let legend = [], series = [];

        let legendTpl = {
          name: '社会支持',
          textStyle: {
            fontSize: zzhJs.rem.convert(0.2)
          },
        };

        let seriesTpl = {
          barWidth: zzhJs.rem.convert(0.24),
//          barGap:0
        };

        for (let i in this.options.collections) {
          let item = this.options.collections[i];

          for(let j in item.data){
            let unit = item.data[j];

            legend.push(_.assign(_.clone(legendTpl), {
              name: unit.title,
            }));

            series.push(_.assign(_.clone(seriesTpl), {
              name: unit.title,
              type: item.type,
              data: unit.data,
              itemStyle:{
                normal:{
                  color: this.rangeColors[j]
                }
              }
            }));
          }
        }

        return { legend, series };
      },
      init() {
        let fontSize = zzhJs.helpers.calculateFontSize(
          this.options.dimensions.length
        );

        let myCharts = echarts.init(
          this.$el.getElementsByClassName('bl-wrap2')[0]
        );

        let { legend, series } = this.generateSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle:{
              color:'#3bc1c4',
              fontSize:zzhJs.rem.convert(0.3)
            },
            x:'center',
            y:zzhJs.rem.convert(0.3),
          },
          tooltip: {
            textStyle:{
              fontSize:zzhJs.rem.convert(0.2)
            }
          },
          legend: {
            top: zzhJs.rem.convert(0.9),
            left: zzhJs.rem.convert(0.9),
            right: zzhJs.rem.convert(0.9),
            itemGap: zzhJs.rem.convert(0.2),
            data:legend,
          },
          grid:{
            top:zzhJs.rem.convert(1.8),
            right:zzhJs.rem.convert(0.7),
            left:zzhJs.rem.convert(0.9),
            bottom:zzhJs.rem.convert(1)
          },
          xAxis: {
            data: this.options.dimensions,
            axisLabel:{
              textStyle:{
                fontSize:zzhJs.rem.convert(fontSize)
              },
              interval:0,
            },
            axisTick:{
              show:false
            },

          },
          yAxis: [
            {
              type:'value',
              axisLine:{
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
                show:true,
                textStyle:{
                  fontSize:zzhJs.rem.convert(0.2)
                }
              }
            }
          ],
          series:series
        };

        myCharts.setOption(option);
      }
    }
  }
</script>