"use client"
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
import { DownloadIcon, TrashIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { deleteDocument } from "@/actions/documents"
import { useToast } from "../ui/use-toast"
import { usePathname } from "next/navigation"

export default function DocumentsTable({
  documents,
  currentUserId,
}: {
  documents: Document[]
  currentUserId: string | undefined
}) {
  const pathname = usePathname()
  const { toast } = useToast()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const confirm = window.confirm(
      "Are you sure you want to delete this document?"
    )
    if (!confirm) return
    const form = new FormData(event.currentTarget)
    const result = await deleteDocument(form)
    console.log(result)
    if (result?.data) {
      toast({
        title: "Document Deleted",
        description: `The document has been deleted successfully.`,
      })
    }
    if (result?.validationErrors) {
      toast({
        title: "Validation Error",
        description: `Please check the form and try again.`,
      })
    }
    if (result?.serverError) {
      toast({
        title: "Server Error",
        description: `An error occured while deleting the document. Please try again later.`,
      })
    }
  }
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
                  <form onSubmit={handleSubmit} method="post">
                    <input
                      type="text"
                      readOnly
                      name="id"
                      defaultValue={doc.id}
                      hidden
                    />
                    <input
                      type="text"
                      name="currentPath"
                      defaultValue={pathname}
                      hidden
                    />
                    <button type="submit" className="text-red-500 text-xs">
                      <TrashIcon />
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
