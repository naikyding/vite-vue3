<script setup>
import {reactive, onMounted, computed} from 'vue'
import { useStore } from 'vuex'

import Header from '../../components/Header.vue'
import coverImg from '../../assets/images/cover4.jpeg'
import cities from '../../utils/cityData'
import selectArrow from '../../assets/icon/arrangement.svg'

const store = useStore()
// 取得所有旅遊景點
const getAllTourism = () => store.dispatch('get_all_tourism', {$top: 8})
getAllTourism()

const state = reactive({
  cover: {backgroundImage: `url(${coverImg})`},
  title: ['熱門景點', '快速搜尋', '搜尋結果'],
  cities,
  class: [
    {'全部': 'all'},
    {'全部': 'all'},
    {'全部': 'all'},
  ]
})

const stateTourismData = computed(() => store.state.attractions)

onMounted(() => {
})
</script>

<template>
  <Header />

  <!-- cover image -->
  <div
    class="header-bg mt-16 sm:mt-20 h-16 sm:h-40 bg-center bg-cover"
    :style="state.cover"
  />

  <div class="px-4 sm:px-8 xl:px-36">
    <!-- URL PATH -->
    <p class="py-2 text-xs">
      <router-link to="/"> 首頁 </router-link>
      >
      <span class="text-secondary"> 景點查詢 </span>
    </p>

    <!-- 熱門景點 -->
    <section class="mt-5">
      <h2 class="text-xl text-secondary">
        {{ state.title[0] }}
      </h2>
      <div class="slider h-56 bg-red-400"></div>
    </section>

    <div class="grid grid-cols-1 md:gap-10 md:grid-cols-3">
      <!-- 快速搜尋 -->
      <section class="mt-5">
        <h2 class="hidden text-xl font-medium text-secondary">
          {{ state.title[1] }}
        </h2>

        <!-- search bar -->
        <div
          class="
            search-bar
            flex
            h-14
            rounded-xl
            items-center
            px-4
            leading-tight
            border border-gray-200
            focus-within:border-primary
          "
        >
          <input
            type="text"
            class="w-full appearance-none h-full focus:outline-none text-xl"
            placeholder="關鍵字查詢"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <!-- search select -->
        <div class="search-select shadow-xl border rounded-xl mt-8 px-4 py-5">
          <p class="text-xl mb-4">篩選內容</p>
          <h2 class="text-xl text-secondary mb-2">縣市</h2>
          <!-- select -->
          <div class="select-area w-full relative">
            <select name="" class="w-full appearance-none bg-input-bg border text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:border-primary">
              <option v-for="(city, index) in cities" :key="city" :value="city">{{ index }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          <hr class="my-4 border-1 bg-gray-200">

          <h2 class="text-xl text-secondary mb-2">類別</h2>
          <label class="block" v-for="item in state.class" :key="item">
            <input class="mr-2" name="class" type="radio" >
            <span class="text-primary3">{{ Object.keys(item)[0]}}</span>
          </label>

          <!-- search btn -->
          <div class="text-center mt-5">
            <button class="bg-primary rounded-xl text-white px-10 py-3">
              SEARCH
            </button>
          </div>
        </div>
      </section>

      <!-- 搜尋結果 -->
      <section class="mt-5 col-span-2">
        <div class="flex justify-between items-center">
          <h2 class="block text-xl text-secondary">
            {{ state.title[2] }}
          </h2>

          <!-- filter btn -->
          <div class="filter-btn">
            <!-- select -->
            <div class="select-area w-full relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-black">
                <img class="h-6" :src="selectArrow" alt="">
              </div>
              
              <select name="" class="w-full h-14 appearance-none bg-white border text-gray-700 py-3 px-4 pl-10 rounded-xl leading-tight focus:outline-none focus:border-primary">
                <option>排序: 熱門度</option>
              </select>
            </div>
          </div>
        </div>

        <!-- result items -->
        <div class="result-items col-span-3 mt-8">
          <figure class="bg-white border shadow rounded-2xl flex overflow-hidden mb-10" v-for="item in stateTourismData" :key="item.ID">
            <img class="h-auto w-80" :src="item.Picture.PictureUrl1" :alt="item.Name">
            <figcaption class="px-4 py-5 flex-1">
              <h2 class="block text-xl mb-2 text-secondary">
                {{ item.Name }}
              </h2>
              <div class="description text-gray-500">
                {{ item.Description.length > 70 ? item.Description.slice(0, 70) + '...' : item.Description }}
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  </div>
</template>