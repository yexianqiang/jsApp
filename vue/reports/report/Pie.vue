<template>
  <div class="pie">
    <div class="canvas"></div>
  </div>
</template>

<style lang="scss">
  .pie{
    width: 100%; height: 6.18rem; background: #f7f7f7; margin-top: 0.6rem;

    .canvas{
      width: 100%; height: 100%;
    }
  }
</style>

<script>
  import echarts from '../library/echarts.min';

  let pieData = [
    {value:335, name:'直接访问'},
    {value:310, name:'邮件营销'},
    {value:234, name:'联盟广告'},
    {value:135, name:'视频广告'},
    {value:1548, name:'搜索引擎'}
  ];

  let pieOption = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: pieData
      }
    ]
  };

  export default{
    data() {
      return {
        inc: null,
        selected: 1,
      }
    },
    computed:{
    },
    watch: {
      selected(val, oldVal){
        this.inc.dispatchAction({
          type: 'pieUnSelect',
          seriesName: '访问来源',
          name: pieData[oldVal-1].name,
        });

        this.inc.dispatchAction({
          type: 'pieSelect',
          seriesName: '访问来源',
          name: pieData[val-1].name,
        });
      }
    },
    props() {},
    mounted(){
      this.initData();
    },
    methods: {
      initData(){
        this.inc = echarts.init(
          this.$el.getElementsByClassName('canvas')[0]
        );
        this.inc.setOption(pieOption);
      },
    },
    filters:{
    }
  }

</script>