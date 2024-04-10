import { useCartStore } from "@/store/client"

export const useCart = () => {
  // Client Global State
  const { cart } = useCartStore()

  const cartData = cart

  let totalPrice = "0"
  let totalQuantity = 0

  if (cartData) {
    totalPrice = cartData
      .reduce(
        (accumulator: number, currentItem) =>
          accumulator + currentItem.price * currentItem.quantity,
        0
      )
      .toLocaleString()
  }

  totalQuantity = cart.reduce(
    (accumulator: number, currentItem) => accumulator + currentItem.quantity,
    0
  )

  return { cartData, totalPrice, totalQuantity }
}
