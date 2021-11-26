<script setup>
import { reactive, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'

import HotRooms from './HotRooms.vue'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import { getCityRoomsData } from '../../utils/room'
import { scrollToArea } from '../../utils/gsap'
import { dataFilter } from '../../utils/dataUtils'
import cities from '../../utils/cityData'

import slideDown from '../../assets/icon/slideDown_default.svg'
import cover from '../../assets/images/cover3.jpeg'
import logo from '../../assets/images/logo-bark.svg'
import viewImage from '../../assets/images/room-image.jpeg'

const store = useStore()
SwiperCore.use([Pagination])

const state = reactive({
  coverImg: {
    backgroundImage: `url(${cover})`,
  },

  form: {
    city: 'Taipei',
  },

  searchData: [],

  activePage: 1,
  pageGroup: 9,
})

// 搜尋旅宿結果
const searchCityRoomsData = computed(() => store.state.cityRooms)
const filterDataTagsAry = computed(() =>
  dataFilter(['Class', 'Grade'], searchCityRoomsData.value)
)

// 如果更新城市
watch(
  () => state.form.city,
  () => {
    getCityRoomsData(state.form)
  }
)

onMounted(() => {
  // 搜尋當前城市旅宿
  getCityRoomsData(state.form)
})
</script>

<template>
  <!-- cover -->
  <div class="cover h-screen bg-cover bg-top relative" :style="state.coverImg">
    <div class="logo h-full flex items-center justify-center">
      <img class="px-10 md:px-0" :src="logo" alt="" />
    </div>
    <div class="absolute bottom-5 flex justify-center w-full slider-down">
      <button @click="scrollToArea('section')">
        <img :src="slideDown" alt="" />
      </button>
    </div>
  </div>

  <section
    class="
      grid grid-cols-1
      gap-1
      md:gap-4
      lg:gap-16
      mt-10
      md:grid-cols-3
      text-gray-500
      px-4
      sm:px-8
      xl:px-36
      min-h-[480px]
    "
  >
    <!-- 圖片區 -->
    <div class="col-span-1 px-10 md:px-0 py-0 md:py-10">
      <img
        class="h-full w-full object-cover rounded-tr-[100px] rounded-bl-[100px]"
        :src="viewImage"
        alt=""
      />
    </div>

    <!-- 篩選區 -->
    <div class="col-span-1 md:col-span-2 text-center tracking-wider">
      <div class="select py-4 md:py-20 px-0">
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#E8CB89"
            class="bi bi-building w-6 h-6 mr-3"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
            />
            <path
              d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"
            />
          </svg>
          快速找到您感興趣的住宿點
        </div>

        <!-- select 地區 -->
        <div class="select-area w-full relative my-3 md:my-8">
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

        <!-- 篩選屬性 -->
        <div class="col-span-1 grid grid-cols-3 gap-2">
          <div
            v-for="(tag, index) in filterDataTagsAry"
            :key="index"
            class="
              tag
              col-span-1
              flex
              justify-center
              items-center
              border
              text-sm
              rounded
              h-14
            "
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <HotRooms :search-city-rooms-data="searchCityRoomsData" />
</template>

<style scoped>
.hover-trigger .hover-target {
  display: none;
}
.hover-trigger:hover .hover-target {
  display: block;
}
</style>
