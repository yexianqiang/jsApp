<template>
  <div class="app">
    <overview-rp :user_options="modules.Overview"></overview-rp>
    <overview-raw-rp :user_options="modules.OverviewRaw"></overview-raw-rp>
    <dimensions-raw-rp></dimensions-raw-rp>
    <bar-graph-rp :user_options="modules.BarGraph"></bar-graph-rp>
    <curve-chart-rp :user_options="modules.CurveChart"></curve-chart-rp>
    <muti-curve-chart-rp :user_options="modules.MutiCurveChart"></muti-curve-chart-rp>
    <line-chart-rp :user_options="modules.LineChart"></line-chart-rp>
    <comment-rp :user_options="modules.Comment"></comment-rp>
    <blend-chart-rp :user_options="modules.BlendChart"></blend-chart-rp>
    <muti-blend-chart-rp :user_options="modules.MutiBlendChart"></muti-blend-chart-rp>
    <cross-quadrant-rp></cross-quadrant-rp>


    <comment-advice-rp></comment-advice-rp>

    <total-comment-rp></total-comment-rp>
    <total-advice-rp></total-advice-rp>

    <circle-comment-rp></circle-comment-rp>

  </div>
</template>

<style lang="scss">
  @import "style/normalize";
  @import "style/app";

  html, body{
    /*min-width: 100vw; min-height: 100vh;*/
  }

  body, div, ul, li, span, p, img, h1, h2, h3, h4{
    margin: 0; padding: 0; box-sizing: border-box;
  }
  ul, li{
    list-style: none;
  }
  a{
    text-decoration: none;
  }

  .app {
    width: 348px; height: 100%;
    /*overflow: auto;*/
    margin:  0 auto;
  }
</style>

<script>
  import reportDataTpl from '../fake/reportDataTpl';

  export default {
    data() {
      return {
        noReport: false,
        modules: reportDataTpl
      }
    },
    mounted() {
      document.title = 'Pc 版测评模块展示';
    },
  }
</script>