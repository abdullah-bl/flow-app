"use server"

import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { CreateTenderItemSchema, CreateTenderSchema } from "@/lib/zod"
import { Tender, TenderItem } from "@/types"
import { revalidatePath } from "next/cache"
import { zfd } from "zod-form-data"
import { z } from "zod"
import * as history from "./history"

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
      await history.create({
        target: item.tender,
        note: `New Item Added`,
        action: "CREATE",
      })
      return item
    } catch (error) {
      throw error
    }
  })

export const deleteTenderItem = authAction
  .schema(zfd.formData({ id: zfd.text() }))
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    try {
      const item = await client
        .collection("tender_items")
        .getOne<TenderItem>(id)
      await client.collection("tender_items").delete(id)
      revalidatePath("/tenders")
      await history.create({
        target: item.tender,
        note: `Item ${item.name} deleted`,
        action: "DELETE",
        original: item,
      })
      return { success: true, message: "Item deleted successfully" }
    } catch (error) {
      return { success: false, message: error }
    }
  })

export const manageTenderMembers = authAction
  .schema(z.object({ id: z.string(), members: z.array(z.string()) }))
  .action(async ({ parsedInput: { id, members }, ctx: { user } }) => {
    try {
      console.log({ id, members })
      const tender = await client.collection("tenders").getOne<Tender>(id)
      await client.collection("tenders").update(id, {
        ...tender,
        members,
      })
      revalidatePath("/tenders")
      await history.create({
        target: id,
        note: `Members updated`,
        action: "UPDATE",
        original: tender,
      })
      return { success: true, message: "Members updated successfully" }
    } catch (error) {
      return { success: false, message: error }
    }
  })
