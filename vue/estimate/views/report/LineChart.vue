<template>
  <div class="broken-line3-wrap-rp">
    <div class="broken-line3"></div>
  </div>
</template>

<style lang="scss">
  .broken-line3-wrap-rp {
    background: #fff; padding-top: 0.3rem; margin-bottom: 0.25rem;

    .broken-line3 {
      width: 100%; height: 6rem;
    }
  }
</style>

<script>
  import echarts from '../../library/echarts.min'

  export default {
    props: ['options'],
    watch: {
      options(val) {
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

        let count = 0;
        for(let i in this.options.dimensions){
          count++;
        }

        var fontSize = zzhJs.helpers.calculateFontSize(
          count
        );

        let myBarLineChart = echarts.init(
          this.$el.getElementsByClassName('broken-line3')[0]
        );

        let { titles, scores } = this.generSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle:{
              fontSize:zzhJs.rem.convert( 0.28 ),
              color:'#3bc1c4'
            },
            left:'center',
            y:'top'
          },
          grid: {
            show:true,
            backgroundColor:'#f2f9f5',
            top:zzhJs.rem.convert(1.2),
            right:zzhJs.rem.convert(0.7),
            left:zzhJs.rem.convert(0.9),
            bottom:zzhJs.rem.convert(1)
          },
          tooltip: {
            textStyle:{
              fontSize:zzhJs.rem.convert(0.2)
            }
          },
          legend: {
            top:zzhJs.rem.convert(0.45),
            orient:'vertical',
            left:'center',
            data:[
              {
                name:'维度平均分',
                textStyle:{
                  color:'#26cbcf',
                  fontSize:zzhJs.rem.convert(0.22)
                },
              }
            ]
          },
          xAxis: {
            splitLine:{
              show:false,
              lineStyle:{
                color:'#baf0d6',
                width:zzhJs.rem.convert(0.01)
              }
            },
            axisTick:{
              show:false
            },
            axisLine:{
              show:false
            },
            data: titles,
            axisLabel:{
              show:true,
              textStyle:{
                fontSize:zzhJs.rem.convert(fontSize)
              },
              interval:0
            },
            type:'category',
          },
          yAxis: {
            interval: parseInt(this.options.config.interval),
            min: this.options.config.min,
            max: this.options.config.max,
            splitLine: {
              lineStyle: {
                color:['#baf0d6','#e79a52','red','#baf0d6','#baf0d6'],
                width:zzhJs.rem.convert(0.02)
              }
            },
            axisTick: {
              show:false
            },
            axisLine: {
              show:false,
            },
            axisLabel: {
              show:true,
              textStyle:{
                fontSize:zzhJs.rem.convert(fontSize),
              },
              interval:0
            },
            type:'value',
          },
          series: [
            {
              name: '各维度平均分',
              type: 'line',
              data: scores,
              itemStyle: {
                normal: {
                  color:'#26cbcf',
                  lineStyle:{
                    normal:{
                      color:'#26cbcf'
                    }
                  },
                }
              },
              label: {
                normal: {
                  show:false,
                }
              },
              lineStyle: {
                normal: {
                  width:zzhJs.rem.convert(0.03),
                }
              },
              symbolSize:zzhJs.rem.convert(0.06),
              smooth:true,
            }
          ],
        };

        myBarLineChart.setOption(option);
      }
    },
  }
</script>