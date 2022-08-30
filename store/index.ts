import Vue from "vue";
import Vuex from "vuex";
import application, { State as ApplicationState } from "./modules/application";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    application
  },
  state: {},
  mutations: {},
  actions: {}
});

export interface State {
  application: ApplicationState;
}
