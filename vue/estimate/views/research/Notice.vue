<template>
  <div class="notice-part counter">
    <div class="first-title">
      <div class="hint"></div>
      <p class="text">{{ options.config.user_text }}</p>
    </div>
  </div>
</template>

<style lang="scss">
  .notice-part{
    $greenblue:#47c0c2;
    margin-top: 0.4rem;
    .first-title{
      display:flex;
      flex-direction: row;
      align-items: center;
      .hint{
        margin-right: 0.16rem;
        height: 0.24rem;
        width:0.08rem;
        background-color: $greenblue;
        border-radius: 4px;
      }
      .text{
        color: $greenblue;
        font-size: 0.24rem;
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {};
    },
    props: ['options', 'index'],
  }
</script>