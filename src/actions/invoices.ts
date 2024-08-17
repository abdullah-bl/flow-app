"use server"

import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { zfd } from "zod-form-data"

export const create = authAction
  .schema(
    zfd.formData({
      number: zfd.numeric(),
      amount: zfd.numeric(),
      budget: zfd.text().optional().default("o6pkvweizaj42gy"),
      status: zfd.text().default("unpaid"),
      note: zfd.text().optional(),
      dueDate: zfd.text(),
      docs: zfd.file().optional(),
    })
  )
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      await client.collection("invoices").create({
        ...parsedInput,
        user: user.id,
      })
      revalidatePath("/invoices")
      return { success: true, message: "Invoice created successfully." }
    } catch (error) {
      throw new Error("Failed to create invoice.")
    }
  })

export const updateStatus = authAction
  .schema(
    z.object({
      id: z.string(),
      status: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      await client.collection("invoices").update(parsedInput.id, {
        status: parsedInput.status,
      })
      revalidatePath("/invoices")
      return { success: true, message: "Invoice updated successfully." }
    } catch (error) {
      throw new Error("Failed to update invoice.")
    }
  })

export const deleteInvoice = authAction
  .schema(z.string())
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      await client.collection("invoices").delete(parsedInput)
      revalidatePath("/invoices")
      return { success: true, message: "Invoice deleted successfully." }
    } catch (error) {
      throw new Error("Failed to delete invoice.")
    }
  })
