<template>
  <div class="pie">
    <svg></svg>
  </div>
</template>

<style lang="scss">
  .pie{
    width: 100%; height: 6rem; background: #f7f7f7; margin-top: 0.6rem;

    svg{
      width: 100%; height: 100%;
      .axis text {
        font-family: sans-serif;
        font-size: 12px;
      }
      g{
        text{
          font-size: 0.24rem;
        }
      }
    }
  }
</style>

<script>
  import * as d3 from 'd3';

  export default {
    data() {
      return {
        canvas: null,
      }
    },
    computed:{},
    watch: {},
    props() {},
    mounted(){
      this.init();
    },
    methods: {
      init() {
        this.svg = d3.select('svg');

//        柱状图
        // X 轴
//        let width = 400,height = 400;
//        let padding = {left:30,right:30,top:30,bottom:30};
//        let dataset = [10,20,30,40,33,24,12,5];
//        // 定义x,y轴的比例
//        let x = d3.scaleBand()
//          .domain(d3.range(dataset.length))
//          .rangeRound([0,width - padding.left - padding.right]),
//          y = d3.scaleLinear()
//            .domain([0,d3.max(dataset)])
//            .range([0,height - padding.top - padding.bottom]);
//          // 定义坐标轴
//          let xA = d3.axisBottom(x)
//            .ticks(dataset.length),
//            yA = d3.axisLeft(y)
//              .ticks(7);
//
//        this.svg.append('g').attr('transform','translate(30,430)').call(xA);
//        this.svg.append('g').attr('transform','translate(30,99)').call(yA);
//          // 添加矩形和文字
//        let rectPadding = 5;
//        let rect = this.svg.selectAll('rect')
//          .data(dataset)
//          .enter()
//          .append('rect')
//          .attr('transform','translate('+ padding.left + ',' + padding.top + ')')
//          .attr('x',function (d,i) {
//            return x(i) + rectPadding / 2;
//          })
//          .attr('y',function (d,i) {
//            return height - y(d);
//          })
//          .attr('width',x.bandwidth())
//          .attr('height',function (d) {
//            return y(d);
//          })
//          .attr('fill',function (d) {
//            return 'rgb(0,0,'+(d * 10)+')';
//          })
//          .on('touchstart',function(d,i){
//            console.log('123')
//            d3.select(this)
//              .attr("fill","yellow")
//          })
//          .on('touchend ',function (d,i) {
//            d3.select(this)
//              .transition()
//              .duration(400)
//              .attr('fill','blue')
//          })

// 布局(饼状图)
        let data1 = [30,10,43,55,13];
        let width = 300,height = 300
        let pie = d3.pie();
        let pieData = pie(data1);
        let outerRadius = 120;
        let innerRadius = 0;
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        let arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
        let arcs = this.svg.selectAll('g')
          .data(pieData)
          .enter()
          .append('g')
          .attr('transform','translate('+(width / 2)+','+(height / 2)+')');
        arcs.append('path')
          .attr('fill',function (d,i) {
            return color(i);
          })
          .attr('d',function (d) {
            return arc(d)
          })
          .on('click',function (i) {
            console.log(i)
          })
          arcs.append('text')
          .attr('transform',function (d,i) {
            return 'translate('+ arc.centroid(d)+')'
          })
          .attr('text-anchor','middle')
          .text(function (d) {
            return d.data
          })

// 力图
        var nodes = [
          { name: "桂林" },
          { name: "广州" },
          { name: "厦门" },
          { name: "杭州" },
          { name: "上海" },
          { name: "青岛" },
          { name: "天津" }
        ];

        var edges = [
          { source : 0 , target: 1 } ,
          { source : 0 , target: 2 } ,
          { source : 0 , target: 3 } ,
          { source : 1 , target: 4 } ,
          { source : 1 , target: 5 } ,
          { source : 1 , target: 6 }
        ];

        var force = d3.forceSimulation()
          .nodes(nodes)
//          .linkes(edges)
//          .size([width,height])
//          .linkDistance(150)
//          .charge([-400]);
//        force.start();
        console.log(force)
       },
    },
    filters:{
    }
  };
</script>

