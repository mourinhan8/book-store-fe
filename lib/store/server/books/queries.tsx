import { BookQueryProps, Books } from "./types"
import axios from "@/lib/api/axios"
import { useQuery } from "@tanstack/react-query"

/* ========== Get Multiple Books ========== */
export const getBooks = async (props?: BookQueryProps): Promise<Books> => {
  const response = await axios.get(`/books`)
  return response.data
}

interface UseBooks {
  initialData?: Books
  filter?: BookQueryProps
  enabled?: boolean
}

export const useBooks = ({ initialData, filter, enabled = true }: UseBooks) =>
  useQuery({
    queryKey: ["books", filter],
    queryFn: () => getBooks(filter),
    initialData,
    enabled: enabled,
  })
