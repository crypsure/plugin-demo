<template>
  <div class="home-wrap">
    <DemoHeader />
    <NavMenu />
    <transition name="page-fade" mode="out-in" appear>
      <StorePage />
    </transition>
    <DemoFooter />
  </div>
</template>

<script setup lang="ts">
import DemoFooter from '../components/DemoFooter.vue'
import DemoHeader from '../components/DemoHeader.vue'
import NavMenu from '../components/NavMenu.vue'
import StorePage from '../components/StorePage.vue'
</script>

<style lang="postcss" scoped>
@import '../css/global.postcss';

.home-wrap {
  background-color: $bg-light;
  display: flex;
  flex-direction: column;
  font-family: $font-text;
}
</style>
