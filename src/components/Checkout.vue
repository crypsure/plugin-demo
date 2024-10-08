<template>
  <div class="checkout">
    <div class="container">
      <div class="checkout-left">
        <div class="checkout-payment">
          <SectionHead index="1" :copy="'demo.checkout.payment'" />
          <div class="payment-express">
            {{ t('demo.checkout.payment.express') }}
          </div>
          <div class="payment-options">
            <div class="payment-crypsure" @click="paymentType = 'chargebacks'">
              <img :src="CrypsureImg" />
              {{ t('plugin.crypsure') }}
            </div>
            <div class="payment-paypal">
              <img :src="Paypal" />
            </div>
            <div class="payment-card">
              {{ t('demo.checkout.payment.card') }}
            </div>
          </div>
        </div>
        <SectionHead index="2" :copy="'demo.checkout.billing'" />
        <SectionHead index="3" :copy="'demo.checkout.shipping'" />
      </div>
      <div class="checkout-right">
        <Cart />
      </div>
    </div>
    <CrsPlugin
      :show="!!paymentType"
      :initialType="paymentType ?? 'chargebacks'"
      :priceUsdCents="store.totalPrice.value"
      @cancel="paymentType = undefined"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { t } from '../i18n'
import { store } from '../store'
import { CrsPlugin } from '@crypsure/plugin'
import CrypsureImg from '../assets/img/crs-logo.png'
import Paypal from '../assets/img/paypal.png'
import Cart from './Cart.vue'
import SectionHead from './widgets/SectionHead.vue'

const paymentType = ref()
</script>

<style lang="postcss" scoped>
@import '/node_modules/@crypsure/plugin/dist/style.css';
@import '/src/css/global.postcss';

.checkout {
  background-color: $bg-light;
}
.container {
  padding-top: 24px;
  display: flex;
}
.checkout-left {
  padding-right: 16px;
  min-width: 40%;
}
.checkout-express {
  @mixin title 14px;
  color: $text-dark;
}
.payment-options {
  display: flex;
  > div {
    height: 38px;
    width: 200px;
    @mixin flex-center;
    border-radius: 4px;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
}
.payment-crypsure {
  background-color: #141414;
  @mixin title 15px;
  letter-spacing: 1.4px;
  > img {
    height: 22px;
    margin-right: 8px;
  }
}
.payment-paypal {
  background-color: $paypal-light;
  > img {
    height: 20px;
    margin-top: 2px;
  }
}
.payment-card {
  background-color: $main-blue;
  color: white;
  @mixin title 16px;
}

.checkout-right {
  margin-left: 16px;
}
@media (max-width: 1200px) {
  .payment-options {
    flex-direction: column;
    > div {
      &:not(:last-child) {
        margin: 0 0 16px;
      }
    }
  }
}
@media (max-width: 940px) {
  .payment-options {
    flex-direction: row;
    justify-content: space-between;
    > div {
      width: 160px;
    }
  }
  .container {
    flex-direction: column-reverse;
    align-items: center;
    padding: 0;
    .checkout-right {
      margin-left: 0;
      margin-top: 40px;
    }
    .checkout-left {
      padding: 0 20px;
      width: 100%;
      max-width: 600px;
    }
  }
}
@media (max-width: 560px) {
  .payment-options {
    > div {
      width: 140px;
    }
  }
}
@media (max-width: 480px) {
  .payment-options {
    flex-direction: column;
    align-items: center;
    > div {
      width: 240px;
      &:not(:last-child) {
        margin: 0 0 16px;
      }
    }
  }
}
</style>
