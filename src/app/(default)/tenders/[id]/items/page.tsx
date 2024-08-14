import CreateTenderItem from "@/components/tenders/items/create"
import GeneratePricesDocuments from "@/components/tenders/items/generate"
import ItemsTable from "@/components/tenders/items/table"
import { Button } from "@/components/ui/button"
import { getTenderItems } from "@/data/tenders"

export default async function TenderItemsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const items = await getTenderItems(id)

  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <div className="grid gap-0">
          <h3 className="text-2xl font-medium">Items</h3>
          <p className="text-sm text-stone-500">
            A list of items in this tender.
          </p>
        </div>
        <div className="grid">
          <CreateTenderItem tenderId={id} />
        </div>
      </div>
      <ItemsTable items={items} />
      <div className="flex items-center justify-between border rounded-lg p-4">
        <div className="grid gap-1">
          <h3 className="font-medium">Prices Document</h3>
          <p className="text-stone-500 text-sm">
            A document containing the prices of all items in this tender.
          </p>
        </div>
        <GeneratePricesDocuments items={items} />
      </div>
    </div>
  )
}
