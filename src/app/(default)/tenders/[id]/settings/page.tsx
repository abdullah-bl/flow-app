import { Item } from "@/components/custom/item"
import DocumentsTable from "@/components/documents/table"
import UploadDocument from "@/components/documents/upload"
import GeneratePricesDocuments from "@/components/tenders/items/generate"
import { Button } from "@/components/ui/button"
import { getDocuments } from "@/data/documents"
import { getTender, getTenderItems } from "@/data/tenders"
import { getUserFromSession } from "@/lib/auth"

export default async function Settings({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getUserFromSession()
  const items = await getTenderItems(id)
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-2xl font-medium">General</h3>
          <p className="text-sm text-stone-500">
            General settings of this tender.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Item title="Update Tender" subtitle="Update the tender.">
          <Button variant={"outline"}>Update</Button>
        </Item>
        <Item
          title="Specifications and Conditions Document"
          subtitle="A document containing the specifications and conditions of this tender."
        >
          <Button variant={"outline"}>Generate</Button>
        </Item>
        <Item
          title="Prices Document"
          subtitle="A document containing the prices of all items in this tender."
        >
          <GeneratePricesDocuments items={items} />
        </Item>
        <div className="flex flex-col gap-1  rounded-lg py-4">
          <h3 className="font-medium">Danger Zone</h3>
          <span className="text-stone-500 text-sm">
            Actions that are only the creator of the tender can perform
          </span>
        </div>

        <Item title="Archive" subtitle="Archive this tender.">
          <Button variant="outline">Archive</Button>
        </Item>
        <Item title="Delete" subtitle="Delete this tender.">
          <Button variant="destructive">Delete</Button>
        </Item>
      </div>
    </div>
  )
}
