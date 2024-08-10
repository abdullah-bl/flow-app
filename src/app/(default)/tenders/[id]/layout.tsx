import { CustomLink } from "@/components/custom/link"
import { Hero } from "@/components/layout/hero"
import { getTender } from "@/data/tenders"
import {
  IconArchive,
  IconChainLink,
  IconListBullets,
  IconInbox,
  IconFolderPaper,
} from "@irsyadadl/paranoid"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = await getTender(id)
  return {
    title: product?.name || "Tender Details",
    description: product?.scope || "Details of the tender.",
  }
}

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
      <nav className="flex items-center justify-center gap-4 flex-nowrap overflow-scroll my-2">
        <CustomLink
          href={`/tenders/${tender.id}`}
          className="flex items-center gap-4 px-2 py-2 hover:bg-stone-100 rounded-lg min-w-40"
        >
          <IconInbox width={22} height={22} />
          Overview
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/items`}
          className="flex items-center gap-4 px-2 py-2 hover:bg-stone-100 rounded-lg  min-w-40"
        >
          <IconListBullets width={22} height={22} />
          Items
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/obligations`}
          className="flex items-center gap-4 px-2 py-2 hover:bg-stone-100 rounded-lg  min-w-40"
        >
          <IconChainLink width={22} height={22} />
          Obligations
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/documents`}
          className="flex items-center gap-4 px-2 py-2 hover:bg-stone-100 rounded-lg  min-w-40"
        >
          <IconFolderPaper width={22} height={22} />
          Documents
        </CustomLink>
        <CustomLink
          href={`/tenders/${tender.id}/history`}
          className="flex items-center gap-4 px-2 py-2 hover:bg-stone-100 rounded-lg  min-w-40"
        >
          <IconArchive width={22} height={22} />
          History
        </CustomLink>
      </nav>
      {children}
    </div>
  )
}
