"use server"

import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { authAction } from "@/lib/safe-action"
import { UploadDocumentSchema } from "@/lib/zod"
import { Document } from "@/types"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { zfd } from "zod-form-data"

export const uploadDocument = authAction
  .schema(UploadDocumentSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    try {
      await client.collection("documents").create<Document>({
        ...parsedInput,
        user: user.id,
      })
      revalidatePath(parsedInput.currentPath ?? "/")
      return {
        success: true,
        data: document,
        message: "Document uploaded successfully",
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : error,
      }
    }
  })

// export const upload = async (formData: FormData) => {
//   try {
//     const user = await getUserFromSession()
//     if (!user) return { success: false, message: "Not authorized" }
//     const data = Object.fromEntries(formData.entries()) as any
//     await UploadDocumentSchema.safeParseAsync(data)
//     const document = await client.collection("documents").create<Document>({
//       ...data,
//       user: user.id,
//     })
//     revalidatePath(data.currentPath ?? "/")
//     return {
//       success: true,
//       data: document,
//       message: "Document uploaded successfully",
//     }
//   } catch (error) {
//     console.error(error)
//     if (error instanceof Error) {
//       return { success: false, message: error.message }
//     }
//     return { success: false, message: error }
//   }
// }

export const deleteDocument = authAction
  .schema(zfd.formData({ id: z.string(), currentPath: z.string() }))
  .action(async ({ parsedInput: { id, currentPath }, ctx: { user } }) => {
    try {
      await client.collection("documents").delete(id)
      return revalidatePath(currentPath)
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : error,
      }
    }
  })
