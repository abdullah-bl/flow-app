import { Status } from "@/types"
import { Suspense } from "react"
import UpdateStatus from "./form"
import { getStatuses } from "@/data/statuses"
import { Skeleton } from "../ui/skeleton"

export default async function UpdateStatusComponent({
  id,
  currentStatus,
}: {
  id: string
  currentStatus: Status | undefined
}) {
  const statuses = await getStatuses()
  return (
    <Suspense fallback={<Skeleton className="w-1/2 h-6" />}>
      <UpdateStatus statuses={statuses} id={id} currentStatus={currentStatus} />
    </Suspense>
  )
}
