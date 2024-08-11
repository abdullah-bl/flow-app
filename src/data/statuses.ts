import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { Status } from "@/types"

export const getStatuses = async () => {
  try {
    await getUserFromSession()
    return await client.collection("statuses").getFullList<Status>()
  } catch (error) {
    console.error(error)
    return []
  }
}
