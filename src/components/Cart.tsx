import { useToastify } from "@/hooks/useToastify";
import { CartContainer, ImageContainer, ItemContainer, QuantityContainer, TotalPriceContainer } from "@/styles/components/cart";
import { X } from "@phosphor-icons/react";
import axios from "axios";
import Image from "next/image";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface CartProps {
  isOpen: boolean
  onCloseCart: () => void
}

const CartBase: ForwardRefRenderFunction<HTMLDivElement, CartProps> = ({
  isOpen,
  onCloseCart,
}, ref) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { removeItem, cartDetails, cartCount } = useShoppingCart()

  const products = Object.entries(cartDetails).map(([key, product]) => {
    return {
      id: product.id,
      name: product.name,
      price: new Intl.NumberFormat('pr-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(product.price / 100),
      defaultPrice: product.price * product.quantity,
      imageUrl: product.image,
      quantity: product.quantity,
      priceId: product.priceId,
    }
  })

  const productsQuantity = cartCount !== 1
    ? `${cartCount} itens`
    : `${cartCount} item`

  const totalPrice = products.reduce((acc, curr) => acc += curr.defaultPrice, 0)

  const { errorMessage } = useToastify()

  async function handleBuyProducts() {
    setIsCreatingCheckoutSession(true)

    const prices = products.map(product => {
      return {
        price: product.priceId,
        quantity: product.quantity
      }
    })

    try {
      const response = await axios.post('/api/checkout', {
        prices: prices
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry) 

      setIsCreatingCheckoutSession(false)

      errorMessage('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartContainer isOpen={isOpen} ref={ref}>
      <header>
        <X cursor="pointer" size={32} weight="light" onClick={onCloseCart} />
      </header>

      <h1>Sacola de compras</h1>

      <main>
        {products.map(product => {
          return (
            <ItemContainer key={product.id}>
              <ImageContainer>
                <span>{product.quantity}</span>
                <Image src={product.imageUrl} width={90} height={94} alt="" />
              </ImageContainer>
              <div>
                <p>{product.name}</p>
                <span>{product.price}</span>
                <button onClick={() => removeItem(product.id)}>Remover</button>
              </div>
            </ItemContainer>
          )
        })}
      </main>

      <footer>
        <QuantityContainer>
          <p>Quantidade</p>
          <span>{productsQuantity}</span>
        </QuantityContainer>
        <TotalPriceContainer>
          <p>Valor total</p>
          <h2>{new Intl.NumberFormat('pr-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalPrice / 100)}</h2>
        </TotalPriceContainer>

        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProducts}>Finalizar Compra</button>
      </footer>

    </CartContainer>
  )
}

export const Cart = forwardRef(CartBase)