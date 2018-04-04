

export default {
  name: 'we-loading',
  mixin: {
    methods: {
      weLoadStart(loading) {
        this.$store.commit('weLoading/start', loading);
      },
      weLoadEnd() {
        this.$store.commit('weLoading/end');
      }
    }
  },
  component: require('./Loading.vue')
}

