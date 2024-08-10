import Navbar from "@/components/layout/nav"
import { getUserFromSession } from "@/lib/auth"

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserFromSession()
  return (
    <div className="flex flex-col gap-4 w-full h-full mx-auto max-w-4xl">
      {user && <Navbar user={user} />}
      {children}
    </div>
  )
}
