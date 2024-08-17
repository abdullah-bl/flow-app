import { useState } from "react"
import { Button } from "../ui/button"
import { IconSparklesThree } from "@irsyadadl/paranoid"
import * as ai from "@/actions/ai"
import { readStreamableValue } from "ai/rsc"
import { useToast } from "../ui/use-toast"

export const Generate = ({
  value = "",
  setValue,
  title = "Generate",
}: {
  title: string
  value?: string
  setValue: (value: string | undefined) => void
}) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const handleGenerate = async () => {
    try {
      setLoading(true)
      const { output } = await ai.generate(
        value,
        `Act as a project manager and generate a detailed project plan for a software development project. The plan should include the following:

            1.	Project Overview: A brief summary of the project objectives, goals, and key deliverables.
            2.	Timeline and Milestones: A timeline with key milestones, deadlines, and dependencies.
            3.	Resource Allocation: A list of resources required, including team members, tools, and budget considerations.
            4.	Risk Management: An analysis of potential risks, including mitigation strategies and contingency plans.
            5.	Communication Plan: A strategy for internal and external communication, including stakeholder engagement.

        Ensure the plan is professional, clear, and designed to align with agile project management principles`
      )
      let result = ""
      for await (const chunk of readStreamableValue(output)) {
        result += chunk
        setValue(result)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      toast({ title: "An error occurred", variant: "destructive" })
    }
  }
  return (
    <Button
      disabled={loading}
      type="button"
      variant={"ghost"}
      title={title}
      onClick={handleGenerate}
      className="flex items-center gap-2"
    >
      <IconSparklesThree width={18} height={18} />
      Generate
    </Button>
  )
}
