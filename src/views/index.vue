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
  <nav class="bg-red-50">
    <ul class="flex justify-center items-center h-20 px-36">
      <li class="text-white text-2xl flex-grow">{{ webSiteName }}</li>
      <li class="px-6 text-white" v-for="nav in navs" :key="nav">
        <a href="#">{{ nav }}</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>

</style>