import { cookies } from "next/headers"
import { client } from "./client"
import { User } from "@/types"





export const getUserFromSession = () => {
  const session = cookies().get("pb_auth")
  if (!session) return null
  client.authStore.loadFromCookie(`pb_auth=${session.value}`)
  return client.authStore.isValid ? client.authStore.model : null as unknown as User
}