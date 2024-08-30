import StorePage from '/src/components/StorePage.vue'
import Checkout from '/src/components/Checkout.vue'
import { createRouter } from './route'

const router = createRouter({
  routes: [
    {
      path: '/mens',
      name: 'mens',
      component: StorePage,
      meta: { title: "Mens's Store" },
    },
    {
      path: '/womens',
      name: 'womens',
      component: StorePage,
      meta: { title: "Womens's Store" },
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: StorePage,
      meta: { title: 'Accessories Store' },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: { title: 'Crypsure Checkout' },
    },
  ],
})

router.afterEach((to, _from) => {
  const parent = to?.matchedParentRoutes.find((record) => record.meta?.title)
  const parentTitle = parent ? parent.meta?.title : null
  document.title = to?.meta?.title || parentTitle || 'Crypsure'
})

export default router
