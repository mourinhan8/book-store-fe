import CartItemSection from "app/(routes)/cart/layouts/CartItems"
import MobileCartTotal from "app/(routes)/cart/layouts/MobileCartTotal"

export const metadata = {
  title: "Cart",
}

export default function Page() {
  return (
    <>
      <main className="main-container">
        <CartItemSection />
      </main>
      <MobileCartTotal />
    </>
  )
}
