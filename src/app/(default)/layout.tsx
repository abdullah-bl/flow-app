import Navbar from "@/components/layout/nav"
import { getUserFromSession } from "@/lib/auth"

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserFromSession()
  return (
    <div className="mx-auto max-w-4xl w-full h-full">
      {user && <Navbar user={user} />}
      {children}
    </div>
  )
}
