<script setup>
import { reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue'
import coverImg from '../../assets/images/cover4.jpeg'
import { getOneCityTourism, searchKeyword } from '../../utils/attractions'

import infoIcon from '@/assets/icon/information.svg'
import link from '@/assets/icon/link.svg'
import phone from '@/assets/icon/phone.svg'
import time from '@/assets/icon/time.svg'
import map from '@/assets/icon/map.svg'

const route = useRoute()
const router = useRouter()
const store = useStore()

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
      map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.151145376335!2d121.53167925104871!3d25.062865783880103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a959a9ce781b%3A0xb0c2ef0be716c094!2z6KGM5aSp5a6u!5e0!3m2!1szh-TW!2stw!4v1637142280547!5m2!1szh-TW!2stw" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    },
  ],

  form: {
    $filter: computed(() => searchKeyword('ID', route.params.id)),
    city: computed(() => route.query.city),
  },
})

const resData = computed(() => store.state.attractions[0])

onMounted(() => {
  if (!state.form.city) router.push({ name: 'attractions' })
  getOneCityTourism(state.form)
})
</script>

<template>
  <!-- cover image -->
  <div
    class="header-bg mt-16 sm:mt-20 h-16 sm:h-40 bg-center bg-cover"
    :style="state.cover"
  />

  <div class="px-4 sm:px-8 xl:px-36 tracking-widest text-gray-500">
    <!-- URL PATH -->
    <p class="py-2 text-xs">
      <router-link to="/"> 首頁 </router-link>
      >
      <router-link to="/"> 景點查詢 </router-link>
      >
      <span class="text-secondary"> {{ resData?.Name }} </span>
    </p>

    <!-- attraction item -->
    <section class="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-4">
      <!-- info -->
      <div class="attractions__info lg:col-span-2">
        <!-- 景點名稱 -->
        <h1 class="text-primary2 text-2xl">{{ resData?.Name }}</h1>

        <!-- 標籤 -->
        <ul v-if="resData" class="tag flex mt-2 text-white">
          <template v-for="(tag, index) in 3" :key="index">
            <li
              v-if="resData[`Class${index + 1}`]"
              class="text-sm px-3 py-1 bg-primary rounded-xl"
              :class="{ 'mx-3': index === 1 }"
            >
              {{ resData[`Class${index + 1}`] }}
            </li>
          </template>
        </ul>

        <!-- 詳細資料 -->
        <div class="detail mt-10">
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

              <template v-else>
                <div class="h-60 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.151145376335!2d121.53167925104871!3d25.062865783880103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a959a9ce781b%3A0xb0c2ef0be716c094!2z6KGM5aSp5a6u!5e0!3m2!1szh-TW!2stw!4v1637142999611!5m2!1szh-TW!2stw"
                    width="100%"
                    height="100%"
                    style="border: 0"
                    allowfullscreen="true"
                    loading="lazy"
                    class="rounded-lg"
                  ></iframe>
                </div>
              </template>

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
      <!-- slider -->
      <div class="attractions__slider bg-blue-400 lg:col-span-3">1</div>
      <!-- description -->
      <div class="attractions__dec bg-red-400 lg:col-span-5">1</div>
    </section>
  </div>

  <div>
    <swiper
      :slides-per-view="1.9"
      :space-between="80"
      :slides-per-group="1"
      :loop-fill-group-with-blank="true"
      :navigation="true"
      :loop="true"
      :centered-slides="true"
      :initial-slide="3"
      class="mySwiper h-60"
    >
      <SwiperSlide>1</SwiperSlide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped></style>
