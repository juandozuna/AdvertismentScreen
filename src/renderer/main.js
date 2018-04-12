import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import jquery from 'jquery'
import bootstrap from 'bootstrap'
require('jquery');


import App from './App'
import router from './router'
import store from './store'
const fs = require('fs');
const path = require('path');
Vue.use(BootstrapVue);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
window.options = JSON.parse(fs.readFileSync(path.join(__static, 'options.json')));
Vue.prototype.$eventBus = new Vue();
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
