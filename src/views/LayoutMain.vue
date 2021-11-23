<script setup>
import Header from '@/components/Header.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const routerName = computed(() => route.name)
const noFooterAry = ['index']
const noFooterPage = computed(() => !noFooterAry.includes(routerName.value))
</script>

<template>
  <Header />
  <router-view />
  <LayoutFooter v-if="noFooterPage" />
</template>

<style lang="scss" scoped></style>
