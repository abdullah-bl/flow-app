'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import * as actions from '@/actions/tenders';
import { useToast } from "@/components/ui/use-toast"
import { SelectUnit } from "@/components/custom/units"

export default function CreateTenderItem({
  tenderId
}: {
  tenderId: string
}) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const form = new FormData(event.currentTarget)
      const d = Object.fromEntries(form.entries()) as any
      const { success, message, data } = await actions.create_item(d)
      toast({
        title: "Item created successfully",
        description: 'The item has been created successfully.',
      })
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast({
        title: "Item creation failed",
        description: `An error occurred while creating the item.`,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        &#43;
        Add Item
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Item
          </DialogTitle>
          <DialogDescription>
            Create a new item for this tender.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" onSubmit={handleSubmit}>
          <input type="text" name="tender" value={tenderId} readOnly hidden />
          <Label htmlFor="name">Name (*)</Label>
          <Input id="name" name="name" type="text" required
            placeholder="write the name of the item" />
          <Label htmlFor="description">Description</Label>
          <Textarea rows={2} className="max-h-32" id="description" name="description" placeholder="write a clear description..." />
          <Label htmlFor="unit">Unit (*)</Label>
          <Input id="unit" name="unit" type="text" required
            placeholder="write the unit of the item" />
          {/* <SelectUnit /> */}
          <Label htmlFor="amount">Amount (*)</Label>
          <Input id="amount" name="amount" type="number" required
            placeholder="write the amount of the item" min={1} />
          <Label htmlFor="quantity">Quantity (*)</Label>
          <Input id="quantity" name="quantity" type="number" required
            placeholder="write the quantity of the item" min={1} defaultValue={1} />
          <Button type="submit" className="btn">Create Item</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}