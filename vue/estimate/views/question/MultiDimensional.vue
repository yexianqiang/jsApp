<template>
  <div class="weather-wrap">
    <div class="part-1-text">
      <p class="text">{{ item.title }}</p>
    </div>
    <div class="part-2-options">
      <template v-for="(unit, uIndex) in item.meta">
        <div class="option-unit">
          <div class="text">{{ unit.title }}</div>
          <ul class="img-list">
            <template v-for="(item, iIndex) in unit.options">
              <li class="img-unit" :class="[choice[uIndex] == iIndex ? 'current' : '']" @click="choose(uIndex, iIndex)">
                <div class="img" :class="['weather'+ (iIndex + 1),choice[uIndex] == iIndex ? 'current' : '']" ></div>
                <div class="text">{{ item.title }}</div>
              </li>
            </template>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="scss">
  .weather-wrap{
    width:100vw;
    background-color: white;

    padding-left: 0.4rem;
    padding-right: 0.4rem;
    padding-top: 0.3rem;
    /*overflow: hidden;*/
    padding-bottom: 1px;
    .part-1-text{
      .text{
        color:#333333;
        font-size: 0.32rem;
        line-height: 0.5rem;
        height:1rem;
      }
    }

    .part-2-options{
      .option-unit{
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;

        .text{
          color:#666666;
          font-size: 0.3rem;
          line-height: 0.5rem;
          height:1rem;
        }
        .img-list{
          display: flex;
          justify-content: flex-start;
          margin-top: 0.55rem;
          $borderWeight:2px;
          .img-unit{
            font-size: 0.2rem;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width:1.3rem;
            height:1.1rem;
            border-top: $borderWeight solid #e5e5e5;
            border-bottom: $borderWeight solid #e5e5e5;
            .img {
              width: 0.58rem;
              height: 0.45rem;
              background: url('../../assets/images/questions/weather-icons.png') no-repeat;
              background-size: 500%;
              font-size: 60px;
            }
            .current{
              background-color: #3bc0c3;
            }
            .img.weather1 {
              background-position: 0 0;
            }
            .img.weather1.current{
              background-position: 0 -0.50rem;
            }
            .img.weather2 {
              background-position: -0.56rem 0;
            }
            .img.weather2.current{
              background-position: -0.56rem -0.50rem;
            }
            .img.weather3{
              background-position: -1.16rem 0;
            }
            .img.weather3.current{
              background-position: -1.16rem -0.50rem;
            }
            .img.weather4{
              background-position: -1.76rem 0;
            }
            .img.weather4.current{
              background-position: -1.76rem -0.5rem;
            }
            .img.weather5{
              background-position: -2.38rem 0;
            }
            .img.weather5.current{
              background-position: -2.38rem -0.5rem;
            }

            .text{
              color:#666666;
              font-size: 0.2rem;
              height:auto;
            }
          }
          .img-unit.current{
            background-color: #3bc0c3;
            border-top-color:#3bc0c3;
            border-bottom-color:#3bc0c3;
            .text{
              color:white !important;
            }
          }
          $borderRadius:10%;
          .img-unit:nth-child(1){
            border-left: $borderWeight solid #e5e5e5;
            border-top-left-radius: $borderRadius ;
            border-bottom-left-radius:  $borderRadius;
          }
          .img-unit:nth-child(1).current{
            border-left: $borderWeight solid #3bc0c3;
          }
          .img-unit:nth-last-child(1){
            border-right: $borderWeight solid #e5e5e5;
            border-top-right-radius: $borderRadius ;
            border-bottom-right-radius: $borderRadius ;
          }
          .img-unit:nth-last-child(1).current{
            border-right:$borderWeight solid #3bc0c3;
          }
        }
      }
    }
  }

</style>
<script>
  export default{
    data() {
      return {
        choice: [],
        emitChoose: false
      };
    },
    props: ['item'],
    mounted() {
      for (let i = 0; i < this.item.meta.length; i++) {
        this.choice.push(-1);
      }

      if (this.item.hasOwnProperty('choice')) {
        this.choice = this.item.choice;
      }
    },
    watch: {
      item(val) {
        for (let i = 0; i < val.meta.length; i++) {
          this.choice.push(-1);
        }

        if(val.choice) {
          this.choice = val.choice;
        }

      }
    },
    methods: {
      choose(uIndex, iIndex) {
        this.$set(this.choice, uIndex, iIndex);

        let vthis = this;
        setTimeout(function () {
          for (let i = 0; i < vthis.choice.length; i++) {
            if(vthis.choice[i] < 0) {
              return;
            }
          }

          let answer = _.assign(_.clone(vthis.item), {
            choice: _.clone(vthis.choice)
          });

          vthis.$emit('choose', answer);
        }, 100);
      }
    }
  }

</script>