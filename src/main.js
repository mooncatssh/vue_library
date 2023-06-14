import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import '../src/assets/css/global.css'
import axios from 'axios'

axios.defaults.baseURL='https://495j2232q7.goho.co'
Vue.prototype.$https = axios
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

/* 过滤器 */
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 +'').padStart(2,'0')
  const d =(dt.getDate() + '').padStart(2, '0')

  const hh =(dt.getHours() + '').padStart(2, '0')
  const mm =(dt.getMinutes() + '').padStart(2, '0')
  const ss =(dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
