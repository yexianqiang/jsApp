

export default {
  name: 'we-confirm',
  mixin: {
    methods: {
      weConfirm(title, message, userConfirm, userCancel) {

        this.$store.commit('weConfirm/show', {
          title, message, userConfirm, userCancel
        });
      }
    }
  },
  component: require('./Confirm.vue')
}