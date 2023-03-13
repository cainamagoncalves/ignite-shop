import { IconContainer } from "@/styles/pages/app"
import { Basket } from "@phosphor-icons/react"
import { useShoppingCart } from "use-shopping-cart"

interface CartButtonProps {
  onChangeCartStatus: () => void
}

export default function CartButton({
  onChangeCartStatus
}: CartButtonProps) {
  const { cartCount } = useShoppingCart()

  const hasCartItems = cartCount !== 0

  return (
    <IconContainer onClick={onChangeCartStatus}>
      {hasCartItems && (
        <span>{cartCount}</span>
      )}
      <Basket cursor="pointer" size={24} weight="fill" />
    </IconContainer>

  )
}