<template>
  <div :key="name" class="store-page">
    <div class="container">
      <div class="store-title">
        {{ t(`demo.${name}.title`) }}
      </div>
      <div class="store-products">
        <StoreProduct v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from '../route'
import { t } from '../i18n'
import StoreProduct from './StoreProduct.vue'
import { IProduct } from '../types'
import { getProducts } from '../api'

const route = useRoute()

const products = ref<IProduct[]>([])

const name = computed(() => route.value?.name.toString())

watch(name, (newName) => refreshProducts(newName?.toString()))

const refreshProducts = (type: string | undefined) => {
  if (!type) return
  try {
    products.value = getProducts(type)
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  refreshProducts(name.value)
})
</script>

<style lang="postcss">
@import '../css/global.postcss';

.store-page {
  background-color: $bg-light;
  color: $text-dark;
  .store-title {
    @mixin title 32px;
    padding-top: 40px;
    text-align: center;
  }
  .store-products {
    display: flex;
    flex-wrap: wrap;
    margin-top: 64px;
  }
}
</style>
