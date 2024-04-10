"use client"

import BookRow from "@/components/BookRow"

const BooksListSection = () => {
  return (
    <div id="books" className="py-14">
      <section className="mx-auto max-w-6xl px-4 py-6 md:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl">
            List
          </h2>
        </div>
        <BookRow />
      </section>
    </div>
  )
}

export default BooksListSection
