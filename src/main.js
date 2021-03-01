import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios"
import qs from "qs"
import router from "./router"


Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
    render: h => h(App),
    router,
}).$mount('#app')