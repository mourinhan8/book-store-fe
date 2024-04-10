import { Book } from "@/types/Book"
import { create } from "zustand"
import { persist } from "zustand/middleware"

/* ===== Cart Store ===== */
export interface CartItem extends Book {
  _id: string
  quantity: number,
  timestamp?: number
}

type CartState = {
  cart: CartItem[]
  addToCart: (bookObj: CartItem) => void
  removeFromCart: (_id: string) => void
  updateQuantity: (_id: string, action: "increase" | "decrease") => void
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      cart: [],
      addToCart: bookObj => set(state => addCartItem(state.cart, bookObj)),
      removeFromCart: _id => set(state => removeCartItem(state.cart, _id)),
      updateQuantity: (_id, action) =>
        set(state => updateItemQuantity(state.cart, _id, action)),
    }),
    {
      name: "cart-storage",
    }
  )
)

/* ===== Cart Store Util Functions ===== */
function addCartItem(state: CartItem[], bookObj: CartItem) {
  const cartArray = state.filter(item => item._id !== bookObj._id)
  const newItem = { ...bookObj, timestamp: Date.now() }
  return { cart: [...cartArray, newItem] }
}

function removeCartItem(state: CartItem[], _id: string) {
  const removedCart = state.filter(item => item._id !== _id)
  return { cart: [...removedCart] }
}

function updateItemQuantity(
  state: CartItem[],
  _id: string,
  action: "increase" | "decrease"
) {
  const objIndex = state.findIndex(obj => obj._id == _id)

  if (action === "increase") {
    state[objIndex].quantity = state[objIndex].quantity + 1
  } else if (action === "decrease") {
    state[objIndex].quantity =
      state[objIndex].quantity - (state[objIndex].quantity > 1 ? 1 : 0)
  }

  return { cart: [...state] }
}
