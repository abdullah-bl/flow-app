import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { Document } from "@/types"

export const getDocuments = async (target: string) => {
  try {
    getUserFromSession()
    return await client.collection("documents").getFullList<Document>({
      filter: `target = "${target}"`,
      sort: "-updated",
      expand: "user",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
