import Vue from 'vue';
import GlobalEvents from 'vue-global-events';

import './styles/main.scss';
import App from './App.vue';

import playerControls from './components/player/controls';

Vue.component('GlobalEvents', GlobalEvents);
Vue.config.keyCodes = Object.assign({}, playerControls);

var vm = new Vue({
  render: h => h(App)
});

if(!Vue.options.components['vm']) {
  vm.$mount('#app');
}
