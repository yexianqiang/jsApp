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
    width: 100%;background: #fff;padding: 10px 20px 20px; margin-bottom: 20px;

    .title{
      font-size: 14px;color: #40959a;line-height: 30px;text-indent: 28px;position: relative; text-align: center;
    }
    .circle-text-wrap{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .circle-percent{
      width: 120px;height: 120px;margin-right:15px;
    }
    .discribe-wrap{
      .discribe-text{
        font-size:14px;color: #383838;
      }
    }
  }
</style>
<script>
  import echarts from '../library/echarts.min';

  export default{
    data() {
      return {}
    },
    props: ['user_options'],
    computed: {
      options() {
        return this.user_options;
      }
    },
    mounted() {
      this.drawCircle();
    },
    watch: {
      user_options(val) {
        this.drawCircle();
      }
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
                fontSize: 14,
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
              fontSize: 14
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
              fontSize: 16
            },
            x: 'center',
            y: 40
          },
          series: [
            {
              type: 'pie',
              center: ['50%','50%'],
              radius: [40, 50], // 半径[内半径，外半径]
              x:'0%',
              itemStyle: labelTop,
              data:[{
                name: '总得分',
                value: this.options.score,
                itemStyle: labelTop
              }, {
                name: this.options.score,
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