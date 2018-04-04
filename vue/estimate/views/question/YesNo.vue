<template>
  <div class="yesno-wrap">
    <div class="part-1-text">
      <p class="text">{{item.title}}</p>
    </div>
    <div class="part-2-img">
      <img class="img" :src="item.cover">
    </div>
    <div class="part-3-options">
      <ul class="options-list">
        <li class="options-unit" @click="choose(0)">
          <a href="javascript:void(0);">
            <div class="top-img yes" :class="{current: choice == 0 }"></div>
            <div class="bottom-desc">{{ item.meta[0].title }}</div>
          </a>
        </li>
        <li class="options-unit" @click="choose(1)">
          <a href="javascript:void(0);">
            <div class="top-img no" :class="{current: choice == 1 }"></div>
            <div class="bottom-desc">{{ item.meta[1].title }}</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .yesno-wrap{
    width:100%;
    min-height:10.5rem;
    padding:0.2rem;
    background-color: white;
    font-family: "Microsoft Yahei";
    .part-1-text{
      .text{
        font-size: 0.3rem;
        line-height: 0.5rem;
        min-height: 1.0rem;
      }
    }
    .part-2-img{
      display:flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.3rem;
      margin-bottom: 0.6rem;
      .img{
        display:flex;
        width: 100%;
        min-height:3rem;
      }

    }
    .part-3-options{
      .options-list{
        display:flex;
        justify-content: center;
        .options-unit{
          font-size: 0.2rem;
          width:2.5rem;
          a{
            display:flex;
            flex-direction: column;
            align-items: center;
            .top-img{
              width:0.91rem;
              height:0.84rem;
              background-size: 400%;
              background-repeat: no-repeat;
              background-image: url('../../assets/images/questions/faces-icons.png');
            }
            .top-img.yes{
              background-position: -1.82rem  -1.68rem;
            }
            .top-img.yes.current{
              background-position: -1.82rem -2.52rem;
            }
            .top-img.no{
              background-position: -0.91rem -1.68rem;
            }
            .top-img.no.current{
              background-position: -0.91rem -2.52rem;
            }
            .bottom-desc{
              margin-top: 0.3rem;
              color:#333;
              font-size: 0.3rem;
            }
          }
        }
        .options-unit:nth-child(1){
          margin-right: 1.2rem;
        }
      }
    }
  }

</style>

<script>
  export default{
    data() {
      return {
        choice: -1,
      };
    },
    computed: {},
    props: ['item'],
    created(){},
    mounted() {
      if (this.item.hasOwnProperty('choice')) {
        this.choice = this.item.choice;
      }
    },
    updated() {},
    methods: {
      choose(index) {
        this.choice = index;
        let vthis = this;
        (function (answer) {
          setTimeout(function () {
            vthis.$emit('choose', answer);
          }, 100);
        })(_.assign(_.clone(vthis.item), {
          choice: vthis.choice
        }))
      }
    },
    watch: {
      item(val) {
        this.choice = val.choice;
      }
    },
    components:{}
  }
</script>

