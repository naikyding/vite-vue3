<script setup>
// eslint-disable-next-line no-undef
defineProps({
  allPage: {
    required: true,
    type: Number,
  },
})
</script>

<template>
  <ul class="flex">
    <li class="border rounded-lg h-10 w-10 flex justify-center items-center">
      ←
    </li>
    <li
      v-for="(item, index) in parseInt(allPage)"
      :key="index"
      class="border rounded-lg h-10 w-10 flex justify-center items-center"
    >
      {{ index + 1 }}
    </li>
    <li class="border rounded-lg h-10 w-10 flex justify-center items-center">
      →
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
