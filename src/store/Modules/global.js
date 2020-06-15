const global = {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val;
    }
  },
  actions: {
    setLoading({
      commit
    }, value) {
      commit('setLoading', value)
    }
  },
  getters: {
    getLoading(state) {
      return state.loading;
    }
  }
}

export default global;