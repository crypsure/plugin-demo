<template>
  <div class="footer-wrap">
    <div class="footer container">
      <div class="footer-content">
        <div class="footer-left">
          <div class="crypsure-logo">
            <img :src="CrypsureImg" />
            <div>{{ t('plugin.crypsure') }}</div>
          </div>
          <div class="crypsure-demo">
            {{ t('demo.footer.text') }}
          </div>
          <div class="crypsure-copyright">
            {{ t('demo.footer.copyright') }}
          </div>
        </div>
        <div class="footer-right">
          <div class="footer-link">
            <a target="_blank" href="https://medium.com/@CrypSure">
              {{ t('demo.footer.blog') }}
            </a>
          </div>
          <div class="footer-link">
            <a target="_blank" href="https://twitter.com/Crypsureapp">
              {{ t('demo.footer.twitter') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { t } from '../i18n'
import CrypsureImg from '../assets/img/crs-logo.png'
</script>

<style lang="postcss" scoped>
@import '../css/global.postcss';

.footer-wrap {
  background-color: $bg-light;
  padding-top: 64px;
  margin-top: auto;
}
.footer-content {
  border-top: 1px solid $border-med;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
}
.footer {
  color: $text-dark;
}
.footer-left {
  max-width: 300px;
  padding-right: 30px;
  @mixin text-regular 14px;
}
.crypsure-logo {
  @mixin title 20px;
  display: flex;
  align-items: center;
  img {
    width: 44px;
    height: 44px;
    margin-right: 10px;
  }
}
.crypsure-demo {
  @mixin title-regular 14px;
  margin-top: 8px;
}
.crypsure-copyright {
  margin-top: 8px;
  color: $text-dark3;
}
.footer-right {
  display: flex;
  > div:not(:last-child) {
    margin-right: 16px;
  }
  a {
    @mixin title-semibold 13px;
    text-decoration: none;
    color: $text-dark3;
    &:hover {
      text-decoration: underline;
    }
  }
}
@media (max-width: 568px) {
  .footer-content {
    flex-direction: column;
  }
  .footer-left {
    padding-right: 0;
    text-align: center;
  }
  .crypsure-logo {
    justify-content: center;
  }
  .footer-right {
    flex-wrap: wrap;
    flex-direction: row;
    > div {
      width: 30%;
      margin: 16px 0 0 0;
      text-align: center;
      flex-grow: 1;
    }
  }
}
</style>
