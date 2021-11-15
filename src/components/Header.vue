<script setup>
import {reactive} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const routeName = route.name

const state = reactive({
  data: [],
  website: {
    name: 'TAIWAN TRAVEL',
  },
  navs: [
    {旅遊情報: '#'},
    {景點查詢: '/attractions'},
    {美食推薦: '#'},
    {旅宿資訊: '#'},
    {節慶活動: '#'},
  ],
  mobile: {
    navStatus: false,
  },
})
</script>

<template>
  <div>
    <!-- mobile nav -->
    <div
      v-show="state.mobile.navStatus"
      @click="state.mobile.navStatus = false"
      class="absolute z-10 bg-black opacity-50 inset-0"
    ></div>
    <div
      v-show="state.mobile.navStatus"
      class="bg-white absolute z-20 top-0 left-0 p-4 w-full"
    >
      <div @click="state.mobile.navStatus = false" class="close-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <ul class="px-16">
        <li
          class="
            block
            text-center text-primary3
            cursor-pointer
            hover:text-white
            py-4
            hover:bg-primary
            rounded-lg
            my-4
          "
          v-for="nav in state.navs"
          :key="nav"
        >
          <router-link
            class="text-shadow-lg tracking-wider"
            :to="Object.values(nav)[0]"
          >
            {{ Object.keys(nav)[0] }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- web nav -->
    <nav
      class="
        absolute
        top-0
        inset-x-0
        flex
        justify-between
        items-center
        px-4
        py-4
        sm:pt-0 sm:px-8 sm:py-0
        xl:px-36
      "
      :class="[
        {
          'bg-secondary': routeName === 'attractions',
        },
      ]"
    >
      <!-- mobile menu btn -->
      <button @click="state.mobile.navStatus = true" class="text-white sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="red"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- website logo -->
      <a href="/" class="text-white text-2xl">{{ state.website.name }}</a>

      <!-- nav items -->
      <ul class="items-center h-20 hidden sm:flex">
        <li class="sm:px-1 lg:px-6" v-for="nav in state.navs" :key="nav">
          <router-link
            :to="Object.values(nav)[0]"
            class="text-white text-shadow-lg tracking-wider"
          >
            {{ Object.keys(nav)[0] }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>