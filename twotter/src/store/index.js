import { createStore } from 'vuex'
import { UserModule } from './User'

export default createStore({
  state: {
    // user: null
  },
  getters: {
  },
  // Mutations are functions that effect the STATE (in all caps)
  mutations: {
    // SET_USER(state, user) {
    //   state.user = user;
    // }
  },
  // Actions are functions that you call throughout your application that call mutations
  actions: {
    // setUser({ commit }, user) {
    //   commit('SET_USER', user);
    // }
  },
  modules: {
    User: UserModule
  }
})
