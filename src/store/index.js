import { createStore } from "vuex";

const state = () => ({
	data: 123
})

const getters = {}
const mutations = {}
const actions = {}

const store = createStore({
	state,
	getters,
	mutations,
	actions,
})

export default store