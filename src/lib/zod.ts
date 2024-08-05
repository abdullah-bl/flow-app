import { z } from "zod"

export const CreateTenderSchema = z.object({
  name: z.string(),
  cost: z.number(),
  scope: z.string(),
  terms: z.string(),
})

export const CreateTenderItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  unit: z.string(),
  amount: z.number(),
  quantity: z.number(),
})

export const CreateObligationSchema = z.object({
  budget: z.string(),
  tender: z.string().optional(),
  contract: z.string().optional(),
  cost: z.number().default(0),
  cash: z.number().default(0),
  notes: z.string().optional(),
  date: z.string(),
  file: z.instanceof(File).optional(),
})

export const UploadDocumentSchema = z.object({
  target: z.string(),
  name: z.string(),
  description: z.string().optional(),
  file: z.any(),
  currentPath: z.string().optional(),
})
