"use client"

import UserIcon from "@/icons/UserIcon"
import { useUser } from "@/lib/hooks/useUser"
import { useAuthStore } from "@/store/client"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import Link from "next/link"

const UserDropdown = ({ hidePopup = false }: { hidePopup?: boolean }) => {
  const { user } = useUser()
  const { removeToken, removeUser } = useAuthStore()
  const logout = () => {
    removeToken("")
    removeUser()
    // location.reload()
  }

  return (
    <NavigationMenu.Item className="nav-menu-dropdown user-dropdown">
      <NavigationMenu.Trigger className="relative flex h-full items-center justify-center gap-x-2 px-2">
        {user ? (
          <div>
            {hidePopup ? (
              <div>
                {user.name} - {user.point || 0} points
              </div>
            ) : (
              <div className={`hidden md:inline`}>{user.name}</div>
            )}
          </div>
        ) : (
          <Link
            href={"/account"}
            className="flex h-full items-center gap-x-2 py-1 pl-1 pr-2"
          >
            <UserIcon />
            <span className="hidden md:inline">Account</span>
          </Link>
        )}
      </NavigationMenu.Trigger>

      {user && !hidePopup ? (
        <NavigationMenu.Content
          id="cart-content"
          className="absolute right-0 top-10 rounded-sm border border-skin-muted bg-skin-base p-4 shadow-lg"
        >
          <div className="mb-3 text-center font-serif text-base font-semibold">
            My Profile
          </div>

          <div className="my-2 flex items-baseline justify-between">
            <span className="text-base">Points : </span>
            <span className="text-base font-semibold"> ${user.point || 0}</span>
          </div>
          <div className="flex justify-between gap-x-2 text-base">
            <NavigationMenu.Link asChild>
              <Link
                href={`/my-order`}
                className="outline-btn-color w-full rounded-sm px-2 py-1 text-center transition-colors duration-200"
              >
                My Order
              </Link>
            </NavigationMenu.Link>
            <NavigationMenu.Link asChild>
              <div className="text-base">
                <button
                  onClick={logout}
                  type="button"
                  className={`primary-btn-color  w-full rounded-sm px-2 py-1 text-center`}
                >
                  Logout
                </button>
              </div>
            </NavigationMenu.Link>
          </div>
        </NavigationMenu.Content>
      ) : null}
    </NavigationMenu.Item>
  )
}

export default UserDropdown
