import { TenderItem } from "@/types"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

export default function ItemsTable({
  items,
  canUpdate,
}: {
  items: TenderItem[]
  canUpdate?: boolean
}) {
  return (
    <div className="border rounded-lg" id="tender-items">
      <Table>
        <TableCaption>A list of items in this tender.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="">Total Amount</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => (
            <TableRow key={item.id}>
              <TableCell className="w-fit">{i + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description || "..."}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{formatCurrency(item.amount)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell className="">
                {formatCurrency(item.amount * item.quantity)}
              </TableCell>
              <TableCell className="">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="" colSpan={2}>
              {formatCurrency(
                items.reduce(
                  (acc, item) => acc + item.amount * item.quantity,
                  0
                )
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
