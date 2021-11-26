<script setup>
import { reactive, onMounted, computed, watch } from 'vue'
import { getCityRoomsData } from '../../utils/room'
import { useStore } from 'vuex'
import { scrollToArea } from '../../utils/gsap'
import { dataFilter } from '../../utils/dataUtils'
import noImage from '../../assets/images/no-image.jpeg'
import { Swiper, SwiperSlide } from 'swiper/vue'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import noData from '../../assets/images/no-data.png'

SwiperCore.use([Pagination])

import cities from '../../utils/cityData'

import cover from '../../assets/images/cover3.jpeg'
import logo from '../../assets/images/logo-bark.svg'
import slideDown from '../../assets/icon/slideDown_default.svg'

const store = useStore()
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

onMounted(async () => {
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

  <section class="grid grid-cols-1 px-4 md:px-0 md:grid-cols-5 text-gray-500">
    <div
      class="
        col-span-1
        md:col-start-2 md:col-span-3
        py-20
        text-center
        tracking-wider
      "
    >
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
          您想找哪個地方的旅宿呢？
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

  <!-- 搜尋區塊 -->
  <div class="px-4 py-10 md:px-8">
    <div
      v-show="searchCityRoomsData.length < 1"
      class="flex justify-center items-center"
    >
      <img :src="noData" alt="no data" />
    </div>
    <Swiper
      v-show="searchCityRoomsData.length > 1"
      :style="{ '--swiper-pagination-color': '#7BAEBE' }"
      :slides-per-view="1"
      :space-between="10"
      :lazy="true"
      :pagination="{
        dynamicBullets: true,
      }"
      :breakpoints="{
        '640': {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        '768': {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }"
      class="mySwiper h-full"
    >
      <SwiperSlide
        v-for="room in searchCityRoomsData"
        :key="room.ID"
        class="h-42 rounded-lg border overflow-hidden"
      >
        <div class="room__img h-40 relative">
          <div
            class="
              room__city
              absolute
              top-3
              left-3
              bg-primary
              rounded-lg
              px-3
              py-1
              text-xs
            "
          >
            {{ room.City }}
          </div>
          <img
            class="h-full w-full object-cover object-center"
            :src="room.Picture.PictureUrl1 || noImage"
            :alt="room.Name"
          />
        </div>
        <div class="room__spec px-4 py-1 text-gray-500 text-xs">
          <h2 class="text-base text-black">{{ room.Name }}</h2>
          <!-- 分類 -->
          <div class="location flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
              />
            </svg>
            <span class="ml-1">
              {{ room.Class }}
            </span>
          </div>
          <!-- 地址 -->
          <div class="location flex items-center my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="ml-1">
              {{
                room.Address.length > 12
                  ? room.Address.substr(0, 12) + '...'
                  : room.Address
              }}
            </span>
          </div>
          <!-- 電話 -->
          <a :href="`tel:${room.Phone}`">
            <div class="location flex items-center my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-primary2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                />
              </svg>
              <span class="ml-1">
                {{ room.Phone }}
              </span>
            </div>
          </a>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.hover-trigger .hover-target {
  display: none;
}
.hover-trigger:hover .hover-target {
  display: block;
}
</style>
