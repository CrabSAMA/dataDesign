import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import G6 from '@antv/g6';

import Main from './components/Main.vue'
import Login from './components/Login.vue'
import Relation from "./components/Relation";

Vue.prototype.G6 = G6
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false

let router = new VueRouter({
  routes: [
    //一个个对象
    { path: '/', component: Login },
    { path: '/main', component: Main },
    { path: '/relation', component: Relation },
  ]
});

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
