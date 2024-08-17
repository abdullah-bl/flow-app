"use client"

import { useCallback, useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { generate } from "@/actions/ai"
import { readStreamableValue } from "ai/rsc"
import { Skeleton } from "../ui/skeleton"
import { IconSparklesThree } from "@irsyadadl/paranoid"

export default function Summarize({ content }: { content: string }) {
  const [open, setOpen] = useState(false)
  const [summary, setSummary] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const summarize = useCallback(async () => {
    setLoading(true)
    const { output } = await generate(
      `content: ${content}`,
      `summarize the user content in 3 sentences or less no more than 70 words`
    )
    for await (const delta of readStreamableValue(output)) {
      setSummary((currentGeneration) => `${currentGeneration}${delta}`)
    }
    setLoading(false)
  }, [content])

  useEffect(() => {
    if (open && summary.length === 0) {
      summarize()
    }
  }, [open, summary, summarize])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="" title="Summarize">
        <IconSparklesThree width={18} height={18} />
      </PopoverTrigger>
      <PopoverContent className=" w-96 h-36 overflow-scroll">
        <pre className=" whitespace-pre-wrap text-sm">{summary}</pre>
        {loading && (
          <div className="grid gap-1">
            <Skeleton className="w-full h-2" />
            <Skeleton className="w-1/3 h-2" />
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
