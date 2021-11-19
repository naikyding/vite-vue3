<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import coverImg from '../../assets/images/cover4.jpeg'
import { searchKeyword, getAllTourism } from '../../utils/attractions'

import infoIcon from '@/assets/icon/information.svg'
import link from '@/assets/icon/link.svg'
import phone from '@/assets/icon/phone.svg'
import time from '@/assets/icon/time.svg'
import map from '@/assets/icon/map.svg'

const route = useRoute()
const store = useStore()

const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY

const state = reactive({
  cover: { backgroundImage: `url(${coverImg})` },

  itemData: [],

  detail: [
    {
      icon: infoIcon,
      text: 'WebsiteUrl',
      link: 'WebsiteUrl',
    },
    {
      icon: phone,
      text: 'Phone',
      link: 'Phone',
    },
    {
      icon: time,
      text: 'OpenTime',
    },
    {
      icon: map,
      text: 'Name',
      src: 'Name',
    },
  ],

  form: {
    $filter: computed(() => searchKeyword('ID', route.params.id)),
    city: computed(() => route.query.city),
  },
})

const resData = computed(() => store.state.allAttractions[0])

onMounted(() => {
  getAllTourism({ $filter: state.form.$filter })
})
</script>

<template>
  <!-- cover image -->
  <div
    class="header-bg mt-16 sm:mt-20 h-16 sm:h-40 bg-center bg-cover"
    :style="state.cover"
  />

  <div
    v-if="resData"
    class="px-4 sm:px-8 xl:px-36 tracking-widest text-gray-500"
  >
    <!-- URL PATH -->
    <p class="py-2 text-xs">
      <router-link to="/"> 首頁 </router-link>
      >
      <router-link to="/attractions"> 景點查詢 </router-link>
      >
      <span class="text-secondary"> {{ resData?.Name }} </span>
    </p>

    <!-- attraction item -->
    <section class="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-4">
      <!-- info -->
      <div class="attractions__info lg:col-span-2">
        <!-- 景點名稱 -->
        <h1 class="text-primary2 text-2xl">{{ resData?.Name }}</h1>

        <!-- 標籤 -->
        <ul v-if="resData" class="tag flex mt-2 text-white">
          <template v-for="(tag, index) in 3" :key="index">
            <li
              v-if="resData[`Class${index + 1}`]"
              class="text-sm px-2 bg-primary rounded-xl"
              :class="{ 'mx-3': index === 1 }"
            >
              {{ resData[`Class${index + 1}`] }}
            </li>
          </template>
        </ul>

        <!-- MIBOLE 景點地圖 -->
        <div class="attractions__slider lg:col-span-3 block lg:hidden my-6">
          <img
            :src="resData.Picture.PictureUrl1"
            :alt="resData.Name"
            class="rounded-lg w-full h-90 object-cover object-center"
          />
        </div>

        <!-- 詳細資料 -->
        <div class="detail mt-0 lg:mt-10">
          <h2 class="text-lg mb-6 leading-7">景點資訊</h2>
          <ul v-if="resData">
            <li
              v-for="(item, index) in state.detail"
              :key="index"
              class="flex items-start mb-6"
            >
              <template v-if="item.text !== 'Name'">
                <!-- icon -->
                <img :src="item.icon" alt="info" />

                <!-- 名稱 -->
                <div class="ml-5 mr-2">
                  {{ index === 0 ? '官方網站' : resData[item.text] }}
                </div>
              </template>

              <template v-else> </template>

              <!-- 連結 -->
              <a
                v-show="item.link"
                :href="
                  item.link === 'Phone'
                    ? 'tel:' + resData[item.link]
                    : resData[item.link]
                "
              >
                <img :src="link" alt="url" class="h-7 w-7" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 景點圖片 -->
      <div class="attractions__slider lg:col-span-3 hidden lg:block">
        <img
          :src="resData.Picture.PictureUrl1"
          :alt="resData.Name"
          class="rounded-lg w-full h-90 object-cover object-center"
        />
      </div>
      <!-- description -->
      <div class="attractions__dec lg:col-span-5">
        <h2 class="text-lg mb-6 leading-7">景點介紹</h2>
        <p>{{ resData.DescriptionDetail }}</p>
      </div>

      <div class="h-60 w-full lg:col-span-5 mb-10">
        <!-- https://www.google.com/maps/embed/v1/place?key={YOUR_API_KEY}&q=台北101 -->
        <iframe
          :src="`https://www.google.com/maps/embed/v1/place?key=${googleMapApiKey}&q=${resData?.Name}`"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen="true"
          loading="lazy"
          class="rounded-lg"
        ></iframe>
      </div>
    </section>
  </div>

  <div></div>
</template>

<style lang="scss" scoped></style>
