<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getAllTourismAPI, getTourismAPI } from '../request/api'

const state = reactive({
  data: []
})

const webSiteName = ref('TAIWAN TRAVEL')

const navs = reactive([
  '旅遊情報',
  '景點查詢',
  '美食推薦',
  '旅宿資訊',
  '節慶活動'
])

onMounted(async() => {
  const res = await getAllTourismAPI({})
  await getTourismAPI({})
  // state.data = res.data
})

// console.log(tourism)
</script>


<template>
  <nav class="bg-red-50 flex justify-between items-center px-3 md:px-20 lg:px-36">
    <!-- website logo -->
    <a href="/" class="text-white text-2xl">{{ webSiteName }}</a>

    <!-- nav items -->
    <ul class="flex items-center h-20">
      <li class="md:px-1 lg:px-6 text-white" v-for="nav in navs" :key="nav">
        <a href="#">{{ nav }}</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>

</style>