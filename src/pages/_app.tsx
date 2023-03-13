import { Cart } from '@/components/Cart'
import CartButton from '@/components/CartButton'
import { useCart } from '@/hooks/useCart'
import { globalStyles } from '@/styles/global'
import { Container, Header } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import { CartProvider } from 'use-shopping-cart'
import logoImg from '../assets/images/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const { handleChangeCartStatus, isCartOpen, cartContainerRef } = useCart()

  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.STRIPE_PUBLIC_KEY}
      currency="BRL"
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Image src={logoImg} alt="" />
          <CartButton
            onChangeCartStatus={handleChangeCartStatus}
          />
        </Header>
        <Component {...pageProps} />
        <Cart ref={cartContainerRef} onCloseCart={handleChangeCartStatus} isOpen={isCartOpen} />
      </Container>
    </CartProvider>
  )
}
