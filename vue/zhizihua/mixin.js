(function () {

  if (!window.Vue) {
    return;
  }

  // Mixin
  Vue.mixin({
    data() {
      return {
        wechatSignConfig: null,
      }
    },
    methods: {
      wechatPreSign(cb) {
        let vthis = this,
          apiUrl = zzhJs.config.apiDomain+'/zzhedu/wx/web/jssign.action';

        this.$http.post(apiUrl,{
          url:window.location.href.split('#')[0]
        }).then(res => {
          let response = res.data;

          let signConfig = {
            debug: false,
            appId: response.data['appid'],
            timestamp: response.data['timestamp'],
            nonceStr: response.data['nonce_str'],
            signature: response.data['signature'],
            url: window.location.href,
            jsApiList:[
              'playVoice', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems',
              'showMenuItems', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareQZone', 'chooseWXPay'
            ]
          };

          vthis.wechatSignConfig = signConfig;

          cb && cb();
        });
      },
    }
  });

})()
