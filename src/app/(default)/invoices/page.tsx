import { InvoicesTable } from "@/components/invoices/table"
import { HeroSection } from "@/components/layout/hero"
import { getInvoices } from "@/data/invoices"
import { getUserFromSession } from "@/lib/auth"

export default async function InvoicesPage() {
  const invoices = await getInvoices()
  const user = await getUserFromSession()
  return (
    <div className="grid gap-4">
      <HeroSection>
        <h3 className="text-4xl font-semibold">Invoices</h3>
        <p className="text-sm text-stone-500">Manage your invoices..</p>
      </HeroSection>

      <InvoicesTable invoices={invoices} currentUser={user || undefined} />
    </div>
  )
}
