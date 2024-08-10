import { IconLayers2 } from "@irsyadadl/paranoid"

import {
  IconFolderPaper,
  IconFolderBox,
  IconLayers,
  IconBag,
} from "@irsyadadl/paranoid"
import {
  FileIcon,
  GearIcon,
  PieChartIcon,
  ReaderIcon,
} from "@radix-ui/react-icons"

export const pages = [
  { href: "/tenders", label: "Tenders", icon: IconLayers },
  { href: "/contracts", label: "Contracts", icon: IconFolderBox },
  { href: "/invoices", label: "Invoices", icon: FileIcon },
  { href: "/souq", label: "Souq", icon: IconBag },
  { href: "/budgets", label: "Budgets", icon: PieChartIcon },
  { href: "/templates", label: "Templates", icon: IconFolderPaper },
  { href: "/reports", label: "Reports", icon: ReaderIcon },
  { href: "/settings", label: "Settings", icon: GearIcon },
]
