export const state = () => ({
  clearUnregisteredModulesCount: 0,
  hideNavigation: false,
});

export const getters = {
  hideNavigation: state => state.hideNavigation,
};

export const mutations = {
  toggleNavigation(state, val) {
    state.hideNavigation = val === undefined ? !state.hideNavigation : val;
  },
  clearUnregisteredModules(state) {
    state.clearUnregisteredModulesCount += 1;
  },
};

export const actions = {
  // someAction: ({
  //   state,
  //   rootState,
  //   commit,
  //   dispatch,
  //   getters,
  //   rootGetters,
  // }) => {},
};
