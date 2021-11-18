// import cities from '../utils/cityData.json'
import store from '../store'

// 取得全部旅遊景點
export async function getAllTourism(filterData) {
  await store.dispatch('get_all_tourism', filterData)
}

// 取得各別旅遊景點
export async function getOneCityTourism(filterData) {
  await store.dispatch('get_tourism', filterData)
}

// 關鍵字處理
export function searchKeyword(typeAry, keyword) {
  let str = ''
  if (!Array.isArray(typeAry))
    return (str = str + `contains(${typeAry}, '${keyword}')`)

  typeAry.forEach((item, index) => {
    if (index > 0) return (str = str + ` or contains(${item}, '${keyword})'`)
    str = str + `contains(${typeAry}, '${keyword}')`
  })
  return str
}
