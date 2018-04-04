
const messageBridge = {
  callbacks: {},
  /**
   * listen once
   *
   * @param channel
   * @param callback
   */
  listenOnce(channel, callback) {
    this.listen(channel, callback, true);
  },
  /**
   * 监听指定的 app 消息渠道
   *
   * @param channel
   * @param callback
   * @param once
   */
  listen(channel, callback, once = true) {
    let dotIndex = channel.indexOf('.'),
      namespace = dotIndex != -1 ? channel.substring(dotIndex + 1): '';

    channel  = dotIndex == -1? channel: channel.substring(0, dotIndex);

    if (!this.callbacks.hasOwnProperty(channel)) {
      this.callbacks[channel] = {
        anonymous: [],
        namespaced: {}
      };
    }

    if (namespace.length) {
      // 如果解析到命名空间 将对应的回调 添加到对应命名空间
      this.callbacks[channel].namespaced[namespace] = {
        once, callback
      };
    } else {
      this.callbacks[channel].anonymous.push({
        once, callback
      });
    }

  },
  /**
   * 移除渠道监听 回调
   *
   * @param channel
   */
  off(channel) {
    let dotIndex = channel.indexOf('.'),
      namespace = dotIndex != -1 ? channel.substring(dotIndex + 1): '';

    channel  = dotIndex == -1? channel: channel.substring(0, dotIndex);


    if (namespace) {
      // 如果解析到 命名空间 删除对应命名空间的回调
      delete this.callbacks[channel].namespaced[namespace]
    } else {
      // 如果未解析到 命名空间 删除所有的监听
      this.callbacks[channel] = {
        anonymous: [],
        namespaced: {}
      };
    }
  },
  /**
   * 调用指定渠道的监听回调
   *
   * @param type
   * @param data
   */
  callListeners(type, data) {
    let channelListeners = this.callbacks[type];
    for (let i in channelListeners.anonymous) {
      let listener = channelListeners.anonymous[i];
      listener['callback'].call(null,  data);
      listener.once && delete channelListeners.anonymous[i];
    }

    channelListeners.anonymous = channelListeners.anonymous.filter(v => v);

    let indexNeedDelete = [];

    for (let i in channelListeners.namespaced) {
      let listener = channelListeners.namespaced[i];
      listener['callback'].call(null, data);
      if (listener.once) {
        indexNeedDelete.push(i);
      }
    }

    for (let i in indexNeedDelete) {
      delete channelListeners.namespaced[indexNeedDelete[i]];
    }
  },
  /**
   * 发送消息到js
   *
   * js 对 app 开放的接口
   *
   * @param content
   */
  sendToJs(content) {
    console.log('app返回信息')
    zzhJs.console.info(content);

    if (content === undefined) {
      zzhJs.console.error('异常：请输入消息主体');
      return;
    }

    if (typeof content == 'string') {
      try {
        content = JSON.parse(content);
      } catch (e) {
        zzhJs.console.error('异常: 消息主体解析错误！');
      }
    } else if (typeof content !== 'object') {
      zzhJs.console.error('异常：消息主体类型错误！');
      return;
    }

    if (!content['type']) {
      zzhJs.console.error('异常：请输入消息类型！');
      return;
    }

    let { type, status, message, data } = content;
    if (status !== 200) {
      return;
    }

    this.callListeners(type, data);
  },
  /**
   * 发送消息到 app
   *
   * js 发送 消息到 app 的接口
   *
   * @param content
   */
  sendToApp(content) {
    content = _.assign({
      type: '',
      status: 200,
      message: '',
      data: {}
    }, content);
    console.log('1')
    console.log(JSON.stringify(content));
    if (zzhJs.env.systemIs('ios')) {
      window.webkit.messageHandlers.messageToApp.postMessage(content);
    } else if (zzhJs.env.systemIs('android')) {
      window.zzhApp.messageToApp(JSON.stringify(content));
    }
  },
};

window.zzhJs = _.assign({}, window.zzhJs, { messageBridge });


if (window.Vue) {
  window.Vue.prototype.zzhJs = window.zzhJs;
}