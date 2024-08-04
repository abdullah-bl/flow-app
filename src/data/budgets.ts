import { getUserFromSession } from "@/lib/auth"
import { client } from "@/lib/client"
import { Budget } from "@/types"




export const getBudgets = async () => {
  try {
    getUserFromSession()
    return await client.collection("budgets").getFullList<Budget>({
      sort: "-updated",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}