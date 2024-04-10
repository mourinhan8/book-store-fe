"use client"

import { useState } from "react"
import Error from "next/error"
import axios, { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import AuthAlert from "@/components/AuthAlert"
import Input from "@/components/Input"
import AlertIcon from "@/icons/AlertIcon"
import scrollToTop from "@/utils/scrollToTop"
import { useAuthStore } from "@/store/client"

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const { setToken, setUser } = useAuthStore()

  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: (userData: Inputs) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`,
        userData
      ),
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          setErrorMsg("Network error occurs.")
        } else if (error.code === "ERR_BAD_REQUEST") {
          console.log(error)
          const errMsg = (error?.response?.data as any).error?.message || ""
          setErrorMsg(errMsg.replace("This attribute", "Phone"))
        } else {
          setErrorMsg("An error occurs.")
        }
        scrollToTop()
      } else {
        // Just a stock error
        setErrorMsg("Unknown error occurs.")
      }
    },
    onSuccess: (data, variables, context) => {
      const { token, profile } = data.data
      setToken(token)
      setUser(profile)
      setErrorMsg(null)
      setOpen(true)
    },
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    mutation.mutate(data)
  }

  return (
    <>
      <section className="flex-1 pt-8 md:pl-10 md:pt-0 xl:pl-20">
        <h2 className="text-xl font-bold">Register</h2>
        {errorMsg && (
          <span className="error mt-2 inline-block">
            <AlertIcon className="stroke-2 align-text-bottom" /> {errorMsg}
          </span>
        )}
        <form action="" className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            errorMsg={errors?.name?.message}
            register={register("name", {
              pattern: {
                value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                message: "Please enter a valid name.",
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
            label="Password"
            type="password"
            placeholder="password"
            errorMsg={errors?.password?.message}
            register={register("password", {
              required: {
                value: true,
                message: "This field is required.",
              },
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            errorMsg={errors?.confirmPassword?.message}
            register={register("confirmPassword", {
              required: {
                value: true,
                message: "This field is required.",
              },
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Passwords do no match"
                }
              },
            })}
          />

          <button
            type="submit"
            className="primary-btn-color mt-4 rounded px-8 py-2 font-sans font-medium md:px-5 md:py-1"
          >
            {mutation.isLoading ? "Loading" : "Register"}
          </button>
        </form>
      </section>

      <AuthAlert
        open={open}
        setOpen={setOpen}
        title="Registration Success"
        desc="Congratulations! Your account has been successfully created. "
      />
    </>
  )
}
