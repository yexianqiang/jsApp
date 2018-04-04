<template>
  <div class="broken-line3-wrap-rp">
    <div class="broken-line3"></div>
  </div>
</template>

<style lang="scss">
  .broken-line3-wrap-rp {
    background: #fff; margin-bottom: 20px;

    .broken-line3 {
      width: 100%; height: 350px;
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
        this.initData();
      }
    },
    mounted() {
      this.initData();
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
      initData() {
        var fontSize = zzhJs.helpers.calculateFontSize(
          this.options.dimensions.length
        );

        let myBarLineChart = echarts.init(
          this.$el.getElementsByClassName('broken-line3')[0]
        );

        let { titles, scores } = this.generSeries();

        let option = {
          title: {
            text: this.options.title,
            textStyle:{
              fontSize:14,
              color:'#3bc1c4'
            },
            left:'center',
            y:20
          },
          grid: {
            show:true,
            backgroundColor:'#f2f9f5',
            top:85,
            right:20,
            left:30,
            bottom:60,
            borderWidth:0,
          },
          tooltip: {},
          legend: {
            top:50,
            orient:'vertical',
            left:'center',
            data:[
              {
                name:'维度平均分',
                textStyle:{
                  color:'#26cbcf',
                  fontSize:12
                },
              }
            ]
          },
          xAxis: {
            splitLine:{
              show:false,
              lineStyle:{
                color:'#baf0d6',
                width:1
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
                fontSize:fontSize
              },
              interval:0
            },
            type:'category',
          },
          yAxis: {
            interval: this.options.config.interval,
            min: this.options.config.min,
            max: this.options.config.max,
            splitLine: {
              lineStyle: {
                color:['#baf0d6','#e79a52','red','#baf0d6','#baf0d6'],
                width:2
              }
            },
            axisTick: {
              show:false
            },
            axisLine: {
              show:false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: fontSize,
              },
              interval: 0
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
                  width:2,
                }
              },
              symbolSize:zzhJs.rem.convert(0.06),
              smooth:true,
            }
          ],
        };

        myBarLineChart.setOption(option);
      }
    }
  }

</script>