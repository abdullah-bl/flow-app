import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { User } from "@/types"

export const getUsers = async () => {
  try {
    const user = await getUserFromSession()
    return await client.collection("users").getFullList<User>({
      filter: `id != "${user?.id}"`,
      fields: `id, name, email, role, username`,
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
