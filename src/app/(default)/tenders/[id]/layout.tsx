import { CustomLink } from "@/components/custom/link"
import { Hero } from "@/components/layout/hero"
import { getTender } from "@/data/tenders"
import {
  IconTrendingChart2,
  IconArchive,
  IconChainLink,
  IconListBullets,
  IconInboxFill,
  IconInbox,
  IconFolderPaper,
} from "@irsyadadl/paranoid"
import {
  ArchiveIcon,
  FileIcon,
  InfoCircledIcon,
  ListBulletIcon,
  Pencil1Icon,
  PieChartIcon,
  TrashIcon,
} from "@radix-ui/react-icons"
import { Link } from "next-view-transitions"
import { notFound, redirect } from "next/navigation"

export default async function TenderDetailsLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const tender = await getTender(id)

  if (!tender) {
    return notFound()
  }

  return (
    <div className="grid gap-6 flex-1">
      <Hero>
        <h1 className="text-2xl font-semibold">{tender.name}</h1>
        <p className="text-sm text-stone-500">Details of the tender.</p>
      </Hero>
      <nav className="flex items-center justify-start gap-3 flex-nowrap overflow-scroll">
        <CustomLink
          href={`/tenders/${tender.id}`}
          className="flex p-4 flex-col gap-2 border rounded-lg min-w-40"
        >
          <IconInbox />
          Info
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/items`}
          className="flex p-4 flex-col gap-2 border rounded-lg  min-w-40"
        >
          <IconListBullets />
          Items
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/obligations`}
          className="flex p-4 flex-col gap-2 border rounded-lg  min-w-40"
        >
          <IconChainLink />
          Obligations
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/documents`}
          className="flex p-4 flex-col gap-2 border rounded-lg  min-w-40"
        >
          <IconFolderPaper />
          Documents
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/history`}
          className="flex p-4 flex-col gap-2 border rounded-lg  min-w-40"
        >
          <IconArchive />
          History
        </CustomLink>
      </nav>
      {children}
    </div>
  )
}
