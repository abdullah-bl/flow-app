"use server"

import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { CreateObligationSchema } from "@/lib/zod"
import { Obligation } from "@/types"
import { revalidatePath } from "next/cache"





export const create = async (data: typeof CreateObligationSchema["_input"]) => {
  try {
    const user = getUserFromSession()
    if (!user) return { success: false, message: "Not authorized" }
    await CreateObligationSchema.safeParseAsync(data)
    if (!data.tender || !data.contract) {
      return { success: false, message: "No target provided for the obligation" }
    }
    const obligation = await client.collection("obligations").create<Obligation>({
      ...data,
      user: user.id
    })
    revalidatePath(
      obligation.tender ? `/tenders/${obligation.tender}/obligations` : `/contracts/${obligation.contract}/obligations`)
    return { success: true, data: obligation, message: "Obligation created successfully" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: error }
  }
}
