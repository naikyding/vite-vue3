<script setup>
import { reactive } from 'vue'
import { gsap } from 'gsap'
import cities from '../../utils/cityData'

import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import cover from '../../assets/images/cover2.jpeg'
import logo from '../../assets/images/logo-bark.svg'
import slideDown from '../../assets/icon/slideDown_default.svg'

const state = reactive({
  coverImg: {
    backgroundImage: `url(${cover})`,
  },

  form: {
    city: 'Taipei',
  },
})

function goSectionArea() {
  const target = document.querySelector('section')
  gsap.to(window, { duration: 0.6, ease: 'power1', scrollTo: target })
}
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

  <section
    class="h-screen grid grid-cols-1 px-4 md:px-0 md:grid-cols-5 text-gray-500"
  >
    <div class="col-start-2 col-span-3 text-center mt-20 tracking-wider">
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
          mb-14
          border-t-2 border-b-2
          px-6
        "
      >
        <div class="text flex items-center text-xl font-bold">
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
    <div></div>
  </section>
</template>
