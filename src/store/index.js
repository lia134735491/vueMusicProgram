import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '黑皮音乐'
    // offLogin: false
  },
  mutations: {
    headerTitleChange(state,newTitle) {
      state.title = newTitle
      console.log('aaa')
    }
  },
  actions: {
  },
  modules: {
  }
})
