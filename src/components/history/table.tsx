import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getHistory } from "@/data/history"
import { formatDate, formatDateTime } from "@/lib/utils"

export default async function HistoryTable({ target }: { target: string }) {
  const history = await getHistory(target)
  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>A list of your recent histories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">#</TableHead>
            <TableHead className="w-fit">Action</TableHead>
            <TableHead className="flex-1">Note</TableHead>
            <TableHead className="w-fit">User</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.items.map((h, i) => (
            <TableRow key={h.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{h.action}</TableCell>
              <TableCell>{h.note}</TableCell>
              <TableCell>{h.expand?.user.name}</TableCell>
              <TableCell>{formatDateTime(h.created)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
