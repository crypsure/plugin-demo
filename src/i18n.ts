import { getString, SimpleI18n } from '@crypsure/plugin'

export const fallback = {
  plugin: {
    title: 'Crypsure',
    secure: 'Protected by Crypsure',
    crypsure: 'CRYPSURE',
    chargebacks: {
      label: 'DIRECT CHARGE',
      select: 'Select your cryptocurrency below:',
      select_label: 'Select Crypto',
      schedule: 'Schedule',
      protection: 'Charge Protection',
      price: 'Price',
      usd_price: 'USD Price',
      currency: {
        CRS: 'Crypsure (CRS)',
        ETH: 'Ethereum (ETH)',
      },
    },
    preorder: {
      label: 'PREORDER',
      select: 'Prepay for a future delivery:',
    },
    escrow: {
      label: 'ESCROW',
      enter: 'Place funds into escrow',
    },
    continue: 'CONTINUE SHOPPING',
    confirm: 'CONFIRM',
  },
  demo: {
    title: 'CRS Shop',
    header_cart: 'CART',
    header_cart_items: 'IN YOUR CART',
    add: 'Add to cart',
    cart: {
      empty: 'The cart is empty',
      delivery: 'Free Delivery Worldwide*',
      info: 'More info here',
      total: 'Total',
      continue: 'CONTINUE SHOPPING',
      checkout: 'PROCEED TO CHECKOUT',
      size: 'Size',
    },
    mens: {
      label: 'MENS',
      title: "Browse Men's",
    },
    womens: {
      label: 'WOMENS',
      title: "Browse Women's",
    },
    accessories: {
      label: 'ACCESSORIES',
      title: 'Browse Accessories',
    },
    checkout: {
      label: 'CHECKOUT',
      payment: {
        title: 'PAYMENT METHOD',
        subtitle: 'How would you like to pay?',
        text_right: 'Step 1 of 4',
        express: 'Express checkout',
        card: 'Credit Card',
      },
      billing: {
        title: 'BILLING DETAILS',
        subtitle: 'Please enter your billing info.',
        text_right: 'Step 2 of 4',
      },
      shipping: {
        title: 'SHIPPING METHOD',
        subtitle: 'How would you like this order delivered?',
        text_right: 'Step 3 of 4',
      },
    },
    footer: {
      copyright: '© 2024 Crypsure',
      text: 'Payment demo presented by Crypsure. This site is for demonstration only.',
      sale: 'Token Sale',
      blog: 'Blog',
      twitter: 'Twitter',
      telegram: 'Telegram',
      facebook: 'Facebook',
    },
  },
}

export const i18n = new SimpleI18n(fallback)
export const t = getString(i18n)
