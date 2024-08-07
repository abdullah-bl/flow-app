import Navbar from "@/components/layout/nav";
import { getUserFromSession } from "@/lib/auth";



export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const user = getUserFromSession();
  return (
    <div className="flex flex-col gap-4 w-full h-full mx-auto max-w-5xl">
      {user && <Navbar user={user} />}
      {children}
    </div>
  )
}