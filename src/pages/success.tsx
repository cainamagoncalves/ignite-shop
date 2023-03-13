import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
    quantity: number;
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart, cartCount } = useShoppingCart()

  const productsQuantity = products.reduce((acc, curr) => acc += curr.quantity, 0)

  const hasItemsOnCart = cartCount !== 0

  useEffect(() => {
    if (hasItemsOnCart) clearCart()
  }, [hasItemsOnCart, clearCart])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <main>
          {products.map(product => {
            return (
              <ImageContainer key={product.name}>
                <Image src={product.imageUrl} width={140} height={140} alt="" />
              </ImageContainer>
            )
          })}
        </main>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {productsQuantity} camisetas já está a caminho da sua casa
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = query.session_id as string;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name

  const products = session.line_items.data.map(data => {
    const product = data.price.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0],
      quantity: data.quantity,
    }
  })

  return {
    props: {
      products,
      customerName
    }
  }
}