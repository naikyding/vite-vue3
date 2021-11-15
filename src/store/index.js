import { createStore } from "vuex";
import { getAllTourismAPI, getTourismAPI } from '../request/api'


const state = () => ({
	attractions: []
})

const getters = {}

const mutations = {
	SET_SEARCH_TOURISM(state, resData) {
		state.attractions = resData
	}
}

const actions = {
	async get_all_tourism({commit}, filterData) {
		const res = await getAllTourismAPI(filterData)
		if(res.status === 200) commit('SET_SEARCH_TOURISM', res.data)
	},

	async get_tourism({ commit }, filterData) {
		console.log(filterData)
		const res = await getTourismAPI(filterData)
		console.log(res.data)
		if(res.status === 200) commit('SET_SEARCH_TOURISM', res.data)
	}
}

const store = createStore({
	state,
	getters,
	mutations,
	actions,
})

export default store