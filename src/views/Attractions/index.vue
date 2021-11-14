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

  <!-- cover image -->
  <div
    class="header-bg mt-16 sm:mt-20 h-16 sm:h-40 bg-center bg-cover"
    :style="state.cover"
  />

  <!-- URL PATH -->
  <p class="px-4 py-2 text-xs">
    <router-link to="/"> 首頁 </router-link>
    >
    <span class="text-secondary"> 景點查詢 </span>
  </p>

  <!-- 熱門景點 -->
  <section class="mt-5">
    <h2 class="text-lg font-medium text-secondary ml-4">
      {{ state.title[0] }}
    </h2>
  </section>

  <!-- 快速搜尋 -->
  <section class="mt-5">
    <h2 class="text-lg font-medium text-secondary ml-4">
      {{ state.title[1] }}
    </h2>
  </section>

  <!-- 搜尋結果 -->
  <section class="mt-5">
    <h2 class="text-lg font-medium text-secondary ml-4">
      {{ state.title[2] }}
    </h2>
  </section>
</template>