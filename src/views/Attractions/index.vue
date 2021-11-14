<script setup>
import {reactive, ref} from 'vue'

import Header from '../../components/Header.vue'
import coverImg from '../../assets/images/cover4.jpeg'

const state = reactive({
  cover: {backgroundImage: `url(${coverImg})`},
  title: ['熱門景點', '快速搜尋', '搜尋結果'],
})
</script>

<template>
  <Header />

  <div class="px-4 sm:px-8 xl:px-36">
    <!-- cover image -->
    <div
      class="header-bg mt-16 sm:mt-20 h-16 sm:h-40 bg-center bg-cover"
      :style="state.cover"
    />

    <!-- URL PATH -->
    <p class="py-2 text-xs">
      <router-link to="/"> 首頁 </router-link>
      >
      <span class="text-secondary"> 景點查詢 </span>
    </p>

    <!-- 熱門景點 -->
    <section class="mt-5">
      <h2 class="text-lg font-medium text-secondary">
        {{ state.title[0] }}
      </h2>
      <div class="slider h-56 bg-red-400"></div>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-3">
      <!-- 快速搜尋 -->
      <section class="mt-5">
        <h2 class="hidden text-lg font-medium text-secondary">
          {{ state.title[1] }}
        </h2>

        <!-- search bar -->
        <div
          class="
            search-bar
            flex
            h-14
            shadow
            rounded-xl
            items-center
            px-4
            leading-tight
            border-2 border-gray-200
            focus-within:border-primary
          "
        >
          <input
            type="text"
            class="w-full appearance-none h-full focus:outline-none text-lg"
            placeholder="關鍵字查詢"
          />
          <button>
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        <!-- search select -->
        <div class="search-select bg-yellow-600"></div>
      </section>

      <!-- 搜尋結果 -->
      <section class="mt-5 col-span-2">
        <h2 class="text-lg font-medium text-secondary">
          {{ state.title[2] }}
        </h2>

        <!-- filter btn -->
        <div class="filter-btn bg-green-600"></div>
        <!-- result items -->
        <div class="result-items bg-blue-700"></div>
      </section>
    </div>
  </div>
</template>