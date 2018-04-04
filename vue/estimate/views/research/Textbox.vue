<template>
  <div class="text-box-area">
    <p class="second-title">{{ options.config.user_title }}</p>
    <input type="text" v-model="text" @input="inputText" :placeholder="options.config.user_placeholder">
  </div>
</template>

<style lang="scss">
  $greenblue: #47c0c2;
  .text-box-area {
    background-color: white; padding:0.3rem; margin:0.4rem 0;

    input {
      display:block; margin-top: 0.3rem; padding:0 0.2rem; width:4rem; height:0.48rem; outline: none; border:2px solid $greenblue; border-radius: 3px; font-size: 0.26rem;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        text: '',
      };
    },
    props: ['options', 'index'],
    methods: {
      inputText() {
        let data = _.clone(this.options);

        if (this.text) {
          data = _.assign(data, {answer: {text: this.text}});
        } else {
          data = _.assign(data, {answer: null});
        }

        this.$emit('input', this.index, data);
      }
    }
  }
</script>