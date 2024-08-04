import { daysBetween, formatDate } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";




export default function DateCard({
  title,
  subtitle,
  date,
}: {
  title: string
  date?: string | Date | undefined
  subtitle?: string | React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border">
      <CalendarIcon />
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0">
          <span className=" font-normal ">
            {title}
          </span>
          <span className="text-xs text-zinc-500">
            {subtitle}
          </span>
        </div>
        <span className="font-normal">
          {formatDate(date)}
        </span>
      </div>
    </div>
  )
}