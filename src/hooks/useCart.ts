import { useEffect, useRef, useState } from "react";

export function useCart() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartContainerRef = useRef(null)

  function handleCloseCartOnClickOutside(event: { target: EventTarget }) {
    if (cartContainerRef.current && !cartContainerRef.current.contains(event.target)) {
      setIsCartOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleCloseCartOnClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleCloseCartOnClickOutside, true);
    };
  }, [])

  function handleCloseCartOnEscPress(event: KeyboardEvent) {
    if (event.key === 'escape') {
      setIsCartOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleCloseCartOnEscPress);
    return () => {
      document.removeEventListener('keydown', handleCloseCartOnEscPress);
    };
  }, [])


  function handleChangeCartStatus() {
    if (isCartOpen) {
      setIsCartOpen(false)
    } else {
      setIsCartOpen(true)
    }
  }


  useEffect(() => {
    document.addEventListener('click', handleCloseCartOnClickOutside, true);
    return () => {
      document.removeEventListener('click', handleCloseCartOnClickOutside, true);
    };
  }, [])

  return { cartContainerRef, isCartOpen, handleChangeCartStatus }
}