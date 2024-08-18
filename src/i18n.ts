import {
  fallbackWithLocaleChain,
  registerLocaleFallbacker,
  registerMessageResolver,
  resolveValue,
} from '@intlify/core-base'
import { createI18n } from 'petite-vue-i18n'
import en from './translations/en.json'

type II18nLocales = 'en'

type MessageSchema = typeof en

// register message resolver of vue-i18n
registerMessageResolver(resolveValue)

// register locale fallbacker of vue-i18n
registerLocaleFallbacker(fallbackWithLocaleChain)

export default createI18n<[MessageSchema], II18nLocales>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  silentFallbackWarn: true,
  silentTranslationWarn: true,
  fallbackRoot: true,
  messages: { en },
})
