import { Hero } from "@/components/layout/hero";
import { TendersTable } from "@/components/tenders/table";
import { getTenders } from "@/data/tenders";


export default async function Page() {
  const tenders = await getTenders()
  return (
    <div className="grid gap-4">
      <Hero>
        <h1 className="text-2xl font-semibold">Tenders</h1>
        <p className="text-sm text-gray-500">A list of your recent tenders.</p>
      </Hero>
      <TendersTable tenders={tenders} />
    </div>
  )
}