<template>
  <div class="home-wrap">
    <DemoHeader />
    <NavMenu />
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
    <DemoFooter />
  </div>
</template>

<script setup lang="ts">
import DemoFooter from '../components/DemoFooter.vue'
import DemoHeader from '../components/DemoHeader.vue'
import NavMenu from '../components/NavMenu.vue'
</script>

<style lang="postcss" scoped>
@import '../css/global.postcss';

.home-wrap {
  background-color: $bg-light;
}
</style>
