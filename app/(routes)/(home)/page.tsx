import BooksListSection from "app/(routes)/(home)/layouts/BooksSection"
import HeroSection from "./layouts/HeroSection"

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <BooksListSection />
    </main>
  )
}
