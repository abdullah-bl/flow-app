import { Item } from "@/components/custom/item"
import CreateTenderItem from "@/components/tenders/items/create"
import GeneratePricesDocuments from "@/components/tenders/items/generate"
import ItemsTable from "@/components/tenders/items/table"
import { Button } from "@/components/ui/button"
import { getTender, getTenderItems } from "@/data/tenders"
import { formatCurrency } from "@/lib/utils"

export default async function TenderItemsPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const items = await getTenderItems(id)
  const tender = await getTender(id)
  const totalCost = items.reduce((acc, item) => acc + item.amount, 0)
  const difference = totalCost - (tender?.cost ?? 0)
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
      <Item
        title="Tender Cost"
        subtitle="The difference between the total cost of the tender and the actual cost."
      >
        <div className="grid gap-0">
          <span className="text-stone-900 text-lg font-medium">
            {formatCurrency(tender?.cost ?? 0)}
          </span>
          <span className="text-stone-500 text-sm">
            {difference > 0 ? "+" : ""} {formatCurrency(difference)}
          </span>
        </div>
      </Item>
    </div>
  )
}
