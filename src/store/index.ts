import { reactive, computed, watch } from 'vue'
import { ICartItem, IProduct, IProductItem } from '../types'

const storeName = 'cart-store'

interface ICartStore {
  items: ICartItem[]
  checkoutStatus: string | null
}

const state = reactive<ICartStore>(
  localStorage.getItem(storeName)
    ? JSON.parse(localStorage.getItem(storeName) || '')
    : {
        items: [],
        checkoutStatus: null,
      },
)

watch(state, (value) => localStorage.setItem(storeName, JSON.stringify(value)))

const makeStore = () => ({
  items: computed(() => [...state.items]),
  quantity: computed(() => state.items.length),
  totalPrice: computed(() =>
    state.items.reduce((total, product) => total + product.price * product.quantity, 0),
  ),
  checkout: (_products: IProduct[]) => {
    // const savedCartItems = [...state.items];
    state.checkoutStatus = null
    // empty cart
    // state.items('setItems', { items: [] })
    // TODO -- make purchase
  },
  addItem: (item: IProductItem, product: IProduct) => {
    state.checkoutStatus = null
    if (product.stock > 0) {
      const cartItem = state.items.find((item) => item.id === product.id)
      if (!cartItem) {
        state.items = [{ ...item, quantity: 1 }, ...state.items]
      } else {
        cartItem.quantity += 1
      }
    }
  },
  setQuantity: (id: number, quantity: number) => {
    state.checkoutStatus = null
    if (quantity === 0) {
      state.items = state.items.filter((item) => item.id !== id)
    } else {
      const cartItem = state.items.find((item) => item.id === id)
      if (cartItem) {
        cartItem.quantity = quantity
      }
    }
  },
})

export const store = makeStore()
