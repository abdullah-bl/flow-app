import { daysBetween, formatDate } from "@/lib/utils"
import { IconCalendarDays } from "@irsyadadl/paranoid"
import { CalendarIcon } from "@radix-ui/react-icons"

export default function Card({
  icon,
  title,
  subtitle,
  date,
}: {
  icon?: React.ReactNode
  title: string
  date?: string | Date | undefined
  subtitle?: string | React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-lg border bg-white">
      <div className="flex items-center justify-between">
        <span className=" font-normal ">{title}</span>
        {icon}
      </div>
      <span className="font-medium text-lg">{formatDate(date)}</span>
      <span className="text-xs text-stone-500">{subtitle}</span>
    </div>
  )
}
