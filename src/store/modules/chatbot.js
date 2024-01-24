import { getMessages } from '@/api/chatbot/message'

const state = {
  // ...其他狀態
  chatMessages: [] // 聊天消息數組
}

const mutations = {
  // ...其他mutations
  ADD_MESSAGE: (state, message) => {
    state.chatMessages.push(message)
  },
  CLEAR_MESSAGES: (state) => {
    state.chatMessages = []
  }
}

const actions = {
  // ...其他actions

  // 發送消息
  sendMessage({ commit }, { userId, sender, message }) {
    const newMessage = {
      userId: userId,
      sender: sender,
      message: message,
      sequence: state.chatMessages.length + 1 // 消息順序
    }
    commit('ADD_MESSAGE', newMessage)
  },

  // 清空聊天記錄
  clearMessages({ commit }) {
    commit('CLEAR_MESSAGES')
  },

  // Get chat messages
  getMessages({ commit }, { bot_id }) {
    return new Promise((resolve, reject) => {
      commit('CLEAR_MESSAGES')
      getMessages().then(response => {
        const messages = response.data
        messages.forEach(message => {
          commit('ADD_MESSAGE', message)
        })
        resolve(messages)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
