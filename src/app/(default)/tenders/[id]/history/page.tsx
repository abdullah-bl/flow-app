import TableSkeleton from "@/components/custom/table.skeleton"
import HistoryTable from "@/components/history/table"
import { Suspense } from "react"

export default async function History({
  params: { id },
}: {
  params: { id: string }
}) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <h3 className="text-2xl font-medium">History</h3>
        <p className="text-sm text-gray-500">
          A list of history in this tender.
        </p>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <HistoryTable target={id} />
      </Suspense>
    </div>
  )
}
