import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
})
