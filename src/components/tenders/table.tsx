'use client'

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
import type { Tender } from "@/types"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { formatCurrency } from "@/lib/utils"


export function TendersTable({
  tenders
}: {
  tenders: Tender[]
}) {
  const [data, setData] = useState<Tender[]>(tenders)

  useEffect(() => {
    setData(tenders)
  }, [tenders])


  const handleSearch = (e:
    React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.toLowerCase()
    const results = tenders.filter((tender) => {
      return tender.name.toLowerCase().includes(value) ||
        tender.number.toLowerCase().includes(value) ||
        tender.expand?.department?.name.toLowerCase().includes(value) ||
        tender.cost.toString().includes(value) ||
        tender.expand?.status?.name.toLowerCase().includes(value)
    })
    setData(results)
  }

  const handleSort = (key: string) => {
    const _key = key.split("-") // ["-","name"] or ["name"] 
    const sorted = tenders.sort((a, b) => {
      if (_key[0] === "-") {
        return a[_key[1]] > b[_key[1]] ? -1 : 1
      } else {
        return a[_key[0]] > b[_key[0]] ? 1 : -1
      }
    })
    setData([...sorted])
  }

  const exportToCSV = () => {
    const header = ["status", "number", "name", "cost", "department"] as (keyof Tender)[]
    const replacer = (key: string, value: any) => value === null ? '' : value
    const csv = tenders.map(row => {
      return header.map(fieldName => {
        if (fieldName === "status") {
          return JSON.stringify(row.expand?.status?.name, replacer)
        }
        if (fieldName === "department") {
          return JSON.stringify(row.expand?.department?.name, replacer)
        }
        return JSON.stringify(row[fieldName], replacer)
      }).join(",")
    }).join("\n")
    console.log(csv)
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tenders.csv"
    a.click()
    URL.revokeObjectURL(url)

  }

  const print = () => {
    const table = document.querySelector("#tenders-table")
    const w = window.open()
    w?.document.write("<title>Tenders</title>")
    w?.document.write("<h3 class='font-bold text-lg mb-4'>Tenders</h3>")
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
          <Input placeholder="Search tenders..." onChange={handleSearch}
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
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="-cost">
                  High to Low (Cost)
                </SelectItem>
                <SelectItem value="cost">
                  Low to High (Cost)
                </SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="department">Department</SelectItem>

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
          <a href="/tenders/create" className="px-2 hover:font-medium transition-all duration-75">
            + Create Tender
          </a>
        </div>
      </div>
      <div className="border rounded-lg px-2" id="tenders-table">
        <Table>
          <TableCaption>
            A list of all available tenders
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-fit">#</TableHead>
              <TableHead className="w-fit">Status</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>
                Department
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, i) => (
              <TableRow key={d.id}>
                <TableCell className="">{i + 1}</TableCell>
                <TableCell>{d.expand?.status?.name || "N/A"}</TableCell>
                <TableCell>{d.number || "N/A"}</TableCell>
                <TableCell>
                  <a href={`/tenders/${d.id}`}>
                    {d.name}
                  </a>
                </TableCell>
                <TableCell className="">{formatCurrency(d.cost)}</TableCell>
                <TableCell className="">{d.expand?.department?.name || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </div>

    </div>
  )
}
