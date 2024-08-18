export interface IProduct {
  id: number
  price: number
  stock: number
  name: string
  image: string
  variants: string[]
  sizes: string[]
}

// A specific variant and size of a product
export interface IProductItem {
  id: number
  name: string
  size: string
  variant: string
  image: string
  price: number
}

export interface ICartItem extends IProductItem {
  quantity: number
}
