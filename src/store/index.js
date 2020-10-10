export const state = () => ({
  hideNavigation: false,
});

export const getters = {
  hideNavigation: state => state.hideNavigation,
};

export const mutations = {
  toggleNavigation(state, val) {
    state.hideNavigation = val === undefined ? !state.hideNavigation : val;
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
