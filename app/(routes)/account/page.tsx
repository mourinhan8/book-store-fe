import LoginForm from "./layouts/LoginForm"
import RegisterForm from "./layouts/RegisterForm"
import Breadcrumb from "@/components/Breadcrumb"

export default async function Page() {
  return (
    <main className="main-container">
      <Breadcrumb />
      <h1 className="font-serif text-2xl font-semibold capitalize">
        My Account
      </h1>
      <div className="my-8 flex flex-col divide-y-2 divide-skin-gray md:flex-row md:divide-x-2 md:divide-y-0">
        <LoginForm />
        <RegisterForm />
      </div>
    </main>
  )
}
