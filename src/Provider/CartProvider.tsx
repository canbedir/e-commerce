import { CartContextProvider } from '@/hooks/useCart'
import React from 'react'

interface CartProviderProps{
    children: React.ReactNode
}

const CartProvider = ({children}:CartProviderProps) => {
  return (
    <CartContextProvider>
        {children}
    </CartContextProvider>
  )
}

export default CartProvider