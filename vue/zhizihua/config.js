const appEnv = 'env-inject-here';

let apiDomain,
  pageDomain = window.location.protocol + '//' + window.location.host;

if (appEnv == 'production') {
  apiDomain = pageDomain = 'http://wechat.zhizihua.com';
} else if(appEnv == 'test') {
  apiDomain = pageDomain = 'http://wxcenter.test.zhizihua.com';
} else if(appEnv == 'lan') {
  apiDomain = pageDomain = 'http://wxcenter.test.zhizihua.com';
} else {
  apiDomain = 'http://wxcenter.test.zhizihua.com';
}

let appConfig = {
  env: appEnv,
  envIs(name) {
    if (typeof name == 'string') {
      return this.env == name;
    }

    return name.indexOf(this.env) != -1;
  },
  envNot(name) {
    if (typeof name == 'string') {
      return this.env != name;
    }

    return name.indexOf(this.env) == -1;
  },
  apiDomain,
};

if (appEnv == 'dev') {
  appConfig = _.assign(appConfig, {
    // urlIndexPage: `${pageDomain}/subject/index/index.html`,
    urlIndexPage: `${apiDomain}/zzhedu/html/wx/subject-index.html`,
    urlAudioList: `${pageDomain}/subject/audio/index.html`,
    urlVideoList: `${pageDomain}/subject/video/index.html`,
    urlReceive: `${pageDomain}/subject/receive/index.html`,
    urlMine: `${pageDomain}/subject/mine/index.html`,
    urlPayment: `${pageDomain}/payment/index.html`,
    urlMineBuy: `${pageDomain}/subject/mine/index.html#/mine/list`,
    urlArticleList: `${pageDomain}/article/index.html`,
    urlConsultList: `${pageDomain}/consult/index.html`,
    urlEstimate: 'https://wx.zhizi.app/java/estimate',
    urlInterestTest: 'https://wx.test.zhizihua.com/interest-test/own',
    urlSubjectCommentPage: `${pageDomain}/subject/comment/index.html`,
  });
} else {
  appConfig = _.assign(appConfig, {
    urlIndexPage: `${pageDomain}/zzhedu/html/wx/subject-index.html`,
    urlAudioList: `${pageDomain}/zzhedu/html/wx/subject-audio.html`,
    urlVideoList: `${pageDomain}/zzhedu/html/wx/subject-video.html`,
    urlReceive: `${pageDomain}/zzhedu/html/wx/subject-receive.html`,
    urlMine: `${pageDomain}/zzhedu/html/wx/subject-mine.html`,
    urlPayment: `${pageDomain}/zzhedu/html/wx/payment.html`,
    urlMineBuy: `${pageDomain}/zzhedu/html/wx/subject-mine.html?#/mine/list`,
    urlArticleList: `${pageDomain}/zzhedu/html/wx/article.html`,
    urlConsultList: `${pageDomain}/zzhedu/html/wx/consult.html`,
    urlEstimate: 'https://wx.zhizihua.com/java/estimate',
    urlInterestTest: 'https://wx.zhizihua.com/interest-test/own',
    urlSubjectCommentPage: `${pageDomain}/zzhedu/html/wx/subject-comment.html`,
  });
}

if (appEnv == 'test') {
  appConfig = _.assign(appConfig, {
    urlEstimate: 'https://wx.test.zhizihua.com/java/estimate',
    urlInterestTest: 'https://wx.test.zhizihua.com/interest-test/own'
  });
}

window.zzhJs = _.assign({}, window.zzhJs, {config: appConfig});

if (window.Vue) {
  window.Vue.prototype.zzhJs = window.zzhJs;
}