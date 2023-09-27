import type { OwnList } from '@/types/ownMovieSeries'
import { useNotification } from '@/composables/useNotification'
import { useRouter } from 'vue-router'

export const useOwnList = () => {
  const { showError, showSuccess } = useNotification()
  const router = useRouter()

  const getOwnList = () => {
    try {
      const currentList = localStorage.getItem('ownList') || '[]'
      return JSON.parse(currentList)
    } catch (error) {
      showError('Error while fetching Movie/Series. Try Again!')
    }
  }

  const getOne = (id: string) => {
    try {
      const currentList = localStorage.getItem('ownList') || '[]'
      return JSON.parse(currentList).find((item: OwnList) => item.id === id)
    } catch (error) {
      showError('Error while fetching Movie/Series. Try Again!')
    }
  }

  const create = (formFields: OwnList) => {
    try {
      const currentList = localStorage.getItem('ownList') || '[]'
      const newList = [...JSON.parse(currentList), formFields]

      localStorage.setItem('ownList', JSON.stringify(newList))

      router.push({ name: 'own-movies-series' })
    } catch (error) {
      showError('Error while adding Movie/Series. Try Again!')
    }
  }

  const updateOne = (formFields: OwnList) => {
    try {
      const currentList = localStorage.getItem('ownList') || '[]'

      const filteredList = JSON.parse(currentList || '[]').filter(
        (item: OwnList) => item.id !== formFields.id
      )

      const updatedList = [...filteredList, formFields]

      localStorage.setItem('ownList', JSON.stringify(updatedList))

      router.push({ name: 'own-movies-series' })
    } catch (error) {
      showError('Error while updating Movie/Series. Try Again!')
    }
  }

  const deleteOne = (id: string) => {
    try {
      const currentList = localStorage.getItem('ownList')

      const filteredList = JSON.parse(currentList || '[]').filter((item: OwnList) => item.id !== id)

      localStorage.setItem('ownList', JSON.stringify(filteredList))

      showSuccess('Movie/Series deleted successfully')
    } catch (e) {
      showError('Error while deleting Movie/Series. Try Again!')
    }
  }
  return { getOwnList, getOne, create, deleteOne, updateOne }
}
