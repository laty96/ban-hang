// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App';
import router from "./router/index";
Vue.use(VModal, {
  dynamic: true,
  injectModalsContainer: true,
  dialog: true,
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App,
  },
  router,
  template: '<App/>',
});
