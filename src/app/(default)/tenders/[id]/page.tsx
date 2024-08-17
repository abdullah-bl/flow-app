import Summarize from "@/components/ai/summrize"
import DateCard from "@/components/custom/date.card"
import { Item } from "@/components/custom/item"
import UpdateStatus from "@/components/status/update"
import { getContract } from "@/data/contracts"
import { getTender } from "@/data/tenders"
import { daysBetween, formatCurrency, formatDateTime } from "@/lib/utils"
import { Tender } from "@/types"
import {
  IconBill,
  IconCalendar,
  IconCalendar2,
  IconTrendingChart3,
} from "@irsyadadl/paranoid"
import { Link } from "next-view-transitions"

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
  const contract = await getContract(tender.id)
  return (
    <div className="grid gap-4 w-full">
      {contract && (
        <Item title="Contract" subtitle="Contract details for this tender.">
          <Link href={`/contracts/${contract?.id}`}>View Contract &rarr;</Link>
        </Item>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-2 p-3 rounded-lg border justify-between ">
          <IconBill width={22} height={22} />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0">
              <span className="text-xl font-semibold text-blue-700">
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <DateCard
          icon={<IconCalendar width={22} height={22} />}
          title="Publish Date"
          subtitle={
            tender.publish_date
              ? `Published ${daysBetween(
                  tender.publish_date,
                  new Date().toISOString()
                )} days ago`
              : "Not available"
          }
          date={tender.publish_date}
        />
        <DateCard
          icon={<IconCalendar2 width={22} height={22} />}
          title="Open Date"
          subtitle={
            tender.open_date
              ? `${daysBetween(
                  tender.open_date,
                  tender.publish_date
                )} days after publish date`
              : "Not available"
          }
          date={tender.open_date}
        />
        <DateCard
          icon={<IconCalendar2 width={22} height={22} />}
          title="Award Date"
          subtitle={
            tender.award_date
              ? `${daysBetween(
                  tender.award_date,
                  tender.publish_date
                )} days after publish date`
              : "Not available"
          }
          date={tender.award_date}
        />
      </div>
      <div className="grid gap-4 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-0">
            <h3 className="text-lg font-medium">Details</h3>
            <p className="text-sm text-stone-500">
              Details from Eetimad platform.
            </p>
          </div>
          <div className="flex flex-col gap-0 items-end ">
            <span className="text-xs text-stone-500">Last Update</span>
            <span className="text-sm">{formatDateTime(tender.updated)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1">
            <span className="text-stone-600">Number</span>
            <span className="">{tender.number || "Not Available"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-stone-600">Reference</span>
            <span className="">{tender.reference || "Not Available"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-stone-600">Department</span>
            <span className="">
              {tender.expand?.department?.name || "Not Assigned"}
            </span>
          </div>
          <div className="flex flex-col gap-1 ">
            <span className="text-stone-600">Location</span>
            <span className="">{tender.location || "Not Available"}</span>
          </div>
          <details className=" col-span-2 py-1">
            <summary className="flex items-center gap-1">
              <span className="font-normal hover:font-medium select-none">
                Scope of Work
              </span>
              {tender.scope && <Summarize content={tender.scope} />}
            </summary>
            <p className={"p-2 whitespace-pre-wrap"}>
              {tender.scope || "Not Available"}
            </p>
          </details>
          <details className=" col-span-2 py-1 w-full">
            <summary className="flex items-center gap-1 w-full">
              <span className="font-normal hover:font-medium select-none">
                Terms and Conditions
              </span>
              {tender.terms && <Summarize content={tender.terms} />}
            </summary>
            <p className={"p-2 whitespace-pre-wrap"}>
              {tender.terms || "Not Available"}
            </p>
          </details>
        </div>
      </div>
      <div className="h-fit grid gap-2 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-0">
            <h3 className="font-medium w-full text-lg">Attachments</h3>
            <p className="text-sm text-stone-500">
              Files and documents attached to the tender.
            </p>
          </div>
        </div>
        <div className="grid gap-2 grid-cols-2">
          <div className="grid gap-2 grid-cols-2 col-span-2">
            <span className="font-normal">
              Specifications and Conditions Document
            </span>
            <span>{tender.specifications_doc ? "File" : "Not available"}</span>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <span className="font-normal">Prices Document</span>
            <span>{tender.prices_doc ? "File" : "Not available"}</span>
          </div>

          <div className="grid gap-2 grid-cols-2">
            <span className="font-normal">Government Document</span>
            <span>{tender.gov_doc ? "File" : "Not available"}</span>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <span className="font-normal">Awarded Document</span>
            <span>{tender.award_doc ? "File" : "Not available"}</span>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <span className="font-normal">Capitalism Document</span>
            <span>{tender.cap_doc ? "File" : "Not available"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
