import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Budget } from "@/types"





export default function SelectBudget({
  budgets,
  defaultValue,
  name = 'budget'
}: {
  budgets: Budget[]
  defaultValue: string
  name: string
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  return (
    <div className="grid gap-1">
      <Select open={open} onOpenChange={setOpen} onValueChange={setValue} defaultValue={defaultValue}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Select a budget" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Budgets</SelectLabel>
            {budgets.map(budget => (
              <SelectItem key={budget.id} value={budget.id}>
                {budget.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="text" name={name} value={value} readOnly hidden />
    </div>
  )
}