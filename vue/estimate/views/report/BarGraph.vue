<template>
  <div class="broken-bar-wrap-rp">
    <div class="broken-bar"></div>
    <ul class="left-icon">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="scss">
  .broken-bar-wrap-rp {
    position: relative; background: #fff; margin-bottom: 0.25rem;

    .broken-bar {
      width: 100%; height:4.4rem; background: #f7f7f7;
    }

    .left-icon {
      position: absolute; left: 0.4rem; top: 0; width: 0.38rem; height: 100%;

      &>li {
        width: 0.38rem; height: 0.38rem; border-radius: 50%; position: absolute; left: 0;background: url(../../assets/images/report/left-icon/icon_tip.png) no-repeat;background-size: 100%;

        &:nth-child(1) {
          top: 1.2rem ;
          background-position: 0 0;
        }
        &:nth-child(2) {
          top: 2.1rem;
          background-position: 0 -0.53rem;
        }
        &:nth-child(3) {
          top: 3rem;
          background-position: 0 -1rem;
        }
      }
    }
  }
</style>
<script>
  import echarts from '../../library/echarts.min'

  export default {
    props: ['options'],
    data() {
      return {
        rangeColors: ['#67dadd','#ffc387','#ff7d7d'],
      };
    },
    mounted(){
      this.init();
    },
    watch: {
      options(val) {
        this.init();
      }
    },
    methods: {
      init() {
        let vthis = this,
          fontSize = zzhJs.helpers.calculateFontSize(
            this.options.dimensions.length
          );

        let myCharts = echarts.init(
          this.$el.getElementsByClassName('broken-bar')[0]
        );

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
          grid:{
            top:zzhJs.rem.convert(1.2),
            right:zzhJs.rem.convert(0.7),
            left:zzhJs.rem.convert(0.9),
            bottom:zzhJs.rem.convert(1)
          },
          xAxis: {
            data: titles,
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
          yAxis: {
            axisLine: {
              show:false
            },
            splitLine: {
              lineStyle: {
                type:'solid',
                color:'#efefef',
                width:0.5
              }
            },
            axisTick: {
              show:false
            },
            axisLabel:{
              show:false
            },
            min:0,
            max:100

          },
          series: [{
            type: 'bar',
            data: scores,
            barWidth:zzhJs.rem.convert(0.4),
            label:{
              normal:{
                show:true,
                position:'top',
                textStyle:{
                  fontSize:zzhJs.rem.convert(0.2),
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
                      && parseInt(param.value) >= parseInt(item.min)
                    ) {
                      return vthis.rangeColors[index];
                    }
                  }
                }
              }
            }
          }]
        };

        myCharts.setOption(option);
      }
    },
  }
</script>