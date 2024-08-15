import { CustomLink } from "@/components/custom/link";
import { ReactNode } from "react";




export default function SettingsLayout({ children, params }: { children: ReactNode, params: { id: string } }) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3 className="text-2xl font-medium">Settings</h3>
          <p className="text-sm text-stone-500">
            Manage the settings of this tender.
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/5">
          <CustomLink href={`/tenders/${params.id}/settings`} className="px-2 py-1 rounded-lg">General</CustomLink>
          <CustomLink href={`/tenders/${params.id}/settings/members`} className="px-2 py-1 rounded-lg">Members</CustomLink>
          <CustomLink href={`/tenders/${params.id}/settings/danger`} className="px-2 py-1 rounded-lg">
            Danger Zone
          </CustomLink>

        </div>
        <div className="flex-1 px-2">
          {children}
        </div>
      </div>
    </div>
  )
}