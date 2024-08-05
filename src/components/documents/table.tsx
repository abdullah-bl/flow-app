import { formatCurrency, formatDate } from "@/lib/utils"
import { Document } from "@/types"
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table"
import { DownloadIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { deleteDocument } from "@/actions/documents"

export default function DocumentsTable({
  documents,
  currentUserId,
}: {
  documents: Document[]
  currentUserId: string | undefined
}) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>A list of documents.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Document</TableHead>
            <TableHead className="">User</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc, i) => (
            <TableRow key={doc.id}>
              <TableCell className="w-fit">{i + 1}</TableCell>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.description || "..."}</TableCell>
              <TableCell className="text-center">
                {doc.file ? (
                  <Link
                    className="flex items-center gap-2"
                    href={`/api/documents/${doc.id}/${doc.file}?download=true`}
                    target="_blank"
                  >
                    <span className="text-sm">Download</span>
                    <DownloadIcon />
                  </Link>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>{doc.expand?.user.name}</TableCell>
              <TableCell>
                {currentUserId === doc.user && (
                  <form action={deleteDocument}>
                    <input
                      type="text"
                      readOnly
                      name="id"
                      value={doc.id}
                      hidden
                    />
                    <input
                      type="text"
                      name="currentUserId"
                      value={currentUserId}
                      hidden
                    />
                    <button type="submit" className="text-red-500 text-xs">
                      Delete
                    </button>
                  </form>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
