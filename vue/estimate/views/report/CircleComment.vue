<template>
  <div class="circle-comment-wrap-rp">
    <p class="title">{{ options.title }}</p>
    <div class="circle-text-wrap">
      <div class="circle-percent"></div>
      <div class="discribe-wrap">
        <p class="discribe-text">{{ options.text }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .circle-comment-wrap-rp{
    width: 100%;background: #fff;padding: 0.15rem 0.3rem 0.3rem; margin-bottom: 0.25rem;

    .title{
      font-size: 0.28rem; font-weight: 700; color: #50C9CB; line-height: 0.5rem; position: relative; text-align: center;
    }
    .circle-text-wrap{ display: flex;justify-content: flex-start;align-items: center; }
    .circle-percent{ width: 1.65rem; height: 1.65rem;margin-right: 0.2rem;flex-shrink: 0; }
    .discribe-wrap{
      .discribe-text{ font-size: 0.26rem; color: #383838;line-height: 0.5rem;}
    }
  }
</style>
<script>
  import echarts from '../../library/echarts.min';

  export default{
    data() {
      return {};
    },
    props: ['options'],
    watch: {
      options(val) {
        this.drawCircle();
      }
    },
    mounted() {
      this.drawCircle();
    },
    methods:{
      drawCircle() {

        // 绘制表盘
        let myCharts2 = echarts.init(
          this.$el.getElementsByClassName('circle-percent')[0]
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
            text: '',
            textStyle: {
              color: '#039fa2',
              fontSize: zzhJs.rem.convert(0.26)
            },
            x: 'center',
            y: 'center',
          },
          series: [
            {
              type: 'pie',
              // center: ['50%','50%'],
              radius: [zzhJs.rem.convert(0.6), zzhJs.rem.convert(0.7)], // 半径[内半径，外半径]
              x:'0%',
              itemStyle: labelTop,
              data:[{
                name: '',
                value: parseInt(this.options.score),
                itemStyle: labelTop
              }, {
                name: this.options.score + '',
                value: this.options.total - this.options.score,
                itemStyle: labelBottom
              }]
            }
          ]
        };

        myCharts2.setOption(option2)
      },
    }
  }
</script>