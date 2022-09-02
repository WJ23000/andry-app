import Vue from "vue";
import App from "./App.vue";
import uView from "uview-ui";
import store from "./store";

Vue.use(uView);
// uni.$u.config.unit = "rpx";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App)
}).$mount("#app");
