"use server"

import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { CreateTenderItemSchema, CreateTenderSchema } from "@/lib/zod"
import { Tender, TenderItem } from "@/types"
import { revalidatePath } from "next/cache"
import { zfd } from "zod-form-data"

export const create = authAction
  .schema(CreateTenderSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      const tender = await client.collection("tenders").create<Tender>({
        ...parsedInput,
        user: user.id,
      })
      revalidatePath("/tenders")
      return {
        success: true,
        data: tender,
        message: "Tender created successfully",
      }
    } catch (error) {
      return { success: false, message: error }
    }
  })

export const deleteTender = authAction
  .schema(zfd.formData({ id: zfd.text() }))
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {})

export const createTenderItem = authAction
  .schema(CreateTenderItemSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      const item = await client.collection("tender_items").create<TenderItem>({
        ...parsedInput,
        user: user.id,
      })
      revalidatePath(`/tenders/${item.tender}/items`)
      return item
    } catch (error) {
      throw error
    }
  })

export const deleteTenderItem = authAction
  .schema(zfd.formData({ id: zfd.text() }))
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    try {
      await client.collection("tender_items").delete(id)
      revalidatePath("/tenders")
      return { success: true, message: "Item deleted successfully" }
    } catch (error) {
      return { success: false, message: error }
    }
  })
