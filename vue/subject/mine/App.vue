<template>
  <div class="app">
    <we-loading></we-loading>
    <we-notify></we-notify>
    <down-load></down-load>
    <router-view></router-view>
    <copy-url-btn></copy-url-btn>
  </div>
</template>

<style lang="scss">
  @import "style/normalize";
  @import "style/app";
  @import "../../assets/iconfont/iconfont.css";
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
  /*.app {*/
    /*width: 348px; height: 100%;*/
    /*!*overflow: auto;*!*/
    /*margin:  0 auto;*/
  /*}*/
  .app{
    background: #f6f6f6;
    width: 100%;
    min-height: 100vh;
  }
</style>

<script>

  export default {
    data() {
      return {
      }
    },
    mounted() {},
  }
</script>