"use server"

import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { UploadDocumentSchema } from "@/lib/zod"
import { Document } from "@/types"
import { revalidatePath } from "next/cache"

export const upload = async (formData: FormData) => {
  try {
    const user = getUserFromSession()
    if (!user) return { success: false, message: "Not authorized" }
    const data = Object.fromEntries(formData.entries()) as any
    await UploadDocumentSchema.safeParseAsync(data)
    const document = await client.collection("documents").create<Document>({
      ...data,
      user: user.id,
    })
    revalidatePath(data.currentPath ?? "/")
    return {
      success: true,
      data: document,
      message: "Document uploaded successfully",
    }
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: error }
  }
}

export const deleteDocument = async (formData: FormData) => {
  try {
    getUserFromSession()
    client.collection("documents").delete(formData.get("id") as string)
    return revalidatePath(formData.get("currentPath") as string)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: error }
  }
}
