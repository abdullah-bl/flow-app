import { z } from "zod"
import { zfd } from "zod-form-data"

export const CreateTenderSchema = zfd.formData({
  name: z.string(),
  cost: zfd.numeric().optional().default(0),
  duration: zfd.numeric().optional().default(0),
  location: z.string().default(""),
  scope: z.string(),
  terms: z.string(),
})

export const CreateTenderItemSchema = zfd.formData({
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

export const UploadDocumentSchema = zfd.formData({
  target: z.string(),
  name: z.string(),
  description: z.string().optional(),
  file: zfd.file(),
  currentPath: z.string().optional(),
})
