<template>
  <div class="product">
    <div class="product-image">
      <div class="product-overlay" @click="addCart">
        <div class="product-add">
          {{ t('demo.add') }}
        </div>
      </div>
      <img :src="product.image" />
    </div>
    <div class="product-info">
      <div class="product-sizes">
        <div
          v-for="s in product.sizes"
          :key="s"
          class="product-size"
          :class="{ active: s === size }"
          @click="size = s"
        >
          {{ s }}
        </div>
      </div>
      <div class="product-name">
        {{ product.name }}
      </div>
      <div class="product-variant">
        {{ product.variants[0] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'petite-vue-i18n'
import { computed, toRefs } from 'vue'
import { IProduct } from '../types'
import { store } from '../store'

const { t } = useI18n()

const props = defineProps<{
  product: IProduct
}>()
const { product } = toRefs(props)

const size = computed(() => {
  return product.value.sizes[0]
})

const addCart = () => {
  store.addItem(
    {
      id: product.value.id,
      name: product.value.name,
      size: size.value,
      variant: product.value.variants[0],
      price: product.value.price,
      image: product.value.image,
    },
    product.value,
  )
}
</script>

<style lang="postcss">
@import '../css/global.postcss';

.product {
  margin-right: 32px;
  margin-bottom: 72px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .product-overlay {
    @mixin flex-center;
    opacity: 0;
    transition: opacity 0.4s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    .product-add {
      @mixin title 20px;
      background-color: $purple;
      padding: 16px 32px;
      color: white;
    }
  }
  .product-image {
    display: flex;
    width: 360px;
    flex-grow: 1;
    background-color: $text-med2;
    position: relative;
    &:hover .product-overlay {
      opacity: 1;
    }
    img {
      width: 100%;
      height: auto;
      align-self: center;
    }
  }
  .product-info {
    padding: 8px 4px;
    .product-sizes {
      display: flex;
      flex-direction: row;
      .product-size {
        @mixin product-size;
        margin-right: 8px;
        cursor: pointer;
        &.active {
          background: $text-dark3;
          color: $bg-light;
        }
      }
    }
    .product-name {
      @mixin title-semibold 19px;
      margin: 8px 0 2px;
    }
    .product-variant {
      @mixin text-italic 16px;
    }
  }
  @media (max-width: 568px) {
    margin-right: 0;
    .product-image {
      width: 100%;
    }
    .product-info {
      text-align: center;
      .product-sizes {
        justify-content: center;
      }
    }
  }
}
</style>
