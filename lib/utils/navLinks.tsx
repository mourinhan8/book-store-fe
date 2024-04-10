type Position = "top" | "top-only" | "main" | "main-mobile"

type NavLinks = {
  name: string
  href: string
  icon: JSX.Element | null
  position: Position
}[]

const navLinks: NavLinks = []

export default navLinks
