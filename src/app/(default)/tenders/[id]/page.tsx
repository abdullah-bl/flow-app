import { Copy } from "@/components/custom/copy"
import DateCard from "@/components/custom/date.card"
import UpdateStatus from "@/components/status/update"
import { getTender } from "@/data/tenders"
import { daysBetween, formatCurrency } from "@/lib/utils"
import { Tender } from "@/types"
import {
  IconCurrencyDollar,
  IconPerson,
  IconPersonAdd,
  IconTrendingChart3,
} from "@irsyadadl/paranoid"
import {
  FileIcon,
  PieChartIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons"
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
    <div className="grid gap-6 w-full">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2 p-3 rounded-lg border ">
          <PieChartIcon width={22} height={22} />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0">
              <span className="text-2xl font-semibold text-blue-700">
                {formatCurrency(tender.cost)}
              </span>
              <span className="text-xs text-zinc-500">Estimated Cost</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3 rounded-lg border">
          <div className="flex items-center justify-between w-full">
            <IconTrendingChart3 width={22} height={22} />
            <UpdateStatus id={id} currentStatus={tender.expand?.status} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0 items-start flex-1">
              <span className="text-xl font-medium ">
                {tender.expand?.status?.name || "No Status"}
              </span>
              <span className="text-xs text-zinc-500">
                {tender.expand?.status?.description || "No Description"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-0">
            <h3 className="text-xl font-medium">Tender Details</h3>
            <p className="text-sm text-stone-500">
              Details from Eetimad platform.
            </p>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
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
        <div className="p-4 border rounded-lg">
          <div className="grid grid-cols-4 gap-4">
            <span className=" font-normal ">Number</span>
            <span className="font-normal">{tender.number || "...."}</span>
            <span className=" font-normal ">Reference</span>
            <span className="font-normal">{tender.reference || "...."}</span>
            <span className=" font-normal  ">Type</span>
            <span className="font-normal">{tender.type || "...."}</span>
            <span className="">Location</span>
            <span className="font-normal">{tender.location || "...."}</span>
          </div>
        </div>
        <div className="grid gap-4 flex-1">
          <details className="border rounded-lg">
            <summary className="flex items-center justify-between gap-2 px-2 py-2 bg-stone-50">
              <span className="font-medium">Scope of Work</span>
              <Copy content={tender.scope} />
            </summary>
            <Markdown className={"p-2"}>{tender.scope || "...."}</Markdown>
          </details>
          <details className="border rounded-lg">
            <summary className="flex items-center justify-between gap-2 px-2 py-2 bg-stone-50">
              <span className="font-medium">Terms and Conditions</span>
              <Copy content={tender.terms} />
            </summary>
            <Markdown className={"p-2"}>{tender.terms || "...."}</Markdown>
          </details>
        </div>
        <div className="p-4 border rounded-lg h-fit">
          <div className="flex items-center justify-between">
            <h3 className="font-medium w-full text-lg">Members</h3>
            <IconPersonAdd width={22} height={22} />
          </div>
          ....
        </div>
        <div className="p-4 border rounded-lg h-fit grid gap-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium w-full text-lg">Attachments</h3>
            <FileIcon width={22} height={22} />
          </div>
          <div className="grid gap-2 grid-cols-4">
            <span className="font-normal">Government Document</span>
            <span>{tender.gov_doc ? "File" : "Not available"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
