import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// px2rem 自适应
import "lib-flexible";
import "styles/reset.css";
import "styles/iconfont.css";
import myCharts from './assets/js/myCharts'; //引入eCharts 文件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.use(myCharts);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
