import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct
  let index

  // add item on cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + quantity }
        }
        return item
      })
      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} ${product.name} added to the cart`)
  }

  // remove cart item 
  const onRemove = (id) => {
    foundProduct = cartItems.find(item => item._id === id)
    let updatedCartItems = cartItems.filter(item => item._id !== id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.quantity * foundProduct.price)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    setCartItems(updatedCartItems)
  }

  // update cart items quantity 
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((item) => item._id === id)
    // only updating the specific item quantity
    let newCartItems = cartItems.map(item => {
      if (item._id === id) {
        return {
          ...item, quantity:
            value === "inc"
              ? item.quantity + 1
              : value === "dec" && item.quantity > 1
                ? item.quantity - 1
                : item.quantity
        }
      }
      return item
    })

    setCartItems(newCartItems)

    if (value === "inc") {
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  // change item quantity 
  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty > 1) {
        return prevQty - 1
      }
      return prevQty
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)