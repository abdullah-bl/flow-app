"use server"

import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { z } from "zod"

// i don't care if this done or not
export const create = authAction
  .schema(
    z.object({
      action: z.enum(["UPDATE", "DELETE", "CREATE"]),
      target: z.string(),
      note: z.string().optional(),
      original: z.object({}).optional(),
    })
  )
  .action(async ({ parsedInput, ctx: { user } }) => {
    return await client.collection("histories").create({
      ...parsedInput,
      user: user.id,
    })
  })
