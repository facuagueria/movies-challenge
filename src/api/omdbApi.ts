import axios from 'axios'

export const omdbApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
  params: {
    apikey: `${import.meta.env.VITE_API_KEY}`
  },
  headers: {
    // Authorization: `token ${process.env.GITHUB_TOKEN}`,
  }
})
