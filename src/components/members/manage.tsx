"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { User } from "@/types"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { manageTenderMembers } from "@/actions/tenders"
import { useAction } from "next-safe-action/hooks"
import { useToast } from "../ui/use-toast"

export default function ManageMember({
  id,
  users,
  members,
}: {
  id: string
  users: User[]
  members: User[] | undefined
}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { executeAsync, result } = useAction(manageTenderMembers)
  const [data, setData] = useState<User[]>(users)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<User[] | []>([])

  useEffect(() => {
    setData(users)
  }, [users])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setData(
      users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      ) || []
    )
  }

  const handleChange = (user: User, value: boolean) => {
    if (value) {
      setSelected([...selected, user])
    } else {
      setSelected(
        selected.filter((member: { id: string }) => member.id !== user.id)
      )
    }
  }

  const handleSave = async () => {
    setLoading(true)
    await executeAsync({
      id: id,
      members: selected.map((member) => member.id),
    })
    if (result.data) {
      toast({ title: "Members updated successfully" })
    }
    if (result.validationErrors) {
      toast({ title: "An error occurred", variant: "destructive" })
    }
    if (result.serverError) {
      toast({ title: "An error occurred", variant: "destructive" })
    }
    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Manage Member</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Manage Member</DialogTitle>
          <DialogDescription>
            Add or remove a member from this tender.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            type="search"
            placeholder="Search for a user"
            onChange={handleSearch}
          />
          <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
            {data.length === 0 && (
              <p className="text-stone-500 text-sm">No users found.</p>
            )}
            {data.map((user: User) => (
              <div
                className="flex items-center justify-between border rounded-lg px-4 py-2"
                key={user.id}
              >
                <div className="grid gap-0">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-stone-500 text-sm">{user.username}</p>
                </div>
                <Switch
                  id={user.id}
                  defaultChecked={members?.some(
                    (member) => member.id === user.id
                  )}
                  onCheckedChange={(value) => handleChange(user, value)}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
