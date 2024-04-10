export type Books = Book[]

export interface Book {
  _id: string
  stock: string
  status: number
  title: string
  author: string
  price: number
  coverImg: string
  tag: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface BookQueryProps {}
