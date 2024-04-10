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

export interface BookQueryProps {
  slug: string;
  limit: number;
  pageNum: number;
  ids: string[];
  searchTerm: string;
}

export interface BookQueryObject {
  pagination: { 
    limit?: number; 
    page?: number;
    pageSize?: number;
  };
  filters: { 
    categories: { slug: { $eq: string; }; };
    id: { $in: string[]; };
  };
}