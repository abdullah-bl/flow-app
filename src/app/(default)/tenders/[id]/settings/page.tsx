import DocumentsTable from "@/components/documents/table"
import UploadDocument from "@/components/documents/upload"
import { getDocuments } from "@/data/documents"
import { getTender } from "@/data/tenders"
import { getUserFromSession } from "@/lib/auth"

export default async function Settings({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getUserFromSession()
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-2xl font-medium">Settings</h3>
          <p className="text-sm text-stone-500">
            Manage the settings of this tender.
          </p>
        </div>
      </div>
    </div>
  )
}
