import { useToast } from 'primevue/usetoast'

export const useNotification = () => {
  const toast = useToast()
  const showError = (message: string) => {
    toast.add({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 })
  }

  const showSuccess = (message: string) => {
    toast.add({ severity: 'success', summary: 'Error Message', detail: message, life: 3000 })
  }
  return { showError, showSuccess }
}
