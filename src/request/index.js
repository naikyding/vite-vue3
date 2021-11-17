import axios from 'axios'
import { getHeaders } from './headers'

// 取得所有[ ]觀光景點資料
export const request = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/',
  timeout: 50000, // request timeout
})

request.interceptors.request.use((config) => {
  config.headers = getHeaders()
  return config
})

request.interceptors.response.use((res) => {
  // console.log('response')
  return res
})
