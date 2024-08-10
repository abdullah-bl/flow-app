"use client"

import { useState } from "react"
import { useToast } from "../ui/use-toast"
import { CopyIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"

export const Copy = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const copy = async () => {
    setCopied(true)
    await navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: content.slice(0, 100),
    })
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button
      size={"sm"}
      type="button"
      className="flex items-center gap-2 text-sm"
      onClick={copy}
      variant={"outline"}
    >
      <CopyIcon />
      {copied ? (
        <span className="text-sm">Copied!</span>
      ) : (
        <span className="text-sm">Copy to clipboard</span>
      )}
    </Button>
  )
}
