"use server"

import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export const UpdateTargetStatus = authAction
  .schema(
    z.object({
      target: z.string(), // tender-id
      statusId: z.string(),
    })
  )
  .action(async ({ parsedInput: { target, statusId }, ctx: { user } }) => {
    try {
      const [collection, id] = target.split("-")
      await client.collection(collection).update(id, {
        status: statusId,
      })
      revalidatePath(`/${collection}/${id}`)
      return { success: true, message: "Status updated" }
    } catch (error) {
      console.error(error)
      return { success: false, error }
    }
  })
