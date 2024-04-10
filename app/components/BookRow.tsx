"use client"

import ItemCard from "@/components/ItemCard"
import CardSkeletons from "@/loading-ui/CardSkeletons"
import { useBooks } from "@/store/server/books/queries"
import { Book } from "@/types/Book"

export default function BookRow() {
  const { data: books, isError, isLoading } = useBooks({})

  console.log("DAta", books)

  if (isLoading || isError) return <CardSkeletons num={5} />

  return (
    <div className="cards-container">
      {books && books.length
        ? books?.map((book: Book) => {
            const { _id, price, title, stock, author, tag, coverImg } = book
            return (
              <ItemCard
                key={_id}
                id={_id}
                price={price}
                title={title}
                image={coverImg}
                author={author}
                tag={tag}
                stock={stock}
              />
            )
          })
        : "Books not found!"}
    </div>
  )
}
