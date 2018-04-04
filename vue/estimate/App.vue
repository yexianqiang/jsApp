<template>
  <div class="app">
    <we-confirm></we-confirm>
    <we-notify></we-notify>
    <we-loading></we-loading>
    <router-view></router-view>
    <div class="footer" v-if="showNav()">
      <router-link class="footer-left" :to="{name: 'estimate.home'}">测评列表</router-link>
      <router-link class="footer-right" :to="{name: 'mine.estimate'}">我的测评</router-link>
    </div>
    <copy-url-btn v-if="!zzhJs.env.isInApp()"></copy-url-btn>
  </div>
</template>

<style lang="scss">
  @import "./style/normalize";
  @import "./style/app";

  $wd_100: 100%;

  html, body{
    min-width: 100vw; min-height: 100vh;
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
    width: 100%; height: 100%; min-height: 100vh; min-width: 100vw; overflow: auto;

    .footer {
      width: $wd_100; height: 0.85rem; background: #fff; display: flex; justify-content: space-between; font-size: 0.30rem; line-height: 0.85rem;
      color: #a3a3a3; position: fixed; left: 0; bottom: 0;

      &>a {
        width: 50%; height: 0.85rem; text-align: center; color: #a2a2a2;
      }

      &>a.active {
        color: #fff; background: #3bc0c4;
      }
    }
  }
</style>

<script>
  import { mapGetters } from 'vuex';

  export default {
    mounted() {
      document.title = '心智测评'
    },
    methods: {
      showNav() {
        return !zzhJs.env.isInApp() && ['estimate.home', 'mine.estimate'].indexOf(this.$route.name) !== -1;
      }
    }
  };
</script>