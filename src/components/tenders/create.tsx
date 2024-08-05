"use client"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import * as tenders from "@/actions/tenders"
import { useToast } from "../ui/use-toast"
import { Link } from "next-view-transitions"
import { ToastAction } from "../ui/toast"
import { generate } from "@/actions/ai"
import { useState } from "react"
import { readStreamableValue } from "ai/rsc"

export default function CreateTenderForm() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [scope, setScope] = useState("")
  const [terms, setTerms] = useState("")

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const inputName = e.currentTarget.name
    const { output } = await generate(
      `based on tender name "${name}" generate ${inputName} for me, do not repeat content, and do not be too long`
    )
    for await (const delta of readStreamableValue(output)) {
      if (inputName === "scope")
        setScope((currentScope) => `${currentScope}${delta}`)
      if (inputName === "terms")
        setTerms((currentTerms) => `${currentTerms}${delta}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const form = e.currentTarget
      let tender = Object.fromEntries(new FormData(form).entries()) as any
      tender.cost = Number(tender.cost)
      const { success, message, data } = await tenders.create(tender)
      console.log(success, message)
      if (success) {
        toast({
          title: "Tender created",
          description: "You have successfully created a tender",
          action: (
            <ToastAction altText="View Tender">
              <Link href={`/tenders/${data?.id}`}>View Tenders</Link>
            </ToastAction>
          ),
        })
        form.reset()
        // setTenderItems([])
      } else {
        toast({
          title: "Tender creation failed",
          description: `Failed to create tender: ${message}`,
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Tender creation failed",
        description: "Something went wrong",
      })
    }
  }

  return (
    <form className="grid gap-2 container" onSubmit={handleSubmit}>
      <Label htmlFor="name">Name (*)</Label>
      <Input
        name="name"
        id="name"
        type="text"
        placeholder="Enter tender name..."
        required
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Label htmlFor="cost">Cost</Label>
      <Input
        name="cost"
        id="cost"
        type="number"
        placeholder="Enter tender cost..."
        required
        defaultValue={0}
        min={0}
      />
      <div className="flex items-center justify-between">
        <Label htmlFor="scope">Scope of Work</Label>
        <Button
          type="button"
          variant={"ghost"}
          size={"sm"}
          name="scope"
          onClick={handleGenerate}
        >
          Generate Scope
        </Button>
      </div>
      <Textarea
        name="scope"
        id="scope"
        placeholder="Enter tender scope..."
        onChange={(e) => setScope(e.target.value)}
        value={scope}
      />
      <div className="flex items-center justify-between">
        <Label htmlFor="terms">Terms and Conditions</Label>
        <Button
          type="button"
          variant={"ghost"}
          size={"sm"}
          name="terms"
          onClick={handleGenerate}
        >
          Generate Terms
        </Button>
      </div>
      <Textarea
        name="terms"
        id="terms"
        rows={4}
        placeholder="Enter tender terms..."
        onChange={(e) => setTerms(e.target.value)}
        value={terms}
      />

      <div className="flex items-center gap-2 my-2">
        <input
          className="w-4 h-4"
          name="confirm"
          id="confirm"
          type="checkbox"
          required
        />
        <Label htmlFor="confirm" className="">
          I confirm that the information provided is correct and accurate.
        </Label>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Create Tender &rarr;</Button>
      </div>
    </form>
  )
}
