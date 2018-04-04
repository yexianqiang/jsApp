
import Vue from 'vue';
import Confirm from './Confirm';
import Notify from './Notify';
import Loading from './Loading';
import CopyUrlBtn from './CopyUrlBtn';
import SubjectHome from './SubjectHome';
import FooterNav from './FooterNav';
import DownLoad from './DownLoad';

const list = [Confirm, Notify, Loading, SubjectHome, CopyUrlBtn, FooterNav, DownLoad];

list.forEach(function (item) {
  Vue.component(item.name, item.component);
  Vue.mixin(item.mixin);
});

module.exports = {};