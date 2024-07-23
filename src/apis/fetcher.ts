import axios, { AxiosResponse } from 'axios'

const fetcher = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

fetcher.interceptors.response.use((response: AxiosResponse) => {
  return response.data
})

export default fetcher
