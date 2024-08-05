import CreateTenderItem from "@/components/tenders/items/create"
import ItemsTable from "@/components/tenders/items/table"
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
          <p className="text-sm text-gray-500">
            A list of items in this tender.
          </p>
        </div>
        <div className="grid">
          <CreateTenderItem tenderId={id} />
        </div>
      </div>
      <ItemsTable items={items} />
    </div>
  )
}
