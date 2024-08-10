"use server"

import { client } from "@/lib/client"
import { action } from "@/lib/safe-action"
import { cookies } from "next/headers"
import { z } from "zod"

// This schema is used to validate input from client.
const loginSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(8).max(100),
})

// This action is used to login a user.
export const login = action // This is a safe action client.
  .schema(loginSchema) // This is the schema used to validate input.
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      await client.collection("users").authWithPassword(username, password)
      cookies().set(
        "session",
        client.authStore.exportToCookie({
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
      )
      return { success: true, message: "Login successful" }
    } catch (error) {
      return { success: false, message: "Login failed" }
    }
  })

export const logout = async () => {
  client.authStore.clear()
  cookies().delete("session")
  return { success: true, message: "Logout successful" }
}
