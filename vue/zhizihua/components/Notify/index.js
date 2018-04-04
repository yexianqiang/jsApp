

export default {
  name: 'we-notify',
  mixin: {
    methods: {
      weNotify(message, time) {

        this.$store.commit('weNotify/show', {
          message, time
        });
      }
    }
  },
  component: require('./Notify.vue')
}