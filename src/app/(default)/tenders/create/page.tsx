import { Hero } from "@/components/layout/hero";
import CreateTenderForm from "@/components/tenders/create";



export default function CreateTenderPage() {
  return (
    <div className="grid gap-4">
      <Hero>
        <h3 className="font-bold text-2xl">
          Create a new tender
        </h3>
        <p className="text-sm text-gray-500">
          Fill in the form below to create a new tender.
        </p>
      </Hero>
      <CreateTenderForm />
    </div>
  )
}