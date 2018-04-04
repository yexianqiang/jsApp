import moment from 'moment';

(function () {

  if (!window.Vue) {
    return;
  }

  /**
   * 在价格前面添加货币符号
   */
  Vue.filter('currency', value => {
    return '￥'+ value;
  });

  /**
   * 格式化 时间戳
   */
  Vue.filter('formatDate', (value, format) => {
    format = format? format: 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(format)
  });

  /**
   * 格式化时间戳，为xx分钟之前，xx月xx日
   * */
  Vue.filter('timeAgo', timeStamp => {
    let nowTime = new Date().getTime(), minute = 1000 * 60, hour = minute * 60, day = hour * 24, month = day * 30,
      diffTime = nowTime - timeStamp;
    if (diffTime < 0) {
      return '刚刚';
    }
    let diffMin = Math.floor(diffTime / minute), diffHour = Math.floor(diffTime / hour), diffDay = Math.floor(diffTime / day), diffMonth = Math.floor(diffTime / month);
    if (diffMonth > 12) {
      let year = new Date(timeStamp).getFullYear(), month = new Date(timeStamp).getMonth() + 1, date = new Date(timeStamp).getDate();
      month = month > 10 ? month : '0'+ month;
      date = date > 10 ? date : '0'+ date;
      return year + '年' + month + '月' + date + '日';
    }
    if (diffDay >= 7) {
      return new Date(timeStamp).getMonth() + 1 + '月' + new Date(timeStamp).getDate() + '日';
    } else if (diffDay < 7 && diffDay >= 1){
      return diffDay + '天前';
    } else if (diffHour >= 1 && diffHour < 24){
      return diffHour + '小时前';
    } else if (diffMin >= 1 && diffMin < 60) {
      return diffMin + '分钟前';
    } else if ( diffTime > 0 && diffTime < minute) {
      return '刚刚';
    }

  })


  /**
   * 格式化 手机号
   */
  Vue.filter('maskMobile', (value) => {
    return String.prototype.replace.call(value, /(\d{3})(\d{4})(\d{4})/, '$1****$3');
  });

})()
