import * as mutationTypes from "../mutationTypes";

export interface State {
  applicationCode;
}
const initState: State = {
  applicationCode: ""
};
const mutations = {
  [mutationTypes.SET_APPLICATION_CODE](state: State, applicationCode) {
    state.applicationCode = applicationCode;
  }
};

const getters = {
  applicationCode: (state: State) => state.applicationCode
};

export default {
  state: initState,
  mutations,
  getters
};
