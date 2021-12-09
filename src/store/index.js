import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: undefined,
      name: '',
      email: '',
      account:'',
      avatar:'',
      cover:'',
      introduction:''
    },
    isAuthenticated: false,
    token: '',
    isReplying:false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }

      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')

      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false

      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    },
    toggleReplyModal(state){
      state.isReplying = !state.isReplying
    }
  },
  actions: {
    // 在 actions 中可以透過參數的方式取得 commit 的方法
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()

        const { id, name, email, avatar, account, cover, introduction } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          avatar,
          account,
          cover,
          introduction
        })
        return true
      } catch (error) {
        console.error(error.message)

        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})

