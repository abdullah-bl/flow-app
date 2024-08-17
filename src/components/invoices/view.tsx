"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Invoice, User } from "@/types"
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { DownloadIcon, FileIcon } from "@radix-ui/react-icons"
import { DialogDescription, DialogHeader } from "../ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { deleteInvoice, updateStatus } from "@/actions/invoices"

export default function View({
  invoice,
  currentUser,
}: {
  invoice: Invoice
  currentUser: User | undefined
}) {
  const [open, setOpen] = useState(false)
  const handleChangeStatus = async () => {
    await updateStatus({
      id: invoice.id,
      status: invoice.status === "paid" ? "unpaid" : "paid",
    })
  }
  const handleDelete = async () => {
    const c = confirm("Are you sure you want to delete this invoice?")
    if (!c) return
    const result = await deleteInvoice(invoice.id)
    if (result?.data) {
      setOpen(false)
    }
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="text-xs font-medium">View</SheetTrigger>
      <SheetContent className="bg-white m-4 rounded-2xl h-[95%] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
          <DialogDescription>#{invoice.id}</DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Invoice Number</span>
              <span>{invoice.number}</span>
            </li>
          </ul>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total Amount</span>
              <span>{formatCurrency(invoice.amount)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Budget Details</div>
            <div className="text-muted-foreground">
              {invoice.expand?.budget.name ?? "N/A"}
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid auto-rows-max gap-3">
            <div className="font-semibold">Note</div>
            <div className="text-muted-foreground">{invoice.note ?? "N/A"}</div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Documents</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">
                <FileIcon /> ...
              </dt>
              <dd>
                <DownloadIcon />
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3 sticky bottom-0 left-0">
          {currentUser?.id === invoice.user && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleChangeStatus}
                name="changeStatus"
                value={invoice.id}
                variant={invoice.status === "paid" ? "secondary" : "default"}
                className="w-full"
              >
                Change Status ({invoice.status === "paid" ? "Unpaid" : "Paid"})
              </Button>
              <Button
                onClick={handleDelete}
                name="delete"
                value={invoice.id}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Updated{" "}
            <time dateTime={invoice.updated}>
              {formatDateTime(invoice.updated)}
            </time>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
