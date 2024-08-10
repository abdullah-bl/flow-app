"use server"

import { cookies } from "next/headers"
import { client } from "./client"
import { User } from "@/types"

export const getUserFromSession = async () => {
  const session = cookies().get("session")
  if (!session) return null
  client.authStore.loadFromCookie(`${session.value}`)
  return client.authStore.isValid ? (client.authStore.model as User) : null
}
