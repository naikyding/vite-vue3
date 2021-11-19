<script setup>
import { reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const routeName = computed(() => route.name)
const scrollEv = computed(() => window.scrollY)
watch(scrollEv, () => {
  console.log(123)
})

const state = reactive({
  data: [],
  website: {
    name: 'TAIWAN TRAVEL',
  },
  navs: [
    { 旅遊情報: '#' },
    { 景點查詢: '/attractions' },
    { 美食推薦: '/restaurant' },
    { 旅宿資訊: '#' },
    { 節慶活動: '#' },
  ],
  mobile: {
    navStatus: false,
  },
})
function navDarkText() {
  const darkPage = ['restaurant']
  return darkPage.includes(routeName.value) ? 'text-primary3' : 'text-white'
}

function goPage(path) {
  state.mobile.navStatus = false
  router.push({ path })
}

function navBgColorFn() {
  const secondaryColorPage = ['attractions', 'attractions-item']
  if (window.scrollY > 0) console.log(123)

  if (window.scrollY > 0 && !secondaryColorPage.includes(routeName.value))
    return 'bg-white'
  return secondaryColorPage.includes(routeName.value) ? 'bg-secondary' : ''
}
</script>

<template>
  <div>
    <!-- mobile nav -->
    <div
      v-show="state.mobile.navStatus"
      class="fixed z-10 bg-black opacity-50 inset-0"
      @click="state.mobile.navStatus = false"
    ></div>
    <div
      v-show="state.mobile.navStatus"
      class="bg-white fixed z-40 top-0 left-0 p-4 w-full"
    >
      <div class="close-btn" @click="state.mobile.navStatus = false">
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
          v-for="nav in state.navs"
          :key="nav"
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
        >
          <div
            class="text-shadow-lg tracking-wider"
            @click="goPage(Object.values(nav)[0])"
          >
            {{ Object.keys(nav)[0] }}
          </div>
        </li>
      </ul>
    </div>

    <!-- web nav -->
    <nav
      class="
        fixed
        top-0
        inset-x-0
        flex
        justify-between
        items-center
        px-4
        py-4
        sm:pt-0 sm:px-8 sm:py-0
        xl:px-36
        z-30
      "
      :class="navBgColorFn()"
    >
      <!-- mobile menu btn -->
      <button
        class="sm:hidden"
        :class="navDarkText()"
        @click="state.mobile.navStatus = true"
      >
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
      <router-link to="/" class="text-2xl" :class="navDarkText()">
        {{ state.website.name }}
      </router-link>

      <!-- nav items -->
      <ul class="items-center h-20 hidden sm:flex">
        <li v-for="nav in state.navs" :key="nav" class="sm:px-1 lg:px-6">
          <router-link
            :to="Object.values(nav)[0]"
            class="text-shadow-lg tracking-wider"
            :class="[
              navDarkText(),
              { 'cursor-not-allowed': Object.values(nav)[0] === '#' },
            ]"
          >
            {{ Object.keys(nav)[0] }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
