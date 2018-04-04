<template>
  <div class="copy-url-btn-wrap"></div>
</template>

<style lang="scss">
  .copy-url-btn-wrap {
    opacity: .6; position: fixed; bottom: 0; left: 0; border-width: .25rem; border-style: solid; z-index: 5010;
    border-top-color: transparent; border-right-color: transparent; border-left-color: #EEE; border-bottom-color: #EEE;

    &:active{ border-left-color: lightcoral; border-bottom-color: lightcoral; }
  }
</style>

<script>
  import Clipboard from 'clipboard';

  export default{
    data() {
      return {}
    },
    created() {
    },
    mounted() {
      new Clipboard(this.$el, {
        text(trigger) {
          return zzhJs.helpers.getAuthRedirectUri();
        }
      });
    },
    methods: {}
  }
</script>
