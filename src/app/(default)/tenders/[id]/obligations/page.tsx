import ObligationsTable from "@/components/budgets/obligations/table"
import { getObligations } from "@/data/obligations"




export default async function Obligations({
  params: { id }
}: {
  params: { id: string }
}) {
  const budgets = await getBudgets(id)
  const obligations = await getObligations({
    target: "tender",
    id
  })

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">

        <div className="grid gap-1">
          <h1 className="text-2xl font-semibold">Obligations</h1>
          <p className="text-sm text-gray-500">
            A list of obligations in this tender.
          </p>
        </div>
      </div>

      <ObligationsTable obligations={obligations} />
    </div>
  )
}