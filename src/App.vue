<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>

<template>
  <div class="font-sans">
    <LayoutHeader />
    <router-view />
    <LayoutFooter />
  </div>
</template>

<style></style>
