export const state = () => ({
  someState: false,
});

export const getters = {
  someState: state => state.someState,
};

export const mutations = {
  SOME_MUTATION(state, val) {
    state.someState = val;
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
