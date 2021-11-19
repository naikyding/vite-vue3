<script setup>
import { reactive } from 'vue'

import cover from '../../assets/images/cover2.jpeg'
import logo from '../../assets/images/logo-bark.svg'
import slideDown from '../../assets/icon/slideDown_default.svg'

const state = reactive({
  coverImg: {
    backgroundImage: `url(${cover})`,
  },
})
</script>

<template>
  <!-- cover -->
  <div class="cover h-screen bg-cover bg-top relative" :style="state.coverImg">
    <div class="logo h-full flex items-center justify-center">
      <img class="px-10 md:px-0" :src="logo" alt="" />
    </div>
    <div class="absolute bottom-5 flex justify-center w-full slider-down">
      <button>
        <img :src="slideDown" alt="" />
      </button>
    </div>
  </div>

  <section class="h-screen bg-red-400"></section>
</template>
