<template>
  <div class="cart-wrap">
    <div v-if="cartItems.length" class="cart-products">
      <div v-for="item in cartItems" :key="item.id" class="cart-product">
        <div class="cart-quantity-wrap">
          <div class="cart-update" @click="increment(item)">
            <img :src="IcPlus" />
          </div>
          <div class="cart-quantity">
            {{ item.quantity }}
          </div>
          <div class="cart-update" @click="decrement(item)">
            <transition name="delete">
              <img v-if="item.quantity === 1" class="cart-delete" :src="IcPlus" />
              <img v-else class="cart-minus" :src="IcMinus" />
            </transition>
          </div>
        </div>
        <div class="cart-image" :style="{ 'background-image': `url(${item.image})` }" />
        <div class="cart-title-wrap">
          <div class="cart-title">
            {{ item.name }}
          </div>
          <div class="cart-variant">
            {{ item.variant }}
          </div>
        </div>
        <div class="cart-size-wrap">
          <div class="cart-size-text">
            {{ t('demo.cart.size') }}
          </div>
          <div class="cart-size">
            {{ item.size }}
          </div>
          <div class="cart-item-price" v-html="fromCents(item.price * item.quantity)" />
        </div>
      </div>
    </div>
    <div v-else class="cart-empty">
      {{ t('demo.cart.empty') }}
    </div>
    <div class="cart-checkout-wrap">
      <div class="cart-checkout-info">
        <div class="cart-delivery">
          {{ t('demo.cart.delivery') }}
        </div>
        <div class="cart-more-info">
          {{ t('demo.cart.info') }}
        </div>
        <div class="cart-total-text">
          {{ t('demo.cart.total') }}
        </div>
        <div class="cart-total" v-html="total" />
      </div>
      <div v-if="showButtons" class="cart-buttons">
        <div class="cart-continue" @click="emit('hide')">
          {{ t('demo.cart.continue') }}
        </div>
        <div class="cart-checkout" @click="goCheckout">
          {{ t('demo.cart.checkout') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'petite-vue-i18n'
import { store } from '../store'
import IcPlus from '/src/assets/img/ic_plus.png'
import IcMinus from '/src/assets/img/ic_minus.png'
import { ICartItem } from '../types'

const router = useRouter()
const { t } = useI18n()

defineProps<{ showButtons?: boolean }>()

const emit = defineEmits<{
  (e: 'hide'): void
}>()

const total = computed(() => {
  return fromCents(store.totalPrice.value)
})

const cartItems = computed(() => {
  return store.items.value
})

const fromCents = (cents: number) => {
  const dollars = cents / 100
  return `<span>$</span>${dollars.toLocaleString()}`
}

const increment = (cartItem: ICartItem) => {
  store.setQuantity(cartItem.id, cartItem.quantity + 1)
}

const decrement = (cartItem: ICartItem) => {
  store.setQuantity(cartItem.id, cartItem.quantity - 1)
}

const goCheckout = () => {
  router.push({ name: 'checkout' })
  emit('hide')
}
</script>

<style lang="postcss">
@import '../css/global.postcss';

.delete-enter-active,
.delete-leave-active {
  transition:
    opacity 0.3s linear,
    transform 0.3s linear;
}
.delete-enter-from,
.delete-leave-to {
  opacity: 0;
  &.cart-delete {
    transform: rotate(0deg);
  }
}

.cart-wrap {
  width: 480px;
  background: white;
  border: 1px solid $border-med;
  .cart-empty {
    @mixin title-semibold 20px;
    @mixin flex-center;
    color: $text-dark;
    padding: 24px 0;
  }
  .cart-products {
    padding: 8px 0 16px;
  }
  .cart-product {
    display: flex;
    color: $text-dark;
    padding-right: 16px;
    margin-top: 16px;
    .cart-quantity-wrap {
      @mixin flex-center-col;
      width: 40px;
      text-align: center;
      .cart-quantity {
        @mixin title 14px;
        margin: 4px 0;
      }
      .cart-update {
        @mixin flex-center;
        height: 16px;
        cursor: pointer;
        img {
          width: 10px;
        }
        .cart-delete {
          transform: rotate(45deg);
        }
      }
    }
    .cart-image {
      width: 80px;
      height: 100px;
      margin-right: 16px;
      background-position: center;
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
    .cart-title-wrap {
      width: 180px;
      margin-right: 24px;
      @mixin flex-center-col;
      align-items: flex-start;
      .cart-title {
        @mixin title-semibold 19px;
      }
      .cart-variant {
        @mixin text-italic 16px;
      }
    }
    .cart-size-wrap {
      flex-grow: 1;
      @mixin flex-center;
      .cart-size {
        @mixin product-size;
        margin-left: 8px;
      }
      .cart-item-price {
        @mixin title-regular 17px;
        margin-left: auto;
      }
    }
  }
  .cart-checkout-wrap {
    border-top: 1px solid #eee;
    box-sizing: border-box;
    padding: 24px 16px 24px 32px;
    color: $text-dark3;
    .cart-checkout-info {
      display: flex;
      align-items: center;
      .cart-more-info {
        color: $main-blue;
        margin-left: 8px;
      }
      .cart-total-text {
        margin-left: auto;
        @mixin title-regular 14px;
        align-self: center;
      }
      .cart-total {
        @mixin title 22px;
        margin-left: 8px;
        > span {
          @mixin title-regular 22px;
        }
      }
    }
  }
  .cart-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    > div {
      @mixin flex-center;
      height: 34px;
      @mixin title 10px;
      letter-spacing: 1.8px;
      padding: 0 24px;
      border-radius: 17px;
      cursor: pointer;
    }
    .cart-continue {
      color: $text-dark;
      border: 1px solid $border-med;
    }
    .cart-checkout {
      color: white;
      background: $main-blue;
    }
  }
  @media (max-width: 568px) {
    width: 100vw;
    .cart-product {
      .cart-title-wrap {
        margin-right: 8px;
        .cart-title {
          font-size: 14px;
        }
        .cart-variant {
          font-size: 13px;
        }
      }
      .cart-size-wrap .cart-size {
        margin: 0 4px;
      }
    }
    .cart-checkout-wrap .cart-checkout-info .cart-more-info {
      display: none;
    }
    .cart-buttons {
      > div {
        height: 40px;
        line-height: 14px;
        text-align: center;
        margin-left: 4px;
        &:first-child {
          margin: 0 4px 0 0;
        }
      }
    }
  }
}
</style>
