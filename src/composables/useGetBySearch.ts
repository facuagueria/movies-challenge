import { omdbApi } from '@/api/omdbApi'
import type { Data } from '@/types'
import { ref } from 'vue'
import { useNotification } from '@/composables/useNotification'
import type { PageState } from 'primevue/paginator'

export const useGetBySearch = () => {
  const { showError } = useNotification()

  const search = ref<string | null>(null)
  const termSent = ref<string>('')
  const result = ref<Data | null>(null)
  const isLoading = ref<boolean>(false)
  const errorMessage = ref<string>('')

  const getAllBySearchAndType = async (search_data: string, type: string, page: number) => {
    const { data } = await omdbApi.get('', {
      params: {
        s: search_data,
        type: type,
        page: page
      }
    })

    if (data.Response === 'False') {
      throw new Error(data.Error)
    }

    return data
  }

  const getBySearch = (type: string, page: number) => {
    if (!search.value) {
      errorMessage.value = 'This field is required'
      return
    } else {
      errorMessage.value = ''
    }

    isLoading.value = true
    termSent.value = search.value

    getAllBySearchAndType(search.value, type, page)
      .then((res: Data) => {
        result.value = res
      })
      .catch((error: string) => {
        result.value = null
        showError(error)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const paginateResult = (type: string, page: PageState) => {
    getBySearch(type, page.page + 1)
  }

  const clear = () => {
    search.value = null
    result.value = null
    termSent.value = ''
    isLoading.value = false
    errorMessage.value = ''
  }

  return {
    search,
    termSent,
    result,
    isLoading,
    errorMessage,
    getBySearch,
    getAllBySearchAndType,
    paginateResult,
    clear
  }
}
