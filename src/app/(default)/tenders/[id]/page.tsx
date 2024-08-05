import DateCard from "@/components/custom/date.card"
import { getTender } from "@/data/tenders"
import { daysBetween, formatDate } from "@/lib/utils"
import { Tender } from "@/types"
import { CalendarIcon } from "@radix-ui/react-icons"

export default async function TenderDetails({
  params: { id },
}: {
  params: { id: string }
}) {
  console.log(id)
  const tender = (await getTender(id)) as Tender
  if (!tender) {
    return <div>Not found</div>
  }
  return (
    <div className="grid gap-6 w-full">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-2xl font-medium">Info</h3>
          <p className="text-sm text-gray-500">Details of the tender.</p>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <DateCard
          title="Publish Date"
          subtitle={`${daysBetween(
            tender.publish_date,
            new Date().toISOString()
          )} days ago`}
          date={tender.publish_date}
        />
        <DateCard
          title="Open Date"
          subtitle={`${daysBetween(
            tender.open_date,
            tender.publish_date
          )} days after publish date`}
          date={tender.open_date}
        />
        <DateCard
          title="Award Date"
          subtitle={`${daysBetween(
            tender.award_date,
            tender.open_date
          )} days after open date`}
          date={tender.award_date}
        />
      </div>
    </div>
  )
}
