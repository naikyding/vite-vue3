// 取得指定[縣市]觀光景點資料  https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/NewTaipei?$top=30&$format=JSON
// 取得所有[縣市]觀光景點資料 https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON
import { request } from './index'

// 取得[所有]觀光景點資料
export const getAllTourismAPI = ({ $top = '30', $format = 'JSON' }) =>
  request.get(`ScenicSpot`, {
    params: { $top, $format },
  })

// 取得[指定]觀光景點資料
export const getTourismAPI = ({
  city = 'NewTaipei',
  $top = '30',
  $format = 'JSON',
  $filter = null,
}) => {
  return request.get(`ScenicSpot/${city}`, {
    params: {
      city,
      $top,
      $format,
      $filter,
    },
  })
}
