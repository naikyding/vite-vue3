<script setup>
import { onMounted, reactive } from 'vue'
import { getAllTourismAPI, getTourismAPI } from '../request/api'
import axios from 'axios'
import { getHeaders } from '../request/headers'


const state = reactive({
  data: []
})

onMounted(async() => {
  const res = await getAllTourismAPI({})
  state.data = res.data
})

// console.log(tourism)
</script>


<template>
  <h1>HOME</h1>
  <p>{{ state.data }}</p>
</template>

<style lang="scss" scoped>

</style>