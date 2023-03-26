import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrize, setTotalPrize] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrize,
        totalQuantities,
        qty,
      }}
    >
      {children}
    </Context.Provider>
  )
}