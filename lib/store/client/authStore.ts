import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  name: string
  email: string
  role: number
  point: number
  createdAt: string
  updatedAt: string
}
// Auth Store
type AuthState = {
  token: string
  user: User | null
  setToken: (token: string) => void
  removeToken: (token: string) => void
  setUser: (user: any) => void
  removeUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: "",
      setToken: token => set({ token }),
      removeToken: () => set({ token: "" }),
      user: null,
      setUser: user => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "auth",
    }
  )
)
