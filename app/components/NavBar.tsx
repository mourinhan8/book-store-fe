"use client"

import UserDropdown from "@/components/AccountDropdown"
import CancelIcon from "@/icons/CancelIcon"
import MenuIcon from "@/icons/MenuIcon"
import useScroll from "@/lib/hooks/useScroll"
import { useUser } from "@/lib/hooks/useUser"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import CartDropdown from "app/components/CartDropdown"
import Link from "next/link"
import { useEffect, useState } from "react"

const NavBar = () => {
  const [navClassList, setNavClassList] = useState<string[]>([])
  const scroll = useScroll()

  const [openNav, setOpenNav] = useState(false)

  const closeNav = () => {
    setOpenNav(false)
  }

  useEffect(() => {
    document.body.style.overflowY = openNav ? "hidden" : "scroll"
  }, [openNav])

  // add shadow to nav (with classList) on scroll
  useEffect(() => {
    const _classList = []

    if (scroll.y > 25) _classList.push("!shadow")

    setNavClassList(_classList)
  }, [scroll.y])

  return (
    <>
      <header
        className={`sticky top-0 z-20 bg-skin-base ${navClassList.join(" ")}`}
      >
        <NavigationMenu.Root
          aria-label="primary"
          className=" main-navigation padding-x max-width relative m-auto flex max-w-6xl items-center justify-between py-4"
        >
          <div className="flex basis-1/3 justify-start md:hidden">
            <button
              type="button"
              title="menu"
              className="p-1"
              onClick={() => setOpenNav(true)}
            >
              <MenuIcon />
            </button>
          </div>

          <div className="flex basis-1/3 justify-center md:justify-start">
            <Link
              href="/"
              className="font-serif text-2xl font-semibold md:text-3xl"
            >
              Bookstore
            </Link>
          </div>

          <NavigationMenu.List className="flex gap-x-2 text-lg md:gap-x-4">
            <UserDropdown />
            <CartDropdown />
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </header>

      {/* ===== Mobile Navigation ===== */}
      <div
        className={`fixed left-0 top-0 z-30 h-screen w-full bg-skin-dark transition-all delay-300 duration-500 md:hidden ${
          openNav ? "opacity-50" : "hidden opacity-0"
        }`}
        onClick={closeNav}
      />
      <div
        className={`fixed top-0 z-30 flex h-screen max-h-screen w-10/12 flex-col items-center overflow-y-scroll bg-skin-base p-4 transition-transform duration-300 md:hidden ${
          openNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          title="Close Menu"
          className="self-end p-1"
          onClick={closeNav}
        >
          <CancelIcon className="scale-125" />
        </button>
        <div className="flex flex-col items-center gap-2">
          <div className="font-serif text-2xl font-medium">Next Book Store</div>
          <p className="text-center">
            One of the best book stores <br />
            in Viet Nam
          </p>
        </div>

        <NavigationMenu.Root
          orientation="vertical"
          className="mb-6 mt-4 self-stretch"
        >
          <NavigationMenu.List className="flex flex-col items-start gap-x-2 divide-y text-xl md:gap-x-4">
            <NavigationMenu.Item className={`flex w-full flex-col`}>
              <Link
                href="/"
                className={`flex items-center gap-x-2 px-2 py-1 text-xl`}
                onClick={closeNav}
              >
                <span>Home</span>
              </Link>
            </NavigationMenu.Item>
            <UserDropdown hidePopup={true} />
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </>
  )
}

export default NavBar
