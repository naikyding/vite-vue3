<script setup>
import { computed } from 'vue'
import { pageRun } from '../utils/pagePagination'
// eslint-disable-next-line no-undef
const props = defineProps({
  allPage: {
    required: true,
    type: Number,
  },
  activePage: {
    required: true,
    type: Number,
  },
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['setPage'])

const displayPage = computed(() => pageRun(props.activePage, props.allPage))
</script>

<template>
  <ul class="flex justify-center md:justify-end">
    <!-- 上一頁 -->
    <li
      class="
        mr-1
        cursor-pointer
        border-2
        rounded-lg
        h-10
        w-10
        flex
        justify-center
        items-center
      "
      :class="[activePage === 1 ? 'bg-gray-200' : 'bg-white']"
      @click="emit('setPage', activePage - 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        :class="[
          activePage === 1 ? 'text-gray-400 ' : 'text-primary2 border-primary2',
        ]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </li>
    <li
      v-for="(page, index) in displayPage"
      :key="index"
      class="
        mx-1
        cursor-pointer
        border-2
        rounded-lg
        h-10
        w-10
        flex
        justify-center
        items-center
      "
      :class="[
        page === activePage
          ? 'border-none bg-primary2 text-white'
          : ' text-gray-500 bg-white',
      ]"
      @click="emit('setPage', page)"
    >
      {{ page }}
    </li>
    <!-- 下一頁 -->
    <li
      class="
        ml-1
        cursor-pointer
        border-2
        rounded-lg
        h-10
        w-10
        flex
        justify-center
        items-center
      "
      :class="[activePage === allPage ? 'bg-gray-200' : 'bg-white']"
      @click="emit('setPage', activePage + 1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        :class="[
          activePage === allPage
            ? 'text-gray-400 '
            : 'text-primary2 border-primary2',
        ]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
