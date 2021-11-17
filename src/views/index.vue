<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import cover1 from '../assets/images/cover1.jpeg'
import taiwanLogo from '../assets/images/taiwan_logo_white.svg'
import cities from '../utils/cityData'

const router = useRouter()

const state = reactive({
  data: [],
  website: {
    cover: { backgroundImage: `url(${cover1})` },
  },
  type: [{ 景點: 'attractions' }],
  cities,

  form: {
    type: 'attractions',
    city: 'Taipei',
  },
})

function search(type, city) {
  if (!type || !city) return false
  router.push({
    name: type,
    query: { city },
  })
}
</script>

<template>
  <div
    class="
      min-h-screen
      bg-center bg-cover
      flex
      items-center
      justify-center
      flex-col
      relative
    "
    :style="state.website.cover"
  >
    <section class="text-center w-full">
      <!-- taiwan logo -->
      <img :src="taiwanLogo" class="px-10 m-auto" alt="taiwan" />

      <div
        class="
          search-area
          bg-white
          py-3
          md:py-7
          px-3
          md:px-5
          rounded-3xl
          flex flex-col
          md:flex-row
          w-4/5
          md:w-3/5
          m-auto
          transform
          translate-y-16
          sm:translate-y-10
          md:translate-y-0
        "
      >
        <!-- select 類型 -->
        <div class="select-area w-full relative">
          <select
            v-model="state.form.type"
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
            <option
              v-for="(item, index) in state.type"
              :key="index"
              :value="Object.values(item)[0]"
            >
              {{ Object.keys(item)[0] }}
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

        <!-- select 地區 -->
        <div class="select-area w-full relative mx-0 md:mx-4 my-3 md:my-0">
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

        <!-- search btn -->
        <button
          class="bg-primary rounded-xl text-white px-8 py-3"
          @click="search(state.form.type, state.form.city)"
        >
          SEARCH
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
