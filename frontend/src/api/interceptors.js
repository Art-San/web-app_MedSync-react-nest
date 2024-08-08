import axios from 'axios'
import { getContentType } from './api.helpers'
import { VITE_URL_API } from '../configs/api.config'

// const api = '/api'
export const axiosClassic = axios.create({
  baseURL: VITE_URL_API,
  // baseURL: import.meta.env.VITE_API_URL + api,
  // timeout: 15_000, //  Это означает, что если сервер не ответит в течение 15 секунд, запрос будет прерван, и axios сгенерирует ошибку таймаута
  headers: getContentType(),
  // withCredentials: true // Запросы: учетные данные ВКЛЮЧЕНО (если true на backend должно app.enableCors({origin: 'http://localhost:5173', credentials: true,}))
  withCredentials: false // в положение false получилось отправить запрос (CORS не мешал)
})
