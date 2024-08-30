import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Unmount any existing app
const mounted = document.querySelector('#app')

if (mounted?.__vue_app__ !== undefined) {
  // mounted.__vue_app__._instance.proxy;
  mounted.__vue_app__.unmount()
}
export const CrypsurePluginDemo = createApp(App).use(router).mount('#app')

window.CrypsurePluginDemo = CrypsurePluginDemo
