import { Copy } from "@/components/custom/copy"
import DateCard from "@/components/custom/date.card"
import { getTender } from "@/data/tenders"
import { daysBetween, formatCurrency } from "@/lib/utils"
import { Tender } from "@/types"
import { IconCurrencyDollar } from "@irsyadadl/paranoid"
import { PieChartIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import Markdown from "react-markdown"

export default async function TenderDetails({
  params: { id },
}: {
  params: { id: string }
}) {
  const tender = (await getTender(id)) as Tender
  if (!tender) {
    return <div>Not found</div>
  }
  return (
    <div className="grid gap-4 w-full">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-2xl font-medium">Info</h3>
          <p className="text-sm text-gray-500">Details of the tender.</p>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2 p-3 rounded-lg border">
          <IconCurrencyDollar width={22} height={22} />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0">
              <span className="text-2xl font-medium ">
                {formatCurrency(tender.cost)}
              </span>
              <span className="text-xs text-zinc-500">Estimated Cost</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3 rounded-lg border">
          <div className="flex items-center justify-between">
            <QuestionMarkCircledIcon width={22} height={22} />
            ....
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0">
              <span className="text-xl font-medium ">
                {tender.expand?.status?.name || "N/A"}
              </span>
              <span className="text-xs text-zinc-500">
                {tender.expand?.status?.description || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-xl font-medium">Eetimad Details</h3>
          <p className="text-sm text-gray-500">
            Details from Eetimad platform.
          </p>
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
      <div className="grid gap-4">
        <details className="border rounded-lg">
          <summary className="flex items-center justify-between gap-2 px-2 py-2 bg-stone-100">
            <span className="font-medium">Scope of Work</span>
            <Copy content={tender.scope} />
          </summary>
          <Markdown className={"p-2"}>{tender.scope}</Markdown>
        </details>
        <details className="border rounded-lg">
          <summary className="flex items-center justify-between gap-2 px-2 py-2 bg-stone-100">
            <span className="font-medium">Terms and Conditions</span>
            <Copy content={tender.terms} />
          </summary>
          <Markdown className={"p-2"}>{tender.terms}</Markdown>
        </details>
      </div>
    </div>
  )
}
