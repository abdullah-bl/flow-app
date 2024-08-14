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
import { IconSparklesThree } from "@irsyadadl/paranoid"
import { formatCurrency } from "@/lib/utils"

export default function CreateTenderForm() {
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: "",
    cost: "",
    duration: "",
    location: "",
    scope: "",
    terms: "",
  } as Record<string, string>)

  const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const inputName = e.currentTarget.name
      const { output } = await generate(
        `
          tender name: ${form.name}
          tender cost: ${form.cost}
          tender duration: ${form.duration}
          tender location: ${form.location}
          Generate ${inputName} for the tender.
          With the following constraints:
          - no repeating content.
          - not too long.
          - be creative.
          - use clear and concise language.
          - make sure the content is unique.
          - should be relevant to the tender.
          - should be professional.
        `
      )
      for await (const delta of readStreamableValue(output)) {
        if (inputName === "scope")
          setForm((currentForm) => ({
            ...currentForm,
            scope: `${currentForm.scope}${delta}`,
          }))
        if (inputName === "terms")
          setForm((currentForm) => ({
            ...currentForm,
            terms: `${currentForm.terms}${delta}`,
          }))
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "AI generation failed",
        description: "Failed to generate content from AI",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const form = e.currentTarget
      const data = new FormData(form)
      const result = await tenders.create(data)
      if (result?.validationErrors) {
        toast({
          title: "Tender creation failed",
          description: "Please check the form for errors",
        })
      }
      if (result?.data) {
        toast({
          title: "Tender created",
          description: "You have successfully created a tender",
          action: (
            <ToastAction altText="View Tender">
              <Link href={`/tenders/${result?.data?.data?.id}`}>View</Link>
            </ToastAction>
          ),
        })
      }
      setForm({})
      form.reset()
    } catch (error) {
      console.error(error)
      toast({
        title: "Tender creation failed",
        description: "Something went wrong",
      })
    }
  }

  return (
    <form
      method="post"
      className="grid gap-2 container mx-0"
      onSubmit={handleSubmit}
    >
      <Label htmlFor="name">Name (*)</Label>
      <Input
        name="name"
        id="name"
        type="text"
        placeholder="Enter tender name..."
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        value={form.name}
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="grid gap-0">
          <Label htmlFor="cost">Cost</Label>
          <span className="text-xs text-stone-500">
            {formatCurrency(Number(form?.cost) || 0)}
          </span>
        </div>
        <Input
          name="cost"
          id="cost"
          type="number"
          placeholder="Enter tender cost..."
          required
          defaultValue={0}
          min={0}
          onChange={(e) => setForm({ ...form, cost: e.target.value })}
        />
        <div className="grid gap-0">
          <Label htmlFor="duration">Duration</Label>
          <span className="text-xs text-stone-500">{form.duration} months</span>
        </div>
        <Input
          name="duration"
          id="duration"
          type="number"
          placeholder="Enter tender duration..."
          required
          defaultValue={0}
          min={0}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
      </div>
      <Label htmlFor="location">Location</Label>
      <Textarea
        name="location"
        id="location"
        placeholder="Enter tender location..."
        required
      />
      <div className="flex items-center justify-between">
        <Label htmlFor="scope">Scope of Work</Label>
        <Button
          type="button"
          variant={"ghost"}
          size={"sm"}
          name="scope"
          onClick={handleGenerate}
          disabled={!form.name || form.name.trim().length < 12}
        >
          <IconSparklesThree className="mr-2" width={18} height={18} />
          Generate Scope
        </Button>
      </div>
      <Textarea
        name="scope"
        id="scope"
        placeholder="Enter tender scope..."
        onChange={(e) => setForm({ ...form, scope: e.target.value })}
        value={form.scope}
      />
      <div className="flex items-center justify-between">
        <Label htmlFor="terms">Terms and Conditions</Label>
        <Button
          type="button"
          variant={"ghost"}
          size={"sm"}
          name="terms"
          onClick={handleGenerate}
          disabled={!form.name || form.name.trim().length < 12}
        >
          <IconSparklesThree className="mr-2" width={18} height={18} />
          Generate Terms & Conditions
        </Button>
      </div>
      <Textarea
        name="terms"
        id="terms"
        rows={4}
        placeholder="Enter tender terms..."
        onChange={(e) => setForm({ ...form, terms: e.target.value })}
        value={form.terms}
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
