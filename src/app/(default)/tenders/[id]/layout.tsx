import { Hero } from "@/components/layout/hero";
import { getTender } from "@/data/tenders";
import { ArchiveIcon, FileIcon, InfoCircledIcon, ListBulletIcon, Pencil1Icon, PieChartIcon, TrashIcon } from "@radix-ui/react-icons";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";




export default async function TenderDetailsLayout({
  children,
  params: { id }
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const tender = await getTender(id)

  if (!tender) {
    return redirect("/404")
  }

  return (
    <div className="grid gap-6">
      <Hero>
        <h1 className="text-2xl font-semibold">
          {tender.name}
        </h1>
        <p className="text-sm text-gray-500">Details of the tender.</p>
      </Hero>
      <nav className="flex items-center justify-start gap-4 flex-nowrap overflow-scroll">
        <Link href={`/tenders/${tender.id}`} className="flex flex-col gap-2 border rounded-lg p-4 min-w-40">
          <InfoCircledIcon />
          Info
        </Link>
        <Link href={`/tenders/${tender.id}/items`} className="flex flex-col gap-2 border rounded-lg p-4 min-w-40">
          <ListBulletIcon />
          Items
        </Link>
        <Link href={`/tenders/${tender.id}/obligations`} className="flex flex-col gap-2 border rounded-lg p-4 min-w-40">
          <PieChartIcon />
          Obligations
        </Link>
        <Link href={`/tenders/${tender.id}/documents`} className="flex flex-col gap-2 border rounded-lg p-4 min-w-40">
          <ArchiveIcon />
          Documents
        </Link>
        <Link href={`/tenders/${tender.id}/history`} className="flex flex-col gap-2 border rounded-lg p-4 min-w-40">
          <FileIcon />
          History
        </Link>
      </nav>
      {children}
    </div>
  )

}