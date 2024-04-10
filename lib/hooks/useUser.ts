import { useQuery } from "@tanstack/react-query"

import axios, { authJsonHeader } from "@/lib/api/axios"
import { User, useAuthStore } from "@/store/client"

export const getProfile = async (token: string): Promise<User> => {
  const headers = authJsonHeader(token)

  const response = await axios.get(`/users/profile`, {
    headers,
  })
  return response.data
}

export const useUser = () => {
  // Client Global State
  const { token, user } = useAuthStore()

  // Server State

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(token),
    keepPreviousData: true,
  })

  return { user: data || user, token, isLoading, isError }
}
