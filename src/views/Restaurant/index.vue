<script setup>
import { reactive } from 'vue'

import cover from '../../assets/images/cover2.jpeg'
import logo from '../../assets/images/logo-bark.svg'

const state = reactive({
  coverImg: {
    backgroundImage: `url(${cover})`,
  },
})

console.log(logo)
</script>

<template>
  <!-- cover -->
  <div class="cover h-screen bg-cover bg-top relative" :style="state.coverImg">
    <div class="logo h-full flex items-center justify-center">
      <img class="" :src="logo" alt="" />
    </div>
  </div>
</template>
