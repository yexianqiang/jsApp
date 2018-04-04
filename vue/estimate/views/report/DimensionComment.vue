<template>
  <div class="remark-page-rp">
    <p class="remark-title">维度评价</p>
    <ul class="remark-wrap" >
      <template v-for="(item, index) in options">
        <li class="item" :class="{active: slide == index}" @click="unfold(index)">
          <div class="item-pic"><img :src="item.icon"></div>
          <div class="item-con">
            <p v-html="item.comment"></p>
          </div>
          <div class="arrow-down"></div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
  .remark-page-rp{
    background: #e9f2ef; margin-bottom: 0.25rem;

    .remark-title{
      color: #35b9c6; font-size: 0.3rem; background: #fff; border-bottom: 0.01rem solid #f1f1f1; line-height: 1.3rem; position: relative;
      text-align: center;font-weight: bold;
    }

    .remark-wrap{
      background: #e9f2ef;

      .item{
        width: 100%; border-bottom: 0.01rem solid #f1f1f1; display: flex; justify-content: center; padding: 0.32rem 0.3rem; box-sizing: border-box;
        background: #fff; transition: height 0.5s; overflow: hidden;
        -webkit-appearance: none; -webkit-tap-highlight-color:rgba(255,255,255,0);

          .item-pic{
            width: 1rem; height: 1.35rem; padding-right: 0.25rem; display: flex; align-items: center;

            img { width: 100%; }
          }

          .item-con{
            width: 1rem; flex-grow: 1; overflow: hidden; font-size: 0.26rem; color: #363636; line-height: 0.4rem; margin-right: 0.2rem;
            max-height: 1.2rem; transition: max-height .3s ease;
            p{
              text-align: justify;
            }
          }

          &.active .item-con{
            max-height: 20rem;
          }

          .arrow-down{
            width: .2rem; height: .2rem; border-left: 0.02rem solid #ccc; border-bottom: 0.02rem solid #ccc; border-top: transparent; border-right: transparent;
            transition: all .4s; margin-top: 0.5rem; transform: rotate(-45deg);
          }

          &.active .arrow-down{
            transform: rotate(135deg);
          }
      }
    }
  }
</style>

<script>

  export default {
    data() {
      return {
        slide: -1,
      };
    },
    props:['options'],
    watch: {
      options(val) {}
    },
    mounted: function () {
      console.info(this.options);
    },
    methods: {
      unfold(index) {
        this.slide = this.slide == index? -1 : index;
      }
    },
  }
</script>