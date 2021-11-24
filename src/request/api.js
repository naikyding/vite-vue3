// 取得指定[縣市]觀光景點資料  https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/NewTaipei?$top=30&$format=JSON
// 取得所有[縣市]觀光景點資料 https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON
import { request } from './index'

// 取得[所有]觀光景點資料
export const getAllTourismAPI = ({
  $top = '30',
  $format = 'JSON',
  $filter = null,
}) =>
  request.get(`ScenicSpot`, {
    params: { $top, $format, $filter },
  })

// 取得[指定]觀光景點資料
export const getTourismAPI = ({
  city = 'NewTaipei',
  $top = null,
  $format = 'JSON',
  $filter = null,
}) =>
  request.get(`ScenicSpot/${city}`, {
    params: {
      city,
      $top,
      $format,
      $filter,
    },
  })

// 取得[指定城市]餐飲資料
export const getAllRestaurantAPI = ({
  city = 'NewTaipei',
  $top = null,
  $format = 'JSON',
  $filter = null,
}) =>
  request.get('Restaurant', {
    params: {
      city,
      $top,
      $format,
      $filter,
    },
  })

export const getCityRoomsAPI = ({
  city = 'NewTaipei',
  $top = null,
  $format = 'JSON',
  $filter = null,
}) =>
  request.get(`/Hotel/${city}`, {
    params: {
      city,
      $top,
      $format,
      $filter,
    },
  })
