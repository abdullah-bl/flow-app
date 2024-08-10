"use server"

import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { CreateTenderItemSchema, CreateTenderSchema } from "@/lib/zod"
import { Tender, TenderItem } from "@/types"
import { revalidatePath } from "next/cache"

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

export const create_item = async (
  data: (typeof CreateTenderItemSchema)["_input"]
) => {
  const user = await getUserFromSession()
  if (!user) return { success: false, message: "Not authorized" }
  try {
    await CreateTenderItemSchema.safeParseAsync(data)
    const item = await client
      .collection("tender_items")
      .create<TenderItem>(data)
    revalidatePath(`/tenders/${item.tender}/items`)
    return { success: true, data: item, message: "Item created successfully" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: error }
  }
}

export const createTenderItem = authAction
  .schema(CreateTenderItemSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      const item = await client.collection("tender_items").create<TenderItem>({
        ...parsedInput,
        user: user.id,
      })
      revalidatePath(`/tenders/${item.tender}/items`)
      return {
        success: true,
        data: item,
        message: "Item created successfully",
      }
    } catch (error) {
      return { success: false, message: error }
    }
  })
