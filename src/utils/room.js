import store from '../store/index'
import cities from '../utils/cityData.json'

// 依城市取得房間資料
export const getCityRoomsData = (filterData) => {
  store.dispatch('get_city_rooms', filterData)
}

// 城市 value 轉 key
export const cityValue2Key = (cityValue) => {
  let cityNameZH = null
  for (let cityIndex in cities) {
    if (cities[cityIndex] === cityValue) cityNameZH = cityIndex
  }
  return cityNameZH
}
