<template>
  <div class="header-cart" @click="show(true)" @click.stop>
    <div class="header-cart-title">
      <img :src="IcCart" />
      <div v-if="quantity">
        {{ t('demo.header_cart_items', quantity) }}
      </div>
      <div v-else>
        {{ t('demo.header_cart') }}
      </div>
    </div>
    <transition name="header-cart">
      <Cart
        v-if="showCart"
        ref="cart"
        :showButtons="true"
        @hide="show(false)"
        @click.stop
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'petite-vue-i18n'
import { store } from '../store'
import IcCart from '../assets/img/ic_cart.png'
import Cart from './Cart.vue'

const { t } = useI18n()

const clickEventType = document.ontouchstart !== null ? 'click' : 'touchstart'

const showCart = ref(false)
const cart = ref()

const quantity = computed(() => store.quantity.value)

const checkClickAway = (event: MouseEvent) => {
  const el = cart ? cart.value?.$el : null
  if (!el || !el.contains(event.target)) {
    show(false)
  }
}

const show = (show: boolean) => {
  showCart.value = show
  if (show) {
    document.addEventListener(clickEventType, checkClickAway, false)
  } else {
    document.removeEventListener(clickEventType, checkClickAway, false)
  }
}
</script>

<style lang="postcss">
@import '../css/global.postcss';

.header-cart-enter-active,
.header-cart-leave-active {
  transition: opacity 0.3s linear;
}
.header-cart-enter-from,
.header-cart-leave-to {
  opacity: 0;
}

.header-cart {
  @mixin title 12px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
  position: relative;
  .header-cart-title {
    background-color: $bg-grey;
    display: flex;
    align-items: center;
    padding: 0 32px;
    height: 100%;
    border-radius: 17px;
    img {
      width: 16px;
      margin-right: 8px;
    }
  }
  .cart-wrap {
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 2000;
    cursor: default;
    .cart-size {
      padding-left: 2px;
    }
  }
  @media (max-width: 568px) {
    width: 100%;
    .cart-wrap {
      left: 0;
      .header-cart-title {
        margin: 0 24px;
      }
    }
  }
}
</style>
