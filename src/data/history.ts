import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { History } from "@/types"
import { ListResult } from "pocketbase"

export const getHistory = async (
  target: string
): Promise<ListResult<History>> => {
  try {
    getUserFromSession()
    return await client.collection("histories").getList(1, 30, {
      filter: `target="${target}"`,
      expand: "user",
      sort: "-created",
    })
  } catch (error) {
    console.error(error)
    return { items: [], totalItems: 0, page: 1, perPage: 30, totalPages: 0 }
  }
}
