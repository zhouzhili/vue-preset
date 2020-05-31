// initial state
const state = {
  requestLoading: 0
}

// mutations
const mutations = {
  setLoading(state, num) {
    state.requestLoading += num
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
