<script setup>
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'

import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const routerName = computed(() => route.name)
const noFooterAry = ['index']
const noFooterPage = computed(() => !noFooterAry.includes(routerName.value))
</script>

<template>
  <LayoutHeader />
  <router-view />
  <LayoutFooter v-if="noFooterPage" />
</template>

<style lang="scss" scoped></style>
