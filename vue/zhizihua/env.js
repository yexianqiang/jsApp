
let defaultEnv = {
  environment: 'mobile',
  system: 'android',
  channel: 'java',
  envIs(name) {
    if (typeof name == 'string') {
      return this.environment == name;
    }

    return name.indexOf(this.environment) != -1;
  },
  envNot(name) {
    if (typeof name == 'string') {
      return this.environment != name;
    }

    return name.indexOf(this.environment) == -1;
  },
  systemIs(name) {
    if (typeof name == 'string') {
      return this.system == name;
    }

    return name.indexOf(this.system) != -1;
  },
  systemNot(name) {
    if (typeof name == 'string') {
      return this.system != name;
    }

    return name.indexOf(this.system) == -1;
  },
  isSystemAndriod() {
    return this.systemIs('android');
  },
  isSystemIos() {
    return this.systemIs('ios');
  },
  isInApp() {
    return this.envIs('app');
  },
  isInWechat() {
    return this.envIs('wechat');
  },
  isInMobile() {
    return this.envIs('mobile');
  },
  isLogined(cb) {
    if (!zzhJs.env.isInApp()) {
      cb &&  cb(!!this.getToken());
    } else {
      let that = this;
      // 修改 旧版的app未附加messageToApp时的解决办法
      if (zzhJs.env.systemIs('ios')) {
        let appLogin = false;
        if (window.webkit.messageHandlers.messageToApp) {
          // 与ios暂时只调了咨询部分的新的交互接口
          zzhJs.messageBridge.listenOnce('provideUserToken', function (data) {
            // let appLogin = false;

            if (data['token']) {
              appLogin = true;
            }
            appLogin = appLogin || !!that.getToken();

            if (cb) {
              cb(appLogin);
            }

          });
          zzhJs.messageBridge.sendToApp({type: 'requestUserToken'});
        }else {
            appLogin = appLogin || !!that.getToken();
            cb && cb(appLogin)
        }
      } else if (zzhJs.env.systemIs('android')) {
      // 暂时还未与Android调试新的js/原生交互接口
        let appLogin = !!that.getToken();
        if (cb) {
          cb(appLogin);
        }
      }

    }

    return !!this.getToken();
  },
  getToken() {
    let token = '';

    if (window.Vue) {
      token = window.Vue.cookie.get('session_token');
    }

    if (window.Vue && window.vApp) {
      let routeToken = window.vApp.$route.query['token'];
      token = routeToken? routeToken: token;
    }

    if (zzhJs.config.envIs('dev')) {
      token = 'zhizihua';
    }

    return token;
  },
  callPayment(payload) {},
  callLogin() {
    zzhJs.console.log('call Login');
  },
  callVideoDetail(payload) {},
  callAudioDetail(payload) {},
  callShareMedia(payload) {}
}

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
  //苹果端
  defaultEnv.system = 'ios';
} else if (/(Android)/i.test(navigator.userAgent)) {
  //安卓端
  defaultEnv.system = 'android'
}

// 初始化 appCaller
if (window.appCallPayment) {
  // ios UiWebView
  _.assign(defaultEnv, {
    environment: 'app',
    callPayment(payload) {
      zzhJs.console.info('Call ios uiwebview payment');
      window.appCallPayment(payload);
    },
    callPackagePayment(payload) {
      zzhJs.console.info('Call ios uiwebview packagePayment');
      window.callPackagePayment(payload);
    },
    callLogin() {
      zzhJs.console.info('Call ios uiwebview login');
      window.appCallLogin();
    },
    callVideoDetail(payload) {
      zzhJs.console.info('Call ios uiwebview videoDetail');
      window.appCallVideoDetail(payload);
    },
    callAudioDetail(payload) {
      zzhJs.console.info('Call ios uiwebview audioDetail');
      window.appCallAudioDetail(payload);
    },
    callShareMedia(payload) {
      zzhJs.console.info('Call ios uiwebview shareMedia');
      window.appCallShareMedia(payload);
    }
  });

} else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.appCallLogin) {

  // ios WkWebView
  _.assign(defaultEnv, {
    environment: 'app',
    callPayment(payload) {
      zzhJs.console.info('Call ios wkwebview payment');
      window.webkit.messageHandlers.appCallPayment.postMessage(payload);
    },
    callPackagePayment(payload) {
      zzhJs.console.info('Call ios wkwebview packagePayment');
      window.webkit.messageHandlers.appCallPackagePayment.postMessage(payload);
    },
    callLogin() {
      zzhJs.console.info('Call ios wkwebview login');
      window.webkit.messageHandlers.appCallLogin.postMessage({});
    },
    callVideoDetail(payload) {
      zzhJs.console.info('Call ios wkwebview videoDetail');
      window.webkit.messageHandlers.appCallVideoDetail.postMessage(payload);
    },
    callAudioDetail(payload) {
      zzhJs.console.info('Call ios wkwebview audioDetail');
      window.webkit.messageHandlers.appCallAudioDetail.postMessage(payload);
    },
    callShareMedia(payload) {
      zzhJs.console.info('Call ios wkwebview shareMedia');
      window.webkit.messageHandlers.appCallShareMedia.postMessage(payload);
    }

  });
} else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.messageToApp) {

  // ios WkWebView
  _.assign(defaultEnv, {
    environment: 'app',
    callLogin() {
      zzhJs.console.info('Call ios wkwebview message login');
      zzhJs.messageBridge.sendToApp({type: 'showLogin'});
    },
    callPayment(payload) {
      zzhJs.console.info('Call ios wkwebview payment');
      window.webkit.messageHandlers.appCallPayment.postMessage(payload);
    },
    callPackagePayment(payload) {
      zzhJs.console.info('Call ios wkwebview packagePayment');
      window.webkit.messageHandlers.appCallPackagePayment.postMessage(payload);
    },
    callVideoDetail(payload) {
      zzhJs.console.info('Call ios wkwebview videoDetail');
      window.webkit.messageHandlers.appCallVideoDetail.postMessage(payload);
    },
    callAudioDetail(payload) {
      zzhJs.console.info('Call ios wkwebview audioDetail');
      window.webkit.messageHandlers.appCallAudioDetail.postMessage(payload);
    },
    callShareMedia(payload) {
      zzhJs.console.info('Call ios wkwebview shareMedia');
      window.webkit.messageHandlers.appCallShareMedia.postMessage(payload);
    }
  });

} else if(window.appCaller) {

  // android AppCaller
  _.assign(defaultEnv, {
    environment: 'app',
    callPayment(payload) {
      zzhJs.console.info('Call android payment');
      window.appCaller.appCallPayment(JSON.stringify(payload));
    },
    callPackagePayment(payload) {
      zzhJs.console.info('Call android packagePayment');
      window.appCaller.appCallPackagePayment(JSON.stringify(payload));
    },
    callLogin() {
      zzhJs.console.info('Call android login');
      window.appCaller.appCallLogin();
    },
    callVideoDetail(payload) {
      zzhJs.console.info('Call android videoDetail');
      window.appCaller.appCallVideoDetail(payload);
    },
    callAudioDetail(payload) {
      zzhJs.console.info('Call android audioDetail');
      window.appCaller.appCallAudioDetail(payload);
    },
    callShareMedia(payload) {
      zzhJs.console.info('Call android shareMedia');
      window.appCaller.appCallShareMedia(JSON.stringify(payload));
    }
  });

} else if (window.zzhApp) {

  // android AppCaller
  _.assign(defaultEnv, {
    environment: 'app',
    callLogin() {
      zzhJs.console.info('Call android message login');
      zzhJs.messageBridge.sendToApp({type: 'showLogin'});
    },
    callPayment(payload) {
      zzhJs.console.info('Call android payment');
      window.appCaller.appCallPayment(JSON.stringify(payload));
    },
    callPackagePayment(payload) {
      zzhJs.console.info('Call android packagePayment');
      window.appCaller.appCallPackagePayment(JSON.stringify(payload));
    },
    callVideoDetail(payload) {
      zzhJs.console.info('Call android videoDetail');
      window.appCaller.appCallVideoDetail(payload);
    },
    callAudioDetail(payload) {
      zzhJs.console.info('Call android audioDetail');
      window.appCaller.appCallAudioDetail(payload);
    },
    callShareMedia(payload) {
      zzhJs.console.info('Call android shareMedia');
      window.appCaller.appCallShareMedia(JSON.stringify(payload));
    }
  });
} else if(window.wx) {

  // wechat
  _.assign(defaultEnv, {
    environment: 'wechat',
    callPayment(payload) {},
    callLogin() {
      Vue.cookie.set('auth_backto', window.location.href, {expires: '1M', domain: location.host.replace(/\w+\./, '')});
      let goto = zzhJs.config.apiDomain+ '/zzhedu/web/oauth/index.action?redirect_uri='+ Base64.encode(encodeURI(zzhJs.config.urlIndexPage));
      window.location.href = goto;
    }
  });
}

window.zzhJs = _.assign({}, window.zzhJs, { env: defaultEnv });

if (window.Vue) {
  window.Vue.prototype.zzhJs = window.zzhJs;
}
