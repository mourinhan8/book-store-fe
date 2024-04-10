import Footer from "@/components/Footer"
import NavBar from "@/components/NavBar"
import Toast from "@/components/Toast"
import { Fraunces, Quicksand } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
})

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${quicksand.variable}`}>
      <head />
      <body>
        <div className="flex min-h-screen flex-col">
          <Providers>
            <NavBar />
            {children}
            <Footer />
            <Toast />
          </Providers>
        </div>
      </body>
    </html>
  )
}
