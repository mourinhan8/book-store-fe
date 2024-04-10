"use client"

import { CartItem, useCartStore, useToastStore } from "@/store/client"
import Image from "next/image"

type Props = {
  className?: string
  id: string
  title: string
  price: number
  image: string
  author: string
  tag: string
  stock: string
}

const ItemCard = ({
  className = "",
  id,
  title,
  price,
  image,
  stock,
  author,
  tag,
}: Props) => {
  const { cart, addToCart } = useCartStore()

  const { setToast } = useToastStore()

  const handleAddToCart = () => {
    const alreadyAdded = cart.find(item => item._id === id)
    if (alreadyAdded) {
      setToast({
        status: "info",
        message: "The book is already added",
      })
    } else {
      addToCart({
        _id: id,
        quantity: 1,
        title,
        price,
        coverImg: image,
        stock,
        author,
        tag,
      } as CartItem)
      setToast({
        status: "success",
        message: "The book has been added to cart",
      })
    }
  }

  const canAddToCart = stock ? parseInt(stock) > 0 : false
  return (
    <article
      className={`flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg ${className}`}
    >
      <div
        title={title}
        className="image-wrapper rounded border-2 border-skin-muted bg-skin-muted p-4 sm:p-8 md:p-4 lg:p-8"
      >
        <div className="relative h-44 w-full overflow-hidden transition-transform duration-200 hover:scale-105">
          <Image
            src={image}
            alt={title}
            fill
            sizes="
            (min-width: 1024px) 20vw,
            (min-width: 768px) 25vw,
            (min-width: 640px) 33vw,
            50vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="content px-4 pb-4">
        <header className="mb-3 line-clamp-6">
          <h3 className="text-base font-bold">{title}</h3>
          <h5 className="text-xs">{author}</h5>
          <h6 className="mt-2 text-xs font-bold">
            <i>{tag}</i>
          </h6>
        </header>
        <div className="flex justify-between gap-3">
          <div className="price mb-1 text-sm font-medium">
            <span>Stock: </span>
            <span>{stock || ""}</span>
          </div>
          <div className="price mb-1 text-base font-bold">
            <span>${price || 0}</span>
          </div>
        </div>
        <div className="buttons mt-2 flex gap-x-2">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className={`primary-btn-color flex-1 rounded px-1 py-2 text-sm font-semibold ${
              !canAddToCart ? "opacity-30" : ""
            }`}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default ItemCard
