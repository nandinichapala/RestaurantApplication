import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  increaseDishItemQuantity: () => {},
  decreaseDishItemQuantity: () => {},
})

export default CartContext
