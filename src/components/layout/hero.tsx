import { cn } from "@/lib/utils"
import React from "react"

export const HeroSection: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return (
    <div
      className={cn(
        props.className,
        "aspect-[8/1] p-2 flex items-center flex-col justify-center"
      )}
    >
      {props.children}
    </div>
  )
}

export const Hero = ({ children }: { children: React.ReactNode }) => (
  <div className="aspect-[8/1] p-2 flex items-center flex-col justify-center">
    {children}
  </div>
)
