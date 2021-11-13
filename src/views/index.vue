<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getAllTourismAPI, getTourismAPI } from '../request/api'

import cover1 from '../assets/images/cover1.jpeg'
import taiwanLogo from '../assets/images/taiwan_logo_white.svg'
import cities from '../utils/cityData'

const state = reactive({
  data: [],
  website: {
    name: 'TAIWAN TRAVEL',
    cover: { backgroundImage: `url(${cover1})`},
  },
  navs: [
    '旅遊情報',
    '景點查詢',
    '美食推薦',
    '旅宿資訊',
    '節慶活動'
  ],
  mobile: {
    navStatus: false 
  },
  cities
})


onMounted(async() => {
  const res = await getAllTourismAPI({})
  await getTourismAPI({})
  // state.data = res.data
})

// console.log(tourism)
</script>


<template>
  <div class="min-h-screen bg-center bg-cover flex items-center justify-center flex-col relative" :style="state.website.cover">
    <!-- mobile nav -->
    <div v-show="state.mobile.navStatus" @click="state.mobile.navStatus = false" class="absolute z-10 bg-black opacity-50 inset-0"></div>
    <div v-show="state.mobile.navStatus" class="bg-white absolute z-20 top-0 left-0 p-4 w-full">
      <div @click="state.mobile.navStatus = false" class="close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <ul class="px-16">
        <li class="block text-center text-primary3 cursor-pointer hover:text-white py-4 hover:bg-primary rounded-lg my-4" v-for="nav in state.navs" :key="nav">
          <a class=" text-shadow-lg tracking-wider" href="#">{{ nav }}</a>
        </li>
      </ul>
    </div>

    <!-- web nav -->
    <nav class="absolute top-0 inset-x-0 flex justify-between items-center px-4 pt-4 sm:pt-0 sm:px-8 xl:px-36">
      <!-- mobile menu btn -->
      <button @click="state.mobile.navStatus = true" class="text-white sm:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" fill="red" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- website logo -->
      <a href="/" class="text-white text-2xl">{{ state.website.name }}</a>

      <!-- nav items -->
      <ul class="items-center h-20 hidden sm:flex">
        <li class="sm:px-1 lg:px-6" v-for="nav in state.navs" :key="nav">
          <a class="text-white text-shadow-lg tracking-wider" href="#">{{ nav }}</a>
        </li>
      </ul>
    </nav>

    <section class="text-center w-full">
      <!-- taiwan logo -->
      <img :src="taiwanLogo" class="px-10 m-auto" alt="taiwan">

      <div class="search-area bg-white py-3 md:py-7 px-3 md:px-5 rounded-3xl flex flex-col md:flex-row w-4/5 md:w-3/5 m-auto transform translate-y-16 sm:translate-y-10 md:translate-y-0">

        <!-- select -->
        <div class="select-area w-full relative">
          <select name="" class="w-full appearance-none bg-input-bg border text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-primary">
            <option v-for="(city, index) in cities" :key="city" :value="city">{{ index }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <!-- select -->
        <div class="select-area w-full relative mx-0 md:mx-4 my-3 md:my-0">
          <select name="" class="w-full appearance-none bg-input-bg border text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-primary">
            <option v-for="(city, index) in cities" :key="city" :value="city">{{ index }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        <!-- search btn -->
        <button class="bg-primary rounded-xl text-white px-8 py-3">
          SEARCH
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>