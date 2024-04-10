"use client"

import Breadcrumb from "@/components/Breadcrumb"
import CheckoutButton from "@/components/CheckoutButton"
import { useCart, useMounted } from "@/hooks"
import CancelIcon from "@/icons/CancelIcon"
import CaretDownIcon from "@/icons/CaretDownIcon"
import EmptyCartIcon from "@/icons/EmptyCartIcon"
import LoadingIcon from "@/icons/LoadingIcon"
import { useCartStore } from "@/store/client"
import Image from "next/image"
import Link from "next/link"

export default function OrderList() {
  const { cartData, totalPrice } = useCart()
  const { cart, removeFromCart, updateQuantity } = useCartStore()

  const mounted = useMounted()

  return (
    <section className="mb-20 lg:mb-auto">
      <Breadcrumb />
      <h1 className="font-serif text-xl font-semibold md:text-2xl">My Cart</h1>
      <div className="my-4 ">
        <div className="table-wrapper lg:col-span-2 ">
          <div className="lg:min-h-[20.25rem]">
            <table className="w-full">
              <thead className="hidden bg-skin-muted font-sans font-semibold md:table-header-group">
                <tr>
                  <th colSpan={2} className="w-[22.5%] py-1">
                    Order
                  </th>
                  <th className="py-1 md:text-right">Books</th>
                  <th colSpan={2} className="w-[22.5%] py-1">
                    Total
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!mounted || cart.length < 1 ? (
                  <tr>
                    <td colSpan={6} className="h-64 w-full text-center">
                      <div className="flex flex-col items-center">
                        <LoadingIcon />
                        <span>
                          {mounted ? "Order is empty!" : "Order is loading..."}
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  cartData.map((item, index) => (
                    <tr
                      key={item._id}
                      className="grid grid-cols-[auto_2fr_auto] grid-rows-[2fr_1fr_1fr_1fr] gap-x-2 border-b py-2 font-sans md:table-row"
                    >
                      <td>
                        <div className="relative h-44 w-full md:h-36">
                          Order #{index + 1}
                        </div>
                      </td>

                      <td>
                        <span className="md:hidden">Price: </span>
                        <span className="font-medium">
                          ${item.price.toLocaleString()}
                        </span>
                      </td>

                      <td>
                        <span className="md:hidden">Total: </span>
                        <span className="inline-block w-28 text-lg font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <button
                          title="Remove"
                          type="button"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <CancelIcon className="stroke-skin-dark hover:stroke-2" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <hr />
          <Link
            href="/"
            className="text-link mt-4 hidden items-center font-sans underline-offset-8 lg:inline-flex"
          >
            <CaretDownIcon className="rotate-90 stroke-skin-dark stroke-1" />{" "}
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}
