// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import ImageComponent from './components/ImageComponent.vue'

Vue.config.productionTip = false
Vue.use(VueResource)

Vue.component('ImageComponent', ImageComponent);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
