import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'
import { useAuthStore } from '@/stores/auth'

export const useAuth = () => {
  const router = useRouter()
  const { showError } = useNotification()
  const store = useAuthStore()

  const email = ref('')
  const password = ref('')
  const login = () => {
    //Dummy auth
    if (!store.authenticate(email.value, password.value)) {
      showError('Invalid credentials')
      return
    }

    router.push({ name: 'movies' })
  }

  const logout = () => {
    store.logout()
    router.push({ name: 'login' })
  }

  return { email, password, userAuthenticated: store.getUser, login, logout }
}
