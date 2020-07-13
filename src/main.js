import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'
// px2rem 自适应
import "lib-flexible";
import "styles/reset.css";
import "styles/iconfont.css";
import worldMap from './assets/js/worldMap'; //引入eCharts 文件
import chinaMap from './assets/js/chinaMap'; //引入eCharts 文件
import lineChart from './assets/js/lineChart'; //引入eCharts 文件
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(worldMap);
Vue.use(chinaMap);
Vue.use(lineChart);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  filter,
  render: h => h(App)
}).$mount('#app');
