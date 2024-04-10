"use client"

import { useCart } from "@/hooks"
import CancelIcon from "@/icons/CancelIcon"
import CartIcon from "@/icons/CartIcon"
import EmptyCartIcon from "@/icons/EmptyCartIcon"
import { CartItem, useCartStore } from "@/store/client"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import Image from "next/image"
import Link from "next/link"
import CheckoutButton from "./CheckoutButton"

const CartDropdown = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore()

  const { cartData, totalPrice, totalQuantity } = useCart()

  return (
    <NavigationMenu.Item className="nav-menu-dropdown cart-dropdown">
      <NavigationMenu.Trigger
        aria-label="Cart"
        className="relative flex h-full items-center justify-center gap-x-2 px-2"
        aria-controls="cart-content"
      >
        <CartIcon />
        <span className="hidden md:inline">Cart</span>
        {totalQuantity > 0 && (
          <span
            aria-label={`Number of items: ${totalQuantity}`}
            className="bg-skin absolute -right-2 -top-2 inline-block rounded-full bg-skin-accent px-2 py-1 text-xs text-skin-base md:-left-1 md:-top-1 md:right-auto"
          >
            {totalQuantity}
          </span>
        )}
      </NavigationMenu.Trigger>

      <NavigationMenu.Content
        id="cart-content"
        className="absolute right-0 top-14 rounded-sm border border-skin-muted bg-skin-base p-4 shadow-lg"
      >
        <div className="mb-4 text-center font-serif text-base font-semibold">
          My Shopping Cart
        </div>
        <div className="mb-4 max-h-80 overflow-y-auto">
          {cart.length < 1 ? (
            <div className="flex h-36 items-center justify-center">
              <div className="mx-3 flex w-64 flex-col items-center">
                <EmptyCartIcon className="h-12 w-12" />
                <span className="text-center text-sm opacity-75">
                  Cart is empty!
                </span>
              </div>
            </div>
          ) : (
            <ul>
              {cartData.map((item: CartItem) => (
                <li
                  key={item._id}
                  className="grid grid-cols-[auto_2fr_auto] grid-rows-[2fr_1fr_1fr] gap-x-2 border-b py-2 font-sans text-sm"
                >
                  <div className="row-span-4 w-24">
                    <Link
                      href={`/item/${item._id}`}
                      className="relative inline-block h-32 w-full"
                    >
                      <Image
                        src={item.coverImg}
                        alt={item.title}
                        className="object-contain py-1"
                        fill
                        sizes="(min-width: 640px) 20vw, 50vw"
                        priority
                      />
                    </Link>
                  </div>
                  <div className="col-start-2 row-start-1 w-36">
                    <NavigationMenu.Link asChild>
                      <Link
                        href={`/item/${item._id}`}
                        className="text-link line-clamp-2 font-medium italic"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                  <div className="col-span-2 col-start-2 row-start-2">
                    <span className="">Price: </span>
                    <span className="font-medium">
                      ${item.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="col-span-2 col-start-2 row-start-3">
                    <button
                      type="button"
                      title="Reduce Quantity"
                      onClick={() => updateQuantity(item._id, "decrease")}
                      className={`rounded-sm border bg-skin-muted px-3 py-1 leading-none ${
                        item.quantity < 2
                          ? "cursor-not-allowed bg-skin-muted opacity-75"
                          : ""
                      }`}
                      tabIndex={item.quantity < 2 ? -1 : 0}
                    >
                      -
                    </button>
                    <span className="mx-2 inline-block w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      title="Reduce Quantity"
                      onClick={() => updateQuantity(item._id, "increase")}
                      className="rounded-sm border bg-skin-muted px-3 py-1 leading-none"
                    >
                      +
                    </button>
                  </div>
                  <div className="col-span-1 col-start-3 row-span-1 row-start-1">
                    <button
                      title="Remove"
                      type="button"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <CancelIcon className="opacity-75 hover:stroke-2 hover:opacity-100" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <hr />
        <div className="my-2 flex items-baseline justify-between">
          <span className="text-base">Total Price :</span>
          <span className="text-base font-semibold">${totalPrice}</span>
        </div>

        <div className="flex justify-between gap-x-2 text-base">
          <NavigationMenu.Link asChild>
            <CheckoutButton
              className="rounded-sm"
              isDisabled={cart.length < 1}
            />
          </NavigationMenu.Link>
          <NavigationMenu.Link asChild>
            <Link
              href={`/cart`}
              className="outline-btn-color w-full rounded-sm py-1 text-center transition-colors duration-200"
            >
              View Cart
            </Link>
          </NavigationMenu.Link>
        </div>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )
}

export default CartDropdown
