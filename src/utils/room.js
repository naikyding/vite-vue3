import store from '../store/index'

export function getCityRoomsData(filterData) {
  store.dispatch('get_city_rooms', filterData)
}
