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

export const deleteDocument = authAction
  .schema(zfd.formData({ id: z.string(), currentPath: z.string().optional() }))
  .action(async ({ parsedInput: { id, currentPath }, ctx: { user } }) => {
    try {
      await client.collection("documents").delete(id)
      revalidatePath(currentPath ?? "/")
      return {
        success: true,
        message: "Document deleted successfully",
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : error,
      }
    }
  })
