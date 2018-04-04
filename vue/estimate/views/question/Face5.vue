<template>
  <div class="five-faces-wrap">
    <div class="part-1-text">
      <p class="text">{{item.title}}</p>
    </div>
    <div class="part-2-img">
      <img class="img" :src="item.cover">
    </div>
    <div class="part-3-options">
      <ul class="options-list">
        <template v-for="(unit, index) in item.meta">
          <li class="options-unit" @click="choose(index)">
            <a href="javascript:void(0)">
              <div class="top-face" :class="['face' + (index+1), choice == index ? 'current': '']"></div>
              <div class="bottom-text">{{ unit.title }}</div>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>

</template>
<style lang="scss">
  .five-faces-wrap{
    width:100%;
    padding:0.2rem;
    background-color: white;
    font-family: "Microsoft Yahei";
    .part-1-text{
      .text{
        font-size: 0.3rem; line-height: 0.5rem; margin-bottom: 0.15rem;min-height: 1rem;
      }
    }

    .part-3-options{
      .options-list{
        display:flex; flex-direction: row;justify-content: space-between;

        .options-unit{
          /*margin-right: 0.6rem;*/
          a{
            display:flex; flex-direction: column; align-items: center;

            .top-face{
              display:block; width: 0.91rem; height: 0.84rem; margin-bottom: 0.22rem;
              background-size: 400%;
              background-repeat: no-repeat;
              background-image: url('../../assets/images/questions/faces-icons.png');
            }

            .face1{
              background-position: 0 0;
            }
            .face1.current{
              background-position: 0 -0.84rem;
            }
            .face2{
              background-position:-0.91rem 0 ;
            }
            .face2.current{
              background-position: -0.91rem -0.84rem;
            }
            .face3{
              background-position: -1.82rem 0 ;
            }
            .face3.current{
              background-position: -1.82rem -0.84rem;
            }
            .face4{
              background-position:-2.73rem 0 ;
            }
            .face4.current{
              background-position: -2.73rem -0.84rem;
            }
            .face5{
              background-position: 0 -1.68rem;
            }
            .face5.current{
              background-position: 0 -2.52rem;
            }

            .bottom-text{
              display:inline-block;
              max-width:1.3rem;
              min-height: 0.94rem;
              font-size: 0.2rem;
              color:#c7c7c7;
            }
          }
        }
        .options-unit:nth-last-child(1){
          margin-right: 0;
        }
      }
    }

    .face{
      width: 90px; height: 90px;
    }


  }
</style>
<script>
  export default {
    data() {
      return {
        choice: -1,
      };
    },
    computed:{},
    props: ['item'],
    mounted() {
      if (this.item.hasOwnProperty('choice')) {
        this.choice = this.item.choice;
      }
    },
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
    components: {}
  };
</script>