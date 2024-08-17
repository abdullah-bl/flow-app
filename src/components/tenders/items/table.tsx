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
import DeleteTenderItem from "./delete"
import { tafqeet } from "@/lib/arabicNumberToWords"

export default function ItemsTable({ items }: { items: TenderItem[] }) {
  const vat_rate = 0.15
  const total = items.reduce(
    (acc, item) => acc + item.amount * item.quantity,
    0
  ) // total amount with vat included
  const vat_exclude = total / (1 + vat_rate) // vat excluded
  const vat_amount = total - vat_exclude // vat amount

  return items.length > 0 ? (
    <div className="border rounded-lg" id="tender-items">
      <Table>
        {/* <TableCaption>A list of items in this tender.</TableCaption> */}
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
              <TableCell className="">
                <DeleteTenderItem id={item.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>Subtotal</TableCell>
            <TableCell className="" colSpan={2}>
              {formatCurrency(vat_exclude)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>VAT ({vat_rate * 100}%)</TableCell>
            <TableCell className="" colSpan={2}>
              {formatCurrency(vat_amount)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>Total (VAT Included)</TableCell>
            <TableCell className="" colSpan={2}>
              {formatCurrency(total)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ) : (
    <div className="border rounded-lg p-4">
      <p className="text-stone-500 text-sm">No items found. yet!</p>
    </div>
  )
}
