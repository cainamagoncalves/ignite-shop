import { useToastify } from "@/hooks/useToastify"
import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import Stripe from "stripe"
import { useShoppingCart } from "use-shopping-cart"
import { Product as ShoppingCartProduct } from "use-shopping-cart/core"
import "react-toastify/dist/ReactToastify.css";

interface StripeProduct {
  id: string
  name: string
  imageUrl: string
  price: number
  description: number
  defaultPriceId: string
}

interface ProductProps {
  product: StripeProduct
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { isFallback } = useRouter()

  const { addItem } = useShoppingCart()
  const { successMessage } = useToastify()

  function handleAddCartItem(product: StripeProduct) {
    const shoppingCartProduct = {
      id: product.id,
      name: product.name,
      image: product.imageUrl,
      sku: product.id,
      price: product.price,
      priceId: product.defaultPriceId,
      currency: 'BRL'
    }

    successMessage("Item adicionado ao carrinho.")
    addItem(shoppingCartProduct, { count: 1 })
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  const pageTitle = `${product.name} | Ignite shop`

  return (
    <>
      <ToastContainer />
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>


        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{new Intl.NumberFormat('pr-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(product.price / 100)}</span>

          <p>{product.description}</p>
          <button disabled={isCreatingCheckoutSession} onClick={() => handleAddCartItem(product)}>
            Adicionar ao carrinho
          </button>
        </ProductDetails>

      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [
      { params: { id: 'prod_NK4GRUiiD6iHQR' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}