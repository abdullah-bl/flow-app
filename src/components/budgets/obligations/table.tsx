import { formatCurrency, formatDate } from "@/lib/utils"
import { Obligation } from "@/types"
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
} from "@/components/ui/table"
import { FileIcon } from "@radix-ui/react-icons"

export default function ObligationsTable({
  obligations,
}: {
  obligations: Obligation[]
}) {
  return obligations.length > 0 ? (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>
          A list of budgets and obligations in this tender.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Cash</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Document</TableHead>
            <TableHead className="">User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {obligations.map((obligation, i) => (
            <TableRow key={obligation.id}>
              <TableCell className="w-fit">{i + 1}</TableCell>
              <TableCell>{obligation.expand?.budget.name}</TableCell>
              <TableCell>{formatCurrency(obligation.cost)}</TableCell>
              <TableCell>{formatCurrency(obligation.cash)}</TableCell>
              <TableCell>{formatDate(obligation.date)}</TableCell>
              <TableCell>{obligation.notes || "N/A"}</TableCell>
              <TableCell>
                {obligation.document ? <FileIcon /> : "N/A"}
              </TableCell>
              <TableCell>{obligation.expand?.user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>
              {formatCurrency(
                obligations.reduce((acc, cur) => acc + cur.cost, 0)
              )}
            </TableCell>
            <TableCell>
              {formatCurrency(
                obligations.reduce((acc, cur) => acc + cur.cash, 0)
              )}
            </TableCell>
            <TableCell colSpan={4}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ) : (
    <div className="border rounded-lg p-4">
      <p className="text-stone-500 text-sm">No obligations found. yet!</p>
    </div>
  )
}
