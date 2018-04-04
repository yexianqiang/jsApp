
(function () {
  Number.isInteger = Number.isInteger || function (value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value;
  };
  var Cookie = require('tiny-cookie');

  let {hostname, pathname} = window.location;

  let VueCookie = {
    install: function (Vue) {
      Vue.prototype.$cookie = this;
      Vue.cookie = this;
    },
    set: function (name, value, daysOrOptions) {
      var opts = daysOrOptions;
      if(Number.isInteger(daysOrOptions)) {
        opts = {expires: daysOrOptions};
      }
      return Cookie.set(name, value, opts);
    },

    get: function (name) {
      return Cookie.get(name);
    },

    delete: function (name, options) {
      var opts = {expires: -1};
      if(options !== undefined) {
        opts = Object.assign(options, opts);
      }
      this.set(name, '', opts);
    },
    clear: function (name) {
      let hostNames = hostname.split('.'),
        pathNames = pathname.split('/'),
        domain = '',
        pathLen = pathNames.length,
        path;

      if (del()) return;

      for (let i = hostNames.length - 1; i >= 0; i--)
      {
        let hostName = hostNames[i];
        if (hostName === '') continue;
        domain = (domain === '') ? hostName : hostName + '.' + domain ;

        path = '/';
        if (del({domain, path}) || del({domain})) return;

        for (let j = 0; j < pathLen; j++)
        {
          let pathName = pathNames[j];
          if (pathName === '') continue;

          path += pathName;
          if (del({domain, path}) || del({path})) return;

          path += '/';
          if (del({domain, path}) || del({path})) return;
        }
      }

      function del(options = {})
      {
        options['expires'] = -1;
        Cookie.set(name, '', options);

        return !Cookie.get(name);
      }
    }
  };

  if (typeof exports == "object") {
    module.exports = VueCookie;
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return VueCookie; })
  }

  if (window.Vue) {
    window.VueCookie = VueCookie;
    Vue.use(VueCookie);
    window.Vue.cookie = VueCookie;
  }

  window.zzhJs = _.assign({}, window.zzhJs, { cookie: VueCookie });

  if (window.Vue) {
    window.Vue.prototype.zzhJs = window.zzhJs;
  }

})();
