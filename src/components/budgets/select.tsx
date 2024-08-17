import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Budget } from "@/types"
import { Label } from "../ui/label"

export default function SelectBudget({
  budgets,
  defaultValue,
  name = "budget",
}: {
  budgets: Budget[]
  defaultValue: string
  name: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="grid gap-1">
      <Label htmlFor={name}>Budget</Label>
      <Select
        name={name}
        open={open}
        onOpenChange={setOpen}
        defaultValue={defaultValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a budget" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Budgets</SelectLabel>
            {budgets.map((budget) => (
              <SelectItem key={budget.id} value={budget.id}>
                {budget.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
