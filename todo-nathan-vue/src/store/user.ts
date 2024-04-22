import { computed, reactive } from 'vue'
import * as Request from '@/requests'
import router from '@/router'

const state = reactive({
  email: '',

  error: ''
})

const getters = reactive({
  isLoggedIn: computed(() => state.email !== '')
})

const actions = {
  async getUser() {
    const user = await Request.getUser()
    if (user === null) return

    state.email = user.email
  },
  async login(username: string, password: string) {
    const user = await Request.login(username, password)
    if (user == null) {
      state.error = 'Could not found user.'
      return false
    }
    state.email = user.email
    state.error = ''

    return router.push('/todo')
  },
  async logout() {
    state.email = ''
  }
}

export default { state, getters, ...actions }