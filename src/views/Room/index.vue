<script setup>
import { reactive, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import cities from '../../utils/cityData'
import { pageData } from '../../utils/pagePagination'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import cover from '../../assets/images/cover3.jpeg'
import logo from '../../assets/images/logo-bark.svg'
import slideDown from '../../assets/icon/slideDown_default.svg'
import noImage from '../../assets/images/no-image.jpeg'

const route = useRoute()
const routeQueryCity = route.query.city
const store = useStore()
const state = reactive({
  coverImg: {
    backgroundImage: `url(${cover})`,
  },
  page: 1,

  form: {
    city: null,
  },

  resData: [],

  activePage: 1,
  pageGroup: 9,
})

// 如果更新城市
watch(
  () => state.form.city,
  () => {
    state.activePage = 1
    getCityRestaurantData()
  }
)

const activeCityNameZH = computed(() => {
  let cityNameZh
  for (let cityIndex in cities) {
    if (cities[cityIndex] === state.form.city) cityNameZh = cityIndex
  }
  return cityNameZh
})

const stateDataFilterAcitveCity = computed(() =>
  store.state.restaurant.filter((item) => item.City === activeCityNameZH.value)
)

const totalPage = computed(() =>
  Math.ceil(stateDataFilterAcitveCity.value.length / state.pageGroup)
)

function goSectionArea() {
  const target = document.querySelector('section')
  gsap.to(window, { duration: 0.6, ease: 'power1', scrollTo: target })
}

function goGoogleMap(name, city) {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${name + city}`,
    'blacnk'
  )
}

function getCityRestaurantData() {
  state.resData = pageData(
    stateDataFilterAcitveCity.value,
    state.activePage,
    state.pageGroup
  )
}

function nextPage(resData, state, counts) {
  if (state.activePage >= totalPage.value) return false
  state.activePage++
  state.resData = pageData(
    stateDataFilterAcitveCity.value,
    state.activePage,
    counts
  )
}

function prevPage(resData, state, counts) {
  if (state.activePage < 2) return false
  state.activePage--
  state.resData = pageData(
    stateDataFilterAcitveCity.value,
    state.activePage,
    counts
  )
}

function initSelectCityName(cityName = 'NantouCounty', form) {
  form.city = cityName
}

onMounted(async () => {
  await initSelectCityName(routeQueryCity, state.form)
  await store.dispatch('get_city_restaurant', state.form)
  getCityRestaurantData()
})
</script>

<template>
  <!-- cover -->
  <div class="cover h-screen bg-cover bg-top relative" :style="state.coverImg">
    <div class="logo h-full flex items-center justify-center">
      <img class="px-10 md:px-0" :src="logo" alt="" />
    </div>
    <div class="absolute bottom-5 flex justify-center w-full slider-down">
      <button @click="goSectionArea">
        <img :src="slideDown" alt="" />
      </button>
    </div>
  </div>

  <section class="grid grid-cols-1 px-4 md:px-0 md:grid-cols-5 text-gray-500">
    <div class="col-start-2 col-span-3 py-20 text-center tracking-wider">
      <p>
        民以食為天的臺灣，幾乎是三步一小吃店，五步一大餐廳，可說是應有盡有。近年來由於工商業的發展快速，臺灣吃的文化除了傳統的中式飲食方式外，也發展到中式速食連鎖店的經營方式，使得臺灣吃的藝術變得更加繁複。
      </p>
      <p class="mt-8">
        因臺灣地處世界文化交流的總匯，世界各國的飲食也紛紛在臺灣出現，美國的漢堡、義大利的披薩、日本的生魚片、德國的豬腳、瑞士的乳酪等等，包羅萬象，讓臺灣著實成為饕家的天堂。而臺灣獨有的本土料理，風靡全球，嚐味一次，必將永生難忘。
      </p>

      <!-- LOGO -->
      <div class="my-16">
        <img class="mx-auto" width="120" :src="logo" alt="" />
      </div>

      <!-- SELECTOR -->
      <div
        class="
          select
          grid grid-cols-1
          gap-2
          md:grid-cols-2
          py-8
          border-t-2 border-b-2
          px-0
          md:px-6
        "
      >
        <div
          class="
            flex
            justify-center
            lg:justify-start
            items-center
            text-xl
            font-bold
          "
        >
          您想找哪個地方的美食呢？
        </div>

        <!-- select 地區 -->
        <div class="select-area w-full relative my-3 md:my-0">
          <select
            v-model="state.form.city"
            class="
              w-full
              appearance-none
              bg-input-bg
              border
              text-gray-700
              py-3
              px-4
              pr-8
              rounded-xl
              leading-tight
              focus:outline-none focus:border-primary
            "
          >
            <option v-for="(city, index) in cities" :key="city" :value="city">
              {{ index }}
            </option>
          </select>
          <div
            class="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              flex
              items-center
              px-2
              text-black
            "
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section
    class="
      grid grid-cols-3
      sm:grid-cols-6
      lg:grid-cols-9
      px-4
      md:px-[140px]
      mb-10
      md:mb-20
    "
  >
    <!-- 美食資料 -->
    <div
      v-for="item in state.resData"
      :key="item.ID"
      class="relative col-span-3 min-h-[350px] md:min-h-[210px] max-h-[300px]"
    >
      <div class="absolute hover:bg-black opacity-70 inset-0 hover-trigger">
        <div class="hover-target h-full text-white">
          <div class="flex h-full flex-col justify-between">
            <div class="btn px-7 pt-7">
              <!-- MAP -->
              <button
                class="border rounded-full p-1 mr-3"
                @click="goGoogleMap(item.Name, item.City)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <!-- PHONE -->
              <button class="border rounded-full p-1">
                <a :href="`tel:${item.Phone}`">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                </a>
              </button>
            </div>
            <div class="text text-center mb-8 px-2">
              <div class="title text-lg">{{ item.Name }}</div>
              <div class="title text-sm">{{ item.Address }}</div>
            </div>
          </div>
        </div>
      </div>
      <img
        class="w-full h-full object-cover object-center"
        :src="item.Picture.PictureUrl1 || noImage"
        alt=""
      />
    </div>

    <div
      class="col-span-3 sm:col-span-6 lg:col-span-9 px-4 py-4 flex justify-end"
    >
      <!-- 上一頁 -->
      <button
        class="
          rounded-full
          border
          h-12
          w-12
          flex
          justify-center
          items-center
          mr-10
        "
        :class="state.activePage < 2 ? 'border-gray-200' : 'border-primary2'"
        @click="prevPage(stateDataFilterAcitveCity, state, state.pageGroup)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          :class="state.activePage < 2 ? 'text-gray-200' : 'text-primary2'"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <!-- 下一頁 -->
      <button
        class="rounded-full border h-12 w-12 flex justify-center items-center"
        :class="
          state.activePage >= totalPage ? 'border-gray-200' : 'border-primary2'
        "
        @click="nextPage(stateDataFilterAcitveCity, state, state.pageGroup)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          :class="
            state.activePage >= totalPage ? 'text-gray-200' : 'text-primary2'
          "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hover-trigger .hover-target {
  display: none;
}
.hover-trigger:hover .hover-target {
  display: block;
}
</style>
