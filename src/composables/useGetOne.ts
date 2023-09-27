import { omdbApi } from '@/api/omdbApi'

export const useGetOne = () => {
  const getOneById = async (id: string) => {
    const { data } = await omdbApi.get('', {
      params: {
        i: id
      }
    })

    if (data.Response === 'False') {
      throw new Error(data.Error)
    }

    return data
  }
  return { getOneById }
}
