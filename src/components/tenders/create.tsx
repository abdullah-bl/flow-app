"use client"

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import * as xlsx from 'xlsx'
import type { TenderItem } from "@/types";
import { useState } from "react";
import * as tenders from "@/actions/tenders";
import { useToast } from "../ui/use-toast";
import { Progress } from "@/components/ui/progress"
import { Link } from "next-view-transitions";
import { ToastAction } from "../ui/toast";


export default function CreateTenderForm() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  // const [tenderItems, setTenderItems] = useState<TenderItem[]>([])

  // const downloadTemplate = () => {
  //   const header = ["name", "description", "unit", "cost", "quantity"] as (keyof TenderItem)[]
  //   const rows = ["example", "this is example", "pcs", 100, 1]
  //   const wb = xlsx.utils.book_new()
  //   const ws = xlsx.utils.aoa_to_sheet([header, rows])

  //   xlsx.utils.book_append_sheet(wb, ws, "tender_items")
  //   xlsx.writeFile(wb, "tender_items_template.xlsx")

  //   const a = document.createElement("a")
  //   a.href = URL.createObjectURL(new Blob([xlsx.write(wb, { type: "array", bookType: "xlsx" })], { type: "application/octet-stream" }))
  //   a.download = "tender_items_template.xlsx"
  // }

  // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (!file) return
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //     const data = new Uint8Array(e.target?.result as ArrayBuffer)
  //     const workbook = xlsx.read(data, { type: "array" })
  //     const sheet = workbook.Sheets[workbook.SheetNames[0]]
  //     const json = xlsx.utils.sheet_to_json<TenderItem>(sheet)
  //     console.log("Tender Items", json)
  //     setTenderItems(json)
  //   }
  //   reader.readAsArrayBuffer(file)
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const form = e.currentTarget
      let tender = Object.fromEntries(new FormData(form).entries()) as any
      tender.cost = Number(tender.cost)
      const { success, message, data } = await tenders.create(tender)
      console.log(success, message)
      if (success) {
        toast({
          title: 'Tender created',
          description: 'You have successfully created a tender',
          action: <ToastAction altText="View Tender">
            <Link href={`/tenders/${data?.id}`}>View Tenders</Link>
          </ToastAction>
        })
        form.reset()
        // setTenderItems([])
      } else {
        toast({
          title: 'Tender creation failed',
          description: `Failed to create tender: ${message}`,
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Tender creation failed',
        description: 'Something went wrong',
      })
    }
  }

  return (
    <form className="grid gap-2 container" onSubmit={handleSubmit}>
      <Label htmlFor="name">Name (*)</Label>
      <Input name="name" id="name" type="text"
        placeholder="Enter tender name..."
        required
      />
      <Label htmlFor="cost">Cost</Label>
      <Input name="cost" id="cost" type="number"
        placeholder="Enter tender cost..."
        required
        defaultValue={0}
        min={0}
      />
      <Label htmlFor="scope">
        Scope of Work
      </Label>
      <Textarea name="scope" id="scope"
        placeholder="Enter tender scope..."
      />
      <Label htmlFor="terms">
        Terms and Conditions
      </Label>
      <Textarea name="terms" id="terms" rows={4}
        placeholder="Enter tender terms..."
      />
      {/* <Label htmlFor="tender_items">
          Tender Items
        </Label>
        <div className="grid gap-2 p-2 ">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">
              Template of Tender Items
            </span>
            <Button type="button" size="sm" variant="outline" onClick={downloadTemplate}>
              Download Template
            </Button>
          </div>
          <div className="flex items-center justify-between p-1 bg-zinc-50 dark:bg-zinc-950 rounded-lg">
            <span className="font-medium">
              Upload Tender Items (Excel) (*)
            </span>
            <Input onChange={handleUpload} className="w-fit border-none shadow-none" type="file" accept=".xlsx" required />
          </div>
        </div> */}
      <div className="flex items-center gap-2 my-2">
        <input className="w-4 h-4" name="confirm" id="confirm" type="checkbox" required />
        <Label htmlFor="confirm" className="">
          I confirm that the information provided is correct and accurate.
        </Label>
      </div>
      <div className="flex justify-end">
        <Button type="submit">
          Create Tender &rarr;
        </Button>
      </div>
    </form>

  )
}