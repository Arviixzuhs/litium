import axios from 'axios'
import qs from 'qs'

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encode: false,
      allowDots: true,
      arrayFormat: 'repeat',
    }),
})
