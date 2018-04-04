<template>
  <div class="broken-line1-wrap-rp">
    <div class="broken-line"></div>
  </div>

</template>
<style lang="scss">
  .broken-line1-wrap-rp {
    background: #fff; box-sizing: border-box; padding-top: 0.3rem; margin-bottom: 0.25rem;

    .broken-line {
      width: 100%; height: 6rem;
    }
  }
</style>
<script>
  import echarts from '../../library/echarts.min';

  export default {
    data() {
      return {
        colorList: ['#67dadd','#ffc387','#ff7d7d','#ff0a05'],
        chartInc: null,
      };
    },
    props: ['options'],
    mounted() {
        this.init();
    },
    watch: {
      options(val) {
        if (this.chartInc) {
          this.chartInc.clear();
        }

        this.init();
      }
    },
    methods: {
      getDeviceInfo(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //苹果端
          return 'iphone';
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //安卓端
          return 'android'
        }
      },
      setGridTop(){
        let { legend, series } = this.generateSeries();

        let _top = 1.5,top;
        if(series.length>1){
          top = 1.5 + (series.length - 1) * 0.2;
        }else {
          top = 1.5;
        }
        return top;
      },
      generateSeries() {
        let legend = [], series = [];

        let itemTemp = {
          type: 'line',
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: zzhJs.rem.convert(0.16),
              },
              formatter: '{c}'
            }
          },
          symbolSize: zzhJs.rem.convert(0.06),
          lineStyle: {
            normal: {
              width:zzhJs.rem.convert(0.03),
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

          if(this.getDeviceInfo() == 'iphone'){
            legend.push({
              name: item.title,
              textStyle:{
                color: this.colorList[i],
                fontSize:zzhJs.rem.convert(0.22)
              }
            });
          }else {
            legend.push({
            name: item.title,
            textStyle:{
              color: this.colorList[i],
              fontSize:zzhJs.rem.convert(0.14)
            },
          });
          }

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

        let fontSize = zzhJs.helpers.calculateFontSize(
          this.options.dimensions.length
        );

        let chartInc = echarts.init(
          this.$el.getElementsByClassName('broken-line')[0]
        );

        let { legend, series } = this.generateSeries();
        let option = {
          title: {
            text: this.options.title,
            textStyle: {
              fontSize: zzhJs.rem.convert(0.3),
              color: '#3bc1c4'
            },
            x: 'center',
            y: 'top'
          },
          grid: {
            show: true,
            backgroundColor: '#f2f9f5',
//            top: zzhJs.rem.convert(1.5),
            top: zzhJs.rem.convert(this.setGridTop()),
            right: zzhJs.rem.convert(0.7),
            left: zzhJs.rem.convert(0.9),
            bottom: zzhJs.rem.convert(1),
            borderWidth: 0,
          },
          tooltip: {
            textStyle:{
              fontSize:zzhJs.rem.convert(0.2)
            }
          },
          legend: {
            top: zzhJs.rem.convert(0.55),
            orient: 'vertical',
            data: legend,
            itemGap:this.getDeviceInfo() == 'iphone' ? zzhJs.rem.convert(0.15) : zzhJs.rem.convert(0.04),
            itemWidth:zzhJs.rem.convert(0.3),
            itemHeight:zzhJs.rem.convert(0.18)
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
                fontSize: zzhJs.rem.convert(fontSize)
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
                fontSize: zzhJs.rem.convert(fontSize),
                interval: 0
              }
            },
            axisTick: {show:false},
            axisLine: {show:false},
            min: this.options.config.min,
            max: this.options.config.max,
            interval: parseInt(this.options.config.interval),
          },
          series: series,
        };

        chartInc.setOption(option, true);

        this.chartInc = chartInc;
      }
    },
  }
</script>