import { createStore } from 'vuex'
import {
  getAllTourismAPI,
  getTourismAPI,
  getAllRestaurantAPI,
  getCityRoomsAPI,
} from '../request/api'

const state = () => ({
  allAttractions: [],
  attractions: [],

  restaurant: [],
  cityRooms: [],
})

const getters = {}

const mutations = {
  SET_SEARCH_TOURISM(state, resData) {
    state.attractions = []
    state.attractions = resData
  },
  SET_ALL_SEARCH_TOURISM(state, resData) {
    state.allAttractions = []
    state.allAttractions = resData
  },
  SET_CITY_RESTAURANT(state, resData) {
    state.restaurant = resData
  },
  SET_CITY_ROOMS(state, roomData) {
    state.cityRooms = roomData
  },
}

const actions = {
  // 取得[全部]景點
  async get_all_tourism({ commit }, filterData) {
    const res = await getAllTourismAPI(filterData)
    if (res.status === 200) commit('SET_ALL_SEARCH_TOURISM', res.data)
  },

  // 取得[指定]景點
  async get_tourism({ commit }, filterData) {
    try {
      const res = await getTourismAPI(filterData)
      if (res.status === 200) commit('SET_SEARCH_TOURISM', res.data)
    } catch (err) {
      console.log(err)
    }
  },

  // 取得[指定]餐飲
  async get_city_restaurant({ commit }, filterData) {
    const res = await getAllRestaurantAPI(filterData)
    if (res.status === 200) commit('SET_CITY_RESTAURANT', res.data)
  },

  // 取得[指定]旅宿
  async get_city_rooms({ commit }, filterData) {
    const res = await getCityRoomsAPI(filterData)
    if (res.status === 200) commit('SET_CITY_ROOMS', res.data)
  },
}

const store = createStore({
  state,
  getters,
  mutations,
  actions,
})

export default store
