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
import DemoFooter from './components/DemoFooter.vue'
import DemoHeader from './components/DemoHeader.vue'
import NavMenu from './components/NavMenu.vue'
</script>

<style lang="postcss">
@import './css/font.postcss';
@import './css/global.postcss';

html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: $bg-light;
  color: white;
  * {
    box-sizing: border-box;
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.home-wrap {
  background-color: $bg-light;
  display: flex;
  flex-direction: column;
  font-family: $font-text;
}

.container {
  max-width: 1280px;
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 40px;
  margin: 0 auto;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.25s linear;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

@media (max-width: 568px) {
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
