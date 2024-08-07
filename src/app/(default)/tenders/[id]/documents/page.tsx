import DocumentsTable from "@/components/documents/table"
import UploadDocument from "@/components/documents/upload"
import { getDocuments } from "@/data/documents"
import { getTender } from "@/data/tenders"
import { getUserFromSession } from "@/lib/auth"

export default async function Documents({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = getUserFromSession()
  const documents = await getDocuments(id)

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-2xl font-medium">Documents</h3>
          <p className="text-sm text-stone-500">
            A list of documents in this tender.
          </p>
        </div>
        <UploadDocument target={id} />

      </div>

      <DocumentsTable documents={documents} currentUserId={user?.id} />
    </div>
  )
}
