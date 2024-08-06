"use client"

import { IconBrandLinktree } from "@irsyadadl/paranoid"

import { Link } from "next-view-transitions"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <nav className="flex mx-auto max-w-5xl w-full border rounded-lg px-4 items-center flex-wrap py-3 gap-3 transition-all duration-75">
      <Link
        href={"/"}
        className="text-lg font-bold hover:italic transition-all duration-100"
      >
        <IconBrandLinktree />
      </Link>
      <button
        hidden={pathname == "/"}
        type="button"
        onClick={() => router.back()}
        className="px-2 text-zinc-500 hover:text-zinc-900"
      >
        &larr;
      </button>
    </nav>
  )
}
