<template>
  <div class="picture-area have-sequence gender">
    <p class="second-title">{{ options.config.user_title }}</p>
    <div class="img-box">
      <div class="male" :class="{selected: selected == 0}" @click="selectGender(0)">
        <div class="portrait male-img"></div>
        <span>男</span>
      </div>
      <div class="female" :class="{selected: selected == 1}" @click="selectGender(1)">
        <div class="portrait female-img"></div>
        <span>女</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .picture-area{
    background-color:white;
    $greenblue:#47c0c2;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;
    padding:0.3rem;
    .second-title{  }
    .img-box{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 2.5rem;
        height: 1.7rem;


        background-repeat: no-repeat;
      }

      .portrait{
        width:1.08rem;
        height:1.08rem;
        background-size: 225%;
      }

      .male-img{
        background-image: url('../../assets/images/getInfo/getuserinfo-icons.png');
        background-position: -1.08rem 0;
      }
      .female-img{
        background-image: url('../../assets/images/getInfo/getuserinfo-icons.png');
        background-position: -1.08rem -1.08rem;
      }
      .selected{
        .male-img{
          background-position: 0 0;
        }
        .female-img{
          background-position: 0 -1.08rem;
        }
        span{
          color:$greenblue;
        }
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        enum: ['男', '女'],
        selected: -1,
      }
    },
    props: ['options', 'index'],
    methods: {
      selectGender(result) {
        this.selected = result;

        let data = _.assign(_.clone(this.options), {
          answer: {
            id: this.selected,
            text: this.enum[this.selected],
          }
        });
        this.$emit('input', this.index, data);
      }
    }
  }
</script>