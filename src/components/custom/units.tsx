import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export type Unit = {
  value: string
  label: string
}

export type Group = {
  label: string
  items: Unit[]
}

const units: Group[] = [
  {
    label: "Length",
    items: [
      { value: "mm", label: "Millimeter" },
      { value: "cm", label: "Centimeter" },
      { value: "m", label: "Meter" },
      { value: "km", label: "Kilometer" },
    ]
  }, {
    label: "Quantity",
    items: [
      { value: "ea", label: "Each" },
      { value: "dz", label: "Dozen" },
      { value: "pk", label: "Pack" },
      { value: "cs", label: "Case" },
    ]
  },
  {
    label: "Others",
    items: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
      { value: "year", label: "Year" },
      { value: "visit", label: "Visit" },
      { value: "service", label: "Service" },
      { value: "other", label: "Other" },
      { value: "support", label: "Support" },
    ]
  }
]




export function SelectUnit({
  defaultValue = "",
}: {
  defaultValue?: string
}) {
  return (
    <Select name="unit" defaultValue={defaultValue}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select a unit" />
      </SelectTrigger>
      <SelectContent>
        {units.map((group, i) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.items.map((unit, j) => (
              <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}