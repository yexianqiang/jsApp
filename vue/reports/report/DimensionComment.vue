<template>
  <div class="remark-page-rp">
    <p class="remark-title">评价及建议</p>
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
  .remark-page-rp {
    background: #e9f2ef; margin-bottom: 20px;

    .remark-title {
      color: #35b9c6; font-size: 14px; background: #fff; border-bottom: 1px solid #f1f1f1; line-height: 75px; padding: 0 20px;
      .icon {
        display: inline-block; width: 30px; height: 30px; background: #009fa5; vertical-align: middle; margin-right: 20px;

      }
    }
    .remark-wrap{
      background: #e9f2ef;
      .item {
        width: 100%; border-bottom: 1px solid #f1f1f1; display: flex; justify-content: center;  padding: 15px 20px; box-sizing: border-box;
        background: #fff; transition: height 0.5s; overflow: hidden;
        -webkit-appearance: none; -webkit-tap-highlight-color:rgba(255,255,255,0);

        .item-pic {
          width: 90px; height: 65px; padding-right: 25px; display: flex; align-items: center;

          img { width: 100%; }
        }

        .item-con {
          width: 90px; flex-grow: 1; overflow: hidden; font-size: 14px; color: #363636; line-height: 30px; margin-right: 20px;
          max-height: 60px; transition: max-height .3s ease;
        }

        &.active .item-con {
          max-height: 400px;
        }

        .arrow-down {
          width: 10px; height: 10px; border-left: 2px solid #ccc; border-bottom: 2px solid #ccc; border-top: transparent; border-right: transparent;
          transition: all .4s; margin-top: 22px; transform: rotate(-45deg);
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
    props: ['user_options'],
    computed: {
      options() {
        return this.user_options;
      }
    },
    methods: {
      unfold(index) {
        this.slide = this.slide == index? -1 : index;
      }
    },
    watch: {},
  }
</script>