"use server"

import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { CreateTenderItemSchema, CreateTenderSchema } from "@/lib/zod"
import { Tender, TenderItem } from "@/types"
import { revalidatePath } from "next/cache"


export const create = async (data: typeof CreateTenderSchema["_input"]) => {
  const user = getUserFromSession()
  if (!user) return { success: false, message: "Not authorized" }
  try {
    await CreateTenderSchema.safeParseAsync(data)
    const tender = await client.collection("tenders").create<Tender>({
      ...data,
      user: user.id
    })
    return { success: true, data: tender, message: "Tender created successfully" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: error }
  }
}

export const create_item = async (data: typeof CreateTenderItemSchema["_input"]) => {
  const user = getUserFromSession()
  if (!user) return { success: false, message: "Not authorized" }
  try {
    await CreateTenderItemSchema.safeParseAsync(data)
    const item = await client.collection("tender_items").create<TenderItem>(data)
    revalidatePath(`/tenders/${item.tender}/items`)
    return { success: true, data: item, message: "Item created successfully" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: error }
  }
}