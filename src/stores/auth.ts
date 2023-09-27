import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { EMAIL, PASSWORD } from '@/utils/auth'
import { v4 as uuidv4 } from 'uuid'

export const useAuthStore = defineStore('user-auth', () => {
  const user = ref({ email: '', token: '' })
  const tokenKey = JSON.parse(localStorage.getItem('tokenAuth') || '{}')
  user.value.email = tokenKey.email
  user.value.token = tokenKey.token

  const authenticate = (email: string, password: string) => {
    if (email !== EMAIL || password !== PASSWORD) {
      return false
    }

    const token: string = uuidv4()

    localStorage.setItem('tokenAuth', JSON.stringify({ email: email, token: token }))
    user.value = { email: email, token: token }

    return true
  }

  const getUser = computed(() => user.value)

  const logout = () => {
    localStorage.removeItem('tokenAuth')
    user.value = { email: '', token: '' }
  }

  return { user, getUser, authenticate, logout }
})
