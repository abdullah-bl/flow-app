"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const CustomLink: React.FC<React.ComponentProps<typeof Link>> = ({
  children,
  ...props
}) => {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        props.className,
        "hover:underline hover:font-medium transition-all duration-75",
        pathname === props.href ? "font-medium bg-stone-50" : ""
      )}
    >
      {children}
    </Link>
  )
}
