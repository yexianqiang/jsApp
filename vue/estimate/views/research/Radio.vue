<template>
  <div class="radio-area age">
    <p class="second-title">{{ options.config.user_title }}</p>
    <ul class="radio-box">
      <template v-for="(text, index) in options.config.user_options">
        <li class="radio-unit" :class="{ selected: index == selected }" @click="selectItem(index)">{{ text }}</li>
      </template>
    </ul>
  </div>
</template>
<style lang="scss">
  $greenblue:#47c0c2;

  .radio-area{
    background-color: white; padding:0.3rem;

    .second-title{}
    .radio-box {
      margin-top: 0.3rem;

      .radio-unit {
        float:left; width: 1.9rem; height:0.5rem; display: flex; justify-content: flex-start; align-items: center; background-color: #efefef; margin-right: 0.2rem;
        margin-bottom: 0.3rem; padding-left: 0.2rem; border-radius: 5px;
      }
      .selected {
        background-color: $greenblue; color: white;
      }
    }
    .radio-box:after{
      content: ''; display: block; height:0; clear: both; visibility: hidden;
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        selected: -1,
      }
    },
    props: ['options', 'index'],
    methods: {
      selectItem(index, text) {
        this.selected = index;

        let data = _.assign(_.clone(this.options), {
          answer: {
            id: index,
            text: text,
          }
        });
        this.$emit('input', this.index, data);
      }
    }
  }
</script>