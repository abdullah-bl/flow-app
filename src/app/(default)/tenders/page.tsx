import { Hero } from "@/components/layout/hero"
import { TendersTable } from "@/components/tenders/table"
import { getTenders } from "@/data/tenders"

export default async function Page() {
  const tenders = await getTenders()
  return (
    <div className="grid gap-4">
      <Hero>
        <h3 className="text-4xl font-semibold">Tenders</h3>
        <p className="text-sm text-stone-500">A list of your recent tenders.</p>
      </Hero>
      <TendersTable tenders={tenders} />
    </div>
  )
}
