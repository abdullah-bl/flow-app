"use client"

import { IconLayers2 } from "@irsyadadl/paranoid"
import { usePathname, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  IconFolderPaper,
  IconFolderBox,
  IconLayers,
  IconBag,
} from "@irsyadadl/paranoid"
import {
  FileIcon,
  GearIcon,
  PieChartIcon,
  ReaderIcon,
} from "@radix-ui/react-icons"
import { User } from "@/types"
import { logout } from "@/actions/auth"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"

export const Links = [
  { href: "/", label: "Home", icon: IconLayers2 },
  { href: "/tenders", label: "Tenders", icon: IconLayers },
  { href: "/contracts", label: "Contracts", icon: IconFolderBox },
  { href: "/invoices", label: "Invoices", icon: FileIcon },
  { href: "/souq", label: "Souq", icon: IconBag },
  { href: "/budgets", label: "Budgets", icon: PieChartIcon },
  { href: "/templates", label: "Templates", icon: IconFolderPaper },
  { href: "/reports", label: "Reports", icon: ReaderIcon },
  { href: "/settings", label: "Settings", icon: GearIcon },
]

export default function Navbar({ user }: { user: User }) {
  const { toast } = useToast()
  const greeting = new Date().getHours() < 12 ? "Good morning" : "Good evening"
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await logout()
    toast({
      title: "Signed out",
      description: "You have been signed out",
    })
    router.push("/login")
  }

  return (
    <nav className="flex mx-auto max-w-5xl w-full px-4 items-center flex-wrap py-3 gap-3 transition-all duration-75">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconLayers2 />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Links.map(({ href, label, icon: Icon }) => (
            <DropdownMenuItem
              className="flex items-center gap-2"
              key={href}
              onClick={() => router.push(href)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        hidden={pathname == "/"}
        type="button"
        onClick={() => router.back()}
        className="px-2 text-zinc-500 hover:text-zinc-900"
      >
        &larr;
      </button>
      <div className="flex-1 flex items-center justify-end gap-2">
        <span className="text-stone-800">
          {greeting}, {user.name}
        </span>
        <form method="POST" onSubmit={handleLogout}>
          <Button size={"sm"} variant={"default"} type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </nav>
  )
}
