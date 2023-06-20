import Vue from "vue";
import App from "./App.vue";
import uView from "uview-ui";
import store from "./store";

Vue.use(uView);
// uni.$u.config.unit = "rpx";

Vue.config.productionTip = false;

const app = new Vue({
  store,
  render: (h) => h(App)
})
app.$mount();

// 此写法会导致App白屏
// new Vue({
//   store,
//   render: (h) => h(App)
// }).$mount("#app");
