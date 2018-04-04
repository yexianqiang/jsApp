const zzhConsole = {
  row() {
    if (!arguments.length) {
      return;
    }

    (function (data) {
      for (var i = 0; i < data.length; i++) {
        console.info(data[i]);
        if (i < data.length - 1) {
          console.info("</=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/=*=/>");
        }
      }
    })(Array.prototype.slice.call(arguments, 0))
  },
  info() {
    (function (data) {
      console.info.apply(window.console, data)
    })(Array.prototype.slice.call(arguments, 0))
  },
  log() {
    (function (data) {
      console.log.apply(window.console, data)
    })(Array.prototype.slice.call(arguments, 0))
  },
  trace() {
    (function (data) {
      console.trace.apply(window.console, data)
    })(Array.prototype.slice.call(arguments, 0))
  },
  error() {
    (function (data) {
      console.error.apply(window.console, data)
    })(Array.prototype.slice.call(arguments, 0))
  },
}

window.zzhJs = _.assign({}, window.zzhJs, { console: zzhConsole });

if (window.Vue) {
  window.Vue.prototype.zzhJs = window.zzhJs;
}