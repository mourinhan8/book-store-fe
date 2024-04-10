"use client"

import Input from "@/components/Input"
import LoadingOverlay from "@/components/loading-ui/LoadingOverlay"
import { useCart, useMounted } from "@/hooks"
import AlertIcon from "@/icons/AlertIcon"
import CaretDownIcon from "@/icons/CaretDownIcon"
import { authJsonHeader } from "@/lib/api/axios"
import { useUser } from "@/lib/hooks/useUser"
import { useCartStore } from "@/store/client"
import scrollToTop from "@/utils/scrollToTop"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  fullName: string
  email: string
  username: string
  phone: string
  saveInfo: boolean
  address: string
  orderNotes: string
}

export interface BookOrder {
  id: string
  quantity: number,
}
export interface OrderData {
  books: BookOrder[],
  email: string,
  fullName: string,
  phoneNumber: string,
  address: string,
  note?: string,
}

export default function CheckoutSection() {
  const router = useRouter()
  const { user, token } = useUser()
  const { cart } = useCartStore() // cart data from localStorage
  const { cartData, totalPrice } = useCart() // fetched cart data

  const [errorMsg, setErrorMsg] = useState<string | null>(null) // Form overall error message
  const overallPrice = parseInt(totalPrice) // Overall Price

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const mutation = useMutation({
    mutationFn: (orderData: OrderData) => {
      const headers = authJsonHeader(token)

      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/purchases`,
        orderData,
        {
          headers,
        }
      )
    },
    onError: (error: Error | AxiosError) => {
      console.log(error)

      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          setErrorMsg("Network error occurs.")
        } else if (error.code === "ERR_BAD_REQUEST") {
          setErrorMsg(
            error.response?.data.error.message.replace("identifier", "email")
          )
        } else {
          setErrorMsg("An error occurs.")
        }
        scrollToTop()
      } else {
        // Just a stock error
        setErrorMsg("Unknown error occurs.")
      }
    },
    onSuccess: (data, variables, context) => {},
  })

  const mounted = useMounted()

  if (!mounted) return <LoadingOverlay />

  if (cart.length === 0) {
    router.back()
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    const orderData: OrderData = {
      books: cartData.map(item => ({
        id: item._id,
        quantity: item.quantity,
      })),
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phone,
      address: data.address,
      note: data.orderNotes
    }
    mutation.mutate(orderData)
  }

  return (
    <section>
      <h1 className="text-center font-serif text-2xl font-semibold lg:text-3xl">
        Checkout
      </h1>
      <p className="mb-8 text-center lg:mb-14">
        Provide your payment and delivery address information to finalize your
        order.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-4 md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-5 lg:gap-x-10"
      >
        <div className="md:col-span-1 lg:col-span-3">
          <h2 className="text-xl font-bold">Billing Details</h2>
          {errorMsg && (
            <span className="error mt-2 inline-block">
              <AlertIcon className="stroke-2 align-text-bottom" /> {errorMsg}
            </span>
          )}
          <div className="mt-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              errorMsg={errors?.fullName?.message}
              register={register("fullName", {
                pattern: {
                  value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                  message: "Please enter a valid full name.",
                },
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />

            <Input
              label="Email Address"
              placeholder="johndoe@gmail.com"
              errorMsg={errors?.email?.message}
              type="email"
              register={register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />

            <Input
              label="Phone"
              placeholder="+849501234 (or) 09501234"
              errorMsg={errors?.phone?.message}
              register={register("phone", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />

            <div className="mb-2">
              <label className="font-sans font-medium">
                Address
                <textarea
                  placeholder="No (27), 11 M, Hledan, Yangon"
                  rows={4}
                  className="my-1 block w-full rounded border-2 border-skin-gray bg-skin-base px-2 py-1 font-normal outline-skin-accent"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "This field is required.",
                    },
                  })}
                />
              </label>
              {errors.address && (
                <div className="error">{errors.address.message}</div>
              )}
            </div>

            <div className="my-4">
              <label className="font-sans font-medium">
                Order Notes (optional)
                <textarea
                  rows={4}
                  className="my-1 block w-full rounded border-2 border-skin-gray bg-skin-base px-2 py-1 font-normal outline-skin-accent"
                  {...register("orderNotes")}
                />
              </label>
              {errors.orderNotes && (
                <div className="error">{errors.orderNotes.message}</div>
              )}
            </div>
          </div>
          <hr />
          <Link
            href="/cart"
            className="text-link mt-4 hidden items-center font-sans underline-offset-8 md:inline-flex"
          >
            <CaretDownIcon className="rotate-90 stroke-skin-dark stroke-1" />{" "}
            Return to Cart
          </Link>
        </div>

        {/* ===== Order Summary Section ===== */}
        <div className="my-4 flex flex-col gap-3 rounded bg-skin-muted p-4 md:col-span-1 md:p-6 lg:col-span-2 lg:my-0 lg:p-8">
          <h2 className="text-center text-lg font-semibold">Order Summary</h2>

          <div className="flex justify-between font-semibold">
            <span>Item</span>
            <span>Subtotal</span>
          </div>
          <hr />

          {/* Cart Items */}
          {cartData.map(item => (
            <div key={item._id} className="flex items-center justify-between">
              <div className="max-w-[70%]">
                {item.title}{" "}
                <span className="font-light">x {item.quantity}</span>
              </div>
              <span>${item.price}</span>
            </div>
          ))}

          <hr />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-semibold">${overallPrice}</span>
          </div>

          <hr />

          {/* Payment Method */}
          <RadioGroup.Root
            className="flex flex-col gap-3"
            defaultValue="points"
            aria-label="Choose Payment Transfer Method"
          >
            <div className="flex items-start">
              <RadioGroup.Item
                className="h-5 w-5 cursor-default rounded-full bg-skin-muted shadow-[0_0_0_2px] shadow-skin-accent outline-none focus-within:border-2 focus-within:border-skin-accent"
                value="points"
                id="points"
              >
                <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-3 after:w-3 after:rounded-[50%] after:bg-skin-accent after:content-['']" />
              </RadioGroup.Item>
              <label
                className="ml-auto w-11/12 pl-2 text-left font-bold leading-none text-skin-dark"
                htmlFor="points"
              >
                Your points - {user?.point || 0} points (${user?.point || 0})
                <span className="mt-1 block text-sm font-normal">
                  Make your payment with your points
                </span>
              </label>
            </div>
          </RadioGroup.Root>

          <hr />
          {overallPrice > (user?.point || 0) ? (
            <div className="mb-1 mt-3 text-center text-sm font-bold text-red-500">
              Your balance is not enough!
            </div>
          ) : null}

          <button
            type="submit"
            disabled={overallPrice > (user?.point || 0)}
            className={`primary-btn-color rounded border-2 border-skin-dark py-2 font-sans font-semibold ${
              overallPrice > (user?.point || 0) ? "opacity-20" : ""
            }`}
          >
            Place Order
          </button>

          <Link
            href={`/cart`}
            className="outline-btn-color rounded border-2 py-2 text-center font-sans font-semibold shadow hover:shadow-md md:hidden"
          >
            Return to Cart
          </Link>
        </div>
      </form>
    </section>
  )
}
