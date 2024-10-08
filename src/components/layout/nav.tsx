"use client"

import { IconLayers2, IconToolbox } from "@irsyadadl/paranoid"
import { usePathname, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/types"
import { logout } from "@/actions/auth"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { pages } from "@/lib/links"

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
    router.replace("/login")
  }

  return (
    <nav className="flex mx-auto max-w-5xl w-full px-2 items-center flex-wrap py-3 gap-4 transition-all duration-75">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconToolbox />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuLabel>App Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => router.push("/")}
          >
            Home
          </DropdownMenuItem>
          {pages.map(({ href, label, icon: Icon }) => (
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
        &larr; back
      </button>
      <div className="flex-1 flex items-center justify-end gap-4">
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
