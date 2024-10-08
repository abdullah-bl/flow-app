"use client"

import { useState } from "react"

import { Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Status } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { UpdateTargetStatus } from "@/actions/statuses"
import { useToast } from "../ui/use-toast"

export default function UpdateStatus({
  id,
  currentStatus,
  statuses,
}: {
  id: string
  currentStatus: Status | undefined
  statuses: Status[]
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus?.id)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const result = await UpdateTargetStatus({
      target: `tenders-${id}`,
      statusId: e.currentTarget.status.value,
      note: e.currentTarget.note.value,
    })
    if (result?.data) {
      setOpen(false)
      setLoading(false)
      toast({
        title: "Status Updated",
        description: "The status has been updated successfully.",
      })
    }
    if (result?.validationErrors) {
      console.log(result.validationErrors)
      toast({
        title: "Validation Error",
        description: "Please check the form and try again.",
      })
    }
    if (result?.serverError) {
      toast({
        title: "Server Error",
        description:
          "An error occured while updating the status. Please try again later.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="flex items-center gap-2"
        disabled={false}
        asChild
      >
        <Button variant={"outline"} size={"sm"}>
          <Pencil1Icon />
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent className="w-1/3 bg-white">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            Update the status of this tender.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" method="post" onSubmit={handleSubmit}>
          <Label htmlFor="status">Select Status</Label>
          <Select
            name="status"
            required
            defaultValue={selectedStatus}
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="font-medium text-sm">Description</span>
          <span className="text-stone-500 text-xs">
            {statuses.find((status) => status.id === selectedStatus)
              ?.description ?? ""}
          </span>
          <Label htmlFor="note">Note</Label>
          <Textarea
            required
            minLength={5}
            name="note"
            id="note"
            placeholder="Write a note..."
            className="max-h-40"
          />
          <Button type="submit" variant={"default"}>
            {loading ? "Updating..." : "Update status"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
