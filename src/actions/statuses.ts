"use server"

import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import * as history from "./history"

export const UpdateTargetStatus = authAction
  .schema(
    z.object({
      target: z.string(), // tender-id
      statusId: z.string(),
      note: z.string().optional(),
    })
  )
  .action(
    async ({ parsedInput: { target, statusId, note }, ctx: { user } }) => {
      try {
        const [collection, id] = target.split("-") // tender-1 => ["tender", "1"]
        await client.collection(collection).update(id, {
          status: statusId,
        })
        revalidatePath(`/${collection}/${id}`)
        await history.create({
          target: id,
          note: `Status updated to ${statusId} ${note ? `(${note})` : ""}`,
          action: "UPDATE",
        })
        return { success: true, message: "Status updated" }
      } catch (error) {
        console.error(error)
        return { success: false, error }
      }
    }
  )
