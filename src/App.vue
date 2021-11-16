<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="relative">
    <!-- header -->
    <div class="sticky top-0 z-50">
      <Header />
    </div>
    <router-view />
  </div>
</template>

<style></style>
