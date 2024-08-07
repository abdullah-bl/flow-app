import { IconTrendingChart2, IconFolderPaper, IconFolderBox, IconLayers, IconBag } from "@irsyadadl/paranoid"
import { Hero } from "@/components/layout/hero"
import {
  BackpackIcon,
  FileIcon,
  FileTextIcon,
  GearIcon,
  LayersIcon,
  PieChartIcon,
  ReaderIcon,
} from "@radix-ui/react-icons"
import { Link } from "next-view-transitions"

export default function Home() {
  return (
    <div className="flex flex-col gap-4  flex-1 ">
      <Hero>
        <h1 className="text-3xl font-bold">Follow UP</h1>
        <p className="text-lg">
          The way to manage your tenders, contracts, and more.
        </p>
      </Hero>
      <div className="grid grid-cols-4 gap-4 p-2">
        <Link
          href="/tenders"
          className="bg-white/70 border col-span-1 rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <IconLayers width={22} height={22} />
          <span className="flex-1 w-full text-justify ">
            View Tenders &rarr;
          </span>
        </Link>
        <Link
          href="/contracts"
          className="bg-white/70 border rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <IconFolderBox width={22} height={22} />
          <span className="flex-1 w-full text-justify ">
            View Contracts &rarr;
          </span>
        </Link>
        <Link
          href="/invoices"
          className="bg-white/70 border rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <FileIcon width={22} height={22} />
          <span className="flex-1 w-full text-justify ">
            View Invoices &rarr;
          </span>
        </Link>
        <Link
          href="/souq"
          className="bg-white/70 border rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <IconBag width={22} height={22} />
          <span className="flex-1 w-full text-justify ">View Souq &rarr;</span>
        </Link>
        <Link
          href="/budgets"
          className="bg-white/70 border rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <IconTrendingChart2 width={22} height={22} />
          <span className="flex-1 w-full text-justify ">
            View Budgets &rarr;
          </span>
        </Link>
        <Link
          href="/reports"
          className="bg-white/70 border rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <ReaderIcon width={22} height={22} />
          <span className="flex-1 w-full text-justify ">
            View Reports &rarr;
          </span>
        </Link>
        <Link
          href="/templates"
          className="bg-white/70 border rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <IconFolderPaper width={22} height={22} />
          <span className="flex-1 w-full text-justify ">
            View Templates &rarr;
          </span>
        </Link>
        <Link
          href="/settings"
          className="bg-white/70 border rounded-lg p-3 flex flex-col gap-5  shadow-sm hover:shadow-md"
        >
          <GearIcon width={22} height={22} />
          <span className="flex-1 w-full text-justify ">
            View Settings &rarr;
          </span>
        </Link>
      </div>
    </div>
  )
}
