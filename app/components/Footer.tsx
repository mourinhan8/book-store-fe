"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Footer = () => {
  const pathname = usePathname()

  const hideOnMobile = pathname === "/cart" ? "hidden lg:block" : ""

  return (
    <footer className={`mt-auto shadow-inner ${hideOnMobile} `}>
      <div className="footer-container mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:grid-rows-4 md:gap-x-6 md:gap-y-0 md:px-8 lg:gap-x-8 lg:gap-y-2">
        <div className="bookstore-desc col-span-2 md:row-span-3">
          <h2 className="my-2 font-serif text-xl font-semibold">Bookstore</h2>
          <div className="text-sm">
            <p className="my-1">
              We are an online bookstore that offers a wide selection of books
              in various genres, including fiction, non-fiction, biographies,
              and more.
            </p>
            <p>
              We provide a convenient and enjoyable shopping experience while
              offering competitive prices and excellent customer service.
            </p>
          </div>
        </div>

        <div className="about-us md:row-span-4">
          <h2 className="my-1 font-serif text-xl font-semibold">Quick Links</h2>
          {quickLinks.map(({ id, href, title }) => (
            <div key={id}>
              <Link
                href={href}
                className="text-link inline-block py-1 font-sans"
              >
                {title}
              </Link>
            </div>
          ))}
        </div>

        <div className="services md:row-span-4">
          <h2 className="my-1 font-serif text-xl font-semibold">Contact</h2>
          <p className="mb-3 text-sm">
            Email:{" "}
            <a
              href="mailto: info@bookstore.com"
              className="text-link mt-1 block"
            >
              info@bookstore.com
            </a>
          </p>
          <p className="mb-3 text-sm">
            Phone:{" "}
            <a href="tel:+84355-999-999" className="text-link mt-1 block">
              +84355-999-999
            </a>
          </p>
          <p className="mb-3 text-sm">
            Address: <span className="mt-1 block">Ho Chi Minh, Viet Nam</span>
          </p>
        </div>
      </div>
      <div className="copyright-notice-container bg-skin-dark">
        <div className="copyright-notice mx-auto flex max-w-6xl flex-col items-center px-4 py-1 text-skin-base md:flex-row  md:justify-between md:px-8">
          <span>© Copyright {new Date().getFullYear()} - Bookstore</span>
        </div>
      </div>
    </footer>
  )
}

const quickLinks = [
  { id: 1, title: "About Us", href: "" },
  { id: 2, title: "Contact Us", href: "" },
  { id: 3, title: "FAQ", href: "" },
  { id: 4, title: "Return Policy", href: "" },
  { id: 5, title: "Terms & Conditions", href: "" },
]

export default Footer
