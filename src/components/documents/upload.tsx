"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import * as actions from "@/actions/documents"
import { useToast } from "@/components/ui/use-toast"
import { usePathname } from "next/navigation"

export default function UploadDocument({ target }: { target: string }) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const form = new FormData(event.currentTarget)
      await actions.uploadDocument(form)
      toast({
        title: "Document uploaded successfully",
        description: "The document has been uploaded successfully.",
      })
      setOpen(false)
      setFile(null)
      setName("")
    } catch (error) {
      console.error(error)
      toast({
        title: "Document upload failed",
        description: `An error occurred while uploading the document.`,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>&#43; Upload</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>Upload a new document.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            name={"currentPath"}
            value={pathname}
            readOnly
            hidden
          />
          <input type="text" name={"target"} value={target} readOnly hidden />
          <Label htmlFor="name">Name (*)</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="write the name of the item"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            rows={2}
            className="max-h-32"
            id="description"
            name="description"
            placeholder="write a clear description..."
          />
          <Label htmlFor="file">Document (*)</Label>
          <Input
            id="file"
            name="file"
            type="file"
            required
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.odt,.ods,.odp,.odg,.odc,.odf,.odb,.odi,.odm,.ott,.ots,.otp,.otg,.otc,.otf,.otb,.oti,.otm,.sxw,.sxc,.sxi,.sxd,.sxi,.sxm,.stw,.stc,.sti,.std,.sxd,.sxi,.sxm,.sxc,.sxg"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null)
              setName(e.target.files?.[0]?.name || "")
            }}
          />

          <Button type="submit" className="btn">
            Upload Document
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
