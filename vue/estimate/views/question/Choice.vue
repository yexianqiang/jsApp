<template>
  <div class="ABCDE-wrap">
    <div class="part-1-text">
      <p class="text">{{item.title}}</p>
    </div>
    <div v-if="item.cover" class="part-2-img">
      <img class="img" :src="item.cover">
    </div>
    <div class="part-3-options">
      <ul class="options-list">
        <template v-for="(unit, index) in item.meta">
          <li class="options-unit" :class="[choice == index ? 'current': '']" @click="choose(index)">
            <a href="javascript:void(0)">
              <div class="left-alpha">{{ getWord(index) }}</div>
              <div class="right-text">{{unit.title}}</div>
            </a>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .ABCDE-wrap{
    background-color: white; padding:0.2rem; width: 100%;

    .part-1-text{
      margin:0.1rem;

      .text{
        font-size: 0.30rem; color: #252525; line-height: 0.50rem;
      }
    }
    .part-2-img{
      img{
        display:block; width: 7.1rem; min-height:3.6rem; margin-top: 0.2rem; margin-bottom: 0.5rem;
      }
    }
    .part-3-options{
      .options-list{
        .options-unit{
          margin:0.1rem; background-color: #efefef; border-radius: 3px;

          a{
            display:flex; flex-direction: row; align-items: center; height: 0.96rem; font-size: 0.25rem; color: #818181;

            .left-alpha{
              display: flex; align-items: center; justify-content: center; margin-left: 0.2rem; margin-right: 0.2rem; width: 0.6rem;
              height: 0.6rem; background-color: white; border: 1px solid #e6e6e6; border-radius: 50%; color: black;
            }
          }
        }
        .current{
          background-color: #3bc0c3;
        }
        .current  a .left-alpha{
          color:#3bc0c3;
        }
        .current a .right-text{
          color:white;
        }
      }
    }
  }
</style>

<script>
  export default{
    data(){
      return{
        choice: -1,
      };
    },
    computed:{},
    props:['item'],
    created(){},
    mounted() {
      if (this.item.hasOwnProperty('choice')) {
        this.choice = this.item.choice;
      }
    },
    methods: {
      getWord(index) {
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return str[index];
      },
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