import Shirt1Img from './assets/img/products/shirt1.jpg'
import Hoodie1Img from './assets/img/products/hoodie1.jpg'
import Shoes1Img from './assets/img/products/shoes1.jpg'
import Jeans1Img from './assets/img/products/jeans1.jpg'
import Shoes2Img from './assets/img/products/shoes2.jpg'
import Dress1Img from './assets/img/products/dress1.jpg'
import Bracelet1Img from './assets/img/products/bracelet1.jpg'
import Bracelet2Img from './assets/img/products/bracelet2.jpg'
import { IProduct } from './types'

const mens: IProduct[] = [
  {
    id: 1,
    name: 'Weatherproof Flannel',
    sizes: ['S', 'M', 'L'],
    variants: ['Modern'],
    stock: 10,
    price: 4500,
    image: Shirt1Img,
  },
  {
    id: 2,
    name: 'Classic Dress Shoes',
    sizes: ['8', '9', '10', '11', '12'],
    variants: ['Brown', 'Black'],
    stock: 22,
    price: 11000,
    image: Shoes1Img,
  },
  {
    id: 3,
    name: 'Sportswear Fleece Hoodie',
    sizes: ['S', 'M', 'L'],
    variants: ['White', 'Navy'],
    stock: 10,
    price: 6000,
    image: Hoodie1Img,
  },
]

const womens: IProduct[] = [
  {
    id: 4,
    name: 'Lexie High Rise Skinny',
    sizes: ['S', 'M'],
    variants: ['Tango Mild'],
    stock: 4,
    price: 7000,
    image: Jeans1Img,
  },
  {
    id: 5,
    name: 'Cream High Boots',
    sizes: ['S', 'M'],
    variants: ['Laced', 'Velcro'],
    stock: 15,
    price: 9000,
    image: Shoes2Img,
  },
  {
    id: 6,
    name: 'Autumn Corduroy Dress',
    sizes: ['S', 'M'],
    variants: ['Maroon', 'Burgundy'],
    stock: 4,
    price: 5000,
    image: Dress1Img,
  },
]

const accessories: IProduct[] = [
  {
    id: 7,
    name: 'Classic Loop Bracelet',
    sizes: ['S'],
    variants: ['Gold', 'Silver', 'Pink'],
    stock: 5,
    price: 3200,
    image: Bracelet1Img,
  },
  {
    id: 8,
    name: 'Handmade Serpent Bracelet',
    sizes: ['S'],
    variants: ['Silver/Black', 'Silver/Gold'],
    stock: 3,
    price: 10000,
    image: Bracelet2Img,
  },
]

export function getProducts(category: string): IProduct[] {
  if (category === 'mens') {
    return [...mens]
  }
  if (category === 'womens') {
    return [...womens]
  }
  return [...accessories]
}
