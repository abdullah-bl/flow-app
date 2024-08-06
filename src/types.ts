import type { RecordModel } from "pocketbase"

export type User = RecordModel & {}

export type Department = RecordModel & {
  name: string
  members: string[]
  manager: string
  expand?: {
    manager: User
    members: User[]
  }
}

export type Status = RecordModel & {
  name: string
  description: string
  order: number
}

export type Tender = RecordModel & {
  name: string
  description: string
  scope: string
  terms: string
  cost: number

  reference: string // Reference Number 1234567890
  number: string // Tender Number 23/23

  publish_date: string
  open_date: string
  award_date: string

  duration: string

  status: string
  user: string
  members: string[]

  department: string

  award_doc: string // Award Document
  gov_doc: string // Government Document
  cap_doc: string // Capital Expenditure Document

  expand?: {
    members: User[]
    department: Department
    user: User
    status: Status
  }
}

export type TenderItem = RecordModel & {
  tender: string
  name: string
  description: string
  quantity: number
  unit: string
  amount: number
  createdAt: string
  updatedAt: string
  expand?: {
    tender: Tender
  }
}

export type Bid = RecordModel & {
  tender: string
  user: string
  cost: number
  status: string
  createdAt: string
  updatedAt: string
  expand?: {
    user: User
    tender: Tender
    status: Status
  }
}

export type Comment = RecordModel & {
  tender: string
  user: string
  message: string
  createdAt: string
  updatedAt: string
  expand?: {
    user: User
    tender: Tender
  }
}

export type Contract = RecordModel & {}

export type Document = RecordModel & {
  target: string
  name: string
  description: string
  file: string
  createdAt: string
  updatedAt: string
  user: string
  expand?: {
    user: User
  }
}

export type Budget = RecordModel & {
  name: string
  description: string
  type: string
  reference: string
  number: string
  closed: boolean
}

export type Obligation = RecordModel & {
  budget: string
  tender: string
  contract: string
  cost: number
  cash: number
  date: string
  notes: string
  file: string
  user: string
  expand?: {
    budget: Budget
    user: User
    tender: Tender
    contract: Contract
  }
}

export type History = RecordModel & {
  user: string
  action: "CREATE" | "UPDATE" | "DELETE"
  target: string
  note: string
  createdAt: string
  expand?: {
    user: User
  }
}
