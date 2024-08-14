"use server"

import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { z } from "zod"

export const create = authAction
  .schema(
    z.object({
      action: z.enum(["UPDATE", "DELETE", "CREATE"]),
      target: z.string(),
      note: z.string().optional(),
      user: z.string(),
      original: z.object({}).optional(),
    })
  )
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      return await client.collection("history").create({
        ...parsedInput,
        user: user.id,
      })
    } catch (error) {
      return { success: false, message: error }
    }
  })
