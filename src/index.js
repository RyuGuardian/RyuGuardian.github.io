import Vue from 'vue';
import './styles/main.scss';
import Header from './components/layout/Header.vue';

var vm = new Vue({
  render: h => h(Header)
});

if(!Vue.options.components['vm']) {
  vm.$mount('header');
}
