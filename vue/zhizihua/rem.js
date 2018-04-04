(function (window, document) {

  let timer, baseFontsize,
    domEle = document.documentElement,
    viewport = document.querySelector('meta[name="viewport"]');

  if (!viewport) {
    viewport = document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    domEle.firstElementChild.appendChild(viewport);
  }

  viewport.setAttribute('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no');

  function setBaseFontsize() {
    let domWidth = domEle.getBoundingClientRect().width;

    window.rem = baseFontsize = domWidth / 7.5;
    domEle.style.fontSize = window.rem + "px";
  }

  domEle.setAttribute("data-dpr", 1);
  window.dpr = 1;

  window.addEventListener("resize", function () {
    clearTimeout(timer), timer = setTimeout(setBaseFontsize, 300)
  }, false);

  window.addEventListener("pageshow", function (event) {
    event.persisted && (clearTimeout(timer), timer = setTimeout(setBaseFontsize, 300))
  }, false);

  setBaseFontsize();

  const convert = function (rem) {
    return rem * baseFontsize;
  }

  if (typeof exports == "object") {
    module.exports.convert = convert;
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return {convert}; })
  }

  window.zzhJs = _.assign({}, window.zzhJs, {rem: {convert}});

  if (window.Vue) {
    window.Vue.prototype.zzhJs = window.zzhJs;
  }

})(window, document)