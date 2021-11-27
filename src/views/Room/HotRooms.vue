<script setup>
import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
SwiperCore.use([Pagination])

import noImage from '../../assets/images/no-image.jpeg'
import noData from '../../assets/images/no-data.png'

// eslint-disable-next-line no-undef
defineProps({
  searchCityRoomsData: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <!-- 搜尋區塊 -->
  <div class="px-4 md:px-8">
    <h1 class="text-xl text-center py-4 mb-8 border-y border-b text-primary2">
      熱門旅宿
    </h1>
    <!-- 如果沒有資料 -->
    <div
      v-show="searchCityRoomsData.length < 1"
      class="flex justify-center items-center"
    >
      <img :src="noData" alt="no data" />
    </div>
    <!-- 如果有資料 -->
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
