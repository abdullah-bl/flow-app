"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Invoice, User } from "@/types"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { formatCurrency } from "@/lib/utils"
import CreateInvoice from "./create"
import View from "./view"

export function InvoicesTable({
  invoices,
  currentUser,
}: {
  invoices: Invoice[]
  currentUser: User | undefined
}) {
  const [data, setData] = useState<Invoice[]>(invoices)

  useEffect(() => {
    setData(invoices)
  }, [invoices])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    const results = invoices.filter((tender) => {
      return (
        tender.number.toLowerCase().includes(value) ||
        tender.amount.toString().includes(value) ||
        tender.status.toLowerCase().includes(value)
      )
    })
    setData(results)
  }

  const handleSort = (key: string) => {
    const _key = key.split("-") // ["-","name"] or ["name"]
    const sorted = invoices.sort((a, b) => {
      if (_key[0] === "-") {
        return a[_key[1]] > b[_key[1]] ? -1 : 1
      } else {
        return a[_key[0]] > b[_key[0]] ? 1 : -1
      }
    })
    setData([...sorted])
  }

  const exportToCSV = () => {
    const header = ["number", "amount", "status", "note"] as (keyof Invoice)[]
    const replacer = (key: string, value: any) => (value === null ? "" : value)
    const csv = data
      .map((row) => {
        return header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(",")
      })
      .join("\n")
    // add header
    const headerRow = header.join(",")
    const csvWithHeader = [headerRow, ...csv.split("\n")].join("\n")
    // add UTF-8 BOM to support special characters
    const blob = new Blob(["\ufeff", csvWithHeader], { type: "text/csv" })
    // const blob = new Blob([csvWithHeader], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "invoices.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const print = () => {
    const table = document.querySelector("#invoices-table")
    const w = window.open()
    w?.document.write("<h3 class='font-bold text-lg mb-4'>Invoices</h3>")
    w?.document.write(table?.outerHTML || "")
    // add css from url
    w?.document.write(`
      <link rel="stylesheet" href="http://localhost:3000/_next/static/css/app/layout.css">
    `)
    w?.print()
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-2/3">
          <Input
            placeholder="Search invoices..."
            onChange={handleSearch}
            className="flex-1"
          />
          <Select onValueChange={handleSort}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="-updated">Recent</SelectItem>
                <SelectItem value="updated">Oldest</SelectItem>
                <SelectItem value="-amount">High to Low (Amount)</SelectItem>
                <SelectItem value="cost">Low to High (Amount)</SelectItem>
                <SelectItem value="number">Number (asc)</SelectItem>
                <SelectItem value="-number">Number (desc)</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button onClick={exportToCSV} type="button" size="sm">
            Export to CSV
          </Button>
          <Button onClick={print} type="button" size="sm">
            Print
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <CreateInvoice />
        </div>
      </div>
      <div className="border rounded-lg px-2" id="invoices-table">
        <Table>
          <TableCaption>A list of all available invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">#</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, i) => (
              <TableRow key={d.id}>
                <TableCell className="">{i + 1}</TableCell>
                <TableCell className="uppercase">{d.status}</TableCell>
                <TableCell>{d.number}</TableCell>
                <TableCell className="">{formatCurrency(d.amount)}</TableCell>
                <TableCell className="">
                  {d.expand?.budget.name ?? ""}
                </TableCell>
                <TableCell className="">
                  <View invoice={d} currentUser={currentUser} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}