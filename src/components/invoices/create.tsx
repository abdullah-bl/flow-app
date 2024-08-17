import { useState } from "react"
import { useToast } from "../ui/use-toast"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import * as invoices from "@/actions/invoices"
import { DatePicker } from "../custom/date-picker"
import SelectBudget from "../budgets/select"

export default function CreateInvoice() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const result = await invoices.create(form)
    if (result?.data) {
      toast({
        title: "Invoice Created",
        description: `The invoice has been created successfully.`,
      })
      setOpen(false)
    }
    if (result?.validationErrors) {
      toast({
        title: "Validation Error",
        description: `Please check the form and try again.`,
      })
    }
    if (result?.serverError) {
      toast({
        title: "Server Error",
        description: `An error occured while creating the invoice. Please try again later.`,
      })
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>&#43; Create Invoice</SheetTrigger>
      <SheetContent className="bg-white m-4 rounded-lg h-[95%] overflow-scroll">
        <SheetHeader>
          <SheetTitle>Create Invoice</SheetTitle>
          <SheetDescription>
            Create a new invoice for a client.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="mt-2" method="POST">
          <div className="grid gap-2">
            <SelectBudget budgets={[]} defaultValue="" name="budget" />
            <Label htmlFor="number">Invoice Number</Label>
            <Input
              type="text"
              name="number"
              id="number"
              placeholder="Enter the number of the invoice."
              required
            />
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter the amount of the invoice."
              required
              min={0}
              step={0.01}
              pattern="\d+(\.\d{2})?"
            />
            <Label htmlFor="dueDate">Due Date</Label>
            <DatePicker date={date} setDate={setDate} />
            <input
              name="dueDate"
              type="text"
              hidden
              defaultValue={date?.toISOString()}
              className="hidden"
            />
            <Label htmlFor="status">Status</Label>
            <Select name="status">
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label htmlFor="note">Note</Label>
            <Textarea
              name="note"
              id="note"
              placeholder="Enter a note for the invoice."
            />
            <Label htmlFor="docs">
              Documents <span className="text-stone-500">(Optional)</span>
            </Label>
            <Input type="file" name="docs" id="docs" multiple />
            <Button type="submit">Create Invoice &#8594;</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
