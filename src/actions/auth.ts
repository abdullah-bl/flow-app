"use server"

import { client } from "@/lib/client"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"



const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6)
})


export const login = async (form: FormData) => {

  try {
    await loginSchema.safeParseAsync(Object.fromEntries(form.entries()))
    const { record, token } = await client.collection("users")
      .authWithPassword(form.get("username") as string, form.get("password") as string)
    const session = client.authStore.exportToCookie().split("=")
    cookies().set(session[0], session[1])
    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Login failed" }
  }
}