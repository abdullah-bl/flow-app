"use client"

import { deleteTenderItem } from "@/actions/tenders"
import { useToast } from "@/components/ui/use-toast"

export default function DeleteTenderItem({ id }: { id: string }) {
  const { toast } = useToast()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const confirm = window.confirm("Are you sure you want to delete this item?")
    if (!confirm) return
    const form = new FormData(event.currentTarget)
    const result = await deleteTenderItem(form)
    if (result?.data) {
      toast({
        title: "Item Deleted",
        description: `The item has been deleted successfully.`,
      })
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
        description: `An error occured while deleting the item. Please try again later.`,
      })
    }
  }
  return (
    <form className="action" onSubmit={handleSubmit}>
      <input type="text" name="id" value={id} readOnly hidden />
      <button type="submit" className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </form>
  )
}
